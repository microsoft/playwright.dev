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

const md = require('./markdown');
const Documentation = require('./documentation');
const { toTitleCase, renderJSSignature } = require('./generator');
const { generateTabGroup } = require('./format_utils');
/** @typedef {import('./generator').GeneratorFormatter} GeneratorFormatter */
/** @typedef {import('./markdown').MarkdownNode} MarkdownNode */

/**
 * @implements {GeneratorFormatter}
 */
class JavaScriptFormatter {
  constructor() {
    this.lang = 'js';
  }
  formatMember(member) {
    let text;
    let args = [];

    let prefix = `${member.clazz.varName}.`;
    if (member.clazz.varName === 'playwrightAssertions') {
      prefix = '';
    } else if (member.clazz.varName.includes('Assertions')) {
      const varName = member.clazz.varName.substring(0, member.clazz.varName.length -'Assertions'.length);
      // Generate `expect(locator).` instead of `locatorAssertions.`
      prefix = `expect(${varName}).`;
    }

    if (member.kind === 'property')
      text = `${prefix}${member.alias}`;

    if (member.kind === 'event')
      text = `${prefix}on('${member.alias.toLowerCase()}')`;

    if (member.kind === 'method') {
      args = member.argsArray;
      const signature = renderJSSignature(args);
      text = `${prefix}${member.alias}(${signature})`;
    }
    return [{ text, args }];
  }

  formatArgumentName(name) {
    return name;
  }

  formatTemplate(text) {
    return`<${text}>`;
  }

  formatFunction(args, ret) {
    return `[function]\\(${args}\\)${ret}`;
  }

  formatPromise(text) {
    return `[Promise]<${text}>`;
  }

  /**
   * @param {Documentation.Type} type
   */
  renderType(type) {
    const text = type.name;
    switch (text) {
      case 'int': return '[number]';
      case 'float': return '[number]';
      case 'path': return '[string]';
      case 'any': return '[Object]';
    }
    return `[${text}]`;
  }

  /**
   * @param {MarkdownNode[]} spec
   * @returns {MarkdownNode[]}
   */
  preprocessComment(spec) {
   const newSpec = generateTabGroup(spec, this.lang, 'js');
   return generateTabGroup(newSpec, this.lang, 'bash')
  }

  /**
   * @param {MarkdownNode} spec 
   * @returns boolean
   */
  filterComment(spec) {
    return spec.codeLang === 'ts' || spec.codeLang === 'js';
  }
}

module.exports = { JavaScriptFormatter };
