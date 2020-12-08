# playwright.dev-v2

This website is built using [Docusaurus v2](https://v2.docusaurus.io/). Content is pulled from the microsoft/playwright repo. [Preview link][preview].

## Development

```sh
npm install
npm start
```

### Fetch docs content

1. Clone the content repo (microsoft/playwright) on your disk
1. To setup content from master (`next` version)

   ```sh
   SRC_DIR=path-to-playwright-repo/docs node scripts/fetchVersion.js
   ```

1. To setup content for a particular version (say v1.6.0)

   ```sh
   SRC_DIR=path-to-playwright-repo/docs VERSION=1.6.0 node scripts/fetchVersion.js
   ```

The docs are versioned so multiple versions can co-exist. See CI definition for how to fetch all versions.

## Build

```sh
npm run build
```

## Deployment

See [GitHub Action](../.github/workflows/deploy-v2.yml) for deployment to [preview link][preview].

[preview]: https://microsoft.github.io/playwright
