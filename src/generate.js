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
const https = require('https');
const chokidar = require('chokidar');
const { Generator } = require('./generator');
const { JavaScriptFormatter } = require('./format_js');
const { PythonFormatter } = require('./format_python');
const { JavaFormatter } = require('./format_java');
const { CSharpFormatter } = require('./format_csharp');

const isWatch = process.argv.includes('--watch');
const watchProject = process.argv[3];
const forcedVersion = process.argv.find(arg => arg.startsWith('--version='))?.substring('--version='.length);

const srcDir = path.join(process.env.SRC_DIR || '../playwright', 'docs', 'src');

const lang2Folder = {
  'js': 'nodejs',
  'python': 'python',
  'java': 'java',
  'csharp': 'dotnet',
}

/**
 * @param {string} lang
 * @returns {Promise<string>}
 */
async function getVersionForLanguageBinding(lang) {
  switch (lang) {
    case 'js':
      const npmResponse = await fetch('https://registry.npmjs.org/playwright');
      const npmData = await npmResponse.json();
      return npmData['dist-tags'].latest;

    case 'java':
      const githubResponse = await fetch('https://api.github.com/repos/microsoft/playwright-java/releases');
      const githubData = await githubResponse.json();
      return githubData[0].tag_name;

    case 'python':
      const pypiResponse = await fetch('https://pypi.org/pypi/playwright/json');
      const pypiData = await pypiResponse.json();
      return pypiData.info.version;

    case 'csharp':
      const nugetResponse = await fetch('https://api.nuget.org/v3-flatcontainer/microsoft.playwright/index.json');
      const nugetData = await nugetResponse.json();
      const stableVersions = nugetData.versions.filter(version => !version.includes('-'));
      return stableVersions.pop();

    default:
      throw new Error(`Unknown language binding ${lang}`);
  }
}

const versionCache = new Map();

/**
 * @param {string} lang
 * @returns {Promise<string>}
 */
async function getVersionForLanguageBindingCached(lang) {
  if (forcedVersion)
    return forcedVersion;
  if (!versionCache.has(lang)) {
    process.stdout.write(`retrieving package version for ${lang}...`);
    const version = await getVersionForLanguageBinding(lang);
    process.stdout.write(`done\n`);
    versionCache.set(lang, version);
  }
  return versionCache.get(lang);
}

async function generateDocsForLanguages () {
  console.log(`generating docs for js`);
  new Generator({
    lang: 'js',
    version: await getVersionForLanguageBindingCached('js'),
    srcDir,
    outDir: path.join(__dirname, '..', 'nodejs', 'docs'),
    formatter: new JavaScriptFormatter(),
  });

  console.log(`generating docs for python`);
  new Generator({
    lang: 'python',
    version: await getVersionForLanguageBindingCached('python'),
    srcDir,
    outDir: path.join(__dirname, '..', 'python', 'docs'),
    formatter: new PythonFormatter(),
  });

  console.log(`generating docs for java`);
  new Generator({
    lang: 'java',
    version: await getVersionForLanguageBindingCached('java'),
    srcDir,
    outDir: path.join(__dirname, '..', 'java', 'docs'),
    formatter: new JavaFormatter(),
  });

  console.log(`generating docs for csharp`);
  new Generator({
    lang: 'csharp',
    version: await getVersionForLanguageBindingCached('csharp'),
    srcDir,
    outDir: path.join(__dirname, '..', 'dotnet', 'docs'),
    formatter: new CSharpFormatter(),
  });
};

/**
 * @param {'add'|'addDir'|'change'|'unlink'|'unlinkDir'} event
 * @param {string} from
 */
async function syncWithWorkingDirectory(event, from) {
  const to = path.join(path.join(__dirname, '..', path.relative(path.join(__dirname, '..', lang2Folder[watchProject]), from)));
  switch (event) {
    case 'addDir':
      if (!fs.existsSync(to))
        fs.mkdirSync(to);
      break;
    case 'add':
    case 'change':
      fs.copyFileSync(from, to);
      break;
    case 'unlink':
      fs.unlinkSync(to);
    case 'unlinkDir':
      fs.rmdirSync(to);
      break;
  }
}

(async () => {
  Error.stackTraceLimit = 100;

  if (isWatch) {
    chokidar.watch(srcDir, { ignoreInitial: true }).on('all', (event, path) => {
      generateDocsForLanguages().catch((error) => {
        console.error(`Error auto syncing docs (generating): ${error}`);
      })
    });
    chokidar.watch(path.join(__dirname, '..', lang2Folder[watchProject])).on('all', (event, path) => {
      syncWithWorkingDirectory(event, path).catch(error => {
        console.error(`Error auto syncing docs (mirroring): ${error}`);
      })
    });
    await generateDocsForLanguages();
  } else {
    await generateDocsForLanguages();
    await updateStarsButton();
  }

})().catch(error => {
  console.error(error);
  process.exit(1);
});

async function updateStarsButton() {
  console.log(`updating "stars" button`);
  const kMagicComment = '// NOTE: this line is generated by src/generate.js. Do not change!';
  const kGitHubStarsButtonSource = path.join(__dirname, 'components/GitHubStarButton/index.tsx');
  const repoInfoResponse = await new Promise((resolve, reject) => {
    https.get('https://api.github.com/repos/microsoft/playwright', {
      headers: {
        'User-Agent': 'playwright-docs-generator',
      },
    }, res => {
      let data = '';
      res.on('data', chunk => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300)
          resolve(JSON.parse(data));
        else
          reject(new Error(`Request failed with status code ${res.statusCode}: ${data}`));
      })
      res.on('error', (error) => reject(error))
    });
  });
  const roundedStarsCount = Math.floor(repoInfoResponse.stargazers_count / 1000);
  let lines = (await fs.promises.readFile(kGitHubStarsButtonSource, 'utf8')).split('\n');
  const starLineIndex = lines.findIndex(line => line.includes(kMagicComment));
  lines[starLineIndex] = `const STARS = '${roundedStarsCount}k+'; ${kMagicComment}`;
  await fs.promises.writeFile(kGitHubStarsButtonSource, lines.join('\n'));
}
