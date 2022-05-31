// @ts-check
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

const rootDir = path.join(__dirname, '..');

/**
 * @param {string} version 
 */
function removeVersion(version) {
  for (const lang of ['nodejs', 'python', 'java', 'dotnet']) {
    rimraf.sync(path.join(rootDir, lang, 'versioned_sidebars', `version-${version}-sidebars.json`));
    rimraf.sync(path.join(rootDir, lang, 'versioned_docs', `version-${version}`));
    const versions = JSON.parse(fs.readFileSync(path.join(rootDir, lang, 'versions.json'), 'utf-8'));
    const newVersions = versions.filter(v => v !== version);
    fs.writeFileSync(path.join(rootDir, lang, 'versions.json'), JSON.stringify(newVersions, null, 2) + '\n');
  }
}

/**
 * @param {string} currentVersion
 */
function removeStaleMinorVersions(currentVersion) {
  const kKeepRecentMinorVersions = 3;
  const [currentMajorVersion, currentMinorVersion] = currentVersion.split('.').map(v => parseInt(v, 10));
  /** @type {string[]} */
  const existingVersions = require(path.join(rootDir, 'nodejs', 'versions.json'));
  for (const version of existingVersions) {
    const [majorVersion, minorVersion] = version.split('.').map(v => parseInt(v, 10));
    if (currentMajorVersion === majorVersion && minorVersion <= (currentMinorVersion - kKeepRecentMinorVersions))
      removeVersion(version);
  }
}

if (!process.argv[2]) {
  console.error([
    'Usage: node versions.js --delete <version>',
    'Usage: node versions.js --delete-stale-minor-versions <version>',
  ].join('\n'));
  process.exit(1);
}

switch (process.argv[2]) {
  case '--delete':
    if (!process.argv[3])
      throw new Error('Missing version');
    removeVersion(process.argv[3]);
    break;

  case '--delete-stale-minor-versions':
    if (!process.argv[3])
      throw new Error('Missing version');
    removeStaleMinorVersions(process.argv[3]);
    break;

  default:
    throw new Error('Unknown command: ' + process.argv[2]);
}
