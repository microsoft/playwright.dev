module.exports = {
  gettingStarted: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        { type: 'doc', id: 'intro' },
        { type: 'doc', id: 'writing-tests' },
        { type: 'doc', id: 'running-tests' },
        { type: 'doc', id: 'codegen-intro' },
        { type: 'doc', id: 'trace-viewer-intro' },
        { type: 'doc', id: 'ci-intro' }
      ],
      collapsible: false
    },
    { type: 'doc', id: 'getting-started-vscode' },
    {type: 'ref', label: 'Writing Tests', id: 'locators'},
    { type: 'ref', label: 'Running Tests', id: 'test-cli' },
    { type: 'ref', label: 'Tools', id: 'cli' },
    { type: 'ref', label: 'DevOps', id: 'ci' },
    { type: 'ref', label: 'Library', id: 'library' }
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
            { type: 'doc', id: 'test-parameterize' },
            { type: 'doc', id: 'debug-selectors' },
            { type: 'doc', id: 'dialogs' },
            { type: 'doc', id: 'downloads' },
            { type: 'doc', id: 'evaluating' },
            { type: 'doc', id: 'events' },
            { type: 'doc', id: 'frames' },
            { type: 'doc', id: 'input' },
            { type: 'doc', id: 'test-snapshots' },
            { type: 'doc', id: 'test-typescript' }
          ],
          collapsed: true
        },
        {
          type: 'category',
          label: 'Specialized Testing',
          items: [
            { type: 'doc', id: 'test-api-testing' },
            { type: 'doc', id: 'test-pom' },
            { type: 'doc', id: 'test-components' },
            { type: 'doc', id: 'accessibility-testing' },
            { type: 'doc', id: 'chrome-extensions' },
            { type: 'doc', id: 'mock' },
            { type: 'doc', id: 'network' }
          ],
          collapsed: true
        },
        {
          type: 'category',
          label: 'Migration',
          items: [
            { type: 'doc', id: 'protractor' },
            { type: 'doc', id: 'testing-library' }
          ],
          collapsed: true
        }
      ],
      collapsed: false
    },
    { type: 'ref', label: 'Running Tests', id: 'test-cli' },
    { type: 'ref', label: 'Tools', id: 'cli' },
    { type: 'ref', label: 'DevOps', id: 'ci' },
    { type: 'ref', label: 'Library', id: 'library' }
  ],

  runningTests: [
    { type: 'ref', label: 'Getting Started', id: 'intro' },
    { type: 'ref', label: 'Writing Tests', id: 'locators' },
    {
      type: 'category',
      label: 'Running Tests',
      items: [
        { type: 'doc', id: 'test-cli' },
        { type: 'doc', id: 'test-configuration' },
        { type: 'doc', id: 'test-timeouts' },
        { type: 'doc', id: 'test-reporters' },
        {
          type: 'category',
          label: 'Advanced',
          items: [
            { type: 'doc', id: 'test-annotations' },
            { type: 'doc', id: 'test-parallel' },
            { type: 'doc', id: 'test-retries' },
            { type: 'doc', id: 'test-advanced' },
            { type: 'doc', id: 'videos' },
            { type: 'doc', id: 'test-fixtures' }
          ],
          collapsed: true
        },
        {
          type: 'category',
          label: 'Appendix',
          items: [{ type: 'doc', id: 'test-runners' }],
          collapsed: true
        }
      ],
      collapsed: false
    },

    { type: 'ref', label: 'Tools', id: 'cli' },
    { type: 'ref', label: 'DevOps', id: 'ci' },
    { type: 'ref', label: 'Library', id: 'library' }
  ],
  tools: [
    { type: 'ref', label: 'Getting Started', id: 'intro' },
    { type: 'ref', label: 'Writing Tests', id: 'locators' },
    { type: 'ref', label: 'Running Tests', id: 'test-cli' },

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
    { type: 'ref', label: 'DevOps', id: 'ci' },
    { type: 'ref', label: 'Library', id: 'library' }
  ],
  devOps: [
    { type: 'ref', label: 'Getting Started', id: 'intro' },
    { type: 'ref', label: 'Writing Tests', id: 'locators' },
    { type: 'ref', label: 'Running Tests', id: 'test-cli' },
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
    },
    { type: 'ref', label: 'Library', id: 'library' }
  ],
  library: [
    { type: 'ref', label: 'Getting Started', id: 'intro' },
    { type: 'ref', label: 'Writing Tests', id: 'locators' },
    { type: 'ref', label: 'Running Tests', id: 'test-cli' },
    { type: 'ref', label: 'Tools', id: 'cli' },
    { type: 'ref', label: 'DevOps', id: 'ci' },
    { type: 'doc', id: 'library' }
  ],

  api: [
    {
      type: 'category',
      label: 'API reference',
      items: [
        { type: 'doc', id: 'api/class-test' },
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
            { type: 'doc', id: 'api/class-browserserver' },
            { type: 'doc', id: 'api/class-browsertype' },
            { type: 'doc', id: 'api/class-cdpsession' },
            { type: 'doc', id: 'api/class-consolemessage' },
            { type: 'doc', id: 'api/class-coverage' },
            { type: 'doc', id: 'api/class-dialog' },
            { type: 'doc', id: 'api/class-download' },
            { type: 'doc', id: 'api/class-elementhandle' },
            { type: 'doc', id: 'api/class-filechooser' },
            { type: 'doc', id: 'api/class-frame' },
            { type: 'doc', id: 'api/class-framelocator' },
            { type: 'doc', id: 'api/class-jshandle' },
            { type: 'doc', id: 'api/class-keyboard' },
            { type: 'doc', id: 'api/class-locator' },
            { type: 'doc', id: 'api/class-logger' },
            { type: 'doc', id: 'api/class-mouse' },
            { type: 'doc', id: 'api/class-page' },
            { type: 'doc', id: 'api/class-request' },
            { type: 'doc', id: 'api/class-response' },
            { type: 'doc', id: 'api/class-route' },
            { type: 'doc', id: 'api/class-selectors' },
            { type: 'doc', id: 'api/class-touchscreen' },
            { type: 'doc', id: 'api/class-tracing' },
            { type: 'doc', id: 'api/class-video' },
            { type: 'doc', id: 'api/class-websocket' },
            { type: 'doc', id: 'api/class-worker' }
          ],
          collapsed: false
        },
        {
          type: 'category',
          label: 'Test Runner',
          items: [
            { type: 'doc', id: 'api/class-fixtures' },
            { type: 'doc', id: 'api/class-test' },
            { type: 'doc', id: 'api/class-testconfig' },
            { type: 'doc', id: 'api/class-testerror' },
            { type: 'doc', id: 'api/class-testinfo' },
            { type: 'doc', id: 'api/class-testoptions' },
            { type: 'doc', id: 'api/class-testproject' },
            { type: 'doc', id: 'api/class-timeouterror' }
          ],
          collapsed: false
        },
        {
          type: 'category',
          label: 'Test Reporter',
          items: [
            { type: 'doc', id: 'api/class-location' },
            { type: 'doc', id: 'api/class-reporter' },
            { type: 'doc', id: 'api/class-suite' },
            { type: 'doc', id: 'api/class-testcase' },
            { type: 'doc', id: 'api/class-testresult' },
            { type: 'doc', id: 'api/class-teststep' }
          ],
          collapsed: false
        },
        {
          type: 'category',
          label: 'Experimental',
          items: [
            { type: 'doc', id: 'api/class-android' },
            { type: 'doc', id: 'api/class-androiddevice' },
            { type: 'doc', id: 'api/class-androidinput' },
            { type: 'doc', id: 'api/class-androidsocket' },
            { type: 'doc', id: 'api/class-androidwebview' },
            { type: 'doc', id: 'api/class-electron' },
            { type: 'doc', id: 'api/class-electronapplication' }
          ],
          collapsed: false
        }
      ],
      collapsed: false
    }
  ]
};
