---
id: class-browsertype
title: "class: BrowserType"
---


BrowserType provides methods to launch a specific browser instance or connect to an existing one.
The following is a typical example of using Playwright to drive automation:
```js
const { chromium } = require('playwright');  // Or 'firefox' or 'webkit'.

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  // other actions...
  await browser.close();
})();
```

<!-- GEN:toc -->
- [browserType.connect(options)](api/class-browsertype.md#browsertypeconnectoptions)
- [browserType.executablePath()](api/class-browsertype.md#browsertypeexecutablepath)
- [browserType.launch([options])](api/class-browsertype.md#browsertypelaunchoptions)
- [browserType.launchPersistentContext(userDataDir, [options])](api/class-browsertype.md#browsertypelaunchpersistentcontextuserdatadir-options)
- [browserType.launchServer([options])](api/class-browsertype.md#browsertypelaunchserveroptions)
- [browserType.name()](api/class-browsertype.md#browsertypename)
<!-- GEN:stop -->

## browserType.connect(options)
- `options` <[Object]>
  - `wsEndpoint` <[string]> A browser websocket endpoint to connect to. **required**
  - `slowMo` <[number]> Slows down Playwright operations by the specified amount of milliseconds. Useful so that you can see what is going on. Defaults to 0.
  - `logger` <[Logger]> Logger sink for Playwright logging.
- returns: <[Promise]<[Browser]>>

This methods attaches Playwright to an existing browser instance.

## browserType.executablePath()
- returns: <[string]> A path where Playwright expects to find a bundled browser executable.

## browserType.launch([options])
- `options` <[Object]>  Set of configurable options to set on the browser. Can have the following fields:
  - `headless` <[boolean]> Whether to run browser in headless mode. More details for [Chromium](https://developers.google.com/web/updates/2017/04/headless-chrome) and [Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Headless_mode). Defaults to `true` unless the `devtools` option is `true`.
  - `executablePath` <[string]> Path to a browser executable to run instead of the bundled one. If `executablePath` is a relative path, then it is resolved relative to [current working directory](https://nodejs.org/api/process.html#process_process_cwd). Note that Playwright only works with the bundled Chromium, Firefox or WebKit, use at your own risk.
  - `args` <[Array]<[string]>> Additional arguments to pass to the browser instance. The list of Chromium flags can be found [here](http://peter.sh/experiments/chromium-command-line-switches/).
  - `ignoreDefaultArgs` <[boolean]|[Array]<[string]>> If `true`, Playwright does not pass its own configurations args and only uses the ones from `args`. If an array is given, then filters out the given default arguments. Dangerous option; use with care. Defaults to `false`.
  - `handleSIGINT` <[boolean]> Close the browser process on Ctrl-C. Defaults to `true`.
  - `handleSIGTERM` <[boolean]> Close the browser process on SIGTERM. Defaults to `true`.
  - `handleSIGHUP` <[boolean]> Close the browser process on SIGHUP. Defaults to `true`.
  - `logger` <[Logger]> Logger sink for Playwright logging.
  - `timeout` <[number]> Maximum time in milliseconds to wait for the browser instance to start. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.
  - `env` <[Object]<[string], [string]|[number]|[boolean]>> Specify environment variables that will be visible to the browser. Defaults to `process.env`.
  - `devtools` <[boolean]> **Chromium-only** Whether to auto-open a Developer Tools panel for each tab. If this option is `true`, the `headless` option will be set `false`.
  - `slowMo` <[number]> Slows down Playwright operations by the specified amount of milliseconds. Useful so that you can see what is going on.
- returns: <[Promise]<[Browser]>> Promise which resolves to browser instance.


You can use `ignoreDefaultArgs` to filter out `--mute-audio` from default arguments:
```js
const browser = await chromium.launch({  // Or 'firefox' or 'webkit'.
  ignoreDefaultArgs: ['--mute-audio']
});
```

> **Chromium-only** Playwright can also be used to control the Chrome browser, but it works best with the version of Chromium it is bundled with. There is no guarantee it will work with any other version. Use `executablePath` option with extreme caution.
>
> If Google Chrome (rather than Chromium) is preferred, a [Chrome Canary](https://www.google.com/chrome/browser/canary.html) or [Dev Channel](https://www.chromium.org/getting-involved/dev-channel) build is suggested.
>
> In [browserType.launch([options])](#browsertypelaunchoptions) above, any mention of Chromium also applies to Chrome.
>
> See [`this article`](https://www.howtogeek.com/202825/what%E2%80%99s-the-difference-between-chromium-and-chrome/) for a description of the differences between Chromium and Chrome. [`This article`](https://chromium.googlesource.com/chromium/src/+/lkgr/docs/chromium_browser_vs_google_chrome.md) describes some differences for Linux users.

## browserType.launchPersistentContext(userDataDir, [options])
 - `userDataDir` <[string]> Path to a User Data Directory, which stores browser session data like cookies and local storage. More details for [Chromium](https://chromium.googlesource.com/chromium/src/+/master/docs/user_data_dir.md) and [Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Command_Line_Options#User_Profile).
- `options` <[Object]>  Set of configurable options to set on the browser. Can have the following fields:
  - `headless` <[boolean]> Whether to run browser in headless mode. More details for [Chromium](https://developers.google.com/web/updates/2017/04/headless-chrome) and [Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Headless_mode). Defaults to `true` unless the `devtools` option is `true`.
  - `executablePath` <[string]> Path to a browser executable to run instead of the bundled one. If `executablePath` is a relative path, then it is resolved relative to [current working directory](https://nodejs.org/api/process.html#process_process_cwd). **BEWARE**: Playwright is only guaranteed to work with the bundled Chromium, Firefox or WebKit, use at your own risk.
  - `args` <[Array]<[string]>> Additional arguments to pass to the browser instance. The list of Chromium flags can be found [here](http://peter.sh/experiments/chromium-command-line-switches/).
  - `ignoreDefaultArgs` <[boolean]|[Array]<[string]>> If `true`, then do not use any of the default arguments. If an array is given, then filter out the given default arguments. Dangerous option; use with care. Defaults to `false`.
  - `handleSIGINT` <[boolean]> Close the browser process on Ctrl-C. Defaults to `true`.
  - `handleSIGTERM` <[boolean]> Close the browser process on SIGTERM. Defaults to `true`.
  - `handleSIGHUP` <[boolean]> Close the browser process on SIGHUP. Defaults to `true`.
  - `logger` <[Logger]> Logger sink for Playwright logging.
  - `timeout` <[number]> Maximum time in milliseconds to wait for the browser instance to start. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.
  - `env` <[Object]<[string], [string]|[number]|[boolean]>> Specify environment variables that will be visible to the browser. Defaults to `process.env`.
  - `devtools` <[boolean]> **Chromium-only** Whether to auto-open a Developer Tools panel for each tab. If this option is `true`, the `headless` option will be set `false`.
  - `slowMo` <[number]> Slows down Playwright operations by the specified amount of milliseconds. Useful so that you can see what is going on. Defaults to 0.
- returns: <[Promise]<[BrowserContext]>> Promise which resolves to the browser app instance.

Launches browser instance that uses persistent storage located at `userDataDir`.

## browserType.launchServer([options])
- `options` <[Object]>  Set of configurable options to set on the browser. Can have the following fields:
  - `headless` <[boolean]> Whether to run browser in headless mode. More details for [Chromium](https://developers.google.com/web/updates/2017/04/headless-chrome) and [Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Headless_mode). Defaults to `true` unless the `devtools` option is `true`.
  - `port` <[number]> Port to use for the web socket. Defaults to 0 that picks any available port.
  - `executablePath` <[string]> Path to a browser executable to run instead of the bundled one. If `executablePath` is a relative path, then it is resolved relative to [current working directory](https://nodejs.org/api/process.html#process_process_cwd). **BEWARE**: Playwright is only guaranteed to work with the bundled Chromium, Firefox or WebKit, use at your own risk.
  - `args` <[Array]<[string]>> Additional arguments to pass to the browser instance. The list of Chromium flags can be found [here](http://peter.sh/experiments/chromium-command-line-switches/).
  - `ignoreDefaultArgs` <[boolean]|[Array]<[string]>> If `true`, then do not use any of the default arguments. If an array is given, then filter out the given default arguments. Dangerous option; use with care. Defaults to `false`.
  - `handleSIGINT` <[boolean]> Close the browser process on Ctrl-C. Defaults to `true`.
  - `handleSIGTERM` <[boolean]> Close the browser process on SIGTERM. Defaults to `true`.
  - `handleSIGHUP` <[boolean]> Close the browser process on SIGHUP. Defaults to `true`.
  - `logger` <[Logger]> Logger sink for Playwright logging.
  - `timeout` <[number]> Maximum time in milliseconds to wait for the browser instance to start. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.
  - `env` <[Object]<[string], [string]|[number]|[boolean]>> Specify environment variables that will be visible to the browser. Defaults to `process.env`.
  - `devtools` <[boolean]> **Chromium-only** Whether to auto-open a Developer Tools panel for each tab. If this option is `true`, the `headless` option will be set `false`.
- returns: <[Promise]<[BrowserServer]>> Promise which resolves to the browser app instance.

Launches browser server that client can connect to. An example of launching a browser executable and connecting to it later:

```js
const { chromium } = require('playwright');  // Or 'webkit' or 'firefox'.

(async () => {
  const browserServer = await chromium.launchServer();
  const wsEndpoint = browserServer.wsEndpoint();
  // Use web socket endpoint later to establish a connection.
  const browser = await chromium.connect({ wsEndpoint });
  // Close browser instance.
  await browserServer.close();
})();
```


## browserType.name()
- returns: <[string]>

Returns browser name. For example: `'chromium'`, `'webkit'` or `'firefox'`.



[AXNode]: api/class-accessibility.md#accessibilitysnapshotoptions "AXNode"
[Accessibility]: api/class-accessibility.md#class-accessibility "Accessibility"
[Array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array "Array"
[Body]: api.md#class-body  "Body"
[BrowserServer]: api/class-browser.md#class-browserserver  "BrowserServer"
[BrowserContext]: api/class-browsercontext.md#class-browsercontext  "BrowserContext"
[BrowserType]: api/class-browsertype.md#class-browsertype "BrowserType"
[Browser]: api.md#class-browser  "Browser"
[Buffer]: https://nodejs.org/api/buffer.htmlapi.md#buffer_class_buffer "Buffer"
[ChildProcess]: https://nodejs.org/api/child_process.html "ChildProcess"
[ChromiumBrowser]: api/class-chromiumbrowser.md#class-chromiumbrowser "ChromiumBrowser"
[ChromiumBrowserContext]: api/class-chromiumbrowsercontext.md#class-chromiumbrowsercontext "ChromiumBrowserContext"
[ChromiumCoverage]: api/class-chromiumcoverage.md#class-chromiumcoverage "ChromiumCoverage"
[CDPSession]: api/class-cdpsession.md#class-cdpsession  "CDPSession"
[ConsoleMessage]: api/class-consolemessage.md#class-consolemessage "ConsoleMessage"
[Dialog]: api/class-dialog.md#class-dialog "Dialog"
[Download]: api/class-download.md#class-download "Download"
[ElementHandle]: api/class-elementhandle.md#class-elementhandle "ElementHandle"
[Element]: https://developer.mozilla.org/en-US/docs/Web/API/element "Element"
[Error]: https://nodejs.org/api/errors.htmlapi.md#errors_class_error "Error"
[File]: api.md#class-file "https://developer.mozilla.org/en-US/docs/Web/API/File"
[FileChooser]: api/class-filechooser.md#class-filechooser "FileChooser"
[FirefoxBrowser]: api/class-firefoxbrowser.md#class-firefoxbrowser "FirefoxBrowser"
[Frame]: api/class-frame.md#class-frame "Frame"
[JSHandle]: api/class-jshandle.md#class-jshandle "JSHandle"
[Keyboard]: api/class-keyboard.md#class-keyboard "Keyboard"
[Logger]: api/class-logger.md#class-logger "Logger"
[Map]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map "Map"
[Mouse]: api/class-mouse.md#class-mouse "Mouse"
[Object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object "Object"
[Page]: api/class-page.md#class-page "Page"
[Playwright]: api.md#class-playwright "Playwright"
[Promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise "Promise"
[RegExp]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
[Request]: api/class-request.md#class-request  "Request"
[Response]: api/class-response.md#class-response  "Response"
[Route]: api/class-route.md#class-route  "Route"
[Selectors]: api/class-selectors.md#class-selectors  "Selectors"
[Serializable]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringifyapi.md#Description "Serializable"
[TimeoutError]: api/class-timeouterror.md#class-timeouterror "TimeoutError"
[UIEvent.detail]: https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail "UIEvent.detail"
[URL]: https://nodejs.org/api/url.html
[USKeyboardLayout]: ../src/usKeyboardLayout.ts "USKeyboardLayout"
[UnixTime]: https://en.wikipedia.org/wiki/Unix_time "Unix Time"
[WebKitBrowser]: api/class-webkitbrowser.md#class-webkitbrowser "WebKitBrowser"
[WebSocket]: api.md#class-websocket "WebSocket"
[Worker]: api/class-worker.md#class-worker "Worker"
[boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structuresapi.md#Boolean_type "Boolean"
[function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function "Function"
[iterator]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols "Iterator"
[number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structuresapi.md#Number_type "Number"
[origin]: https://developer.mozilla.org/en-US/docs/Glossary/Origin "Origin"
[selector]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors "selector"
[Readable]: https://nodejs.org/api/stream.htmlapi.md#stream_class_stream_readable "Readable"
[string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structuresapi.md#String_type "String"
[xpath]: https://developer.mozilla.org/en-US/docs/Web/XPath "xpath"
