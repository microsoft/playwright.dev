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
const documentation = require('./documentation');
/** @typedef {import('./generator').GeneratorFormatter} GeneratorFormatter */
/** @typedef {import('./markdown').MarkdownNode} MarkdownNode */

/**
 * @param {MarkdownNode[]} spec
 * @param {string} language
 * @returns {MarkdownNode[]}
 */
function generateTabGroups(spec, language) {
  return documentation.processCodeGroups(spec, language, tabs => {
    tabs.forEach(tab => tab.groupId += '-flavor');
    tabs.sort((t1, t2) => tabWeight(t2.value) - tabWeight(t1.value));

    const tokens = [];
    tokens.push(`<Tabs
  groupId="${tabs[0].groupId}"
  defaultValue="${tabs[0].value}"
  values={[`);
    tokens.push(...tabs.map((t, i) => `    {label: '${tabLabel(t.groupId, t.value)}', value: '${t.value}'}${ i === tabs.length - 1 ? '' : ','}`))
    tokens.push(`  ]
}>`);
    tokens.push(...tabs.map(t => `<TabItem value="${t.value}">

${md.render([t.spec])}
</TabItem>`));
    tokens.push(`</Tabs>`);

    return [{
        type: 'text',
        text: tokens.join('\n')
    }];
  });
}

/**
 * @param {MarkdownNode[]} spec
 * @returns {MarkdownNode[]}
 */
function renderHTMLCard(spec) {
  /** @type {MarkdownNode[]} */
  const result = [];
  for (const node of spec) {
    if (node.type !== 'code' || node.codeLang !== 'html card') {
      result.push(node);
      continue;
    }
    const tokens = [];
    tokens.push(`<HTMLCard>`);
    tokens.push(`<div>`);
    tokens.push(...node.lines);
    tokens.push('</div>');
    tokens.push('');
    tokens.push('```html');
    tokens.push(...node.lines);
    tokens.push('```');
    tokens.push('</HTMLCard>');
    result.push({
        type: 'text',
        text: tokens.join('\n')
    });
  }
  return result;
}

/**
 * @param {string} groupId
 * @param {string} value
 */
function tabLabel(groupId, value) {
  if (groupId === 'python-flavor' && value === 'sync')
    return 'Sync';
  if (groupId === 'python-flavor' && value === 'async')
    return 'Async';
  if (value === 'ts')
    return 'TypeScript';
  if (value === 'js')
    return 'JavaScript';
  if (value === 'library')
    return 'Library';
  if (value === 'bash')
    return 'Bash';
  if (value === 'batch')
    return 'Batch';
    if (value === 'powershell')
    return 'PowerShell'
  throw new Error(`Unknown label type: ${value}`)
}

/**
 * @param {string} type
 * @returns {number}
 */
function tabWeight(type) {
  const weights = new Map([
    ['ts', 2],
    ['js', 1],
    ['library', 0],

    ['bash', 3],
    ['powershell', 2],
    ['batch', 1],

    ['sync', 2],
    ['async', 1],
  ])
  if (!weights.has(type))
    throw new Error(`Unrecognized language: ${type}`)
  return weights.get(type);
}

module.exports = {
  generateTabGroups,
  renderHTMLCard,
}
