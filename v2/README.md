# playwright.dev-v2

This website is built using [Docusaurus v2](https://v2.docusaurus.io/). Content is pulled from the microsoft/playwright repo.

## Development

#### Setup the repo

1. Clone the repo and install dependencies.

   ```sh
   # in v2 directory
   npm install
   ```

#### Build local search plugin

The project uses a fork of the [docusaurus-search-local](https://github.com/easyops-cn/docusaurus-search-local) plugin for search.

1. Install dependencies and build the plugin.

   ```sh
   # in v2 directory
   cd third_party/docusaurus-search-local
   npm i
   npm run build
   ```

#### Fetch docs content

Site content is pulled from the content repo (microsoft/playwright) which is required to be on disk. We can setup content from the master branch (for `next` version). For all versions, see [below](#fetch-content).

1. Ensure microsoft/playwright repo is cloned on disk.
1. Pull content for master (`next` version of playwright).

   ```sh
   # in v2 directory
   SRC_DIR=path-to-playwright-repo/docs node scripts/fetchVersion.js
   ```

This will setup the `docs` dir and `sidebars.js`.

#### Run dev server

```sh
# in v2 directory
npm run start
```

Note that search indexes are only populated for prod build.

#### Run prod build and serve

```sh
# in v2 directory
npm run build
npm run serve
```

## Fetch content

1. Clone the content repo (microsoft/playwright) on your disk
1. To setup content from master (`next` version)

   ```sh
   SRC_DIR=path-to-playwright-repo/docs node scripts/fetchVersion.js
   ```

1. To setup content for a particular version (say v1.6.0)

   ```sh
   SRC_DIR=path-to-playwright-repo/docs VERSION=1.6.0 node scripts/fetchVersion.js
   ```

1. To setup content for all versions.

   ```sh
   SRC_DIR=path-to-playwright-repo/docs node scripts/fetchAll.js
   ```

The docs are versioned so multiple versions can co-exist.

## Deployment

See [GitHub Action](../.github/workflows/deploy-v2.yml) for deployment steps.
