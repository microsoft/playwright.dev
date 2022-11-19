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

const Documentation = require('./documentation');
const { renderJSSignatures } = require('./generator');
/** @typedef {import('./generator').GeneratorFormatter} GeneratorFormatter */
/** @typedef {import('./markdown').MarkdownNode} MarkdownNode */
/** @typedef {import('./documentation').Member} Member */

/**
 * @implements {GeneratorFormatter}
 */
class JavaScriptFormatter {
  constructor() {
    this.lang = 'js';
  }

  /**
   * @param {Documentation.Member} member 
   */
  formatMember(member) {
    let args = [];

    let prefix = '';
    prefix = `${member.clazz.varName}.`;
    if (member.clazz.varName === 'playwrightAssertions') {
      prefix = '';
    } else if (member.clazz.varName.includes('Assertions')) {
      const varName = member.clazz.varName.substring(0, member.clazz.varName.length -'Assertions'.length);
      // Generate `expect(locator).` instead of `locatorAssertions.`
      prefix = `expect(${varName}).`;
    }  

    let name = member.alias;
    let usages = [`${prefix}${name}`];
    let link = `${prefix}${name}`;

    if (member.kind === 'event') {
      name = `on('${member.alias.toLowerCase()}')`;
      usages = [`${prefix}on('${member.alias.toLowerCase()}', data => {});`];
      link = `${prefix}${name}`;
    }

    if (member.kind === 'method') {
      args = member.argsArray;
      const signatures = renderJSSignatures(args);
      usages = signatures.map(signature => `${member.async ? 'await ' : ''}${prefix}${name}(${signature});`);
      link = `${prefix}${name}()`;
    }

    return [{ name, link, usages, args }];
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
    return spec;
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
