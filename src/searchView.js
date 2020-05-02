// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {html} from './zhtml.js';
import {FuzzySearch} from './fuzzy.js';
import {onDOMEvent, consumeDOMEvent, disposeAll} from './utils.js';
import {scrollIntoView} from './third_party/scroll-into-view-if-needed.js';
import {MarkdownFile} from './markdownFile.js';

// Number of suggestions to render immediately.
const INSTANT_RENDER_COUNT = 30;

export class SearchView {
  constructor() {
    this._input = html`
      <input autocomplete=off autocapitalize=off spellcheck=false size=1 placeholder='start typing to search'></input>
    `;
    this.element = html`
      <search-view>
        ${this._input}
        <my-button id="clear-button" class="clear-button-image"></my-button>
      </search-view>
    `;
    this._clearButton = this.element.$('#clear-button');
    this._clearButton.style.visibility = 'hidden';
    this._suggestionsElement = html`<search-suggestions></search-suggestions>`;
    this._selectedSearchItem = null;

    this._glossaryItems = null;
    this._homeURL = null;
    this._originalInputValue = '';
    this._eventListeners = [
      onDOMEvent(this._input, 'focus', () => {
        this._updateClearElementState();
        this._originalInputValue = this._input.value;
      }),
      onDOMEvent(this._input, 'input', () => {
        this._updateClearElementState();
        this._doSearch(this._input.value);
      }),
      onDOMEvent(this._input, 'keydown', this._onInputKeydown.bind(this)),
      onDOMEvent(this._clearButton, 'click', () => {
        this._input.value = '';
        this._input.focus();
        this._updateClearElementState('');
      }),
    ];
  }

  inputElement() {
    return this._input;
  }

  _onInputKeydown(event) {
    if (event.key === 'Escape' || event.keyCode === 27) {
      consumeDOMEvent(event);
      this._input.value = this._originalInputValue;
      this._input.blur();
      this.hideSuggestions();
    } else if (event.key === 'Enter') {
      if (this._selectedSearchItem) {
        this._selectedSearchItem.click();
      }
    } else if (event.key === 'ArrowDown') {
      this._selectNext(event);
    } else if (event.key === 'ArrowUp') {
      this._selectPrevious(event);
    }
  }

  _selectNext(event) {
    if (!this._selectedSearchItem)
      return;
    consumeDOMEvent(event);
    let next = this._selectedSearchItem.nextSibling;
    if (!next)
      next = this._suggestionsElement.firstChild;
    this._selectElement(next);
  }

  _selectPrevious(event) {
    if (!this._selectedSearchItem)
      return;
    event.preventDefault();
    let previous = this._selectedSearchItem.previousSibling;
    if (!previous)
      previous = this._suggestionsElement.lastChild;
    this._selectElement(previous);
  }

  _selectElement(item) {
    if (this._selectedSearchItem)
      this._selectedSearchItem.classList.remove('selected');
    this._selectedSearchItem = item;
    if (this._selectedSearchItem) {
      this._selectedSearchItem.classList.add('selected');
      scrollIntoView(this._selectedSearchItem, { block: 'nearest', behavior: 'instant', scrollMode: 'if-needed' });
    }
  }

  setGlossary(glossaryItems) {
    this.hideSuggestions();
    this._glossaryItems = glossaryItems;
  }

  setHomeURL(homeURL) {
    this._homeURL = homeURL;
  }

  setDocumentation(documentation) {
    this.hideSuggestions();
    this._documentation = documentation;
  }

  hideSuggestions() {
    if (!this._suggestionsElement.isConnected)
      return;
    this._suggestionsElement.remove();
    document.body.classList.remove('has-search-suggestions');
  }

  _updateClearElementState() {
    this._clearButton.style.visibility = this._input.value ? 'visible' : 'hidden';
  }

  _doSearch(query) {
    if (!this._glossaryItems)
      return;
    const getIconText = (glossaryItem) => {
      if (glossaryItem.type() === 'namespace')
        return 'nspace';
      if (glossaryItem.type() === 'other')
        return 'docs';
      return glossaryItem.type();
    }
    let scores = [];
    if (query) {
      const fuzzySearch = new FuzzySearch(query);
      let hasAtLeastOneNeedleMatch = false;
      for (const item of this._glossaryItems) {
        let {score, matchIndexes} = fuzzySearch.score(item.name(), item.needleIndexes());
        if (score > 0) {
          const hasNeedleMatch = matchIndexes.some(index => item.needleIndexes().has(index));
          hasAtLeastOneNeedleMatch = hasAtLeastOneNeedleMatch || hasNeedleMatch;
          scores.push({
            hasNeedleMatch,
            item,
            score,
            matchIndexes,
          });
        }
      }
      // If we have at least one match that touches "needle", then filter out
      // all matches that don't touch needles at all.
      if (hasAtLeastOneNeedleMatch)
        scores = scores.filter(score => score.hasNeedleMatch);
      scores.sort((a, b) => {
        const scoreDiff = b.score - a.score;
        if (scoreDiff)
          return scoreDiff;
        // Sort by type
        const weightDiff = b.item.searchWeight() - a.item.searchWeight();
        if (weightDiff)
          return weightDiff;

        // Prefer left-most search results.
        const startDiff = a.matchIndexes[0] - b.matchIndexes[0];
        if (startDiff)
          return startDiff;
        return a.item.name().length - b.item.name().length;
      });
    } else {
      scores.push(...this._glossaryItems.map(item => ({
        item,
        score: 0,
        matchIndexes: [],
      })));
      scores.sort((a, b) => b.item.searchWeight() - a.item.searchWeight());
    }

    this._suggestionsElement.textContent = '';
    if (!this._suggestionsElement.isConnected) {
      document.body.append(this._suggestionsElement);
      document.body.classList.add('has-search-suggestions');
    }
    if (scores.length === 0) {
      this._suggestionsElement.append(html`<a class="search-item text-only">No Results</a>`);
      return;
    }

    const renderItem = score => html`
      <a class="search-item " href="${score.item.url()}">
        <item-icon-container>
          <item-icon class="${score.item.type()}">${getIconText(score.item)}</item-icon>
        </item-icon-container>
        <item-name-container class="${score.item.description() ? '' : 'name-only'}">
          <item-name>${highlight(score.item.nameElement(), score.matchIndexes)}</item-name>
          ${score.item.description() && html`<item-description>${score.item.description()}</item-description>`}
        </item-name-container>
      </a>
    `;

    if (!query.trim().length && this._homeURL)
      this._suggestionsElement.append(html`<a class="search-item text-only" href="${this._homeURL}">Home</a>`);
    this._suggestionsElement.append(...scores.slice(0, INSTANT_RENDER_COUNT).map(renderItem));
    this._selectElement(this._suggestionsElement.firstChild);
    const leftovers = scores.slice(INSTANT_RENDER_COUNT);
    if (leftovers.length) {
      const leftoversElement = html`
        <a class="search-item text-only">
          Show Remainig ${leftovers.length} Results.
        </a>
      `;
      onDOMEvent(leftoversElement, 'click', () => {
        leftoversElement.remove();
        this._suggestionsElement.append(...leftovers.map(renderItem));
      });
      this._suggestionsElement.append(leftoversElement);
    }
  }

  dispose() {
    disposeAll(this._eventListeners);
  }
}

// Clone element, highlight matching indexes, and return a new DocumentFragment
// that contains it.
function highlight(element, matchIndexes) {
  element = element.cloneNode(true /* deep */);
  // If `element` is a text node, than result must be a fragment.
  // Always return fragment in this case.
  const result = document.createDocumentFragment();
  result.append(element);
  const treeWalker = document.createTreeWalker(result, NodeFilter.SHOW_TEXT, null, false);
  const textNodes = [];
  for (let textNode = treeWalker.nextNode(); textNode; textNode = treeWalker.nextNode())
    textNodes.push(textNode);
  textNodes.reverse();

  const indexes = matchIndexes.slice().reverse();
  let consumed = 0;
  while (indexes.length && textNodes.length) {
    const index = indexes.pop();
    // Find a text node that contains this character index to highlight.
    let textNode = textNodes.pop();
    while (textNodes.length && consumed + textNode.nodeValue.length <= index) {
      consumed += textNode.nodeValue.length;
      textNode = textNodes.pop();
    }
    const text = textNode.nodeValue;
    // If we didn't find a text node to highlight - bail out.
    if (consumed + text.length < index)
      break;

    // Otherwise, add minimum number of <mark> elements to highlight occurrences.
    const fragment = document.createDocumentFragment();
    let lastHighlightElement = null;
    let lastHighlightIndex = 0;
    const pushHighlight = (index) => {
      index -= consumed;
      if (lastHighlightElement && lastHighlightIndex === index) {
        lastHighlightElement.textContent += text[index];
        lastHighlightIndex = index + 1;
        return;
      }
      if (lastHighlightIndex < index)
        fragment.append(text.substring(lastHighlightIndex, index));
      lastHighlightElement = html`<mark>${text[index]}</mark>`;
      lastHighlightIndex = index + 1;
      fragment.append(lastHighlightElement);
    }

    pushHighlight(index);
    while (indexes.length && consumed + text.length > indexes[indexes.length - 1])
      pushHighlight(indexes.pop());
    if (lastHighlightIndex < text.length)
      fragment.append(html`${text.substring(lastHighlightIndex)}`);
    textNode.replaceWith(fragment);
    consumed += text.length;
  }
  return result;
}
