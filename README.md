# playwright.dev

This website is built using [Docusaurus v2](https://v2.docusaurus.io/). Content is pulled from the microsoft/playwright repo.

## Development

#### Setup the repo

```sh
npm install
```

#### Build local search plugin

The project uses a fork of the [docusaurus-search-local](https://github.com/easyops-cn/docusaurus-search-local) plugin for search. Install dependencies and build the plugin.

   ```sh
   cd third_party/docusaurus-search-local
   npm i
   npm run build
   ```

#### Run dev server

```sh
npm run start
```

Note that search indexes are only populated for prod build.

#### Run prod build and serve

```sh
npm run build
npm run serve
```
