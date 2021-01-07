---
id: class-chromiumbrowser
title: "ChromiumBrowser"
---

* extends: [Browser]

Chromium-specific features including Tracing, service worker support, etc. You can use [chromium_browser.start_tracing(**options)](./api/class-chromiumbrowser.md#chromiumbrowserstarttracingoptions) and [chromium_browser.stop_tracing()](./api/class-chromiumbrowser.md#chromiumbrowserstoptracing) to create a trace file which can be opened in Chrome DevTools or [timeline viewer](https://chromedevtools.github.io/timeline-viewer/).

```js
await browser.startTracing(page, {path: 'trace.json'});
await page.goto('https://www.google.com');
await browser.stopTracing();
```


- [chromium_browser.new_browser_cdp_session()](./api/class-chromiumbrowser.md#chromiumbrowsernewbrowsercdpsession)
- [chromium_browser.start_tracing(**options)](./api/class-chromiumbrowser.md#chromiumbrowserstarttracingoptions)
- [chromium_browser.stop_tracing()](./api/class-chromiumbrowser.md#chromiumbrowserstoptracing)
- [browser.on("disconnected")](./api/class-browser.md#browserondisconnected)
- [browser.close()](./api/class-browser.md#browserclose)
- [browser.contexts()](./api/class-browser.md#browsercontexts)
- [browser.is_connected()](./api/class-browser.md#browserisconnected)
- [browser.new_context(**options)](./api/class-browser.md#browsernewcontextoptions)
- [browser.new_page(**options)](./api/class-browser.md#browsernewpageoptions)
- [browser.version()](./api/class-browser.md#browserversion)

## chromium_browser.new_browser_cdp_session()
- returns: <[Promise]<[CDPSession]>>

Returns the newly created browser session.

## chromium_browser.start_tracing(**options)
- `page` <[Page]> Optional, if specified, tracing includes screenshots of the given page.
- `categories` <[Array]<[string]>> specify custom categories to use instead of default.
- `path` <[string]> A path to write the trace file to.
- `screenshots` <[boolean]> captures screenshots in the trace.
- returns: <[Promise]>

Only one trace can be active at a time per browser.

## chromium_browser.stop_tracing()
- returns: <[Promise]<[Buffer]>>

Returns the buffer with trace data.

[Playwright]: ./api/class-playwright.md "Playwright"
[Browser]: ./api/class-browser.md "Browser"
[BrowserContext]: ./api/class-browsercontext.md "BrowserContext"
[Page]: ./api/class-page.md "Page"
[Frame]: ./api/class-frame.md "Frame"
[ElementHandle]: ./api/class-elementhandle.md "ElementHandle"
[JSHandle]: ./api/class-jshandle.md "JSHandle"
[ConsoleMessage]: ./api/class-consolemessage.md "ConsoleMessage"
[Dialog]: ./api/class-dialog.md "Dialog"
[Download]: ./api/class-download.md "Download"
[Video]: ./api/class-video.md "Video"
[FileChooser]: ./api/class-filechooser.md "FileChooser"
[Keyboard]: ./api/class-keyboard.md "Keyboard"
[Mouse]: ./api/class-mouse.md "Mouse"
[Touchscreen]: ./api/class-touchscreen.md "Touchscreen"
[Request]: ./api/class-request.md "Request"
[Response]: ./api/class-response.md "Response"
[Selectors]: ./api/class-selectors.md "Selectors"
[Route]: ./api/class-route.md "Route"
[WebSocket]: ./api/class-websocket.md "WebSocket"
[TimeoutError]: ./api/class-timeouterror.md "TimeoutError"
[Accessibility]: ./api/class-accessibility.md "Accessibility"
[Worker]: ./api/class-worker.md "Worker"
[BrowserServer]: ./api/class-browserserver.md "BrowserServer"
[BrowserType]: ./api/class-browsertype.md "BrowserType"
[Logger]: ./api/class-logger.md "Logger"
[ChromiumBrowser]: ./api/class-chromiumbrowser.md "ChromiumBrowser"
[ChromiumBrowserContext]: ./api/class-chromiumbrowsercontext.md "ChromiumBrowserContext"
[ChromiumCoverage]: ./api/class-chromiumcoverage.md "ChromiumCoverage"
[CDPSession]: ./api/class-cdpsession.md "CDPSession"
[FirefoxBrowser]: ./api/class-firefoxbrowser.md "FirefoxBrowser"
[WebKitBrowser]: ./api/class-webkitbrowser.md "WebKitBrowser"
[Array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array "Array"
[Buffer]: https://nodejs.org/api/buffer.html#buffer_class_buffer "Buffer"
[ChildProcess]: https://nodejs.org/api/child_process.html "ChildProcess"
[Element]: https://developer.mozilla.org/en-US/docs/Web/API/element "Element"
[Error]: https://nodejs.org/api/errors.html#errors_class_error "Error"
[Evaluation Argument]: ./core-concepts.md#evaluationargument "Evaluation Argument"
[Map]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map "Map"
[Object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object "Object"
[Promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise "Promise"
[RegExp]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp "RegExp"
[Serializable]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Description "Serializable"
[UIEvent.detail]: https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail "UIEvent.detail"
[URL]: https://nodejs.org/api/url.html "URL"
[USKeyboardLayout]: ../src/usKeyboardLayout.ts "USKeyboardLayout"
[UnixTime]: https://en.wikipedia.org/wiki/Unix_time "Unix Time"
[boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type "Boolean"
[function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function "Function"
[iterator]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols "Iterator"
[null]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null "null"
[number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type "Number"
[origin]: https://developer.mozilla.org/en-US/docs/Glossary/Origin "Origin"
[selector]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors "selector"
[Readable]: https://nodejs.org/api/stream.html#stream_class_stream_readable "Readable"
[string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type "string"
[xpath]: https://developer.mozilla.org/en-US/docs/Web/XPath "xpath"
