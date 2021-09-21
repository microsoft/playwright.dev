// "remove-last-version-sidebars": "rm nodejs/versioned_sidebars/version-1.15-sidebars.json && rm python/versioned_sidebars/version-1.15-sidebars.json && rm java/versioned_sidebars/version-1.15-sidebars.json && rm dotnet/versioned_sidebars/version-1.15-sidebars.json",
// "remove-last-version-docs": "rm -rf nodejs/versioned_docs/version-1.15 && rm -rf python/versioned_docs/version-1.15 && rm -rf java/versioned_docs/version-1.15 && rm -rf dotnet/versioned_docs/version-1.15",
// "remove-last-version-versions": "rm -rf nodejs/versions.json && rm -rf python/versions.json && rm -rf java/versions.json && rm -rf dotnet/versions.json",
// "reversion-last": "npm run remove-last-version-docs && npm run remove-last-version-sidebars && npm run remove-last-version-versions && npm run version-all",

const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

const version = process.argv[2];

for (const lang of ['nodejs', 'python', 'java', 'dotnet']) {
  rimraf.sync(path.join(lang, 'versioned_sidebars', `version-${version}-sidebars.json`));
  rimraf.sync(path.join(lang, 'versioned_docs', `version-${version}`));
  const versions = JSON.parse(fs.readFileSync(path.join(lang, 'versions.json'), 'utf-8'));
  const newVersions = versions.filter(v => v !== version);
  fs.writeFileSync(path.join(lang, 'versions.json'), JSON.stringify(newVersions));
}
