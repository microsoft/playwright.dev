module.exports = {
  "docs": [
    {
      "type": "category",
      "label": "Introduction",
      "items": [
        { "type": "doc", "id": "why-playwright" },
        { "type": "doc", "id": "intro" },
        { "type": "doc", "id": "debug" },
        { "type": "doc", "id": "cli" },
        { "type": "doc", "id": "languages" },
        { "type": "doc", "id": "release-notes" }
      ],
      "collapsed": false
    },
    {
      "type": "category",
      "label": "Playwright Test",
      "items": [
        { "type": "doc", "id": "test-annotations" },
        { "type": "doc", "id": "test-assertions" },
        { "type": "doc", "id": "test-configuration" },
        { "type": "doc", "id": "test-pom" },
        { "type": "doc", "id": "test-parallel" },
        { "type": "doc", "id": "test-reporters" },
        { "type": "doc", "id": "test-retries" },
        { "type": "doc", "id": "test-snapshots" },
        { "type": "doc", "id": "test-cli" },
        { "type": "doc", "id": "test-advanced" },
        { "type": "doc", "id": "test-fixtures" },
      ],
      "collapsed": true
    },
    {
      "type": "category",
      "label": "Guides",
      "items": [
        { "type": "doc", "id": "actionability" },
        { "type": "doc", "id": "assertions" },
        { "type": "doc", "id": "auth" },
        { "type": "doc", "id": "browsers" },
        { "type": "doc", "id": "chrome-extensions" },
        { "type": "doc", "id": "core-concepts" },
        { "type": "doc", "id": "dialogs" },
        { "type": "doc", "id": "downloads" },
        { "type": "doc", "id": "selectors" },
        { "type": "doc", "id": "emulation" },
        { "type": "doc", "id": "events" },
        { "type": "doc", "id": "extensibility" },
        { "type": "doc", "id": "handles" },
        { "type": "doc", "id": "input" },
        { "type": "doc", "id": "inspector" },
        { "type": "doc", "id": "multi-pages" },
        { "type": "doc", "id": "navigations" },
        { "type": "doc", "id": "network" },
        { "type": "doc", "id": "pom" },
        { "type": "doc", "id": "screenshots" },
        { "type": "doc", "id": "trace-viewer" },
        { "type": "doc", "id": "verification" },
        { "type": "doc", "id": "videos" },
      ],
      "collapsed": true
    },
    {
      "type": "category",
      "label": "Integrations",
      "items": [
        { "type": "doc", "id": "library" },
        { "type": "doc", "id": "docker" },
        { "type": "doc", "id": "ci" },
        { "type": "doc", "id": "test-runners" },
      ],
      "collapsed": true
    },
  ],
  "api": [
    {
      "type": "category",
      "label": "API reference",
      "items": [
        { "type": "doc", "id": "api/class-test" },
        { "type": "doc", "id": "api/class-playwright" },
        {
          "type": "category",
          "label": "Classes",
          "items": [
            { "type": "doc", "id": "api/class-accessibility" },
            { "type": "doc", "id": "api/class-browser" },
            { "type": "doc", "id": "api/class-browsercontext" },
            { "type": "doc", "id": "api/class-browserserver" },
            { "type": "doc", "id": "api/class-browsertype" },
            { "type": "doc", "id": "api/class-cdpsession" },
            { "type": "doc", "id": "api/class-consolemessage" },
            { "type": "doc", "id": "api/class-coverage" },
            { "type": "doc", "id": "api/class-dialog" },
            { "type": "doc", "id": "api/class-download" },
            { "type": "doc", "id": "api/class-elementhandle" },
            { "type": "doc", "id": "api/class-filechooser" },
            { "type": "doc", "id": "api/class-fixtures" },
            { "type": "doc", "id": "api/class-frame" },
            { "type": "doc", "id": "api/class-jshandle" },
            { "type": "doc", "id": "api/class-keyboard" },
            { "type": "doc", "id": "api/class-locator" },
            { "type": "doc", "id": "api/class-logger" },
            { "type": "doc", "id": "api/class-mouse" },
            { "type": "doc", "id": "api/class-page" },
            { "type": "doc", "id": "api/class-request" },
            { "type": "doc", "id": "api/class-response" },
            { "type": "doc", "id": "api/class-route" },
            { "type": "doc", "id": "api/class-selectors" },
            { "type": "doc", "id": "api/class-testconfig" },
            { "type": "doc", "id": "api/class-testerror" },
            { "type": "doc", "id": "api/class-testinfo" },
            { "type": "doc", "id": "api/class-testproject" },
            { "type": "doc", "id": "api/class-timeouterror" },
            { "type": "doc", "id": "api/class-touchscreen" },
            { "type": "doc", "id": "api/class-tracing" },
            { "type": "doc", "id": "api/class-video" },
            { "type": "doc", "id": "api/class-websocket" },
            { "type": "doc", "id": "api/class-worker" },
            { "type": "doc", "id": "api/class-workerinfo" },
          ],
          "collapsed": false
        },
        {
          "type": "category",
          "label": "Test Reporter",
          "items": [
            { "type": "doc", "id": "api/class-location" },
            { "type": "doc", "id": "api/class-reporter" },
            { "type": "doc", "id": "api/class-suite" },
            { "type": "doc", "id": "api/class-testcase" },
            { "type": "doc", "id": "api/class-testresult" },
          ],
          "collapsed": false
        },
        {
          "type": "category",
          "label": "Experimental",
          "items": [
            { "type": "doc", "id": "api/class-android" },
            { "type": "doc", "id": "api/class-androiddevice" },
            { "type": "doc", "id": "api/class-androidinput" },
            { "type": "doc", "id": "api/class-androidsocket" },
            { "type": "doc", "id": "api/class-androidwebview" },
            { "type": "doc", "id": "api/class-electron" },
            { "type": "doc", "id": "api/class-electronapplication" },
          ],
          "collapsed": false
        },
      ],
      "collapsed": false
    }
  ]
}
