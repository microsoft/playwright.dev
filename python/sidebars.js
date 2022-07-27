module.exports = {
  docs: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        { type: 'doc', id: 'intro' },
        { type: 'doc', id: 'writing-tests' },
        { type: 'doc', id: 'running-tests' },
        { type: 'doc', id: 'codegen' },
        { type: 'doc', id: 'trace-viewer' },
        { type: 'doc', id: 'test-runners' }
      ],
      collapsed: false
    },
    { type: 'doc', id: 'library' },
    { type: 'doc', id: 'release-notes' },
    {
      type: 'category',
      label: 'Guides',
      items: [
        { type: 'doc', id: 'actionability' },
        { type: 'doc', id: 'api-testing' },
        { type: 'doc', id: 'test-assertions' },
        { type: 'doc', id: 'auth' },
        { type: 'doc', id: 'browsers' },
        { type: 'doc', id: 'browser-contexts' },
        { type: 'doc', id: 'chrome-extensions' },
        { type: 'doc', id: 'cli' },
        { type: 'doc', id: 'debug' },
        { type: 'doc', id: 'debug-selectors' },
        { type: 'doc', id: 'dialogs' },
        { type: 'doc', id: 'downloads' },
        { type: 'doc', id: 'emulation' },
        { type: 'doc', id: 'evaluating' },
        { type: 'doc', id: 'events' },
        { type: 'doc', id: 'extensibility' },
        { type: 'doc', id: 'frames' },
        { type: 'doc', id: 'handles' },
        { type: 'doc', id: 'input' },
        { type: 'doc', id: 'locators' },
        { type: 'doc', id: 'navigations' },
        { type: 'doc', id: 'network' },
        { type: 'doc', id: 'pages' },
        { type: 'doc', id: 'pom' },
        { type: 'doc', id: 'screenshots' },
        { type: 'doc', id: 'selectors' },
        { type: 'doc', id: 'videos' }
      ],
      collapsed: false
    },
    {
      type: 'category',
      label: 'Integrations',
      items: [
        { type: 'doc', id: 'docker' },
        { type: 'doc', id: 'ci' },
        { type: 'doc', id: 'selenium-grid' }
      ],
      collapsed: true
    },
    { type: 'doc', id: 'troubleshooting' },
    { type: 'doc', id: 'languages' }
  ],
  api: [
    {
      type: 'category',
      label: 'API reference',
      items: [
        { type: 'doc', id: 'api/class-playwright' },
        {
          type: 'category',
          label: 'Classes',
          items: [
            { type: 'doc', id: 'api/class-apirequest' },
            { type: 'doc', id: 'api/class-apirequestcontext' },
            { type: 'doc', id: 'api/class-apiresponse' },
            { type: 'doc', id: 'api/class-accessibility' },
            { type: 'doc', id: 'api/class-browser' },
            { type: 'doc', id: 'api/class-browsercontext' },
            { type: 'doc', id: 'api/class-browsertype' },
            { type: 'doc', id: 'api/class-cdpsession' },
            { type: 'doc', id: 'api/class-consolemessage' },
            { type: 'doc', id: 'api/class-dialog' },
            { type: 'doc', id: 'api/class-download' },
            { type: 'doc', id: 'api/class-elementhandle' },
            { type: 'doc', id: 'api/class-error' },
            { type: 'doc', id: 'api/class-filechooser' },
            { type: 'doc', id: 'api/class-frame' },
            { type: 'doc', id: 'api/class-framelocator' },
            { type: 'doc', id: 'api/class-jshandle' },
            { type: 'doc', id: 'api/class-keyboard' },
            { type: 'doc', id: 'api/class-locator' },
            { type: 'doc', id: 'api/class-mouse' },
            { type: 'doc', id: 'api/class-page' },
            { type: 'doc', id: 'api/class-request' },
            { type: 'doc', id: 'api/class-response' },
            { type: 'doc', id: 'api/class-route' },
            { type: 'doc', id: 'api/class-selectors' },
            { type: 'doc', id: 'api/class-timeouterror' },
            { type: 'doc', id: 'api/class-touchscreen' },
            { type: 'doc', id: 'api/class-tracing' },
            { type: 'doc', id: 'api/class-video' },
            { type: 'doc', id: 'api/class-websocket' },
            { type: 'doc', id: 'api/class-worker' }
          ],
          collapsed: false
        }
      ],
      collapsed: false
    }
  ]
};
