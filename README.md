# playwright.dev

This website is built using [Docusaurus](https://docusaurus.io/). Content is pulled from the microsoft/playwright repo.

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

To roll the docs in PowerShell, make sure you set the env variable correctly, i.e.:

```powershell
$env:SRC_DIR="C:\Users\user\src\playwright"; npm run roll
```

### Run end-to-end tests

#### Run on local machine

Run this on one terminal:

```sh
npm run start-nodejs
```

and this on another, it will automatically use the local docusaurus server:

```sh
npx playwright test nodejs
```

#### Run on different environment

You can set the `BASE_URL=https://playwright.dev` env var, otherwise `http://localhost:3000` gets used by default.

### Publishing Doc Changes After a Release

#### Cherry-picking

1. Go to the [Cherry-picking GitHub Actions workflow](https://github.com/microsoft/playwright/actions/workflows/cherry_pick_into_release_branch.yml)
1. Execute it with the version number e.g. `1.25` and a comma separate list of commit SHA hashes (from the main branch)
1. Wait for a PR [getting created](https://github.com/microsoft/playwright/pulls), review it and merge it

#### Stable docs rolling

1. Go to the [Release GitHub Actions workflow](https://github.com/microsoft/playwright.dev/actions/workflows/roll-stable.yml)
1. Execute it and wait for the PR [getting created](https://github.com/microsoft/playwright.dev/pulls). The PR will copy changes from the release branch in playwright repo.
2. Review the PR and merge it.
