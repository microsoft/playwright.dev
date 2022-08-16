module.exports = {
  gettingStarted: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        { type: 'doc', id: 'intro' },
        { type: 'doc', id: 'codegen-intro' },
        { type: 'doc', id: 'trace-viewer-intro' },
        { type: 'doc', id: 'test-runners' }
      ],
      collapsible: false
    },
    { type: 'ref', label: 'Writing Tests', id: 'locators' },
    { type: 'ref', label: 'Running Tests', id: 'test-cli' },
    { type: 'ref', label: 'Tools', id: 'cli' },
    { type: 'ref', label: 'DevOps', id: 'ci' }
  ],
  writingTests: [
    { type: 'ref', label: 'Getting Started', id: 'intro' },
    {
      type: 'category',
      label: 'Writing Tests',
      items: [
        { type: 'doc', id: 'locators' },
        { type: 'doc', id: 'test-assertions' },
        { type: 'doc', id: 'isolation' },
        { type: 'doc', id: 'actionability' },
        {
          type: 'category',
          label: 'Advanced',
          items: [
            { type: 'doc', id: 'pages' },
            { type: 'doc', id: 'test-auth' },
            // { type: 'doc', id: 'test-parameterize' },
            { type: 'doc', id: 'emulation' },
            { type: 'doc', id: 'debug-selectors' },
            { type: 'doc', id: 'dialogs' },
            { type: 'doc', id: 'downloads' },
            { type: 'doc', id: 'evaluating' },
            { type: 'doc', id: 'events' },
            { type: 'doc', id: 'frames' },
            { type: 'doc', id: 'input' },
            { type: 'doc', id: 'test-snapshots' },
            { type: 'doc', id: 'multithreading' }
          ],
          collapsed: true
        },
        {
          type: 'category',
          label: 'Specialized Testing',
          items: [
            { type: 'doc', id: 'api-testing' },
            { type: 'doc', id: 'test-pom' },
            { type: 'doc', id: 'accessibility-testing' },
            { type: 'doc', id: 'network' }
          ],
          collapsed: true
        }
      ],
      collapsed: false
    },
    { type: 'ref', label: 'Running Tests', id: 'test-cli' },
    { type: 'ref', label: 'Tools', id: 'cli' },
    { type: 'ref', label: 'DevOps', id: 'ci' }
  ],
  runningTests: [
    { type: 'ref', label: 'Getting Started', id: 'intro' },
    { type: 'ref', label: 'Writing Tests', id: 'locators' },
    {
      type: 'category',
      label: 'Running Tests',
      items: [
        {
          type: 'category',
          label: 'Advanced',
          items: [{ type: 'doc', id: 'videos' }],
          collapsed: true
        }
      ],
      collapsed: false
    },

    { type: 'ref', label: 'Tools', id: 'cli' },
    { type: 'ref', label: 'DevOps', id: 'ci' }
  ],
  tools: [
    { type: 'ref', label: 'Getting Started', id: 'intro' },
    { type: 'ref', label: 'Writing Tests', id: 'locators' },
    { type: 'ref', label: 'Running Tests', id: 'videos' },

    {
      type: 'category',
      label: 'Tools',
      items: [
        { type: 'doc', id: 'cli' },
        { type: 'doc', id: 'debug' },
        { type: 'doc', id: 'codegen' },
        { type: 'doc', id: 'trace-viewer' }
      ],
      collapsible: false
    },
    { type: 'ref', label: 'DevOps', id: 'ci' }
  ],
  devOps: [
    { type: 'ref', label: 'Getting Started', id: 'intro' },
    { type: 'ref', label: 'Writing Tests', id: 'locators' },
    { type: 'ref', label: 'Running Tests', id: 'videos' },
    { type: 'ref', label: 'Tools', id: 'cli' },

    {
      type: 'category',
      label: 'DevOps',
      items: [
        { type: 'doc', id: 'ci' },
        { type: 'doc', id: 'browsers' },
        { type: 'doc', id: 'docker' },
        { type: 'doc', id: 'troubleshooting' },
        { type: 'doc', id: 'selenium-grid' }
      ],
      collapsible: false
    }
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
            { type: 'doc', id: 'api/class-browser' },
            { type: 'doc', id: 'api/class-browsercontext' },
            { type: 'doc', id: 'api/class-browsertype' },
            { type: 'doc', id: 'api/class-consolemessage' },
            { type: 'doc', id: 'api/class-dialog' },
            { type: 'doc', id: 'api/class-download' },
            { type: 'doc', id: 'api/class-elementhandle' },
            { type: 'doc', id: 'api/class-filechooser' },
            { type: 'doc', id: 'api/class-frame' },
            { type: 'doc', id: 'api/class-framelocator' },
            { type: 'doc', id: 'api/class-jshandle' },
            { type: 'doc', id: 'api/class-keyboard' },
            { type: 'doc', id: 'api/class-locator' },
            { type: 'doc', id: 'api/class-mouse' },
            { type: 'doc', id: 'api/class-page' },
            { type: 'doc', id: 'api/class-playwrightexception' },
            { type: 'doc', id: 'api/class-request' },
            { type: 'doc', id: 'api/class-response' },
            { type: 'doc', id: 'api/class-route' },
            { type: 'doc', id: 'api/class-selectors' },
            { type: 'doc', id: 'api/class-timeouterror' },
            { type: 'doc', id: 'api/class-touchscreen' },
            { type: 'doc', id: 'api/class-tracing' },
            { type: 'doc', id: 'api/class-video' },
            { type: 'doc', id: 'api/class-websocket' },
            { type: 'doc', id: 'api/class-websocketframe' },
            { type: 'doc', id: 'api/class-worker' }
          ],
          collapsed: false
        }
      ],
      collapsed: false
    }
  ]
};
