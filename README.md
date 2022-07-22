# playwright.dev

This website is built using [Docusaurus v2](https://v2.docusaurus.io/). Content is pulled from the microsoft/playwright repo.

## Development

### Setup the repo

```sh
npm install
```

### Roll docs

```sh
SRC_DIR=../playwright npm run roll
```

### Remove old release

```sh
node src/versions.js --delete 1.16
```

### Run dev server

```sh
npm run start-nodejs
```

See `package.json` for other languages (java, python, .NET).

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

### Publishing Doc Changes After a Release

In [microsoft/playwright](https://github.com/microsoft/playwright):

1. Open PR against `main` branch so the change is inlcuded in all future releases of Playwright.
2. Cherry pick the landed commit on `main` into the release branch:

   ```
   $ git fetch --all
   $ git checkout -b cp/name-your-change-branch upstream/release-1.XY # (e.g. 1.24 instead of 1.XY)
   $ git cherry-pick <commit from main>
   ```

3. Open PR against the `release-1.XY` branch with your cherry-picked commit

In [microsoft/playwright.dev](https://github.com/microsoft/playwright.dev):

1. Manually run https://github.com/microsoft/playwright.dev/actions/workflows/create_release.yml
   1. _Run Workflow_ dropdown
   2. Leave branch as `main`
   3. Enter release version number (e.g. 1.24, NO `v` prefix)
   4. _Run Workflow_
2. Wait for action to finish. A PR will appear in https://github.com/microsoft/playwright.dev/pulls.
3. Review PR and land!
