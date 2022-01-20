# playwright.dev

This website is built using [Docusaurus v2](https://v2.docusaurus.io/). Content is pulled from the microsoft/playwright repo.

## Development

### Setup the repo

```sh
npm install
```

The project uses a fork of the [docusaurus-search-local](https://github.com/easyops-cn/docusaurus-search-local) plugin for search. 

### Roll docs

```sh
SRC_DIR=~/code/playwright npm run roll
```

### Remove old release

```sh
rm -rf */versioned_docs/version-1.14
# Remove the version from the following JSON files:
ls */versions.json
```

### Run dev server

```sh
npm run start
```

Note that search indexes are only populated for prod build.

### Run prod build and serve

```sh
npm run build
npm run serve
```

### Running this on Windows

If you don't already, you might need to set the default shell to `bash`. 

```powershell
npm config set script-shell "C:\\Program Files\\git\\bin\\bash.exe"
```

You can revert it later, if you have issues, by doing:

```powershell
npm config delete script-shell
```

In some cases, the `postinstall` script doesn't auto-run after `npm install`, in which case, you can run that manually:

```sh
npm run postinstall
```

That should bring your environment to a state ready for testing.

To roll the docs in PowerShell, make sure you set the env variable correctly, i.e.:

```powershell
$env:SRC_DIR="C:\Users\user\src\playwright"; npm run roll
```