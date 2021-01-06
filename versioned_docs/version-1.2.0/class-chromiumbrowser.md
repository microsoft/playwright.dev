---
id: class-chromiumbrowser
title: "ChromiumBrowser"
---


* extends: [Browser]

Chromium-specific features including Tracing, service worker support, etc.
You can use [`chromiumBrowser.startTracing`](./class-chromiumbrowser.md#chromiumbrowserstarttracingpage-options) and [`chromiumBrowser.stopTracing`](./class-chromiumbrowser.md#chromiumbrowserstoptracing) to create a trace file which can be opened in Chrome DevTools or [timeline viewer](https://chromedevtools.github.io/timeline-viewer/).

```js
await browser.startTracing(page, {path: 'trace.json'});
await page.goto('https://www.google.com');
await browser.stopTracing();
```

<!-- GEN:toc -->
- [chromiumBrowser.newBrowserCDPSession()](./class-chromiumbrowser.md#chromiumbrowsernewbrowsercdpsession)
- [chromiumBrowser.startTracing([page, options])](#chromiumbrowserstarttracingpage-options)
- [chromiumBrowser.stopTracing()](#chromiumbrowserstoptracing)
<!-- GEN:stop -->
<!-- GEN:toc-extends-Browser -->
- [event: 'disconnected'](./class-browser.md#event-disconnected)
- [browser.close()](./class-browser.md#browserclose)
- [browser.contexts()](./class-browser.md#browsercontexts)
- [browser.isConnected()](./class-browser.md#browserisconnected)
- [browser.newContext([options])](./class-browser.md#browsernewcontextoptions)
- [browser.newPage([options])](./class-browser.md#browsernewpageoptions)
<!-- GEN:stop -->

## chromiumBrowser.newBrowserCDPSession()
- returns: <[Promise]<[CDPSession]>> Promise that resolves to the newly created browser
session.

## chromiumBrowser.startTracing([page, options])
- `page` <[Page]> Optional, if specified, tracing includes screenshots of the given page.
- `options` <[Object]>
  - `path` <[string]> A path to write the trace file to.
  - `screenshots` <[boolean]> captures screenshots in the trace.
  - `categories` <[Array]<[string]>> specify custom categories to use instead of default.
- returns: <[Promise]>

Only one trace can be active at a time per browser.

## chromiumBrowser.stopTracing()
- returns: <[Promise]<[Buffer]>> Promise which resolves to buffer with trace data.



[AXNode]: ./class-accessibility.md#accessibilitysnapshotoptions "AXNode"
[Accessibility]: ./class-accessibility.md#class-accessibility "Accessibility"
[Array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array "Array"
[BrowserServer]: ./class-browser.md#class-browserserver  "BrowserServer"
[BrowserContext]: ./class-browsercontext.md#class-browsercontext  "BrowserContext"
[BrowserType]: ./class-browsertype.md#class-browsertype "BrowserType"
[Browser]: ./class-browser.md  "Browser"
[Buffer]: https://nodejs.org/api/buffer.htmlapi.md#buffer_class_buffer "Buffer"
[ChildProcess]: https://nodejs.org/api/child_process.html "ChildProcess"
[ChromiumBrowser]: ./class-chromiumbrowser.md#class-chromiumbrowser "ChromiumBrowser"
[ChromiumBrowserContext]: ./class-chromiumbrowsercontext.md#class-chromiumbrowsercontext "ChromiumBrowserContext"
[ChromiumCoverage]: ./class-chromiumcoverage.md#class-chromiumcoverage "ChromiumCoverage"
[CDPSession]: ./class-cdpsession.md#class-cdpsession  "CDPSession"
[ConsoleMessage]: ./class-consolemessage.md#class-consolemessage "ConsoleMessage"
[Dialog]: ./class-dialog.md#class-dialog "Dialog"
[Download]: ./class-download.md#class-download "Download"
[ElementHandle]: ./class-elementhandle.md#class-elementhandle "ElementHandle"
[Element]: https://developer.mozilla.org/en-US/docs/Web/API/element "Element"
[Error]: https://nodejs.org/api/errors.htmlapi.md#errors_class_error "Error"
[File]: https://developer.mozilla.org/en-US/docs/Web/API/File "File"
[FileChooser]: ./class-filechooser.md#class-filechooser "FileChooser"
[FirefoxBrowser]: ./class-firefoxbrowser.md#class-firefoxbrowser "FirefoxBrowser"
[Frame]: ./class-frame.md#class-frame "Frame"
[JSHandle]: ./class-jshandle.md#class-jshandle "JSHandle"
[Keyboard]: ./class-keyboard.md#class-keyboard "Keyboard"
[Logger]: ./class-logger.md#class-logger "Logger"
[Map]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map "Map"
[Mouse]: ./class-mouse.md#class-mouse "Mouse"
[Object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object "Object"
[Page]: ./class-page.md#class-page "Page"
[Playwright]: ./class-playwright.md "Playwright"
[Promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise "Promise"
[RegExp]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
[Request]: ./class-request.md#class-request  "Request"
[Response]: ./class-response.md#class-response  "Response"
[Route]: ./class-route.md#class-route  "Route"
[Selectors]: ./class-selectors.md#class-selectors  "Selectors"
[Serializable]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringifyapi.md#Description "Serializable"
[TimeoutError]: ./class-timeouterror.md#class-timeouterror "TimeoutError"
[UIEvent.detail]: https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail "UIEvent.detail"
[URL]: https://nodejs.org/api/url.html
[USKeyboardLayout]: ../src/usKeyboardLayout.ts "USKeyboardLayout"
[UnixTime]: https://en.wikipedia.org/wiki/Unix_time "Unix Time"
[WebKitBrowser]: ./class-webkitbrowser.md#class-webkitbrowser "WebKitBrowser"
[Worker]: ./class-worker.md#class-worker "Worker"
[boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structuresapi.md#Boolean_type "Boolean"
[function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function "Function"
[iterator]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols "Iterator"
[number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structuresapi.md#Number_type "Number"
[origin]: https://developer.mozilla.org/en-US/docs/Glossary/Origin "Origin"
[selector]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors "selector"
[Readable]: https://nodejs.org/api/stream.htmlapi.md#stream_class_stream_readable "Readable"
[string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structuresapi.md#String_type "String"
[xpath]: https://developer.mozilla.org/en-US/docs/Web/XPath "xpath"
