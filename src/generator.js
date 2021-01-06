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
const { MDOutline } = require('./md_builder');
const Documentation = require('./documentation');

/** @typedef {import('./documentation').Type} Type */
/** @typedef {import('./markdown').MarkdownNode} MarkdownNode */

const DIR_SRC = path.join(process.env.SRC_DIR, 'docs', 'src');
const DIR_OUT = path.join(__dirname, '..', 'docs');

class Generator {
  links = new Map();
  rLinks = new Map();

  constructor() {
    this.outline = new MDOutline(path.join(DIR_SRC, 'api-body.md'), path.join(DIR_SRC, 'api-params.md'));

    this.outline.setLinkRenderer(item => {
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
      for (const clazz of this.outline.classesArray)
        localLinks.push(`[${clazz.name}]: api/class-${clazz.name.toLowerCase()}.md "${clazz.name}"`);
        this.generatedLinksSuffix = '\n' + localLinks.join('\n') + '\n' + links;
    }

    for (const clazz of this.outline.classesArray)
      this.generateClassDoc(clazz);

    for (const name of fs.readdirSync(path.join(DIR_SRC))) {
      if (name === 'links.md' || name.startsWith('api-'))
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
      const superClass = this.outline.documentation.classes.get(clazz.extends);
      result.push(...this.generateClassToc(superClass));
    }

    for (const member of clazz.membersArray) {
      // Iterate members
      /** @type {MarkdownNode} */
      const memberNode = { type: 'h2', children: [] };
      if (member.kind === 'event') {
        memberNode.text = `${clazz.varName}.on('${member.name}')`;
      } else if (member.kind === 'property') {
        memberNode.text = `${clazz.varName}.${member.name}`;
      } else if (member.kind === 'method') {
        // Patch method signatures
        memberNode.text = `${clazz.varName}.${member.name}(${member.signature})`;
        for (const arg of member.argsArray)
          memberNode.children.push(renderProperty(`\`${arg.name}\``, arg.type, arg.spec));
      }

      // Append type
      if (member.type && member.type.name !== 'void') {
        let name;
        switch (member.kind) {
          case 'event': name = 'type:'; break;
          case 'property': name = 'type:'; break;
          case 'method': name = 'returns:'; break;
        }
        memberNode.children.push(renderProperty(name, member.type));
      }

      // Append member doc
      memberNode.children.push(...(member.spec || []).map(c => md.clone(c)));
      result.push(memberNode);
    }
    fs.mkdirSync(path.join(DIR_OUT, 'api'), { recursive: true });
    fs.writeFileSync(path.join(DIR_OUT, 'api', `class-${clazz.name.toLowerCase()}.md`), [md.render(result), this.generatedLinksSuffix].join('\n'));
  }

  /**
   * @param {string} name 
   */
  generateDoc(name) {
    const content = fs.readFileSync(path.join(DIR_SRC, name)).toString();
    const nodes = md.parse(content);
    this.outline.renderLinksInText(nodes);
    for (const node of nodes) {
      if (node.text === '<!-- TOC -->')
        node.text = md.generateToc(nodes);
    }
    fs.mkdirSync(DIR_OUT, { recursive: true });
    fs.writeFileSync(path.join(DIR_OUT, name), [md.render(nodes), this.generatedLinksSuffix].join('\n'));
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
    const file = `api/class-${member.clazz.name.toLowerCase()}.md`;
    if (member.kind === 'property')
      return this.createLink(file, `${member.clazz.varName}.${member.name}`);

    if (member.kind === 'event')
      return this.createLink(file, `${member.clazz.varName}.on('${member.name}')`);

    if (member.kind === 'method')
      return this.createLink(file, `${member.clazz.varName}.${member.name}(${member.signature})`);
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
}

/**
 * @param {string} name
 * @param {Type} type
 * @param {MarkdownNode[]} [spec]
 */
function renderProperty(name, type, spec) {
  let comment = '';
  if (spec && spec.length)
    comment = spec[0].text;
  let children;
  const properties = type.deepProperties();
  if (properties && properties.length)
    children = properties.map(p => renderProperty(`\`${p.name}\``, p.type, p.spec))
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
  return `[${type.name}]`;
}

new Generator();
