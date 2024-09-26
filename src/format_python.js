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
const { toSnakeCase, assertionArgument } = require('./generator');
/** @typedef {import('./generator').GeneratorFormatter} GeneratorFormatter */
/** @typedef {import('./markdown').MarkdownNode} MarkdownNode */

/**
 * @implements {GeneratorFormatter}
 */
class PythonFormatter {
  constructor() {
    this.lang = 'python';
  }

  /**
   * @param {Documentation.Member} member
   * @returns {import('./generator').FormattedMember[]}
   */
  formatMember(member) {
    const args = [];

    let prefix = `${toSnakeCase(member.clazz.varName)}.`;
    if (member.clazz.varName === 'playwrightAssertions') {
      prefix = '';
    } else if (member.clazz.varName.includes('Assertions')) {
      prefix = `expect(${toSnakeCase(assertionArgument(member.clazz))}).`;
    }

    let name = toSnakeCase(member.alias);
    let usages = [`${prefix}${name}`];
    let link = `${prefix}${name}`;

    if (member.kind === 'event') {
      name = `on("${member.alias.toLowerCase()}")`;
      usages = [`${prefix}on("${member.alias.toLowerCase()}", handler)`];
      link = `${prefix}${name}`;
    }

    let signatures;
    if (member.kind === 'method') {
      for (const arg of member.argsArray)
        args.push(...expandPythonOptions(arg));
      signatures = renderPythonSignatures(args);
      let isGetter = !args.length && !member.async && !!member.type;
      if (member.name.startsWith('is') || member.name.startsWith('as'))
        isGetter = false;
      usages = signatures.map(signature => `${prefix}${name}${isGetter ? '' : '(' + signature + ')'}`);
      link = `${prefix}${name}${isGetter ? '' : '()'}`;
    }

    return [{ name, link, usages, args, signatures }];
  }

  /**
   * @param {string} name
   */
  formatParamName(name) {
    return toSnakeCase(name);
  }

  /**
   * @param {string} text
   */
  formatTemplate(text) {
    return `\\[${text}\\]`;
  }

  /**
   * @param {string} args
   * @param {string} ret
   * @param {Documentation.Type} type
   */
  formatFunction(args, ret, type) {
    return `[Callable]\\[${args}\\]${ret}`;
  }

  /**
   * @param {Documentation.Type} type
   * @param {'in'|'out'} direction
   * @param {Documentation.Member} member
   */
  formatTypeName(type, direction, member) {
    const text = type.name;
    switch (text) {
      case 'RegExp': return '[Pattern]';
      case 'any': return '[Any]';
      case 'function': return '[Callable]';
      case 'path': return direction === 'out' ? '[pathlib.Path]' : '[Union]\\[[str], [pathlib.Path]\\]';
      case 'Array': return '[List]';
      case 'Object': return '[Dict]';
      case 'null': return '[NoneType]';
      case 'void': return '[NoneType]';
      case 'boolean': return '[bool]';
      case 'string': return '[str]';
      case 'Date': return '[datetime]';
      case 'long': return '[int]';
      case 'Buffer': return '[bytes]';
    }
    return `[${text}]`;
  }

  /**
   * @param {MarkdownNode} spec
   * @returns {boolean}
   */
  filterComment(spec) {
    return spec.codeLang === this.lang;
  }

  /**
   * @param {Documentation.Member} member
   */
  shouldRenderMemberAsProperty(member) {
    return member.kind === 'method' && !member.async && member.argsArray.length === 0;
  }

  propertyTypeTitle() {
    return 'Type';
  }

  /**
   * @param {string} option
   * @param {Documentation.Member?} member
   */
  formatOptionName(option, member) {
    // Python only snake-cases top-level options/arguments.
    const shouldSnake = !member || !member.parent || member.parent.name === 'options' && !member.parent.parent;
    if (!shouldSnake)
      return option;
    let [first, ...rest] = option.split('.');
    first = toSnakeCase(first);
    return [first, ...rest].join('.');
  }
}

/**
 * @param {Documentation.Member[]} args
 * @return {string[]}
 */
 function renderPythonSignatures(args) {
  const argNames = args.filter(a => a.required).map(a => toSnakeCase(a.name));
  const signatures = [argNames.join(', ')];
  if (args.find(a => !a.required))
    signatures.push([...argNames, '**kwargs'].join(', '));
  return signatures;
}

/**
 * @param {Documentation.Member} arg
 * @return {Documentation.Member[]}
 */
function expandPythonOptions(arg) {
  return arg.name == 'options' ? arg.type.properties : [arg];
}

module.exports = { PythonFormatter };
