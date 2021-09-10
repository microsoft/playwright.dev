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
const { toTitleCase, renderJSSignature } = require('./generator');
/** @typedef {import('./generator').GeneratorFormatter} GeneratorFormatter */

/**
 * @implements {GeneratorFormatter}
 */
class JavaFormatter {
  formatMember(member) {
    let text;
    let args = [];
    if (member.kind === 'property')
      text = `${toTitleCase(member.clazz.varName)}.${member.alias}()`;

    if (member.kind === 'event')
      text = `${toTitleCase(member.clazz.varName)}.on${toTitleCase(member.alias)}(handler)`;

    if (member.kind === 'method' ) {
      args = member.argsArray;
      const signature = renderJSSignature(args);
      text = `${toTitleCase(member.clazz.varName)}.${member.alias}(${signature})`;
    }
    return [{ text, args }];
  }

  formatArgumentName(name) {
    return name;
  }

  formatTemplate(text) {
    return`<${text}>`;
  }

  formatFunction(args, ret, type) {
    if (type.args.length !== 1)
      throw new Error('Unsupported number of arguments in function: ' + type);
    if (!type.returnType)
      return "[Consumer]<" + args + ">";
    if (type.returnType.name === 'boolean')
      return "[Predicate]<" + args + ">";
    throw new Error('Unknown java type for function: ' + type);
  }

  formatPromise(text) {
    return text;
  }

  /**
   * @param {Documentation.Type} type 
   * @param {string} direction
   * @param {Documentation.Member} member
   */
  renderType(type, direction, member) {
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
    }
    return `[${text}]`;
  }

  preprocessComment(spec) {
    spec = spec.filter(n => !n.text || !n.text.startsWith('extends: [EventEmitter]'));
    spec.forEach(n => {
      if (n.text === 'extends: [Error]')
        n.text = 'extends: [PlaywrightException]';
    });
    return spec;
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
