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
const { Generator } = require('./generator');
const { JavaScriptFormatter } = require('./format_js');
const { PythonFormatter } = require('./format_python');
const { JavaFormatter } = require('./format_java');
const { CSharpFormatter } = require('./format_csharp');

(async () => {
  new Generator('js', path.join(__dirname, '..', 'nodejs', 'docs'), new JavaScriptFormatter());
  new Generator('python', path.join(__dirname, '..', 'python', 'docs'), new PythonFormatter());
  new Generator('java', path.join(__dirname, '..', 'java', 'docs'), new JavaFormatter());
  new Generator('csharp', path.join(__dirname, '..', 'dotnet', 'docs'), new CSharpFormatter());

  await updateStarsButton();
})().catch(error => {
  console.error(error);
  process.exit(error);
});

async function updateStarsButton() {
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
        if (res.statusCode >= 200 && res.statusCode < 300)
          resolve(JSON.parse(data));
        else
          reject(new Error(`Request failed with status code ${res.statusCode}: ${data}`));
      })
      res.on('error', (error) => reject(error))
    });
  });
  const roundedStarsCount = Math.floor(repoInfoResponse.stargazers_count / 1000);
  let content = (await fs.promises.readFile(kGitHubStarsButtonSource, 'utf8')).toString();
  content = content.replace(/(STARS = ')(\d+)(k\+';)/, `$1${roundedStarsCount}$3`);
  await fs.promises.writeFile(kGitHubStarsButtonSource, content);
}
