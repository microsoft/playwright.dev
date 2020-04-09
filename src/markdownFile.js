// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {html} from './zhtml.js';
import {newURL} from './urlstate.js';

export class MarkdownFile {
  static parseSimpleMarkdown({name, version, section, doc, searchableHeaders}) {
    const linkGenerator = new GithubLinkGenerator();
    const articleElement = html`<div></div>`;
    const glossaryItems = cutWithHeaders(doc, 'h1,h2,h3,h4,h5,h6', (header, content) => {
      const githubLink = linkGenerator.assignLink(header.textContent);
      const url = newURL({version, section, q: githubLink});
      return new GlossaryItem({
        parentItem: null,
        highlightable: true,
        articleElement,
        element: html`<markdown-content>${headerWithLink(header, url)}${content}</markdown-content>`,
        githubLink,
        scrollAnchor: header,
        url,
        name: header.textContent,
        description: '',
        title: header.textContent,
        searchable: searchableHeaders && header.matches(searchableHeaders),
        type: GlossaryItem.Type.Other,
      });
    });
    articleElement.append(...glossaryItems.map(item => item.element()));
    glossaryItems[0]._highlightable = false;
    return new MarkdownFile(name, MarkdownFile.Type.SIMPLE_MARKDOWN, version, section, glossaryItems);
  }

  static parsePlaywrightAPI({name, version, section, doc}) {
    const linkGenerator = new GithubLinkGenerator();

    const createTitle = (type, name) => {
      if (type === GlossaryItem.Type.Class)
        return name.substring('class: '.length);
      if (type === GlossaryItem.Type.Method)
        return name.split('(')[0];
      return name;
    }

    const glossaryItems = cutWithHeaders(doc, 'h3', (header, content) => {
      const githubLink = linkGenerator.assignLink(header.textContent);
      const url = newURL({version, section, q: githubLink});
      const element = html`<markdown-content>${headerWithLink(header, url)}${content}</markdown-content>`;
      const articleElement = html`<div></div>`;
      const type = header.textContent.startsWith('class: ') ? GlossaryItem.Type.Class : GlossaryItem.Type.Other;
      const articleItem = new GlossaryItem({
        parentItem: null,
        highlightable: false,
        articleElement,
        element,
        githubLink,
        scrollAnchor: null, // explicitly set no scroll anchor so that we scroll to the beginning
        url,
        name: header.textContent,
        description: content.querySelector('p') ? content.querySelector('p').textContent : '',
        searchable: true,
        title: createTitle(type, header.textContent),
        type,
      });
      const glossaryItems = [articleItem];
      glossaryItems.push(...cutWithHeaders(element, 'h4', (subheader, subcontent) => {
        const subGithubLink = linkGenerator.assignLink(subheader.textContent);
        const subname = subheader.textContent;
        const subdescription = subcontent.querySelector('p') ? subcontent.querySelector('p').textContent : '';
        let subtype = GlossaryItem.Type.Other;
        if (subname.startsWith('event: '))
          subtype = GlossaryItem.Type.Event;
        else if (subname.includes('.'))
          subtype = subname.includes('(') ? GlossaryItem.Type.Method : GlossaryItem.Type.Namespace;
        const suburl = newURL({version, section, q: subGithubLink});
        return new GlossaryItem({
          parentItem: articleItem,
          highlightable: true,
          articleElement,
          element: html`<markdown-content>${headerWithLink(subheader, suburl)}${subcontent}</markdown-content>`,
          githubLink: subGithubLink,
          scrollAnchor: subheader,
          url: suburl,
          name: subname,
          description: subdescription,
          searchable: true,
          title: createTitle(subtype, subname),
          type: subtype,
        });
      }));
      articleElement.append(...glossaryItems.map(item => item.element()));
      return glossaryItems;
    }).flat();
    return new MarkdownFile(name, MarkdownFile.Type.PLAYWRIGHT_API, version, section, glossaryItems);
  }

  constructor(name, type, version, section, glossaryItems) {
    this._name = name;
    this._type = type;
    this._version = version;
    this._section = section;
    /** @type {Map<string, GlossaryItem>} */
    this._githubLinkToGlossaryItem = new Map();

    this._highlightedGlossaryItem = null;

    for (const item of glossaryItems) {
      this._githubLinkToGlossaryItem.set(item._githubLink, item);
      item._markdownFile = this;
    }
    this._firstGlossaryItem = glossaryItems[0];
  }

  version() { return this._version; }
  section() { return this._section; }
  url() { return newURL({version: this._version, section: this._section}); }
  name() { return this._name; }
  type() { return this._type; }

  glossaryItems() {
    return [...this._githubLinkToGlossaryItem.values()];
  }

  glossaryItem(githubLink) {
    if (!githubLink)
      return this._firstGlossaryItem;
    return this._githubLinkToGlossaryItem.get(githubLink) || null;
  }

  async _highlightGlossaryItem(item) {
    if (this._highlightedGlossaryItem)
      this._highlightedGlossaryItem.element().classList.remove('selected');
    // We have to wait a RAF if we re-highlight the same item.
    if (this._highlightedGlossaryItem === item)
      await new Promise(x => requestAnimationFrame(x));
    this._highlightedGlossaryItem = item;
    if (this._highlightedGlossaryItem && this._highlightedGlossaryItem._highlightable)
      this._highlightedGlossaryItem.element().classList.add('selected');
  }
}

MarkdownFile.Type = {
  SIMPLE_MARKDOWN: Symbol('SIMPLE_MARKDOWN'),
  PLAYWRIGHT_API: Symbol('PLAYWRIGHT_API'),
};

class GlossaryItem {
  constructor({parentItem, articleElement, scrollAnchor, element, title, name, url, description, githubLink, highlightable, searchable, type}) {
    // This is assigned in MarkdownFile constructor.
    this._markdownFile = null;
    this._articleElement = articleElement;
    this._scrollAnchor = scrollAnchor;
    this._element = element;
    this._title = title;
    this._name = name;
    this._highlightable = highlightable;
    this._description = description;
    this._githubLink = githubLink;
    this._type = type;
    this._url = url;
    this._childItems = [];
    this._parentItem = parentItem;
    this._searchable = searchable;
    if (parentItem)
      parentItem._childItems.push(this);
  }

  parentItem() { return this._parentItem; }
  childItems() { return this._childItems.slice(); }
  markdownFile() { return this._markdownFile; }
  articleElement() { return this._articleElement; }
  scrollAnchor() { return this._scrollAnchor; }
  element() { return this._element; }
  name() { return this._name; }
  searchable() { return this._searchable; }
  description() { return this._description; }
  url() { return this._url; }
  type() { return this._type; }
  async highlight() { await this._markdownFile._highlightGlossaryItem(this); }
  title() { return this._title; }
}

GlossaryItem.Type = {
  Class: 'class',
  Method: 'method',
  Event: 'event',
  Namespace: 'namespace',
  Other: 'other',
};

class GithubLinkGenerator {
  constructor() {
    /** @type {Set<string>} */
    this._usedGithubLinks = new Set();
  }

  assignLink(title) {
    const id = title.trim().toLowerCase().replace(/\s/g, '-').replace(/[^-0-9a-zа-яё]/ig, '');
    let dedupId = id;
    let counter = 0;
    while (this._usedGithubLinks.has(dedupId))
      dedupId = id + '-' + (++counter);
    this._usedGithubLinks.add(dedupId);
    return dedupId;
  }
}

function headerWithLink(header, url) {
  return html`
    <header-with-link>
      <a class=header-link href=${url}>
        <svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
          <path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path>
        </svg>
      </a>
      ${header}
    </header-with-link>
  `;
}

function cutWithHeaders(doc, tag, callback) {
  const headers = doc.querySelectorAll(tag);
  const results = [];
  for (let i = 0; i < headers.length; ++i) {
    const header = headers[i];
    const nextHeader = i + 1 < headers.length ? headers[i + 1] : null;
    const content = extractIntoFragment(header.nextSibling, nextHeader);
    results.push(callback(header, content));
  }
  return results;
}

/**
 * @param {!Node} fromInclusive
 * @param {!Node} toExclusive
 * @return {!DocumentFragment}
 */
function extractIntoFragment(fromInclusive, toExclusive) {
  const fragment = document.createDocumentFragment();
  let node = fromInclusive;
  while (node && node !== toExclusive) {
    const next = node.nextSibling;
    fragment.appendChild(node);
    node = next;
  }
  return fragment;
}
