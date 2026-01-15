/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

//@ts-check

const toKebabCase = require('lodash/kebabCase')
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const md = require('./markdown');
const { parseApi } = require('./api_parser');
const docs = require('./documentation');
const { generateTabGroups, renderHTMLCard } = require('./format_utils');

/** @typedef {import('./documentation').Type} Type */
/** @typedef {import('./markdown').MarkdownNode} MarkdownNode */
/** @export @typedef {{ name: string, link: string, usages: string[], args: docs.Member[], signatures?: string[] }} FormattedMember */

const commonSnippets = new Set(['txt', 'html', 'xml', 'yml', 'yaml', 'json', 'groovy', 'html', 'bash', 'sh', 'ini', 'Dockerfile', 'css', 'markdown']);

/** @typedef {"header"|"link"|"usage"} FormatMode */

/**
 * @typedef {{
 *   formatMember: function(docs.Member): FormattedMember[],
 *   formatParamName?: function(string): string,
 *   formatOptionName?: function(string, docs.Member?): string,
 *   formatTemplate: function(string): string,
 *   formatFunction: function(string, string, docs.Type): string,
 *   formatPromise?: function(string): string,
 *   formatArrayType?: function(docs.Type, 'in'|'out', docs.Member): string?,
 *   formatUnionType?: function(docs.Type, 'in'|'out', docs.Member): string?,
 *   formatTypeName: function(docs.Type, 'in'|'out', docs.Member): string,
 *   preprocessComment?: function(MarkdownNode[]): MarkdownNode[],
 *   filterComment: function(MarkdownNode): boolean,
 *   rewriteClassTitle?: function(string): string,
 *   rewriteMarkdownContent?: function(string): string,
 *   shouldRenderMemberAsProperty?: function(docs.Member): boolean,
 *   propertyTypeTitle(): string,
 * }} GeneratorFormatter
 */

class Generator {
  heading2ExplicitId = new Map();

  /**
   * @param {{
   * lang: string,
   * version: string,
   * srcDir: string,
   * outDir: string,
   * formatter: GeneratorFormatter,
   * }} options
   */
  constructor({ lang, version, srcDir, outDir, formatter }) {
    this.lang = lang;
    this.version = version;
    this.outDir = outDir;
    this.srcDir = srcDir;
    /** @type {Set<string>} */
    this.generatedFiles = new Set();
    this.formatter = formatter;

    this.documentation = parseApi(path.join(srcDir, 'api'))
      .mergeWith(parseApi(path.join(srcDir, 'test-api'), path.join(srcDir, 'api', 'params.md')))
      .mergeWith(parseApi(path.join(srcDir, 'test-reporter-api')));
    this.documentation.filterForLanguage(lang, { csharpOptionOverloadsShortNotation: true });
    this.documentation.setLinkRenderer(item => {
      const { clazz, member, param, option, href } = item;
      if (clazz)
        return href ? `[${clazz.name}](${href})` : `[${clazz.name}]`;
      if (!member || !member.clazz)
        throw new Error(`docs link must have a top-level member`);
      if (param) {
        const text = formatter.formatParamName?.(param.alias) || param.alias;
        return this.createMemberLink(member, href, { text, name: param.name });
      }
      if (option) {
        const text = formatter.formatOptionName?.(option.alias, member) || option.alias;
        return this.createMemberLink(member, href, { text, name: option.name });
      }
      return this.createMemberLink(member, href);
    });

    this.generatedLinksSuffix = '';
    {
      const links = fs.readFileSync(path.join(__dirname, '..', 'common', 'links.md')).toString();
      const langLinks = fs.readFileSync(path.join(__dirname, '..', 'common', `links-${lang}.md`)).toString();
      const localLinks = [];
      for (const clazz of this.documentation.classesArray) {
        const generatedFileName = apiClassLink(clazz);
        localLinks.push(`[${clazz.name}]: ${generatedFileName} "${clazz.name}"`);
        this.generatedFiles.add(generatedFileName);
      }
      this.generatedLinksSuffix = '\n' + localLinks.join('\n') + '\n' + links + '\n' + langLinks;
    }

    /** @type {Map<string, string>} */
    const guides = new Map();
    for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
      if (entry.isDirectory() || entry.name.startsWith('links'))
        continue;
      const supportedLanguages = ['js', 'python', 'java', 'csharp'];
      if (supportedLanguages.some(l => entry.name.includes(`-${l}`))) {
        if (!entry.name.includes('-' + this.lang))
          continue;
      }

      const outName = entry.name.replace(new RegExp(`(${supportedLanguages.map(l => '-' + l).join('|')})`, 'g'), '');
      guides.set(entry.name, outName);
      this.generatedFiles.add(`./${outName}`);
    }

    for (const clazz of this.documentation.classesArray)
      this.generateClassDoc(clazz);

    for (const [name, outName] of guides)
      this.generateDoc(name, outName + 'x');
  }

  /**
   * @param {docs.Class} clazz
   */
  generateClassDoc(clazz) {
    /** @type {MarkdownNode[]} */
    const result = [];
    result.push({
      type: 'text',
      text: `---
id: class-${clazz.name.toLowerCase()}
title: "${this.formatter.rewriteClassTitle?.(clazz.name) || clazz.name}"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import HTMLCard from '@site/src/components/HTMLCard';
`});
    if (clazz.deprecated) {
      result.push({
        type: 'text',
        text: `:::warning[Deprecated]
${this.documentation.renderLinksInText(clazz.deprecated)}
:::
`      });
    }
    result.push(...this.formatComment(clazz.spec));
    result.push({
      type: 'text',
      text: ''
    });
    clazz.membersArray.sort((m1, m2) => {
      let { key: k1 } = this.memberSection(m1);
      let { key: k2 } = this.memberSection(m2);
      k1 += toSnakeCase(m1.alias.replace(/\$\$eval/, '$$eval2'));
      k2 += toSnakeCase(m2.alias.replace(/\$\$eval/, '$$eval2'));
      return k1.localeCompare(k2);
    });
    this.visitClassToc(clazz);
    if (clazz.extends && !['EventEmitter', 'Error', 'RuntimeException', 'Exception'].includes(clazz.extends)) {
      const superClass = this.documentation.classes.get(clazz.extends);
      this.visitClassToc(superClass);
    }
    result.push(...this.formatClassMembers(clazz));
    fs.mkdirSync(path.join(this.outDir, 'api'), { recursive: true });
    const output = [md.render(result, { flattenText: true, renderCodeBlockTitlesInHeader: true }), this.generatedLinksSuffix].join('\n');
    writeFileSyncCached(path.join(this.outDir, 'api', `class-${clazz.name.toLowerCase()}.mdx`), this.mdxLinks(output));
  }

  _formatSince(since) {
    if (since === 'v1.8')
      return 'Added before v1.9';
    return `Added in: ${since}`;
  }

  /**
   * @param {docs.Class} clazz
   * @return {MarkdownNode[]}
   */
  formatClassMembers(clazz) {
    /** @type {MarkdownNode[]} */
    const result = [];
    let memberSectionTitle = '';

    const memberNames = new Set();
    const membersWithOverloads = new Set();
    for (const member of clazz.membersArray) {
      for (const { name } of this.formatter.formatMember(member)) {
        if (memberNames.has(name))
          membersWithOverloads.add(name);
        memberNames.add(name);
      }
    }

    for (const member of clazz.membersArray) {
      // Iterate members
      for (const { name: memberName, usages, args, signatures } of this.formatter.formatMember(member)) {
        let name = memberName;
        // Use test. prefix for test.* members for readability.
        if (membersWithOverloads.has(name) && signatures) {
          // Pick first non-empty signature if any that way following will stand:
          // - toMatchAriaSnapshot(expected) signatures=['expected', 'expected, options']
          // - toMatchAriaSnapshot(options)  signatures=['options']
          const signature = signatures.find(s => !!s.trim()) || '';
          name = `${name}(${signature})`;
        }
        if (clazz.varName === 'test')
          name = `test.${name}`;

        result.push({
          type: 'text',
          text: '---'
        });

        const section = this.memberSection(member);
        if (section.title !== memberSectionTitle) {
          memberSectionTitle = section.title;
          result.push({
            type: 'h2',
            text: section.title,
            children: [],
          });
        }

        /** @type {MarkdownNode} */
        const memberNode = { type: 'h3', children: [], text: '' };
        if (!this.heading2ExplicitId.has(member))
          throw new Error(`Header ${name} needs to have an explicit ID`)
        memberNode.text = `${name} {#${this.heading2ExplicitId.get(member)}}`;

        const sections = {
          /** @type {MarkdownNode[]} */
          version: [],
          /** @type {MarkdownNode[]} */
          deprecation: [],
          /** @type {MarkdownNode[]} */
          description: [],
          /** @type {MarkdownNode[]} */
          details: [],
          /** @type {MarkdownNode[]} */
          usage: [],
          /** @type {MarkdownNode[]} */
          arguments: [],
          /** @type {MarkdownNode[]} */
          return: [],
        };
        let currentSection = sections.description;
        for (const node of member.spec) {
          if (node.text === '**Details**')
            currentSection = sections.details;
          else if (node.text === '**Usage**')
            currentSection = sections.usage;
          currentSection.push(node);
        }


        // Generate version.
        const expressionNameForSearch = `<x-search>${clazz.varName}.${name}</x-search>`;
        sections.version.push({
          type: 'text',
          text: `<font size="2" style={{position: "relative", top: "-20px"}}>${this._formatSince(member.since)}</font>${expressionNameForSearch}`
        });

        // Generate deprecations.
        if (member.deprecated) {
          sections.deprecation.push({
            type: 'text',
            text: `:::warning Deprecated

${this.documentation.renderLinksInText(member.deprecated)}

:::
`
          });
        }

        if (member.discouraged) {
          sections.deprecation.push({
            type: 'text',
            text: `:::warning[Discouraged]

${this.documentation.renderLinksInText(member.discouraged)}

:::
`
          });
        }

        // Generate usage.
        if (!sections.usage.length) {
          sections.usage.push({
            type: 'text',
            text: `**Usage**`,
          });
          sections.usage.push({
            type: 'code',
            codeLang: this.lang,
            lines: usages,
          });
        }

        // Generate arguments.
        if (args.length) {
          sections.arguments.push({
            type: 'text',
            text: `**Arguments**`,
          });

          sections.arguments.push(...args.map(a => {
            const name = this.formatter.formatParamName?.(a.alias) || a.alias;
            try {
              return this.renderProperty(name, a, a.spec, 'in', false, !a.required);
            } catch (e) {
              throw new Error(`While rendering ${member.clazz.name}.${member.name}, property\n-------\n${md.render(a.spec)}\n------\n ` + e.message);
            }
          }));
        }

        // Generate return type, unless it's "void".
        if (member.type && !(member.type.name === 'void' && !member.async)) {
          let name;
          switch (member.kind) {
            case 'event': name = 'Event data'; break;
            case 'property': name = this.formatter.propertyTypeTitle(); break;
            case 'method': name = 'Returns'; break;
          }

          sections.return.push({
            type: 'text',
            text: '**' + name + '**',
          });

          try {
            sections.return.push(this.renderProperty('', member, undefined, 'out', member.async, false));
          } catch (e) {
            throw new Error(`While rendering ${member.clazz.name}.${member.name}, property\n-------\n${md.render(member.spec)}\n------\n ` + e.message);
          }
        }

        memberNode.children.push(...this.formatComment(sections.version));
        memberNode.children.push(...this.formatComment(sections.deprecation));
        memberNode.children.push(...this.formatComment(sections.description));
        memberNode.children.push(...this.formatComment(sections.usage));
        memberNode.children.push(...this.formatComment(sections.arguments));
        memberNode.children.push(...this.formatComment(sections.return));
        memberNode.children.push(...this.formatComment(sections.details));

        result.push(memberNode);
      }
    }
    return result;
  }

  /**
   * @param {docs.Member} member
   */
  memberSection(member) {
    if (member.deprecated || member.discouraged)
      return { key: 'd', title: 'Deprecated' };
    if (member.kind === 'event')
      return { key: 'c', title: 'Events' };
    if (member.kind === 'property' || this.formatter.shouldRenderMemberAsProperty?.(member))
      return { key: 'b', title: 'Properties' };
    if (member.kind === 'method')
      return { key: 'a', title: 'Methods' };
    throw new Error(`Unsupported member kind ${member.kind} for ${member.name}`);
  }

  /**
   * @param {string} text
   */
  mdxLinks(text) {
    for (const name of this.generatedFiles)
      text = text.replace(new RegExp(`(${path.basename(name)})([^x])`, 'g'), "$1x$2");
    return this.formatter.rewriteMarkdownContent?.(text) ?? text;
  }

  /**
   * @param {MarkdownNode[]} spec
   * @return {MarkdownNode[]}
   */
  formatComment(spec) {
    spec = this.formatter.preprocessComment?.(spec) || spec;
    spec = generateTabGroups(spec, this.lang);
    spec = renderHTMLCard(spec);

    spec = spec.filter(c => {
      const fullCodeLang = c.codeLang;
      const parsed = fullCodeLang ? docs.parseCodeLang(fullCodeLang) : null;
      if (parsed)
        c.codeLang = parsed.highlighter;
      // if it's marked as generic, its always included
      if (fullCodeLang?.includes('generic'))
        return true;
      // No lang or common lang - Ok.
      if (!fullCodeLang || commonSnippets.has(fullCodeLang))
        return true;

      // Our lang - Ok.
      if (this.formatter.filterComment(c) || this.lang === docs.parseCodeLang(fullCodeLang).language)
        return true;

      // '* browser' - always Ok
      // 'sh python' - Ok for Python.
      const tokens = fullCodeLang.split(' ');
      if (tokens[1] === 'browser' || tokens[1] === this.lang)
        return true;

      // python * - Ok for Python
      if (tokens[0] === this.lang)
        return true;
      return false;
    });
    return spec;
  }

  /**
   * @param {string} name
   * @param {string} outName
   */
  generateDoc(name, outName) {
    const content = fs.readFileSync(path.join(this.srcDir, name)).toString();
    let nodes = this.filterForLanguage(md.parse(this.rewriteImageLinks(content)));
    return this.generateDocFromMd(nodes, outName);
  }

  /**
   * @param {string} content
   */
  rewriteImageLinks(content) {
    return content.replaceAll(/!\[(.*)\]\((\.\/images\/.*)\)/g, (match, alt, link) => {
      return `![${alt}](${path.join('..', link)})`;
    });
  }

  generateDocFromMd(nodes, outName) {
    this.documentation.renderLinksInNodes(nodes);
    nodes = this.formatComment(nodes);
    md.visitAll(nodes, node => {
      if (node.children)
        node.children = this.formatComment(node.children);
    });
    fs.mkdirSync(this.outDir, { recursive: true });
    let output = [md.render(nodes, { flattenText: true, renderCodeBlockTitlesInHeader: true }), this.generatedLinksSuffix].join('\n');
    output = output.replace(/("|\d)\n---/, `$1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import HTMLCard from '@site/src/components/HTMLCard';`);
  writeFileSyncCached(path.join(this.outDir, outName), this.rewriteVersion(this.mdxLinks(output)));
  }

  /**
   * @param {string} content
   * @returns {string}
   */
  rewriteVersion(content) {
    return content.replace(/%%VERSION%%/g, this.version);
  }

  /**
   * @param {MarkdownNode[]} nodes
   * @return {MarkdownNode[]}
   */
  filterForLanguage(nodes) {
    const result = nodes.filter(node => {
      if (!node.children)
        return true;
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        if (child.type !== 'li' || child.liType !== 'bullet' || !child.text.startsWith('langs:'))
          continue;
        const only = child.text.substring('langs:'.length).split(',').map(l => l.trim());
        node.children.splice(i, 1);
        return only.includes(this.lang);
      }
      return true;
    });
    result.forEach(n => {
      if (!n.children)
        return;
      n.children = this.filterForLanguage(n.children);
    });
    return result;
  }

  /**
   * @param {string} file
   * @param {string} text
   * @param {string} hash
   * @param {string | undefined} href
   */
  createLink(file, text, hash, href) {
    if (href)
      return `[${text}](${href})`;
    return `[${text}](${file}#${hash})`;
  }

  /**
   * @param {docs.Member} member
   * @param {string=} href
   * @param {{name: string, text: string}=} paramOrOption
   * @return {string}
   */
  createMemberLink(member, href, paramOrOption) {
    const file = apiClassLink(member.clazz);
    let hash = calculateHeadingHash(member);
    this.heading2ExplicitId.set(member, hash);
    if (paramOrOption) {
      hash += '-option-' + toKebabCase(paramOrOption.name).toLowerCase();
      return this.createLink(file, paramOrOption.text, hash, href);
    }
    const formatted = this.formatter.formatMember(member)[0];
    return this.createLink(file, formatted.link, hash, href);
  }

  /**
   * @param {docs.Class} clazz
   */
  visitClassToc(clazz) {
    for (const member of clazz.membersArray)
      this.createMemberLink(member);
  }

  /**
   * @param {string} name
   * @param {docs.Member} member
   * @param {MarkdownNode[]} spec
   * @param {'in'|'out'} direction
   * @param {boolean} async
   * @param {boolean} optional
   */
  renderProperty(name, member, spec, direction, async, optional) {
    const type = member.type;
    const properties = type.deepProperties();
    /** @type {MarkdownNode[]} */
    let children = [];
    // Generate deprecations.
    if (member.deprecated && direction === 'in') {
      children.push({
        type: 'text',
        text: `:::warning[Deprecated]
${this.documentation.renderLinksInText(member.deprecated)}
:::
`
      });
    }

    if (member.discouraged && direction === 'in') {
      children.push({
        type: 'text',
        text: `:::warning[Discouraged]
${this.documentation.renderLinksInText(member.discouraged)}
:::
`
      });
    }
    if (properties && properties.length) {
      children.push(...properties.map(p => {
        let alias = p.alias;
        if (member.kind === 'property' && direction === 'in')
          alias = this.formatter.formatOptionName?.(alias, p) || alias;
        return this.renderProperty(alias, p, p.spec, direction, false, !p.required);
      }));
    }
    if (spec)
      children.push(...spec.map(s => md.clone(s)));

    let typeText = this.renderType(type, direction, member);
    if (async)
      typeText = this.formatter.formatPromise?.(typeText) || typeText;

    // Escape < and > to not confuse MDX:
    // https://docusaurus.io/docs/migration/v3#bad-usage-of--1
    typeText = typeText.replaceAll('<', '&lt;').replaceAll('>', '&gt;');

    const optionalText = optional ? ' *(optional)*' : '';
    let linkTag = '';
    let linkAnchor = '';
    let sinceVersion = '';

    if (member.enclosingMethod && member.name !== 'options' && (!member.parent || member.parent.name === 'options')) {
      const hash = calculatePropertyHash(member, direction);
      linkTag = `<a aria-hidden="true" tabIndex="-1" class="list-anchor-link" id="${hash}"/>`;
      if (member.enclosingMethod.since !== member.since)
        sinceVersion = ` <font size="2">${this._formatSince(member.since)}</font>`;
      linkAnchor = `<a href="#${hash}" class="list-anchor">#</a>`;
    }

    /** @type {MarkdownNode} */
    const result = {
      type: 'li',
      liType: 'default',
      text: `${name ? '`' + name + '` ' : ''}${typeText}${optionalText}${sinceVersion}${linkTag}${linkAnchor}`,
      children
    };
    return result;
  }


  /**
   * @param {docs.Type} type
   * @param {'in'|'out'} direction
   * @param {docs.Member} member
   */
  renderType(type, direction, member) {
    if (type.union)
      return this.formatter.formatUnionType?.(type, direction, member) || type.union.map(l => this.renderType(l, direction, member)).join(' | ');
    const result = this.formatter.formatArrayType?.(type, direction, member);
    if (result)
      return result;
    if (type.templates)
      return `${this.formatter.formatTypeName(type, direction, member)}${this.formatter.formatTemplate(type.templates.map(l => {
        return this.renderType(l, direction, /** @type {docs.Member} */({ ...member, required: true }));
      }).join(', '))}`;
    if (type.args)
      return `${this.formatter.formatFunction(type.args.map(l => this.renderType(l, direction, member)).join(', '), type.returnType ? ':' + this.renderType(type.returnType, direction, member) : '', type)}`;
    if (type.name.startsWith('"'))
      return type.name;
    return `${this.formatter.formatTypeName(type, direction, member)}`;
  }
}

/**
 * @param {string} name
 */
function toSnakeCase(name) {
  const toSnakeCaseRegex = /((?<=[a-z0-9])[A-Z]|(?!^)[A-Z](?=[a-z]))/g;
  return name.replace(toSnakeCaseRegex, `_$1`).toLowerCase();
}

/**
 * @param {docs.Member[]} args
 * @return {string[]}
 */
 function renderJSSignatures(args) {
  const tokens = [];
  const optionalTokens = [];
  for (const arg of args) {
    const name = arg.alias;
    if (!arg.required)
      optionalTokens.push(name);
    else
      tokens.push(name);
  }
  const result = [tokens.join(', ')];
  if (optionalTokens.length)
    result.push([...tokens, ...optionalTokens].join(', '));
  return result;
}

/**
 * @param {string} name
 * @param {{omitAsync: boolean}=} options
 */
function toTitleCase(name, options) {
  let result = name.split('|').map(one => one[0].toUpperCase() + one.substring(1)).join('|');
  if (options && options.omitAsync && result.endsWith('Async'))
    result = result.slice(0, result.length - 'Async'.length);
  return result;
}


/**
 * @param {docs.Class} clazz
 * @returns {string}
 */
function apiClassLink(clazz) {
  return `/api/class-${clazz.name.toLowerCase()}.md`;
}

/**
 * @param {docs.Member} member
 * @returns {String}
 */
function calculateHeadingHash(member) {
  const className = toKebabCase(member.clazz.name);
  const memberName = toKebabCase(member.name);
  if (member.kind === 'property' || member.kind === 'method')
    return `${className}-${memberName}`.toLowerCase();
  else if (member.kind === 'event')
    return `${className}-event-${memberName}`.toLowerCase();
}

/**
 * @param {docs.Member} member
 * @param {'in'|'out'} direction
 * @returns {String}
 */
function calculatePropertyHash(member, direction) {
  const className = toKebabCase(member.enclosingMethod.clazz.name);
  const memberName = toKebabCase(member.enclosingMethod.name);
  const prefix = `${className}-${memberName}`;
  if (direction === 'out')
    return `${prefix}-return`;
  const propertyName = toKebabCase(member.name);
  return `${prefix}-option-${propertyName}`.toLowerCase();
}

const fileWriteCache = new Map();

/**
 * @param {string} file
 * @param {string} content
 * @returns {undefined}
 */
function writeFileSyncCached(file, content) {
  const contentHash = crypto.createHash('sha256').update(content).digest('hex');
  if (fileWriteCache.has(file) && fileWriteCache.get(file) === contentHash)
    return;
  fileWriteCache.set(file, contentHash);
  fs.writeFileSync(file, content);
}

/**
 * @param {docs.Class} clazz
 */
function assertionArgument(clazz) {
  switch (clazz.name.toLowerCase()) {
    case 'locatorassertions': return 'locator';
    case 'pageassertions': return 'page';
    case 'genericassertions': return 'value';
    case 'snapshotassertions': return 'value';
    case 'apiresponseassertions': return 'response';
  }
  throw new Error('Unexpected assertion class ' + clazz.name);
}

module.exports = { Generator, toTitleCase, toSnakeCase, renderJSSignatures, assertionArgument };
