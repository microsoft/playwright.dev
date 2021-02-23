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

const fs = require('fs');
const path = require('path');
const md = require('./markdown');
const { parseApi } = require('./api_parser');
const Documentation = require('./documentation');

/** @typedef {import('./documentation').Type} Type */
/** @typedef {import('./markdown').MarkdownNode} MarkdownNode */

const DIR_SRC = path.join(process.env.SRC_DIR, 'docs', 'src');
const commonSnippets = new Set(['html', 'yml', 'yaml', 'json', 'groovy', 'html', 'sh']);

class Generator {
  links = new Map();
  rLinks = new Map();

  /**
   * @param {string} lang
   * @param {string} outDir
   * @param {{
   *   formatMember: function(Documentation.Member): { text: string, args: Documentation.Member[] },
   *   formatArgumentName: function(string): string,
   *   formatTemplate: function(string): string,
   *   formatFunction: function(string): string,
   *   formatPromise: function(string): string,
   *   renderType: function(string, string): string,
   * }} config
   */
  constructor(lang, outDir, config) {
    this.lang = lang;
    this.outDir = outDir;
    /** @type {Set<string>} */
    this.sourceFiles = new Set();
    listFiles(DIR_SRC, DIR_SRC, this.sourceFiles);
    this.config = config;
    this.documentation = parseApi(path.join(DIR_SRC, 'api'));
    this.documentation.filterForLanguage(lang);
    this.documentation.setLinkRenderer(item => {
      const { clazz, member, param, option } = item;
      if (param)
        return `\`${config.formatArgumentName(param)}\``;
      if (option)
        return `\`${config.formatArgumentName(option)}\``;
      if (clazz)
        return `[${clazz.name}]`;
      return this.createMemberLink(member);
    });

    this.generatedLinksSuffix = '';
    {
      const links = fs.readFileSync(path.join(__dirname, '..', 'common', 'links.md')).toString();
      const langLinks = fs.readFileSync(path.join(__dirname, '..', 'common', `links-${lang}.md`)).toString();
      const localLinks = [];
      for (const clazz of this.documentation.classesArray)
        localLinks.push(`[${clazz.name}]: ./api/class-${clazz.name.toLowerCase()}.md "${clazz.name}"`);
        this.generatedLinksSuffix = '\n' + localLinks.join('\n') + '\n' + links + '\n' + langLinks;
    }

    for (const clazz of this.documentation.classesArray)
      this.generateClassDoc(clazz);

    for (const name of fs.readdirSync(path.join(DIR_SRC))) {
      if (name.startsWith('links') || name === 'api')
        continue;
      this.generateDoc(name);
    }
  }

  /**
   * @param {Documentation.Class} clazz 
   */
  generateClassDoc(clazz) {
    /** @type {MarkdownNode[]} */
    const result = [];
    result.push({
      type: 'text',
      text: `---
id: class-${clazz.name.toLowerCase()}
title: "${clazz.name}"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
`});
    result.push(...this.formatComment(clazz.spec));
    result.push({
      type: 'text',
      text: ''
    });
    clazz.membersArray.sort((m1, m2) => {
      const k1 = m1.kind + toSnakeCase(m1.alias.replace(/\$\$eval/, '$$eval2'));
      const k2 = m2.kind + toSnakeCase(m2.alias.replace(/\$\$eval/, '$$eval2'));
      return k1.localeCompare(k2);
    });
    result.push(...this.generateClassToc(clazz));
    if (clazz.extends && clazz.extends !== 'EventEmitter' && clazz.extends !== 'Error') {
      const superClass = this.documentation.classes.get(clazz.extends);
      result.push(...this.generateClassToc(superClass));
    }
    for (const member of clazz.membersArray) {
      // Iterate members
      /** @type {MarkdownNode} */
      const memberNode = { type: 'h2', children: [] };
      const { text, args } = this.config.formatMember(member);
      memberNode.text = text;
      memberNode.children.push(...args.map(a => this.renderProperty(`\`${this.config.formatArgumentName(a.alias)}\``, a.type, a.spec, 'in')));

      // Append type
      if (member.type && member.type.name !== 'void') {
        let name;
        switch (member.kind) {
          case 'event': name = 'type:'; break;
          case 'property': name = this.lang === 'java' ? 'returns:' : 'type:'; break;
          case 'method': name = 'returns:'; break;
        }
        memberNode.children.push(this.renderProperty(name, member.type, undefined, 'out', member.async));
      }

      // Append member doc
      memberNode.children.push(...this.formatComment(member.spec));
      result.push(memberNode);
    }
    fs.mkdirSync(path.join(this.outDir, 'api'), { recursive: true });
    const output = [md.render(result), this.generatedLinksSuffix].join('\n');
    fs.writeFileSync(path.join(this.outDir, 'api', `class-${clazz.name.toLowerCase()}.mdx`), this.mdxLinks(output));
  }

  /**
   * @param {string} text
   */
  mdxLinks(text) {
    for (const name of this.sourceFiles)
      text = text.replace(new RegExp('\\' + name, 'g'), name + 'x');
    return text;
  }

  /**
   * @param {MarkdownNode[]} spec
   * @return {MarkdownNode[]}
   */
  formatComment(spec) {
    if (this.lang === 'python') {
      /** @type {MarkdownNode[]} */
      const newSpec = [];
      for (let i = 0; i < spec.length; ++i) {
        if (spec[i].codeLang === 'python async') {
          if (spec[i + 1].codeLang !== 'python sync') {
            console.error(spec[i]);
            throw new Error('Bad Python snippet pair');
          }
          spec[i].codeLang = 'py';
          spec[i + 1].codeLang = 'py';
          const text = `<Tabs
  groupId="python-flavor"
  defaultValue="sync"
  values={[
    {label: 'Sync', value: 'sync'},
    {label: 'Async', value: 'async'}
  ]
}>
<TabItem value="sync">
${md.render([spec[i+1]])}
</TabItem>
<TabItem value="async">
${md.render([spec[i]])}
</TabItem>
</Tabs>`;
          newSpec.push({
            type: 'text',
            text
          });
          ++i;
        } else {
          newSpec.push(spec[i]);
        }
      }
      spec = newSpec;
    } else if (this.lang === 'java') {
      spec = spec.filter(n => !n.text || !n.text.startsWith('extends: [EventEmitter]'));
    }
    spec = spec.filter(c => {
      // No lang or common lang - Ok.
      if (!c.codeLang || commonSnippets.has(c.codeLang))
        return true;

      // Our lang - Ok.
      if (c.codeLang === this.lang || c.codeLang === highlighterName(this.lang)) {
        c.codeLang = highlighterName(this.lang);
        return true;
      }

      // '* browser' - always Ok
      // 'sh python' - Ok for Python.
      const tokens = c.codeLang.split(' ');
      if (tokens[1] === 'browser' || tokens[1] === this.lang) {
        c.codeLang = highlighterName(tokens[0]);
        return true;
      }
      // python * - Ok for Python
      if (tokens[0] === this.lang) {
        c.lines.unshift('# ' + tokens[1], '');
        c.codeLang = highlighterName(this.lang);
        return true;
      }
      return false;
    });
    return spec;
  }

  /**
   * @param {string} name 
   */
  generateDoc(name) {
    if (name.includes('-js') || name.includes('-python') || name.includes('-java') || name.includes('sharp'))
      if (!name.includes('-' + this.lang))
        return;
    const content = fs.readFileSync(path.join(DIR_SRC, name)).toString();
    let nodes = this.filterForLanguage(md.parse(content));
    this.documentation.renderLinksInText(nodes);
    for (const node of nodes) {
      if (node.text === '<!-- TOC -->')
        node.text = md.generateToc(nodes);
    }
    nodes = this.formatComment(nodes);
    md.visitAll(nodes, node => {
      if (node.children)
        node.children = this.formatComment(node.children);
    });
    fs.mkdirSync(this.outDir, { recursive: true });
    let output = [md.render(nodes), this.generatedLinksSuffix].join('\n');
    output = output.replace(`"
---`, `"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';`);
    const outName = name.replace(new RegExp('-' + this.lang), '') + 'x';
    fs.writeFileSync(path.join(this.outDir, outName), this.mdxLinks(output));
  }

  /**
   * @param {MarkdownNode[]} nodes
   * @return {MarkdownNode[]}
   */
  filterForLanguage(nodes) {
    return nodes.filter(node => {
      if (!node.children)
        return true;
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        if (child.type !== 'li' || child.liType !== 'bullet' || !child.text.startsWith('langs:'))
          continue;
        const only = child.text.substring('langs:'.length).split(',').map(l => l.trim());
        node.children.splice(i, 1);
        return only.includes(this.lang);
      }
      return true;
    });
  }

  /**
   * @param {string} file
   * @param {string} text
   */
  createLink(file, text) {
    const key = file + '#' + text;
    if (this.links.has(key))
      return this.links.get(key);
    const baseLink = file + '#' + text.toLowerCase().split(',').map(c => c.replace(/[^a-z_]/g, '')).join('-');
    let link = baseLink;
    let index = 0;
    while (this.rLinks.has(link))
      link = baseLink + '-' + (++index);
    const result = `[${text}](${link})`;
    this.links.set(key, result);
    this.rLinks.set(link, text);
    return result;
  }

  /**
   * @param {Documentation.Member} member
   * @return {string}
   */
  createMemberLink(member) {
    const file = `./api/class-${member.clazz.name.toLowerCase()}.md`;
    return this.createLink(file, this.config.formatMember(member).text);
  }

  /**
   * @param {Documentation.Class} clazz
   * @return {MarkdownNode[]}
   */
  generateClassToc(clazz) {
    /** @type {MarkdownNode[]} */
    const result = [];
    for (const member of clazz.membersArray) {
      result.push({
        type: 'li',
        liType: 'default',
        text: this.createMemberLink(member)
      });
    }
    return result;
  }

  /**
   * @param {string} name
   * @param {Type} type
   * @param {MarkdownNode[]} spec
   * @param {'in'|'out'} direction
   * @param {boolean=} async
   */
  renderProperty(name, type, spec, direction, async) {
    let comment = '';
    if (spec && spec.length)
      comment = spec[0].text;
    let children;
    const properties = type.deepProperties();
    if (properties && properties.length)
      children = properties.map(p => this.renderProperty(`\`${p.name}\``, p.type, p.spec, direction, false))
    else if (spec && spec.length > 1)
      children = spec.slice(1).map(s => md.clone(s));

    let typeText = this.renderType(type, direction);
    if (async)
      typeText = this.config.formatPromise(typeText);

    /** @type {MarkdownNode} */
    const result = {
      type: 'li',
      liType: 'default',
      text: `${name} <${typeText}>${comment ? ' ' + comment : ''}`,
      children
    };
    return result;
  }


  /**
   * @param {Documentation.Type} type
   * @param {'in'|'out'} direction
   */
  renderType(type, direction) {
    if (type.union)
      return type.union.map(l => this.renderType(l, direction)).join('|');
    if (type.templates)
      return `${this.renderTypeName(type.name, direction)}${this.config.formatTemplate(type.templates.map(l => this.renderType(l, direction)).join(', '))}`;
    if (type.args)
      return `${this.config.formatFunction(type.args.map(l => this.renderType(l, direction)).join(', '))}${type.returnType ? ':' + this.renderType(type.returnType, direction) : ''}`;
    if (type.name.startsWith('"'))
      return type.name;
    return `${this.renderTypeName(type.name, direction)}`;
  }

  /**
   * @param {string} typeName
   * @param {'in'|'out'} direction
   */
  renderTypeName(typeName, direction) {
    return `[${this.config.renderType(typeName, direction)}]`;
  }
}

/**
 * @param {string} name
 */
function toSnakeCase(name) {
  const toSnakeCaseRegex = /((?<=[a-z0-9])[A-Z]|(?!^)[A-Z](?=[a-z]))/g;
  return name.replace(toSnakeCaseRegex, `_$1`).toLowerCase();
}

/**
 * @param {Documentation.Member[]} args
 * @return {string}
 */
function renderJSSignature(args) {
  const tokens = [];
  let hasOptional = false;
  for (const arg of args) {
    const name = arg.alias;
    const optional = !arg.required;
    if (tokens.length) {
      if (optional && !hasOptional)
        tokens.push(`[, ${name}`);
      else
        tokens.push(`, ${name}`);
    } else {
      if (optional && !hasOptional)
        tokens.push(`[${name}`);
      else
        tokens.push(`${name}`);
    }
    hasOptional = hasOptional || optional;
  }
  if (hasOptional)
    tokens.push(']');
  return tokens.join('');
}

/**
 * @param {Documentation.Member[]} args
 * @return {string}
 */
function renderPythonSignature(args) {
  const argNames = args.filter(a => a.required).map(a => toSnakeCase(a.name));
  if (args.find(a => !a.required))
    argNames.push('**kwargs');
  return argNames.join(', ');
}

/**
 * @param {Documentation.Member} arg
 * @return {Documentation.Member[]}
 */
function expandPythonOptions(arg) {
  return arg.name == 'options' ? arg.type.properties : [arg];
}

new Generator('js', path.join(__dirname, '..', 'nodejs', 'docs'), {
  formatMember: member => {
    let text;
    let args = [];
    if (member.kind === 'property')
      text = `${member.clazz.varName}.${member.name}`;
  
    if (member.kind === 'event')
      text = `${member.clazz.varName}.on('${member.name.toLowerCase()}')`;
  
    if (member.kind === 'method') {
      args = member.argsArray;
      const signature = renderJSSignature(args);
      text = `${member.clazz.varName}.${member.alias}(${signature})`;
    }
    return { text, args };
  },
  formatArgumentName: name => name,
  formatTemplate: text => `<${text}>`,
  formatFunction: text => `[function]\\(${text}\\)`,
  formatPromise: text => `[Promise]<${text}>`,
  renderType: text => {
    switch (text) {
      case 'int': return 'number';
      case 'float': return 'number';
      case 'path': return 'string';
      case 'any': return 'Object';
    }
    return text;
  },
});

new Generator('python', path.join(__dirname, '..', 'python', 'docs'), {
  formatMember: member => {
    let text;
    const args = [];
    if (member.kind === 'property')
      text = `${toSnakeCase(member.clazz.varName)}.${toSnakeCase(member.alias)}`;
  
    if (member.kind === 'event')
      text = `${toSnakeCase(member.clazz.varName)}.on("${member.alias.toLowerCase()}")`;
  
    if (member.kind === 'method') {
      for (const arg of member.argsArray)
        args.push(...expandPythonOptions(arg));
      const signature = renderPythonSignature(args);
      let isGetter = !signature && !member.async && !!member.type;
      if (member.name.startsWith('is') || member.name.startsWith('as'))
        isGetter = false;
      if (isGetter)
        text = `${toSnakeCase(member.clazz.varName)}.${toSnakeCase(member.alias)}`;
      else
        text = `${toSnakeCase(member.clazz.varName)}.${toSnakeCase(member.alias)}(${signature})`;
    }
    return { text, args };
  },
  formatArgumentName: name => toSnakeCase(name),
  formatTemplate: text => `\\[${text}\\]`,
  formatFunction: text => `[Callable]\\[${text}\\]`,
  formatPromise: text => text,
  renderType: (text, direction) => {
    switch (text) {
      case 'RegExp': return 'Pattern';
      case 'any': return 'Any';
      case 'function': return 'Callable';
      case 'path': return direction === 'out' ? 'pathlib.Path' : 'Union]\\[[str], [pathlib.Path]\\';
      case 'Array': return 'List';
      case 'Object': return 'Dict';
      case 'null': return 'NoneType';
      case 'void': return 'NoneType';
      case 'boolean': return 'bool';
      case 'string': return 'str';
    }
    return text;
  },
});

new Generator('java', path.join(__dirname, '..', 'java', 'docs'), {
  formatMember: member => {
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
    return { text, args };
  },
  formatArgumentName: name => name,
  formatTemplate: text => `<${text}>`,
  formatFunction: text => `[function]\\(${text}\\)`,
  formatPromise: text => text,
  renderType: (text, direction) => {
    switch (text) {
      case 'any': return 'Object';
      case 'Array': return 'List';
      case 'float': return 'double';
      case 'function': return 'Predicate';
      case 'null': return 'null';
      case 'Object': return 'Map';
      case 'path': return 'Path';
      case 'RegExp': return 'Pattern';
      case 'string': return 'String';
      // Escape '[' and ']' so that they don't break markdown links like [byte[]](link)
      case "Buffer": return "byte&#91;&#93;";
      case "EvaluationArgument": return "Object";
      case "Readable": return "InputStream";
      case "Serializable": return "Object";
      case "URL": return "String";
    }
    return text;
  },
});

/**
 * @param {string} name
 */
function toTitleCase(name) {
  return name[0].toUpperCase() + name.substring(1);
}


/**
 * @param {string} lang
 */
function highlighterName(lang) {
  if (lang === 'python')
    return 'py';
  return lang;
}

/**
 * @param {string} dir
 * @param {string} base
 * @param {Set<string>} result
 */
function listFiles(dir, base, result) {
  for (let name of fs.readdirSync(dir)) {
    const f = path.join(dir, name);
    if (fs.lstatSync(f).isDirectory()) {
      listFiles(f, base, result);
    } else {
      name = name.replace(/(-js\.|-python\.|-java\.|-sharp\.)/, '.');
      if (name.endsWith('.md'))
        result.add('./' + path.relative(base, path.join(dir, name)));
    }
  }
}
