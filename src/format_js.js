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
/** @typedef {import('./generator').GeneratorFormatter} GeneratorFormatter */
/** @typedef {import('./markdown').MarkdownNode} MarkdownNode */

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

  /**
   * @param {MarkdownNode[]} spec
   * @returns {MarkdownNode[]}
   */
  preprocessComment(spec) {
    /** @type {MarkdownNode[]} */
    const newSpec = [];
    for (let i = 0; i < spec.length; ++i) {
      const tabs = [];
      let match = spec[i].codeLang && spec[i].codeLang.match(/^js ([\w+-_]+)=([\w+-_]+)/);
      while (match) {
        spec[i].codeLang = 'js';
        tabs.push({ groupId: match[1], value: match[2], spec: spec[i] });
        ++i;
        if (i >= spec.length)
          break;
        match = spec[i].codeLang && spec[i].codeLang.match(/^js ([\w+-_]+)=([\w+-_]+)/);
      }
      if (tabs.length) {
        if (tabs.length === 1)
          throw new Error('Bad js tab group: ' + md.render(spec));

        // Validate group consistency.
        const groupId = tabs[0].groupId;
        const values = new Set();
        for (const tab of tabs) {
          if (tab.groupId !== groupId)
            throw new Error('Mixed group ids: ' + md.render(spec));
          if (values.has(tab.value))
            throw new Error('Dupe tabs: ' + md.render(spec));
          values.add(tab.value);
        }

        const tokens = [];
        tokens.push(`<Tabs
  groupId="${groupId}"
  defaultValue="${tabs[0].value}"
  values={[`);
        tokens.push(...tabs.map((t, i) => `    {label: '${tabLabel(t.value)}', value: '${t.value}'}${ i === tabs.length - 1 ? '' : ','}`))
        tokens.push(`  ]
}>`);
        tokens.push(...tabs.map(t => `<TabItem value="${t.value}">
${md.render([t.spec])}
</TabItem>`));
        tokens.push(`</Tabs>`);

        newSpec.push({
          type: 'text',
          text: tokens.join('\n')
        });
      }
      if (i < spec.length)
        newSpec.push(spec[i]);
    }
    return newSpec;
  }
}

function tabLabel(type) {
  if (type === 'ts')
    return 'TypeScript';
  if (type === 'js')
    return 'JavaScript';
}

module.exports = { JavaScriptFormatter };
