---
id: class-chromiumbrowsercontext
title: "ChromiumBrowserContext"
---

* extends: [BrowserContext]

Chromium-specific features including background pages, service worker support, etc.

```js
const backgroundPage = await context.waitForEvent('backgroundpage');
```


- [chromiumBrowserContext.on('backgroundpage')](./class-chromiumbrowsercontext.md#chromiumbrowsercontextonbackgroundpage)
- [chromiumBrowserContext.on('serviceworker')](./class-chromiumbrowsercontext.md#chromiumbrowsercontextonserviceworker)
- [chromiumBrowserContext.backgroundPages()](./class-chromiumbrowsercontext.md#chromiumbrowsercontextbackgroundpages)
- [chromiumBrowserContext.newCDPSession(page)](./class-chromiumbrowsercontext.md#chromiumbrowsercontextnewcdpsessionpage)
- [chromiumBrowserContext.serviceWorkers()](./class-chromiumbrowsercontext.md#chromiumbrowsercontextserviceworkers)
- [browserContext.on('close')](./class-browsercontext.md#browsercontextonclose)
- [browserContext.on('page')](./class-browsercontext.md#browsercontextonpage)
- [browserContext.addCookies(cookies)](./class-browsercontext.md#browsercontextaddcookiescookies)
- [browserContext.addInitScript(script[, arg])](./class-browsercontext.md#browsercontextaddinitscriptscript-arg)
- [browserContext.browser()](./class-browsercontext.md#browsercontextbrowser)
- [browserContext.clearCookies()](./class-browsercontext.md#browsercontextclearcookies)
- [browserContext.clearPermissions()](./class-browsercontext.md#browsercontextclearpermissions)
- [browserContext.close()](./class-browsercontext.md#browsercontextclose)
- [browserContext.cookies([urls])](./class-browsercontext.md#browsercontextcookiesurls)
- [browserContext.exposeBinding(name, callback[, options])](./class-browsercontext.md#browsercontextexposebindingname-callback-options)
- [browserContext.exposeFunction(name, callback)](./class-browsercontext.md#browsercontextexposefunctionname-callback)
- [browserContext.grantPermissions(permissions[, options])](./class-browsercontext.md#browsercontextgrantpermissionspermissions-options)
- [browserContext.newPage()](./class-browsercontext.md#browsercontextnewpage)
- [browserContext.pages()](./class-browsercontext.md#browsercontextpages)
- [browserContext.route(url, handler)](./class-browsercontext.md#browsercontextrouteurl-handler)
- [browserContext.setDefaultNavigationTimeout(timeout)](./class-browsercontext.md#browsercontextsetdefaultnavigationtimeouttimeout)
- [browserContext.setDefaultTimeout(timeout)](./class-browsercontext.md#browsercontextsetdefaulttimeouttimeout)
- [browserContext.setExtraHTTPHeaders(headers)](./class-browsercontext.md#browsercontextsetextrahttpheadersheaders)
- [browserContext.setGeolocation(geolocation)](./class-browsercontext.md#browsercontextsetgeolocationgeolocation)
- [browserContext.setHTTPCredentials(httpCredentials)](./class-browsercontext.md#browsercontextsethttpcredentialshttpcredentials)
- [browserContext.setOffline(offline)](./class-browsercontext.md#browsercontextsetofflineoffline)
- [browserContext.storageState([options])](./class-browsercontext.md#browsercontextstoragestateoptions)
- [browserContext.unroute(url[, handler])](./class-browsercontext.md#browsercontextunrouteurl-handler)
- [browserContext.waitForEvent(event[, optionsOrPredicate])](./class-browsercontext.md#browsercontextwaitforeventevent-optionsorpredicate)

## chromiumBrowserContext.on('backgroundpage')
- type: <[Page]>

Emitted when new background page is created in the context.

> **NOTE** Only works with persistent context.

## chromiumBrowserContext.on('serviceworker')
- type: <[Worker]>

Emitted when new service worker is created in the context.

## chromiumBrowserContext.backgroundPages()
- returns: <[Array]<[Page]>>

All existing background pages in the context.

## chromiumBrowserContext.newCDPSession(page)
- `page` <[Page]> Page to create new session for.
- returns: <[Promise]<[CDPSession]>>

Returns the newly created session.

## chromiumBrowserContext.serviceWorkers()
- returns: <[Array]<[Worker]>>

All existing service workers in the context.

[Playwright]: ./class-playwright.md "Playwright"
[Browser]: ./class-browser.md "Browser"
[BrowserContext]: ./class-browsercontext.md "BrowserContext"
[Page]: ./class-page.md "Page"
[Frame]: ./class-frame.md "Frame"
[ElementHandle]: ./class-elementhandle.md "ElementHandle"
[JSHandle]: ./class-jshandle.md "JSHandle"
[ConsoleMessage]: ./class-consolemessage.md "ConsoleMessage"
[Dialog]: ./class-dialog.md "Dialog"
[Download]: ./class-download.md "Download"
[Video]: ./class-video.md "Video"
[FileChooser]: ./class-filechooser.md "FileChooser"
[Keyboard]: ./class-keyboard.md "Keyboard"
[Mouse]: ./class-mouse.md "Mouse"
[Touchscreen]: ./class-touchscreen.md "Touchscreen"
[Request]: ./class-request.md "Request"
[Response]: ./class-response.md "Response"
[Selectors]: ./class-selectors.md "Selectors"
[Route]: ./class-route.md "Route"
[WebSocket]: ./class-websocket.md "WebSocket"
[TimeoutError]: ./class-timeouterror.md "TimeoutError"
[Accessibility]: ./class-accessibility.md "Accessibility"
[Worker]: ./class-worker.md "Worker"
[BrowserServer]: ./class-browserserver.md "BrowserServer"
[BrowserType]: ./class-browsertype.md "BrowserType"
[Logger]: ./class-logger.md "Logger"
[ChromiumBrowser]: ./class-chromiumbrowser.md "ChromiumBrowser"
[ChromiumBrowserContext]: ./class-chromiumbrowsercontext.md "ChromiumBrowserContext"
[ChromiumCoverage]: ./class-chromiumcoverage.md "ChromiumCoverage"
[CDPSession]: ./class-cdpsession.md "CDPSession"
[FirefoxBrowser]: ./class-firefoxbrowser.md "FirefoxBrowser"
[WebKitBrowser]: ./class-webkitbrowser.md "WebKitBrowser"
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
