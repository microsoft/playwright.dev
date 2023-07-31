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

  formatArgumentName(name) {
    return toSnakeCase(name);
  }

  formatTemplate(text) {
    return `\\[${text}\\]`;
  }

  formatFunction(args, ret) {
    return `[Callable]\\[${args}\\]${ret}`;
  }

  formatPromise(text) {
    return text;
  }

  /**
   * @param {Documentation.Type} type
   * @param {string} direction
   */
  renderType(type, direction) {
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
      case 'Buffer': return '[bytes]';
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
    return spec.codeLang === this.lang;
  }

  /**
   * @param {Documentation.Member} member
   */
  memberSection(member) {
    if (member.deprecated || member.discouraged)
      return { key: 'd', title: 'Deprecated' };
    if (member.kind === 'event')
      return { key: 'c', title: 'Events' };
    if (member.kind === 'property' || (member.kind === 'method' && !member.async && member.argsArray.length === 0))
      return { key: 'b', title: 'Properties' };
    if (member.kind === 'method')
      return { key: 'a', title: 'Methods' };
    throw new Error(`Unsupported member kind ${member.kind} for ${member.name}`);
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
