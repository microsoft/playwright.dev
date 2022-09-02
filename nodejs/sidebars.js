module.exports = {
  docs: [
    
    {
      type: 'category',
      label: 'Getting Started',
      link: {
        type: 'generated-index',
        title: 'Getting Started with Playwright',
        description: 'Learn how to install Playwright and run the example test. Explore the example test to understand locators and selectors and web first assertions. Run tests and debug tests. Generate tests with Codegen. Open the Trace viewer. Run tests on CI with GitHub Actions',
        slug: '/getting-started-index',
        keywords: ['getting started'],
        image: '/img/docusaurus.png',
      },
      items: [
        { type: 'doc', id: 'intro' },
        { type: 'doc', id: 'writing-tests' },
        { type: 'doc', id: 'running-tests' },
        { type: 'doc', id: 'codegen-intro' },
        { type: 'doc', id: 'trace-viewer-intro' },
        { type: 'doc', id: 'ci-intro' },
      ],
      collapsed: true
    },
    { type: 'doc', id: 'getting-started-vscode' },
    // { type: 'doc', id: 'release-notes' },
    // { type: 'doc', id: 'canary-releases' },


    {
      type: 'category',
      label: 'Writing Tests',
      link: {
        type: 'generated-index',
        title: 'Writing Tests',
        description: 'Learn how to write tests using locators, sectors and web first assertions. ',
        slug: '/writing-tests-index',
        keywords: ['getting started'],
        image: '/img/docusaurus.png',
      },
      items: [
        {type: 'doc', id: 'overview-writing-tests', label: 'Overview'},
        { type: 'doc', id: 'actionability', label: 'Actionability'},
        { type: 'doc', id: 'test-assertions', label: 'Assertions' },
        { type: 'doc', id: 'test-auth', label: 'Authentication'},
        { type: 'doc', id: 'auth', label: 'Authentication' },
        { type: 'doc', id: 'debug-selectors' , label: 'Debugging Selectors'},
        { type: 'doc', id: 'dialogs' , label: 'Dialogs'},
        { type: 'doc', id: 'downloads' , label: 'Dowloads'},
        { type: 'doc', id: 'emulation' , label: 'Emulation'},
        { type: 'doc', id: 'evaluating' , label: 'Evaluating'},
        { type: 'doc', id: 'events' , label: 'Events'},
        { type: 'doc', id: 'frames' , label: 'Frames'},
        { type: 'doc', id: 'input' , label: 'Input'},
        { type: 'doc', id: 'browser-contexts' , label: 'Isolation'},
        { type: 'doc', id: 'locators', label: 'Locators' },
        { type: 'doc', id: 'pages', label: 'Pages' },
        { type: 'doc', id: 'test-parameterize', label: 'Parameterize'},
        { type: 'doc', id: 'selectors', label: 'selectors' },
        {
          type: 'category',
          label: 'Specialized Testing',
          items: [
            { type: 'doc', id: 'accessibility-testing', label: 'Accessability Testing'},
            { type: 'doc', id: 'test-api-testing', label: 'API Testing' },
            { type: 'doc', id: 'chrome-extensions', label: 'Chrome Extensions'  },
            { type: 'doc', id: 'test-components' , label: 'Component Testing' },
            // { type: 'doc', id: 'extensibility' },
            // { type: 'doc', id: 'handles' },
            // { type: 'doc', id: 'navigations' },
            { type: 'doc', id: 'mock', label: 'Mock APIs'  },
            { type: 'doc', id: 'network' , label: 'Network Traffic' },
          ],
          collapsed: true
        },
        {
          type: 'category',
          label: 'Advanced',
          items: [
            
            { type: 'doc', id: 'screenshots' , label: 'Screenshots'},
            { type: 'doc', id: 'test-typescript' , label: 'TypeScript'},
            { type: 'doc', id: 'test-snapshots', label: 'Visual Comparisons'},
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
        },
        
        { type: 'doc', id: 'test-pom', label: 'Page Object Models'},
        { type: 'doc', id: 'pom' },
      ],
      collapsed: true
    },
    {
      type: 'category',
      label: 'Test Runner',
      link: {type: 'doc', id: 'overview-test-runner'},
      items: [
        { type: 'doc', id: 'test-annotations', label: 'Annotations'},
        { type: 'doc', id: 'test-cli', label: 'Command Line'},
        { type: 'doc', id: 'test-configuration', label: 'Configuration'},
        { type: 'doc', id: 'test-parallel' , label: 'Parallelism and Sharding'},
        { type: 'doc', id: 'test-reporters' , label: 'Reporters'},
        { type: 'doc', id: 'test-retries' , label: 'Retries'},
        { type: 'doc', id: 'test-timeouts' , label: 'Timeouts'},
        { type: 'doc', id: 'videos' , label: 'Videos'},
        {
          type: 'category',
          label: 'Advanced',
          items: [
            { type: 'doc', id: 'test-advanced', label: 'Configuration'},
            { type: 'doc', id: 'test-fixtures', label: 'Fixtures'},
          ],
          collapsed: true
        },
        {
          type: 'category',
          label: 'Appendix',
          items: [
            { type: 'doc', id: 'test-runners', label: 'Third Party Runners' },
          ],
          collapsed: true
        },
        
      ],
      collapsed: true
    },

    {
      type: 'category',
      label: 'Tools',
      link: {
        type: 'generated-index',
        title: 'Docusaurus Guides',
        description: 'Learn about the most important Docusaurus concepts!',
        slug: '/tools/overview',
        keywords: ['guides'],
        image: '/img/docusaurus.png',
      },
      items: [
        { type: 'doc', id: 'cli' , label: 'Command Line Tools' },
        { type: 'doc', id: 'debug' , label: 'Debugging Tests Inspector' },
        { type: 'doc', id: 'codegen' , label: 'Codegen Test Generator ' },
        { type: 'doc', id: 'trace-viewer' , label: 'Trace Viewer' },
      ],
      collapsed: true
    },

    {
      type: 'category',
      label: 'DevOps',
      items: [
        { type: 'doc', id: 'browsers' },
        { type: 'doc', id: 'ci' },
        { type: 'doc', id: 'docker' },
        
        { type: 'doc', id: 'selenium-grid' },
        { type: 'doc', id: 'troubleshooting' },
      ],
      collapsed: true
    },

    { type: 'doc', id: 'library' },
 // { type: 'doc', id: 'languages' }

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
