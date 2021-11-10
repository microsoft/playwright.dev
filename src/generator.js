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
const path = require('path');
const md = require('./markdown');
const { parseApi } = require('./api_parser');
const Documentation = require('./documentation');

/** @typedef {import('./documentation').Type} Type */
/** @typedef {import('./markdown').MarkdownNode} MarkdownNode */

if (!process.env.SRC_DIR)
  throw new Error(`'SRC_DIR' environment variable needs to be set`);

const DIR_SRC = path.join(process.env.SRC_DIR, 'docs', 'src');
const commonSnippets = new Set(['html', 'xml', 'yml', 'yaml', 'json', 'groovy', 'html', 'bash']);

// -------- HACKS BEGIN --------
/**
 * @param {string} className
 * @param {string} lang
 * @returns {string|undefined}
 */
function rewriteClassTitle(className, lang) {
  if (className === 'Test')
    return 'Playwright Test';
  if (lang === 'js' && className === 'Playwright')
    return 'Playwright Library';
}

/**
 * @param {string} text
 * @returns {string}
 */
function rewriteContent(text) {
  return text.replace(/\.\(call\)/g, '');
}
// -------- HACKS END --------

/**
 * @typedef {{
 *   formatMember: function(Documentation.Member): { text: string, args: Documentation.Member[] }[],
 *   formatArgumentName: function(string): string,
 *   formatTemplate: function(string): string,
 *   formatFunction: function(string, string, Documentation.Type): string,
 *   formatPromise: function(string): string,
 *   formatArrayType?: function(Documentation.Type, string, Documentation.Member): string?,
 *   preprocessComment: function(MarkdownNode[]): MarkdownNode[]
 *   renderType: function(Documentation.Type, string, Documentation.Member): string,
 * }} GeneratorFormatter
 */

class Generator {
  heading2ExplicitId = new Map();

  /**
   * @param {string} lang
   * @param {string} outDir
   * @param {GeneratorFormatter} formatter
   */
  constructor(lang, outDir, formatter) {
    this.lang = lang;
    this.outDir = outDir;
    /** @type {Set<string>} */
    this.generatedFiles = new Set();
    this.formatter = formatter;
    this.documentation = parseApi(path.join(DIR_SRC, 'api'))
      .mergeWith(parseApi(path.join(DIR_SRC, 'test-api'), path.join(DIR_SRC, 'api', 'params.md')))
      .mergeWith(parseApi(path.join(DIR_SRC, 'test-reporter-api')));
    this.documentation.filterForLanguage(lang);
    this.documentation.setLinkRenderer(item => {
      const { clazz, member, param, option } = item;
      if (param)
        return `\`${formatter.formatArgumentName(param)}\``;
      if (option)
        return `\`${formatter.formatArgumentName(option)}\``;
      if (clazz)
        return `[${clazz.name}]`;
      return this.createMemberLink(member)[0];
    });

    this.generatedLinksSuffix = '';
    {
      const links = fs.readFileSync(path.join(__dirname, '..', 'common', 'links.md')).toString();
      const langLinks = fs.readFileSync(path.join(__dirname, '..', 'common', `links-${lang}.md`)).toString();
      const localLinks = [];
      for (const clazz of this.documentation.classesArray) {
        const generatedFileName = `./api/class-${clazz.name.toLowerCase()}.md`;
        localLinks.push(`[${clazz.name}]: ${generatedFileName} "${clazz.name}"`);
        this.generatedFiles.add(generatedFileName);
      }
      this.generatedLinksSuffix = '\n' + localLinks.join('\n') + '\n' + links + '\n' + langLinks;
    }

    /** @type {Map<string, string>} */
    const guides = new Map();
    for (const entry of fs.readdirSync(DIR_SRC, { withFileTypes: true })) {
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
   * @param {Documentation.Class} clazz
   */
  generateClassDoc(clazz) {
    /** @type {MarkdownNode[]} */
    const result = [];
    result.push({
      type: 'text',
      text: `---
id: class-${clazz.name.toLowerCase()}
title: "${rewriteClassTitle(clazz.name, this.lang) || clazz.name}"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
`});
    result.push(...this.formatComment(clazz.spec));
    result.push({
      type: 'text',
      text: ''
    });
    clazz.membersArray.sort((m1, m2) => {
      const k1 = m1.kind + toSnakeCase(m1.alias.replace(/\$\$eval/, '$$eval2'));
      const k2 = m2.kind + toSnakeCase(m2.alias.replace(/\$\$eval/, '$$eval2'));
      return k1.localeCompare(k2);
    });
    result.push(...this.generateClassToc(clazz));
    if (clazz.extends && !['EventEmitter', 'Error', 'RuntimeException', 'Exception'].includes(clazz.extends)) {
      const superClass = this.documentation.classes.get(clazz.extends);
      result.push(...this.generateClassToc(superClass));
    }
    for (const member of clazz.membersArray) {
      // Iterate members
      for (const { text, args } of this.formatter.formatMember(member)) {
        /** @type {MarkdownNode} */
        const memberNode = { type: 'h2', children: [] };
        if (!this.heading2ExplicitId.has(member))
          throw new Error(`Header ${text} needs to have an explicit ID`)
        memberNode.text = `${text} {#${this.heading2ExplicitId.get(member)}}`;
        memberNode.children.push(...args.map(a => this.renderProperty(`\`${this.formatter.formatArgumentName(a.alias)}\``, a, a.spec, 'in')));

        // Append type
        if (member.type && (member.type.name !== 'void' || member.kind === 'method')) {
          let name;
          switch (member.kind) {
            case 'event': name = 'type:'; break;
            case 'property': name = this.lang === 'java' ? 'returns:' : 'type:'; break;
            case 'method': name = 'returns:'; break;
          }
          memberNode.children.push(this.renderProperty(name, member, undefined, 'out', member.async));
        }

        // Append member doc
        memberNode.children.push(...this.formatComment(member.spec));
        result.push(memberNode);
      }
    }
    fs.mkdirSync(path.join(this.outDir, 'api'), { recursive: true });
    const output = [md.render(result), this.generatedLinksSuffix].join('\n');
    fs.writeFileSync(path.join(this.outDir, 'api', `class-${clazz.name.toLowerCase()}.mdx`), this.mdxLinks(output));
  }

  /**
   * @param {string} text
   */
  mdxLinks(text) {
    for (const name of this.generatedFiles)
      text = text.replace(new RegExp('\\' + name, 'g'), name + 'x');
    return rewriteContent(text);
  }

  /**
   * @param {MarkdownNode[]} spec
   * @return {MarkdownNode[]}
   */
  formatComment(spec) {
    spec = this.formatter.preprocessComment(spec);
    spec = spec.filter(c => {
      // No lang or common lang - Ok.
      if (!c.codeLang || commonSnippets.has(c.codeLang))
        return true;

      // Our lang - Ok.
      if (c.codeLang === this.lang || c.codeLang === highlighterName(this.lang)) {
        c.codeLang = highlighterName(this.lang);
        return true;
      }

      // '* browser' - always Ok
      // 'sh python' - Ok for Python.
      const tokens = c.codeLang.split(' ');
      if (tokens[1] === 'browser' || tokens[1] === this.lang) {
        c.codeLang = highlighterName(tokens[0]);
        return true;
      }
      // python * - Ok for Python
      if (tokens[0] === this.lang) {
        c.lines.unshift('# ' + tokens[1], '');
        c.codeLang = highlighterName(this.lang);
        return true;
      }
      return false;
    });
    return spec;
  }

  /**
   * @param {string} name
   * @param {string} outName
   */
  generateDoc(name, outName) {
    const content = fs.readFileSync(path.join(DIR_SRC, name)).toString();
    let nodes = this.filterForLanguage(md.parse(content));
    this.documentation.renderLinksInText(nodes);
    for (const node of nodes) {
      if (node.text === '<!-- TOC -->')
        node.text = md.generateToc(nodes);
      if (node.text === '<!-- TOC3 -->')
        node.text = md.generateToc(nodes, true);
    }
    nodes = this.formatComment(nodes);
    md.visitAll(nodes, node => {
      if (node.children)
        node.children = this.formatComment(node.children);
    });
    fs.mkdirSync(this.outDir, { recursive: true });
    let output = [md.render(nodes), this.generatedLinksSuffix].join('\n');
    output = output.replace(`"
---`, `"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';`);
    fs.writeFileSync(path.join(this.outDir, outName), this.mdxLinks(output));
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
   */
  createLink(file, text, hash) {
    return `[${text}](${file}#${hash})`;
  }

  /**
   * @param {Documentation.Member} member
   * @return {string[]}
   */
  createMemberLink(member) {
    const file = `./api/class-${member.clazz.name.toLowerCase()}.md`;
    const hash = calculateHeadingHash(member)
    this.heading2ExplicitId.set(member, hash)
    return this.formatter.formatMember(member).map(f => this.createLink(file, f.text, hash));
  }

  /**
   * @param {Documentation.Class} clazz
   * @return {MarkdownNode[]}
   */
  generateClassToc(clazz) {
    const result = [];
    for (const member of clazz.membersArray) {
      for (const text of this.createMemberLink(member)) {
        result.push(/** @type {*} */ ({
          type: 'li',
          liType: 'default',
          text,
          kind: member.kind
        }));
      }
    }
    result.sort((a, b) => {
      const atext = a.text.replace(/\[(.*)\].*/, '$1').replace(/\(.*\)/, '');
      const btext = b.text.replace(/\[(.*)\].*/, '$1').replace(/\(.*\)/, '');
      return a.kind.localeCompare(b.kind) || atext.localeCompare(btext);
    });
    return result;
  }

  /**
   * @param {string} name
   * @param {Documentation.Member} member
   * @param {MarkdownNode[]} spec
   * @param {'in'|'out'} direction
   * @param {boolean=} async
   */
  renderProperty(name, member, spec, direction, async) {
    let comment = '';
    if (spec && spec.length)
      comment = spec[0].text;
    const type = member.type;
    const properties = type.deepProperties();
    /** @type {MarkdownNode[]} */
    let children = [];
    if (properties && properties.length) {
      children.push(...properties.map(p => {
        let alias = p.alias;
        if (this.lang === 'java' && member.kind === 'property' && direction === 'in')
          alias = `set${toTitleCase(alias)}`;
        if (this.lang === 'csharp' && member.kind === 'property' && direction === 'in')
          alias = toTitleCase(alias);
        return this.renderProperty(`\`${alias}\``, p, p.spec, direction, false)
      }));
      if (spec && spec.length > 1)
        children.push({ type: 'text', text: '<br />' });
    }
    if (spec && spec.length > 1)
      children.push(...spec.slice(1).map(s => md.clone(s)));

    let typeText = this.renderType(type, direction, member);
    if (async)
      typeText = this.formatter.formatPromise(typeText);

    let linkTag = '';
    let linkAnchor = '';
    if (member.enclosingMethod && member.name !== 'options') {
      const hash = calculatePropertyHash(member, direction);
      linkTag = `<a aria-hidden="true" tabindex="-1" class="list-anchor-link" id="${hash}"/>`;
      linkAnchor = `<a href="#${hash}" class="list-anchor">#</a>`;
    }

    /** @type {MarkdownNode} */
    const result = {
      type: 'li',
      liType: 'default',
      text: `${name}${linkTag} &#60;${typeText}&#62;${comment ? ' ' + comment : ''}${linkAnchor}`,
      children
    };
    return result;
  }


  /**
   * @param {Documentation.Type} type
   * @param {'in'|'out'} direction
   * @param {Documentation.Member} member
   */
  renderType(type, direction, member) {
    if (type.union) {
      if (this.lang === 'java' && type.union.some(v => v.name.startsWith('"'))) {
        const values = type.union.map(l => l.name.substring(1, l.name.length - 1).replace('-', '_').toLocaleUpperCase());
        return `\`enum ${type.name} { ${values.join(', ')} }\``;
      }
      let union = type.union;
      if (this.lang === 'csharp') {
        if (type.union.length && type.union[0].name === 'null') {
          union = type.union.slice(1);
          member.required = false;
        }
        if (type.union.some(v => v.name.startsWith('"'))) {
          // strip out the quotes
          const sanitizeLiteral = (literal) => {
            // toTitleCase(l.name.replace(/[\"-]/g, ''))
            return literal.split('-').map(l => toTitleCase(l.replace(/[\"]/g, ''))).join('');
          }
          return `\`enum ${type.name} { ${union.map(l => sanitizeLiteral(l.name)).join(', ')} }${member.required ? '' : '?'}\``;
        }
      }
      return union.map(l => this.renderType(l, direction, member)).join('|');
    }
    const result = this.formatter.formatArrayType?.(type, direction, member);
    if (result)
      return result;
    if (type.templates)
      return `${this.renderTypeName(type, direction, member)}${this.formatter.formatTemplate(type.templates.map(l => {
        return this.renderType(l, direction, /** @type {Documentation.Member} */({ ...member, required: true }));
      }).join(', '))}`;
    if (type.args)
      return `${this.formatter.formatFunction(type.args.map(l => this.renderType(l, direction, member)).join(', '), type.returnType ? ':' + this.renderType(type.returnType, direction, member) : '', type)}`;
    if (type.name.startsWith('"'))
      return type.name;
    return `${this.renderTypeName(type, direction, member)}`;
  }

  /**
   * @param {Documentation.Type} type
   * @param {'in'|'out'} direction
   * @param {Documentation.Member} member
   */
  renderTypeName(type, direction, member) {
    return this.formatter.renderType(type, direction, member);
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
 * @param {Documentation.Member[]} args
 * @return {string}
 */
function renderJSSignature(args) {
  const tokens = [];
  let lastIsOptional = false;
  for (const arg of args) {
    const name = arg.alias;
    const optional = !arg.required;
    if (tokens.length) {
      if (optional && !lastIsOptional)
        tokens.push(`[`);
      // In java callback goes last, after optional 'options'
      if (!optional && lastIsOptional)
        tokens.push(`]`);
      tokens.push(`, `);
    } else {
      if (optional)
        tokens.push(`[`);
    }
    tokens.push(name);
    lastIsOptional = optional;
  }
  if (lastIsOptional)
    tokens.push(']');
  return tokens.join('');
}

/**
 * @param {string} name
 * @param {{omitAsync: boolean}=} options
 */
function toTitleCase(name, options) {
  let result = name[0].toUpperCase() + name.substring(1);
  if (options && options.omitAsync && result.endsWith('Async'))
    result = result.slice(0, result.length - 'Async'.length);
  return result;
}


/**
 * @param {string} lang
 */
function highlighterName(lang) {
  if (lang === 'python')
    return 'py';
  return lang;
}

/**
 * @param {Documentation.Member} member
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
 * @param {Documentation.Member} member
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
  const propertyDescription = member.paramOrOption ? 'param' : 'option';
  return `${prefix}-${propertyDescription}-${propertyName}`.toLowerCase();
}

module.exports = { Generator, toTitleCase, toSnakeCase, renderJSSignature };
