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
const { toTitleCase, renderJSSignatures, assertionArgument } = require('./generator');
/** @typedef {import('./generator').GeneratorFormatter} GeneratorFormatter */
/** @typedef {import('./generator').FormatMode} FormatMode */

/**
 * @implements {GeneratorFormatter}
 */
class JavaFormatter {
  constructor() {
    this.lang = 'java';
  }

  /**
   * @param {Documentation.Member} member
   * @returns {import('./generator').FormattedMember[]}
   */
  formatMember(member) {
    let args = [];

    let prefix = `${member.clazz.name}.`;
    if (member.clazz.varName === 'playwrightAssertions' || member.clazz.varName === 'softAssertions') {
      prefix = '';
    } else if (member.clazz.varName.includes('Assertions')) {
      prefix = `assertThat(${assertionArgument(member.clazz)}).`;
    }

    let name = member.alias;
    if (member.kind === 'property')
      name = `${name}()`;
    if (member.kind === 'event')
      name = `on${toTitleCase(member.alias)}(handler)`;

    let usages = [`${prefix}${name}`];
    let link = `${prefix}${name}`;

    let signatures;
    if (member.kind === 'method') {
      args = member.argsArray;
      signatures = renderJSSignatures(args);
      usages = signatures.map(signature => `${prefix}${name}(${signature});`);
      link = `${prefix}${name}()`;
    }

    return [{ name, link, usages, args, signatures }];
  }

  /**
   * @param {string} text
   */
  formatTemplate(text) {
    return `<${text}>`;
  }

  /**
   * @param {string} args
   * @param {string} ret
   * @param {Documentation.Type} type
   */
  formatFunction(args, ret, type) {
    if (type.args.length !== 1)
      throw new Error('Unsupported number of arguments in function: ' + type);
    if (!type.returnType)
      return "[Consumer]<" + args + ">";
    if (type.returnType.name === 'boolean')
      return "[Predicate]<" + args + ">";
    throw new Error('Unknown java type for function: ' + type);
  }

  /**
   * @param {Documentation.Type} type
   * @param {'in'|'out'} direction
   * @param {Documentation.Member} member
   * @returns {string?}
   */
  formatArrayType(type, direction, member) {
    const text = type.name;
    if ('Array' !== text || direction !== 'in')
      return null;
    const method = member.enclosingMethod;
    if (!method)
      return null;
    if (!member.type.union)
      return null;
    // If there are more than Array arguments format them as arrays
    // (List overloads don't work because of type erasure in java).
    if (member.type.union.filter(e => e.name === 'Array').length < 2)
      return null;
    const elementType = this.formatTypeName(type.templates[0], direction, member);
    return `${elementType}&#91;&#93;`;
  }

  /**
   * @param {Documentation.Type} type
   * @param {'in'|'out'} direction
   * @param {Documentation.Member} member
   */
  formatTypeName(type, direction, member) {
    if (member.kind === 'property' && member.name === 'options') {
      const method = member.enclosingMethod;
      return `\`${toTitleCase(method.clazz.varName)}.${toTitleCase(method.alias)}Options\``;
    }
    const text = type.name;
    switch (text) {
      case 'any': return '[Object]';
      case 'Array': return '[List]';
      case 'float': return '[double]';
      case 'function': {
        switch (fullName(member)) {
          case 'BrowserContext.exposeBinding.callback': return '`BindingCallback`';
          case 'BrowserContext.exposeFunction.callback': return '`FunctionCallback`';
          case 'Page.exposeBinding.callback': return '`BindingCallback`';
          case 'Page.exposeFunction.callback': return '`FunctionCallback`';
          case 'Page.addLocatorHandler.handler': return '`LocatorHandler`';
        }
        throw new Error('Unknwon java type for ' + fullName(member));
      };
      case 'null': return '[null]';
      case 'Object': {
        switch (fullName(member)) {
          case 'BrowserContext.addCookies.cookies': return '`Cookie`';
          case 'BrowserContext.cookies': return '`Cookie`';
          case 'ElementHandle.selectOption.values': return '`SelectOption`';
          case 'Frame.selectOption.values': return '`SelectOption`';
          case 'Page.selectOption.values': return '`SelectOption`';
          case 'Locator.selectOption.values': return '`SelectOption`';
          case 'ElementHandle.setInputFiles.files': return '`FilePayload`';
          case 'FileChooser.setFiles.files': return '`FilePayload`';
          case 'Frame.setInputFiles.files': return '`FilePayload`';
          case 'Page.setInputFiles.files': return '`FilePayload`';
          case 'Locator.setInputFiles.files': return '`FilePayload`';
          case 'Request.headersArray': return '`HttpHeader`';
          case 'Response.headersArray': return '`HttpHeader`';
          case 'ApiResponse.headersArray': return '`HttpHeader`';
        }
        if (!type.templates)
          return `${toTitleCase(member.alias)}`;
        return '[Map]';
      }
      case 'path': return '[Path]';
      case 'RegExp': return '[Pattern]';
      case 'string': return '[String]';
      // Escape '[' and ']' so that they don't break markdown links like [byte[]](link)
      case 'Buffer': return '[byte&#91;&#93;]';
      case 'Readable': return '[InputStream]';
      case 'Serializable': return '[Object]';
      case 'URL': return '[String]';
      case 'unknown': return '[Object]';
    }
    return `[${text}]`;
  }

  /**
   * @param {import('./markdown').MarkdownNode[]} spec
   * @returns {import('./markdown').MarkdownNode[]}
   */
  preprocessComment(spec) {
    spec = spec.filter(n => !n.text || !n.text.startsWith('extends: [EventEmitter]'));
    spec.forEach(n => {
      if (n.text === 'extends: [Error]')
        n.text = 'extends: [PlaywrightException]';
    });
    return spec;
  }

  /**
   * @param {import('./markdown').MarkdownNode} spec
   * @returns {boolean}
   */
  filterComment(spec) {
    return spec.codeLang === this.lang;
  }

  propertyTypeTitle() {
    return 'Returns';
  }

  /**
   * @param {string} option
   */
  formatOptionName(option) {
    return option.split('.').map(o => `set${toTitleCase(o)}`).join('.');
  }

  /**
   * @param {Documentation.Type} type
   * @param {'in'|'out'} direction
   * @param {Documentation.Member} member
   */
  formatUnionType(type, direction, member) {
    if (type.union.some(v => v.name.startsWith('"'))) {
      const values = type.union.map(l => l.name.substring(1, l.name.length - 1).replace('-', '_').toLocaleUpperCase());
      return `\`enum ${type.name} { ${values.join(', ')} }\``;
    }
  }
}

/**
 * @param {Documentation.Member} member
 * @returns {string}
 */
function fullName(member) {
  if (member.enclosingMethod) {
    const method = member.enclosingMethod;
    let fqn = `${toTitleCase(method.clazz.varName)}.${method.name}`;
    if (member.kind === 'property')
      fqn += '.' + member.name;
    return fqn;
  }
  return `${toTitleCase(member.clazz.varName)}.${member.name}`;
}

module.exports = { JavaFormatter };
