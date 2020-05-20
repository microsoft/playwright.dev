// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {html} from './zhtml.js';
import {CriticalSection} from './utils.js';
import {newURL} from './urlstate.js';
import {MarkdownFile} from './markdownFile.js';
import {GithubFetcher} from './fetcher.js';
import {} from './third_party/markdown-it.10.0.0.min.js';
import {} from './third_party/markdown-it-emoji.js';
import {} from './third_party/runmode-standalone.js';
import {} from './third_party/javascript.js';

const TIME_10_MINUTES = 10 * 60 * 1000;
const TIME_100_YEARS = 100 * 365 * 24 * 60 * 60 * 1000;

const GITHUB_URLS = {
  rawReleasesURL: (repoName) => `https://api.github.com/repos/${repoName}/releases`,
  rawContentURL: (repoName, version, relativePath) => `https://raw.githubusercontent.com/${repoName}/${version}/${relativePath}`,
  releaseURL: (repoName, version) => `https://github.com/${repoName}/releases/tag/${version}`,
  contentURL: (repoName, version, relativePath) => `https://github.com/${repoName}/blob/${version}/${relativePath}`,
  versionURL: (repoName, version) => `https://github.com/${repoName}/blob/${version}/`,
};

export class GithubProject {
  static async create({owner, name}) {
    const github = await GithubFetcher.create();
    const project = new GithubProject(github, owner, name);
    await project._initialize();
    return project;
  }

  constructor(githubFetcher, owner, name) {
    this._github = githubFetcher;
    this._owner = owner;
    this._name = name;
    this._versions = [];

    this._readmeElement = null;
  }

  owner() {
    return this._owner;
  }

  name() {
    return this._name;
  }

  repositoryName() {
    return (this._owner + '/' + this._name).toLowerCase();
  }

  async _initialize(sections) {
    const releasesText = await this._github.get(GITHUB_URLS.rawReleasesURL(this.repositoryName()), TIME_10_MINUTES);
    this._versions = JSON.parse(releasesText).map(release => new GithubProjectVersion({
      project: this,
      version: release.tag_name,
      isRelease: true,
      releaseNotes: release.body,
      releaseTimestamp: (new Date(release.published_at)).getTime(),
    }));
    this._versions.push(new GithubProjectVersion({
      project: this,
      version: 'master',
      isRelease: false,
    }));

    const computePriority = (version) => {
      if (!version.isRelease())
        return Infinity;
      return versionToNumber(version.version());
    };

    this._versions.sort((a, b) => computePriority(b) - computePriority(a));
  }

  versions() {
    return this._versions.slice();
  }

  latestReleasedVersion() {
    return this._versions.filter(version => version.isRelease())[0];
  }

  version(theVersion) {
    return this._versions.find(version => version.version() === theVersion);
  }
}

class GithubProjectVersion {
  constructor(options) {
    const {
      project,
      version,
      isRelease = false,
      releaseNotes = '',
      releaseTimestamp = Date.now(),
    } = options;
    this._project = project;
    this._github = project._github;
    this._version = version;
    this._isRelease = isRelease;
    this._releaseNotes = releaseNotes;
    this._timestamp = releaseTimestamp;

    this._maxAge = isRelease ? TIME_100_YEARS : TIME_10_MINUTES;

    this._critical = new CriticalSection();
    this._pathToMarkdownFile = new Map();
  }

  _resolveMarkdownLinks(absoluteURLBase, relativeURLBase, element) {
    // Translate all links to local links.
    for (const a of element.querySelectorAll('a')) {
      const href = a.getAttribute('href') || '';
      if (!href)
        continue;
      const resolvedHref = href.startsWith('/') ? new URL('.' + href, absoluteURLBase).href : new URL(href, relativeURLBase).href;
      const match = resolvedHref.match(new RegExp(`https://github.com/${this._project.repositoryName()}/blob/([^/]+)/([^#]+)(.*)$`));
      // If link points to our repository.
      if (match) {
        const version = match[1];
        const filePath = match[2];
        const q = match[3];
        // If this is a markdown file - show it inline.
        if (filePath.toUpperCase().endsWith('.MD'))
          a.href = newURL({version, path: filePath, q: q && q.startsWith('#') ? q.substring(1) : q});
        else
          a.href = resolvedHref;
      } else {
        a.href = resolvedHref;
      }

      // Mark link as external if necessary
      const isImgLink = a.children.length === 1 && a.children[0].tagName === 'IMG';
      if (a.hostname !== location.hostname && a.hostname.length && !isImgLink) {
        const icon = html`<external-link-icon/>`;
        if (a.children.length === 1 && a.children[0].tagName === 'CODE')
          a.children[0].appendChild(icon);
        else
          a.appendChild(icon);
      }
    }
  }

  project() {
    return this._project;
  }

  version() {
    return this._version;
  }

  isRelease() {
    return this._isRelease;
  }

  timestamp() {
    return this._timestamp;
  }

  async markdownFile(path) {
    // Normalize path
    if (path.startsWith('./'))
      path = path.substring(2);

    let type = MarkdownFile.Type.SIMPLE_MARKDOWN;
    if (path === 'docs/api.md')
      type = MarkdownFile.Type.PLAYWRIGHT_API;
    else if (path === 'docs/README.md')
      type = MarkdownFile.Type.DOCUMENTATION_LIST;
    return await this._critical.run(path, async () => {
      let markdownFile = this._pathToMarkdownFile.get(path);
      if (markdownFile)
        return markdownFile;
      const markdown = await this._github.get(GITHUB_URLS.rawContentURL(this._project.repositoryName(), this._version, path), this._maxAge);
      // File might not exist in this version.
      if (!markdown)
        return null;
      const doc = markdownToHTML(this._project.repositoryName(), markdown);
      const url = GITHUB_URLS.contentURL(this._project.repositoryName(), this._version, path);
      this._resolveMarkdownLinks(GITHUB_URLS.versionURL(this._project.repositoryName(), this._version), url, doc);
      if (type === MarkdownFile.Type.PLAYWRIGHT_API) {
        markdownFile = MarkdownFile.parsePlaywrightAPI({
          version: this._version,
          path,
          doc,
        });
      } else if (type === MarkdownFile.Type.DOCUMENTATION_LIST) {
        markdownFile = MarkdownFile.parseDocumentationList({
          version: this._version,
          path,
          doc,
        });
      } else {
        markdownFile = MarkdownFile.parseSimpleMarkdown({
          version: this._version,
          path,
          doc,
        });
      }
      this._pathToMarkdownFile.set(path, markdownFile);
      return markdownFile;
    });
  }

  releaseNotesFile() {
    if (!this._releaseNotesFile && this._releaseNotes) {
      const doc = markdownToHTML(this._project.repositoryName(), this._releaseNotes);
      this._resolveMarkdownLinks(
          GITHUB_URLS.versionURL(this._project.repositoryName(), this._version),
          GITHUB_URLS.releaseURL(this._project.repositoryName(), this._version),
          doc);
      this._releaseNotesFile = MarkdownFile.parseSimpleMarkdown({
        name: 'Release Notes',
        version: this._version,
        section: 'release-notes',
        doc,
      });
    }
    return this._releaseNotesFile;
  }
}

function markdownToHTML(context, markdown) {
  const element = html`<markdown-content></markdown-content>`;
  element.innerHTML = window.markdownit({
    html: true,
    linkify: true,
    breaks: false,
    html_inline: true,
    escape: false
  }).use(window.markdownitEmoji).render(markdown);
  // Linkify commit SHAs
  linkify(element, /\b([0123456789abcdef]{7,})\b/g, match => html`
    <a href='https://github.com/${context}/commit/${match[1]}'><tt>${match[1]}</tt></a>
  `);
  // Linkify issue numbers
  linkify(element, /#(\d+)\b/gm, match => html`
    <a href='https://github.com/${context}/issues/${match[1]}'>#${match[1]}</a>
  `);
  // Syntax-highlight code blocks.
  for (const code of element.querySelectorAll('code.language-js'))
    CodeMirror.runMode(code.textContent, 'text/javascript', code);
  return element;
}

function linkify(element, regex, linkCallback) {
  let walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {acceptNode: node => {
    if (node.parentElement.tagName === 'A')
      return false;
    regex.lastIndex = 0;
    return regex.test(node.textContent);
  }});
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  for (const node of nodes) {
    const fragment = document.createDocumentFragment();
    const text = node.textContent;
    regex.lastIndex = 0;
    let lastIndex = 0;
    let match = null;
    while (match = regex.exec(text)) {
      fragment.append(document.createTextNode(text.substring(lastIndex, match.index)));
      fragment.append(linkCallback(match));
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length)
      fragment.append(document.createTextNode(text.substring(lastIndex)));
    node.parentElement.replaceChild(fragment, node);
  }
}

function versionToNumber(version) {
  if (version.startsWith('v'))
    version = version.substring(1);
  const [major, minor, patch] = version.split('.').map(e => parseInt(e, 10));
  return major * 100 * 100 + minor * 100 + patch;
}

