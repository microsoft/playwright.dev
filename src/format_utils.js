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
/** @typedef {import('./generator').GeneratorFormatter} GeneratorFormatter */
/** @typedef {import('./markdown').MarkdownNode} MarkdownNode */

/**
 * @param {MarkdownNode[]} spec
 * @param {string} language
 * @param {string} tabGroupName
 * @returns {MarkdownNode[]}
 */
function generateTabGroup(spec, language, tabGroupName) {
  /** @type {MarkdownNode[]} */
  const newSpec = [];
  for (let i = 0; i < spec.length; ++i) {
    /** @type {{value: string, groupId: string, spec: md.MarkdownNode}[]} */
    const tabs = [];
    for (;i < spec.length; i++) {
      const match = spec[i].codeLang && spec[i].codeLang.match(new RegExp(`^${tabGroupName} ([\\w+-_]+)=([\\w+-_]+)( lang=(\\w+))?`))
      if (!match)
        break
      // Language filter
      if (match[4] && match[4] !== language) {
        continue;
      }
      spec[i].codeLang = match[2];
      tabs.push({ groupId: match[1], value: match[2], spec: spec[i] });
    }
    if (tabs.length) {
      if (tabs.length === 1)
        throw new Error('Bad js tab group: ' + md.render(spec));
      tabs.sort((t1, t2) => tabWeight(t2.value) - tabWeight(t1.value));

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

function tabLabel(type) {
  if (type === 'ts')
    return 'TypeScript';
  if (type === 'js')
    return 'JavaScript';
  if (type === 'library')
    return 'Library';
  if (type === 'bash')
    return 'Bash';
  if (type === 'batch')
    return 'Batch';
    if (type === 'powershell')
    return 'PowerShell'
  throw new Error(`Unknown label type: ${type}`)
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
  ])
  if (!weights.has(type))
    throw new Error(`Unrecognized language: ${type}`)
  return weights.get(type);
}

module.exports = {
  generateTabGroup,
}