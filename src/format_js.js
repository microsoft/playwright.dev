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
class JavaScriptFormatter {
  formatMember(member) {
    let text;
    let args = [];
    if (member.kind === 'property')
      text = `${member.clazz.varName}.${member.alias}`;

    if (member.kind === 'event')
      text = `${member.clazz.varName}.on('${member.alias.toLowerCase()}')`;

    if (member.kind === 'method') {
      args = member.argsArray;
      const signature = renderJSSignature(args);
      text = `${member.clazz.varName}.${member.alias}(${signature})`;
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

  preprocessComment(spec) {
    return spec;
  }
}

module.exports = { JavaScriptFormatter };
