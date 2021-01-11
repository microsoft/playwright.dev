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

const fs = require('fs');
const path = require('path');
const md = require('./markdown');
const { parseApi } = require('./api_parser');
const Documentation = require('./documentation');

/** @typedef {import('./documentation').Type} Type */
/** @typedef {import('./markdown').MarkdownNode} MarkdownNode */

const DIR_SRC = path.join(process.env.SRC_DIR, 'docs', 'src');
const commonSnippets = new Set(['html', 'yml', 'yaml', 'json', 'groovy', 'html', 'sh']);

class Generator {
  links = new Map();
  rLinks = new Map();

  /**
   * @param {string} lang
   * @param {string} outDir
   * @param {{
   *   formatMember: function(Documentation.Member): { text: string, args: Documentation.Member[] },
   *   formatArgumentName: function(Documentation.Member): string,
   *   formatTemplate: function(string): string,
   *   formatFunction: function(string): string,
   *   formatPromise: function(string): string,
   *   typesMap: Object<string, string>,
   * }} config
   */
  constructor(lang, outDir, config) {
    this.lang = lang;
    this.outDir = outDir;
    this.config = config;
    this.documentation = parseApi(path.join(DIR_SRC, 'api'));
    this.documentation.filterForLanguage(lang);
    this.documentation.setLinkRenderer(item => {
      const { clazz, member, param, option } = item;
      if (param)
        return `\`${param}\``;
      if (option)
        return `\`${option}\``;
      if (clazz)
        return `[${clazz.name}]`;
      return this.createMemberLink(member);
    });

    this.generatedLinksSuffix = '';
    {
      const links = fs.readFileSync(path.join(__dirname, '..', 'common', 'links.md')).toString();
      const langLinks = fs.readFileSync(path.join(__dirname, '..', 'common', `links-${lang}.md`)).toString();
      const localLinks = [];
      for (const clazz of this.documentation.classesArray)
        localLinks.push(`[${clazz.name}]: ./api/class-${clazz.name.toLowerCase()}.md "${clazz.name}"`);
        this.generatedLinksSuffix = '\n' + localLinks.join('\n') + '\n' + links + '\n' + langLinks;
    }

    for (const clazz of this.documentation.classesArray)
      this.generateClassDoc(clazz);

    for (const name of fs.readdirSync(path.join(DIR_SRC))) {
      if (name.startsWith('links.md') || name === 'api')
        continue;
      this.generateDoc(name);
    }
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
title: "${clazz.name}"
---
`});
    result.push(...this.formatComment(clazz.spec));
    result.push({
      type: 'text',
      text: ''
    });
    clazz.membersArray.sort((m1, m2) => {
      const k1 = m1.kind + m1.alias.replace(/\$\$eval/, '$$eval2');
      const k2 = m2.kind + m2.alias.replace(/\$\$eval/, '$$eval2');
      return k1.localeCompare(k2);
    });
    result.push(...this.generateClassToc(clazz));
    if (clazz.extends && clazz.extends !== 'EventEmitter' && clazz.extends !== 'Error') {
      const superClass = this.documentation.classes.get(clazz.extends);
      result.push(...this.generateClassToc(superClass));
    }
    for (const member of clazz.membersArray) {
      // Iterate members
      /** @type {MarkdownNode} */
      const memberNode = { type: 'h2', children: [] };
      const { text, args } = this.config.formatMember(member);
      memberNode.text = text;
      memberNode.children.push(...args.map(a => this.renderProperty(`\`${this.config.formatArgumentName(a)}\``, a.type, a.spec)));

      // Append type
      if (member.type && member.type.name !== 'void') {
        let name;
        switch (member.kind) {
          case 'event': name = 'type:'; break;
          case 'property': name = 'type:'; break;
          case 'method': name = 'returns:'; break;
        }
        memberNode.children.push(this.renderProperty(name, member.type, undefined, member.async));
      }

      // Append member doc
      memberNode.children.push(...this.formatComment(member.spec));
      result.push(memberNode);
    }
    fs.mkdirSync(path.join(this.outDir, 'api'), { recursive: true });
    fs.writeFileSync(path.join(this.outDir, 'api', `class-${clazz.name.toLowerCase()}.md`), [md.render(result), this.generatedLinksSuffix].join('\n'));
  }

  /**
   * @param {MarkdownNode[]} spec
   * @return {MarkdownNode[]}
   */
  formatComment(spec) {
    return (spec || []).filter(c => {
      if (!c.codeLang || commonSnippets.has(c.codeLang))
        return true;
      if (c.codeLang === this.lang) {
        c.codeLang = highlighterName(this.lang);
        return true;
      }
      if (!c.codeLang.startsWith(this.lang + ' '))
        return false;
      c.lines.unshift('# ' + c.codeLang.substring(this.lang.length + 1), '');
      c.codeLang = highlighterName(this.lang);
      return true;
    });
  }

  /**
   * @param {string} name 
   */
  generateDoc(name) {
    const content = fs.readFileSync(path.join(DIR_SRC, name)).toString();
    const nodes = md.parse(content);
    this.documentation.renderLinksInText(nodes);
    for (const node of nodes) {
      if (node.text === '<!-- TOC -->')
        node.text = md.generateToc(nodes);
    }
    md.visitAll(nodes, node => {
      if (node.children)
        node.children = this.formatComment(node.children);
    });
    fs.mkdirSync(this.outDir, { recursive: true });
    fs.writeFileSync(path.join(this.outDir, name), [md.render(nodes), this.generatedLinksSuffix].join('\n'));
  }

  /**
   * @param {string} file
   * @param {string} text
   */
  createLink(file, text) {
    const key = file + '#' + text;
    if (this.links.has(key))
      return this.links.get(key);
    const baseLink = file + '#' + text.toLowerCase().split(',').map(c => c.replace(/[^a-z_]/g, '')).join('-');
    let link = baseLink;
    let index = 0;
    while (this.rLinks.has(link))
      link = baseLink + '-' + (++index);
    const result = `[${text}](${link})`;
    this.links.set(key, result);
    this.rLinks.set(link, text);
    return result;
  }

  /**
   * @param {Documentation.Member} member
   * @return {string}
   */
  createMemberLink(member) {
    const file = `./api/class-${member.clazz.name.toLowerCase()}.md`;
    return this.createLink(file, this.config.formatMember(member).text);
  }

  /**
   * @param {Documentation.Class} clazz
   * @return {MarkdownNode[]}
   */
  generateClassToc(clazz) {
    /** @type {MarkdownNode[]} */
    const result = [];
    for (const member of clazz.membersArray) {
      result.push({
        type: 'li',
        liType: 'default',
        text: this.createMemberLink(member)
      });
    }
    return result;
  }

  /**
   * @param {string} name
   * @param {Type} type
   * @param {MarkdownNode[]} [spec]
   * @param {boolean=} async
   */
  renderProperty(name, type, spec, async) {
    let comment = '';
    if (spec && spec.length)
      comment = spec[0].text;
    let children;
    const properties = type.deepProperties();
    if (properties && properties.length)
      children = properties.map(p => this.renderProperty(`\`${p.name}\``, p.type, p.spec, false))
    else if (spec && spec.length > 1)
      children = spec.slice(1).map(s => md.clone(s));

    let typeText = this.renderType(type);
    if (async)
      typeText = this.config.formatPromise(typeText);

    /** @type {MarkdownNode} */
    const result = {
      type: 'li',
      liType: 'default',
      text: `${name} <${typeText}>${comment ? ' ' + comment : ''}`,
      children
    };
    return result;
  }


  /**
   * @param {Documentation.Type} type
   */
  renderType(type) {
    if (type.union)
      return type.union.map(l => this.renderType(l)).join('|');
    if (type.templates)
      return `${this.renderTypeName(type.name)}${this.config.formatTemplate(type.templates.map(l => this.renderType(l)).join(', '))}`;
    if (type.args)
      return `${this.config.formatFunction(type.args.map(l => this.renderType(l)).join(', '))}${type.returnType ? ':' + this.renderType(type.returnType) : ''}`;
    if (type.name.startsWith('"'))
      return type.name;
    return `${this.renderTypeName(type.name)}`;
  }

  /**
   * @param {string} typeName
   */
  renderTypeName(typeName) {
    return `[${this.config.typesMap[typeName] || typeName}]`;
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
  let hasOptional = false;
  for (const arg of args) {
    const name = arg.name;
    const optional = !arg.required;
    if (tokens.length) {
      if (optional && !hasOptional)
        tokens.push(`[, ${name}`);
      else
        tokens.push(`, ${name}`);
    } else {
      if (optional && !hasOptional)
        tokens.push(`[${name}`);
      else
        tokens.push(`${name}`);
    }
    hasOptional = hasOptional || optional;
  }
  if (hasOptional)
    tokens.push(']');
  return tokens.join('');
}

/**
 * @param {Documentation.Member[]} args
 * @return {string}
 */
function renderPythonSignature(args) {
  const argNames = args.filter(a => a.required).map(a => toSnakeCase(a.name));
  if (args.find(a => !a.required))
    argNames.push('**options');
  return argNames.join(', ');
}

/**
 * @param {Documentation.Member} arg
 * @return {Documentation.Member[]}
 */
function expandPythonOptions(arg) {
  return arg.name == 'options' ? arg.type.properties : [arg];
}

new Generator('js', path.join(__dirname, '..', 'nodejs', 'docs'), {
  formatMember: member => {
    let text;
    let args = [];
    if (member.kind === 'property')
      text = `${member.clazz.varName}.${member.name}`;
  
    if (member.kind === 'event')
      text = `${member.clazz.varName}.on('${member.name}')`;
  
    if (member.kind === 'method') {
      args = member.argsArray;
      const signature = renderJSSignature(args);
      text = `${member.clazz.varName}.${member.name}(${signature})`;
    }
    return { text, args };
  },
  formatArgumentName: p => p.name,
  formatTemplate: text => `<${text}>`,
  formatFunction: text => `[function]\\(${text}\\)`,
  formatPromise: text => `[Promise]<${text}>`,
  typesMap: {
    'int': 'number',
    'float': 'number',
    'path': 'string',
    'any': 'Object'
  },
});

new Generator('python', path.join(__dirname, '..', 'python', 'docs'), {
  formatMember: member => {
    let text;
    const args = [];
    if (member.kind === 'property')
      text = `${toSnakeCase(member.clazz.varName)}.${toSnakeCase(member.alias)}`;
  
    if (member.kind === 'event')
      text = `${toSnakeCase(member.clazz.varName)}.on("${toSnakeCase(member.alias)}")`;
  
    if (member.kind === 'method') {
      for (const arg of member.argsArray)
        args.push(...expandPythonOptions(arg));
      text = `${toSnakeCase(member.clazz.varName)}.${toSnakeCase(member.alias)}(${renderPythonSignature(args)})`;
    }
    return { text, args };
  },
  formatArgumentName: p => toSnakeCase(p.name),
  formatTemplate: text => `\\[${text}\\]`,
  formatFunction: text => `[Callable]\\[${text}\\]`,
  formatPromise: text => text,
  typesMap: {
    'RegExp': 'Pattern',
    'any': 'Any',
    'function': 'Callable',
    'path': 'Union]\\[[str], [pathlib.Path]\\',
    'Array': 'List',
    'Object': 'Dict',
    'null': 'NoneType',
    'void': 'NoneType',
    'boolean': 'bool',
    'string': 'str',
  },
});

/**
 * @param {string} lang
 */
function highlighterName(lang) {
  if (lang === 'python')
    return 'py';
  return lang;
}
