# playwright.dev-v2

This website is built using [Docusaurus v2](https://v2.docusaurus.io/). Content is pulled from the microsoft/playwright repo.

## Development

```sh
npm install
npm start
```

### Fetch docs content

1. Clone the content repo (microsoft/playwright) on your disk
1. To setup content from master (`next` version)

   ```sh
   SRC_DIR=path-to-playwright-repo/docs node scripts/fetchContent.js
   ```

1. To setup content for a particular version (say v1.6.0)

   ```sh
   SRC_DIR=path-to-playwright-repo/docs VERSION=1.6.0 node scripts/fetchContent.js
   ```

The docs are versioned so multiple versions can co-exist.

## Build

```sh
npm run build
```

## Deployment

See [GitHub Action](../.github/workflows/deploy-v2.yml) for deployment to [preview link](https://microsoft.github.io/playwright).
