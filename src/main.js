// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {html} from './zhtml.js';
import {newURL, URLState} from './urlstate.js';
import {GithubProject} from './project.js';
import {SearchView} from './searchView.js';
import {onDOMEvent} from './utils.js';
import {scrollIntoView} from './third_party/scroll-into-view-if-needed.js';

window.addEventListener('DOMContentLoaded', async() => {
  const project = await GithubProject.create({
    owner: 'microsoft',
    name: 'Playwright',
    sections: {
      'readme': {
        relativePath: 'README.md',
        parser: 'markdown',
        searchableHeaders: 'h1, h2, h3, h4',
      },
      'showcase': {
        relativePath: 'docs/showcase.md',
        parser: 'markdown',
        searchableHeaders: 'h1',
      },
      'ci': {
        relativePath: 'docs/ci.md',
        parser: 'markdown',
        searchableHeaders: 'h1,h2',
      },
      'selector-engines': {
        relativePath: 'docs/selectors.md',
        parser: 'markdown',
        searchableHeaders: 'h1',
      },
      'troubleshooting': {
        relativePath: 'docs/troubleshooting.md',
        parser: 'markdown',
        searchableHeaders: 'h1,h3',
      },
      'api': {
        relativePath: 'docs/api.md',
        parser: 'playwright-api'
      },
    },
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

  const documentationHeader = html`
    <documentation-header>
      <a class=home-navigation href="#">🎭 ${project.name()}</a> ${versionSelector} Search:
      ${searchView.element}
    </documentation-header>
  `;
  const documentationSidebar = html`<documentation-sidebar></documentation-sidebar>`;
  const documentationView = html`<documentation-view tabindex=-1></documentation-view>`;

  document.body.append(html`
    ${documentationHeader}
    ${documentationSidebar}
    ${documentationView}
  `);

  // Setup search input x position on every resize.
  // This will be used to nicely align search suggestions box.
  const setSearchInputXCSSProperty = () => {
    const box = searchView.inputElement().getBoundingClientRect();
    document.documentElement.style.setProperty('--search-input-x', box.x + 'px');
  };
  setSearchInputXCSSProperty();
  onDOMEvent(window, 'resize', setSearchInputXCSSProperty);

  // Autofocus search input when typing starts.
  onDOMEvent(document, 'keydown', event => {
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

  urlstate.startListening(async ({version, section, q}, {signal}) => {
    const projectVersion = project.version(version) || defaultVersion;

    // Start loading.
    const files = await Promise.race([
      projectVersion.markdownFiles(),
      // A promise that will throw when a new navigation comes in.
      new Promise((res, rej) => onDOMEvent(signal, 'abort', () => rej(new Error('New operation scheduled in throttler! Aborting current one.')))),
    ]);

    versionSelector.querySelector(`[value="${projectVersion.version()}"]`).selected = true;
    searchView.setHomeURL(newURL({version: projectVersion.version()}));
    // Do not search inside release notes titles.
    searchView.setGlossary(files.filter(file => file.section() !== 'release-notes').map(file => file.glossaryItems()).flat());

    const toplevelGlossaryItems = files.filter(file => file.section() !== 'readme').map(file => {
      if (file.section() === 'api')
        return file.glossaryItems().filter(item => !item.parentItem());
      return file.glossaryItem();
    }).flat();
    documentationSidebar.textContent = '';
    documentationSidebar.append(html`
      <ul>
        ${toplevelGlossaryItems.map(item => html`
          <li><a href="${item.url()}">${item.name()}</a></li>
        `)}
      </ul>
    `);

    const toShow = files.find(file => file.section() === (section || 'readme'));
    const glossaryItem = toShow.glossaryItem(q);

    if (glossaryItem.searchable()) {
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
    document.title = glossaryItem.title();

    // If we navigate inside shown article - do not re-add.
    const articleElement = glossaryItem.articleElement();
    if (!articleElement.isConnected) {
      documentationView.textContent = '';
      documentationView.append(html`
        <section>
          <h3 class=documentation-name>
            <svg viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
              <path fill-rule="evenodd" d="M3 5h4v1H3V5zm0 3h4V7H3v1zm0 2h4V9H3v1zm11-5h-4v1h4V5zm0 2h-4v1h4V7zm0 2h-4v1h4V9zm2-6v9c0 .55-.45 1-1 1H9.5l-1 1-1-1H2c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h5.5l1 1 1-1H15c.55 0 1 .45 1 1zm-8 .5L7.5 3H2v9h6V3.5zm7-.5H9.5l-.5.5V12h6V3z"></path>
            </svg>
            ${glossaryItem.markdownFile().section()}
          </h3>
          <documentation-body>
            ${articleElement}
          </documentation-body>
        </section>
      `);
    }
    if (glossaryItem.scrollAnchor()) {
      scrollIntoView(glossaryItem.scrollAnchor(), {
        block: 'start',
        behavior: 'instant',
        scrollMode: 'if-needed',
      });
    } else {
      documentationView.scrollTop = 0;
    }
    documentationView.focus();
    await glossaryItem.highlight();
  });
}, false);

// Register service worker only for prod build.
if (window.__WEBSITE_VERSION__) {
  window.addEventListener('load', () => {
    if ('serviceWorker' in navigator)
      navigator.serviceWorker.register('./sw.js');
  });
}
