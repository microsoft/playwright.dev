// @ts-check
const fs = require("fs");
const path = require("path");

const { Octokit } = require("@octokit/core");

const kLanguageToGitHubRepo = {
  nodejs: 'microsoft/playwright',
  java: 'microsoft/playwright-java',
  dotnet: 'microsoft/playwright-dotnet',
  python: 'microsoft/playwright-python',
}
const kRootPath = path.join(__dirname, '..');
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

(async () => {
  for (const [language, repo] of Object.entries(kLanguageToGitHubRepo)) {
    const releaseNoteFiles = findReleaseNoteFiles(language);
    const releaseNotes = await buildReleaseNotes(repo);
    writeReleaseNotes(releaseNoteFiles, releaseNotes);
  }
})().catch(err => {
  console.error(err)
  process.exit(1)
})

/**
 * @param {string} language 
 * @returns {string[]}
 */
function findReleaseNoteFiles(language) {
  const files = [];
  const languageRoot = path.join(kRootPath, language)

  // thats for the 'next' version
  files.push(path.join(languageRoot, 'docs', 'release-notes.mdx'));

  const versionedDocsPath = path.join(languageRoot, 'versioned_docs');
  for (const version of fs.readdirSync(versionedDocsPath))
    files.push(path.join(versionedDocsPath, version, 'release-notes.mdx'));
  return files;
}

/**
 * @param {string} ownerRepoCombination
 * @returns {Promise<string>}
 */
async function buildReleaseNotes(ownerRepoCombination) {
  const [owner, repo] = ownerRepoCombination.split('/');
  const payload = await octokit.request('GET /repos/{owner}/{repo}/releases', {
    owner,
    repo,
  })
  let releaseNotes = `---
  id: release-notes
  title: "Release notes"
---` + '\n\n';
  for (const release of payload.data) {
    releaseNotes += `## [${release.name || 'N/A'}](https://github.com/${ownerRepoCombination}/releases/tag/${release.name})` + '\n\n';
    releaseNotes += enrichWithSmartGitHubLinks(fixHeadingNestingLevels(release.body), ownerRepoCombination) + '\n\n';
  }
  return releaseNotes;
}

/**
 * @param {string[]} releaseNoteFiles
 * @param {string} releaseNotes
 */
function writeReleaseNotes(releaseNoteFiles, releaseNotes) {
  for (const file of releaseNoteFiles) {
    fs.writeFileSync(file, releaseNotes);
  }
}

/**
 * @param {string} input 
 */
function fixHeadingNestingLevels(input) {
  const lines = input.split('\n');
  let output = '';
  for (const line of lines) {
    const match = /^(#+) (.*)/.exec(line);
    if (match) {
      const [, heading, text] = match;
      const headingSize = heading.length <= 3 ? 3 : heading.length;
      output += `${'#'.repeat(headingSize)} ${text}\n`;
    } else {
      output += line;
    }
    output += '\n';
  }
  return output;
}

/**
 * 
 * @param {string} input 
 * @param {string} repo 
 */
function enrichWithSmartGitHubLinks(input, repo) {
  const lines = input.split('\n');
  let output = '';
  for (let line of lines) {
    line = line.replace(/^#(\d{3,}) (.*)/, `[$1](https://github.com/${repo}/issue/$1)`)
    output += line;
    output += '\n';
  }
  return output
}
