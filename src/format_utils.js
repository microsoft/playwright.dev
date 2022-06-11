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
 * @returns {MarkdownNode[]}
 */
function generateTabGroups(spec, language) {
  /** @type {MarkdownNode[]} */
  const newSpec = [];
  for (let i = 0; i < spec.length; ++i) {
    /** @type {{value: string, groupId: string, spec: md.MarkdownNode}[]} */
    const tabs = [];
    for (;i < spec.length; i++) {
      const tabInfo = parseTabInfo(spec[i].codeLang);
      if (!tabInfo)
        break

      const codeLanguage = parseLanguage(spec[i].codeLang);
      // Language filter
      if (codeLanguage && codeLanguage !== language)
        continue;

      const [groupId, value] = tabInfo.split('-');
      tabs.push({ groupId: groupId + '-flavor', value, spec: spec[i] });
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
          throw new Error('Dupe tabs: ' + [...values] + ' ' + tab.value + '\n' + md.render(spec));
        values.add(tab.value);
      }

      const tokens = [];
      tokens.push(`<Tabs
  groupId="${groupId}"
  defaultValue="${tabs[0].value}"
  values={[`);
      tokens.push(...tabs.map((t, i) => `    {label: '${tabLabel(groupId, t.value)}', value: '${t.value}'}${ i === tabs.length - 1 ? '' : ','}`))
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

/**
 * @param {string} codeLang
 */
function parseTabInfo(codeLang) {
  if (!codeLang)
    return '';
  if (codeLang === 'python async')
    return 'python-async';
  if (codeLang === 'python sync')
    return 'python-sync';
  const tab = codeLang.match(/ tab=([\w\d-]+)/);
  return tab ? tab[1] : '';
}

/**
 * @param {string} codeLang
 */
function parseLanguage(codeLang) {
  const lang = codeLang.match(/ lang=([\w\d]+)/);
  if (lang)
    return lang[1];
  if (codeLang.startsWith('js') || codeLang.startsWith('ts'))
    return 'js';
  if (codeLang.startsWith('py'))
    return 'python';
  if (codeLang.startsWith('csharp'))
    return 'csharp';
  if (codeLang.startsWith('java'))
    return 'java';
}

module.exports = {
  generateTabGroups,
}
