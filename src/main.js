// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {html} from './zhtml.js';
import {newURL, URLState} from './urlstate.js';
import {GithubProject} from './project.js';
import {SearchView} from './searchView.js';
import {GlossaryItem} from './markdownFile.js';
import {onDOMEvent} from './utils.js';
import {scrollIntoView} from './third_party/scroll-into-view-if-needed.js';

const footerElement = html`
  <div class="footer-container">
    <div class="footer">
      <div>
        <ul>
          <li><a href="https://github.com/microsoft/playwright">GitHub</a></li>
          <li><a href="https://github.com/microsoft/playwright/releases/">Changelog</a></li>
          <li><a href="https://join.slack.com/t/playwright/shared_invite/enQtOTEyMTUxMzgxMjIwLThjMDUxZmIyNTRiMTJjNjIyMzdmZDA3MTQxZWUwZTFjZjQwNGYxZGM5MzRmNzZlMWI5ZWUyOTkzMjE5Njg1NDg">Slack</a></li>
          <li><a href="https://stackoverflow.com/tags/playwright">Stack Overflow</a></li>
        </ul>
      </div>
      <div>
        <img class="microsoft-logo" src="https://code.visualstudio.com/assets/images/microsoft-logo.png" height="20" alt="Microsoft logo">
      </div>
    </div>
  </div>
`;

window.addEventListener('DOMContentLoaded', async() => {
  const project = await GithubProject.create({
    owner: 'microsoft',
    name: 'Playwright',
  });

  const urlstate = new URLState();
  const defaultVersion = project.latestReleasedVersion();

  const searchView = new SearchView();
  const versionSelector = html`
    <select class=version-selector>${project.versions().map(version => html`
      <option selected=${version === defaultVersion} value="${version.version()}">${version.version()}</option>`)}
    </select>
  `;
  onDOMEvent(versionSelector, 'input', event => urlstate.goto({version: event.target.value}));

  const glasspaneElement = html`<glass-pane></glass-pane>`;
  onDOMEvent(glasspaneElement, 'click', e => {
    searchView.hideSuggestions();
  });
  onDOMEvent(glasspaneElement, 'touchstart', e => {
    e.preventDefault();
  });

  const hideSidebarButton = html`<my-button class="back-button-image" id="back-button"/>`;
  const documentationSidebar = html`
    <div class="vbox sidebar">
      <div class=sidebar-header>
        ${hideSidebarButton}
        <a class=home-navigation href="#">🎭 ${project.name()}</a>
        ${versionSelector}
      </div>
      <div class="vbox sidebar-body"></div>
    </div>`;
  onDOMEvent(hideSidebarButton, 'click', () => {
    document.body.classList.remove('show-mobile-sidebar');
  });
  
  const showSidebarButton = html`<my-button class="menu-button-image" id="menu-button"/>`;
  const documentationView = html`
    <div class="vbox view" tabindex=-1>
      <div class=view-header>
        ${showSidebarButton}
        ${searchView.element}
      </div>
      <div class="content">
        <div class="view-body"></div>
        <div class="view-body-toc"></div>
      </div>
    </div>`;
  onDOMEvent(showSidebarButton, 'click', () => {
    searchView.hideSuggestions();
    document.body.classList.add('show-mobile-sidebar');
  });

  document.body.append(html`
    <div class="hbox container">
      ${documentationSidebar}
      ${documentationView}
    </div>
    ${footerElement}
    ${glasspaneElement}
  `);

  // Setup search input x position on every resize.
  // This will be used to nicely align search suggestions box.
  const setSearchInputXCSSProperty = () => {
    const box = searchView.inputElement().getBoundingClientRect();
    document.documentElement.style.setProperty('--search-input-x', box.x + 'px');
  };
  setSearchInputXCSSProperty();
  onDOMEvent(window, 'resize', setSearchInputXCSSProperty);

  onDOMEvent(document, 'keydown', event => {
    // Hide sidebar in mobile view, if any.
    document.body.classList.remove('show-mobile-sidebar');
    // Autofocus search input when typing starts.
    if (searchView.inputElement() === document.activeElement)
      return;
    // Activate search on backspace.
    if (event.keyCode === 8 || event.keyCode === 46) {
      searchView.inputElement().focus();
    } else if (/^\S$/.test(event.key) && !event.metaKey && !event.ctrlKey && !event.altKey) {
      // Activate search on any keypress.
      searchView.inputElement().focus();
      if (event.key !== '.')
        searchView.inputElement().value = '';
    }
  });

  // Activate search input on paste.
  onDOMEvent(document, 'paste', event => {
    if (searchView.inputElement() !== document.activeElement)
      searchView.inputElement().focus();
  });

  urlstate.startListening(async ({version, path, q}, {signal}) => {
    const projectVersion = project.version(version) || defaultVersion;

    // Start loading.
    const [toShow, api, guidesFile, releaseNotes] = await Promise.race([
      Promise.all([
        path ? projectVersion.markdownFile(path) : projectVersion.markdownFile('./README.md'),
        projectVersion.markdownFile('./docs/api.md'),
        projectVersion.markdownFile('./docs/README.md'),
        projectVersion.releaseNotesFile(),
      ]),
      // A promise that will throw when a new navigation comes in.
      new Promise((res, rej) => onDOMEvent(signal, 'abort', () => rej(new Error('New operation scheduled in throttler! Aborting current one.')))),
    ]);

    // For non-default versions, ensure home link does not change selected version
    const homeLinkElement = document.querySelector('a.home-navigation')
    homeLinkElement.href = projectVersion === defaultVersion ? "#" : `#version=${projectVersion.version()}`;

    document.body.classList.remove('show-mobile-sidebar');

    versionSelector.querySelector(`[value="${projectVersion.version()}"]`).selected = true;
    searchView.setHomeURL(newURL({version: projectVersion.version()}));
    const searchableItems = [...api.glossaryItems()];
    if (guidesFile)
      searchableItems.push(...guidesFile.glossaryItems());
    searchView.setGlossary(searchableItems);

    const body = documentationSidebar.$('.sidebar-body');
    body.textContent = '';
    if (guidesFile)
      body.append(renderDocumentationSidebar(guidesFile));
    else
      body.append(renderAPIReferenceSidebar(api));

    // Custom code-path to show generated API reference.
    if (toShow === api && !q) {
      const body = documentationView.$('.view-body');
      body.textContent = '';
      body.append(renderAPIReference(api));
      body.scrollTop = 0;
      documentationView.focus();
      documentationView.$('.view-body-toc').textContent = '';
      return;
    }

    const glossaryItem = toShow.glossaryItem(q);

    if (glossaryItem.markdownFile() === api || (guidesFile && guidesFile.glossaryItems().some(item => item.url() === glossaryItem.url()))) {
      // Set input value and put cursor in the end.
      const value = glossaryItem.title();
      const input = searchView.inputElement();
      // Focus input so that we can control it's selection.
      input.focus();
      input.value = value;
      input.selectionStart = value.length;
      input.selectionEnd = value.length;
    } else {
      searchView.inputElement().value = '';
    }

    // Generate summary element with table-of-contents (right sidebar)
    if (glossaryItem) {
      const item = glossaryItem.parentItem() || glossaryItem;
      const summaryItems = item.childItems();
      const tocElement = html`<ul>${summaryItems.map(item => html`<li><a href="${item.url()}">${item.name()}</a></li>`)}</ul>`;
      documentationView.$('.view-body-toc').textContent = '';
      documentationView.$('.view-body-toc').append(tocElement);
    }

    document.title = removeAllEmoji(glossaryItem.title());

    // If we navigate inside shown article - do not re-add.
    const articleElement = glossaryItem.articleElement();
    if (!articleElement.isConnected) {
      const body = documentationView.$('.view-body');
      body.textContent = '';
      body.append(articleElement);
    }
    if (glossaryItem.scrollAnchor()) {
      scrollIntoView(glossaryItem.scrollAnchor(), {
        block: 'start',
        behavior: 'instant',
      });
      // compensate for fixed header.
      window.scrollBy(0, -60);
    } else {
      window.scrollTo({ top: 0 });
    }
    documentationView.focus();
    await glossaryItem.highlight();
  });
}, false);

function renderDocumentationSidebar(guidesFile) {
  const toplevelGuides = guidesFile.glossaryItems().filter(item => !item.parentItem());
  return html`
    ${toplevelGuides.map(item => renderGuideItems(item, true))}
  `;

  function renderGuideItems(guideItem, header) {
    const name = guideItem.name().split(' > ').pop();
    const className = header ? 'header' : '';
    // .url() for links to other docs pages, .githubLink() for external links
    const url = guideItem.url() || guideItem.githubLink()
    const headerElement = url ?
      html`<a class="${className}" href="${url}">${name}</a>` :
      html`<span class="header">${name}</span>`;
    if (!guideItem.childItems())
      return headerElement;
    return html`
      ${headerElement}
      ${guideItem.childItems().map(item => renderGuideItems(item, false))}
    `;
  }
}

function renderAPIReference(api) {
  const toplevel = api.glossaryItems().filter(item => !item.parentItem());
  const title = api.version() === 'master' ?
    `API reference @ master` :
    `API reference ${api.version()}`;
  return html`
    <markdown-content>
      <h1>${title}</h1>
      <ul>
        ${toplevel.map(renderItem)}
      </ul>
    </markdown-content>
  `;

  function renderItem(item) {
    if (!item.childItems() || (item.type() !== GlossaryItem.Type.Class && item.type() !== GlossaryItem.Type.Other))
      return html`<li><a href="${item.url()}">${item.name()}</a></li>`;
    return html`
      <li><a href="${item.url()}">${item.name()}</a>
        <ul>
          ${item.childItems().map(renderItem)}
        </ul>
      </li>
    `;
  }
}

function removeAllEmoji(text) {
  return text.replace(/[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug, '');

}

// Register service worker only for prod build.
if (window.__WEBSITE_VERSION__) {
  window.addEventListener('load', () => {
    if ('serviceWorker' in navigator)
      navigator.serviceWorker.register('./sw.js');
  });
}
