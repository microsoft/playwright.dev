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

class Generator {
  links = new Map();
  rLinks = new Map();

  /**
   * @param {string} lang
   * @param {string} outDir
   * @param {function(Documentation.Member): { text: string, args: Documentation.Member[] }} formatMember
   * @param {function(Documentation.Member): string} formatArgument
   */
  constructor(lang, outDir, formatMember, formatArgument) {
    this.outDir = outDir;
    this.formatMember = formatMember;
    this.formatArgument = formatArgument;
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
      const links = fs.readFileSync(path.join(DIR_SRC, 'links.md')).toString();
      const localLinks = [];
      for (const clazz of this.documentation.classesArray)
        localLinks.push(`[${clazz.name}]: ./api/class-${clazz.name.toLowerCase()}.md "${clazz.name}"`);
        this.generatedLinksSuffix = '\n' + localLinks.join('\n') + '\n' + links;
    }

    for (const clazz of this.documentation.classesArray)
      this.generateClassDoc(clazz);

    for (const name of fs.readdirSync(path.join(DIR_SRC))) {
      if (name === 'links.md' || name === 'api')
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
    result.push(...(clazz.spec || []).map(c => md.clone(c)));
    result.push({
      type: 'text',
      text: ''
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
      const { text, args } = this.formatMember(member);
      memberNode.text = text;
      memberNode.children.push(...args.map(a => this.renderProperty(`\`${this.formatArgument(a)}\``, a.type, a.spec)));

      // Append type
      if (member.type && member.type.name !== 'void') {
        let name;
        switch (member.kind) {
          case 'event': name = 'type:'; break;
          case 'property': name = 'type:'; break;
          case 'method': name = 'returns:'; break;
        }
        memberNode.children.push(this.renderProperty(name, member.type));
      }

      // Append member doc
      memberNode.children.push(...(member.spec || []).map(c => md.clone(c)));
      result.push(memberNode);
    }
    fs.mkdirSync(path.join(this.outDir, 'api'), { recursive: true });
    fs.writeFileSync(path.join(this.outDir, 'api', `class-${clazz.name.toLowerCase()}.md`), [md.render(result), this.generatedLinksSuffix].join('\n'));
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
    const baseLink = file + '#' + text.toLowerCase().split(',').map(c => c.replace(/[^a-z]/g, '')).join('-');
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
    return this.createLink(file, this.formatMember(member).text);
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
   */
  renderProperty(name, type, spec) {
    let comment = '';
    if (spec && spec.length)
      comment = spec[0].text;
    let children;
    const properties = type.deepProperties();
    if (properties && properties.length)
      children = properties.map(p => this.renderProperty(`\`${this.formatArgument(p)}\``, p.type, p.spec))
    else if (spec && spec.length > 1)
      children = spec.slice(1).map(s => md.clone(s));

    let typeText = renderType(type);
    if (typeText === '[Promise]<[void]>')
      typeText = '[Promise]';

    /** @type {MarkdownNode} */
    const result = {
      type: 'li',
      liType: 'default',
      text: `${name} <${typeText}>${comment ? ' ' + comment : ''}`,
      children
    };
    return result;
  }

}

/**
 * @param {Documentation.Type} type
 */
function renderType(type) {
  if (type.union)
    return type.union.map(l => renderType(l)).join('|');
  if (type.templates)
    return `[${type.name}]<${type.templates.map(l => renderType(l)).join(', ')}>`;
  if (type.args)
    return `[function]\\(${type.args.map(l => renderType(l)).join(', ')}\\)${type.returnType ? ':' + renderType(type.returnType) : ''}`;
  if (type.name.startsWith('"'))
    return type.name;
  if (type.name === 'int' || type.name === 'float')
    return '[number]';
  if (type.name === 'path')
    return '[string]';
  if (type.name === 'any')
    return '[Object]';
  return `[${type.name}]`;
}

new Generator('js', path.join(__dirname, '..', 'nodejs', 'docs'), member => {
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
}, p => p.name);

new Generator('python', path.join(__dirname, '..', 'python', 'docs'), member => {
  let text;
  const args = [];
  if (member.kind === 'property')
    text = `${toSnakeCase(member.clazz.varName)}.${toSnakeCase(member.name)}`;

  if (member.kind === 'event')
    text = `${toSnakeCase(member.clazz.varName)}.on("${toSnakeCase(member.name)}")`;

  if (member.kind === 'method') {
    for (const arg of member.argsArray)
      args.push(...expandPythonArgument(member.name, arg));
    text = `${toSnakeCase(member.clazz.varName)}.${toSnakeCase(member.name)}(${renderPythonSignature(args)})`;
  }
  return { text, args };
}, p => toSnakeCase(p.name));

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
 * @param {string} methodName
 * @param {Documentation.Member} arg
 * @return {Documentation.Member[]}
 */
function expandPythonArgument(methodName, arg) {
  let expandType;
  const argName = arg.name;
  if (argName == 'options')
    expandType = arg.type;
  if (argName == 'optionsOrPredicate')
    expandType = arg.type.union[1];
  if (argName == 'params' && arg.type.properties)
    expandType = arg.type;
  if (methodName == 'emulateMedia' && argName == 'params')
    expandType = arg.type;
  if (methodName == 'fulfill' && argName == 'response')
    expandType = arg.type;
  if (methodName == 'continue' && argName == 'overrides')
    expandType = arg.type;
  if (methodName == 'setViewportSize' && argName == 'viewportSize')
    expandType = arg.type;
  if (argName == 'geolocation')
    expandType = arg.type.union[1];
  if (argName == 'frameSelector')
    expandType = arg.type.union[1]; 
  return expandType ? expandType.properties : [arg];
}
