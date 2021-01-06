---
id: class-chromiumbrowsercontext
title: "ChromiumBrowserContext"
---


* extends: [BrowserContext]

Chromium-specific features including background pages, service worker support, etc.

```js
const backgroundPage = await context.waitForEvent('backgroundpage');
```

<!-- GEN:toc -->
- [event: 'backgroundpage'](./class-chromiumbrowsercontext.md#event-backgroundpage)
- [event: 'serviceworker'](./class-chromiumbrowsercontext.md#event-serviceworker)
- [chromiumBrowserContext.backgroundPages()](./class-chromiumbrowsercontext.md#chromiumbrowsercontextbackgroundpages)
- [chromiumBrowserContext.newCDPSession(page)](./class-chromiumbrowsercontext.md#chromiumbrowsercontextnewcdpsessionpage)
- [chromiumBrowserContext.serviceWorkers()](./class-chromiumbrowsercontext.md#chromiumbrowsercontextserviceworkers)
<!-- GEN:stop -->
<!-- GEN:toc-extends-BrowserContext -->
- [event: 'close'](./class-browserserver.md#event-close)
- [event: 'page'](./class-browsercontext.md#event-page)
- [browserContext.addCookies(cookies)](./class-browsercontext.md#browsercontextaddcookiescookies)
- [browserContext.addInitScript(script[, arg])](./class-browsercontext.md#browsercontextaddinitscriptscript-arg)
- [browserContext.browser()](./class-browsercontext.md#browsercontextbrowser)
- [browserContext.clearCookies()](./class-browsercontext.md#browsercontextclearcookies)
- [browserContext.clearPermissions()](./class-browsercontext.md#browsercontextclearpermissions)
- [browserContext.close()](./class-browsercontext.md#browsercontextclose)
- [browserContext.cookies([urls])](./class-browsercontext.md#browsercontextcookiesurls)
- [browserContext.exposeBinding(name, playwrightBinding[, options])](./class-browsercontext.md#browsercontextexposebindingname-playwrightbinding-options)
- [browserContext.exposeFunction(name, playwrightFunction)](./class-browsercontext.md#browsercontextexposefunctionname-playwrightfunction)
- [browserContext.grantPermissions(permissions[][, options])](./class-browsercontext.md#browsercontextgrantpermissionspermissions-options)
- [browserContext.newPage()](./class-browsercontext.md#browsercontextnewpage)
- [browserContext.pages()](./class-browsercontext.md#browsercontextpages)
- [browserContext.route(url, handler)](./class-browsercontext.md#browsercontextrouteurl-handler)
- [browserContext.setDefaultNavigationTimeout(timeout)](./class-browsercontext.md#browsercontextsetdefaultnavigationtimeouttimeout)
- [browserContext.setDefaultTimeout(timeout)](./class-browsercontext.md#browsercontextsetdefaulttimeouttimeout)
- [browserContext.setExtraHTTPHeaders(headers)](./class-browsercontext.md#browsercontextsetextrahttpheadersheaders)
- [browserContext.setGeolocation(geolocation)](./class-browsercontext.md#browsercontextsetgeolocationgeolocation)
- [browserContext.setHTTPCredentials(httpCredentials)](./class-browsercontext.md#browsercontextsethttpcredentialshttpcredentials)
- [browserContext.setOffline(offline)](./class-browsercontext.md#browsercontextsetofflineoffline)
- [browserContext.unroute(url[, handler])](./class-browsercontext.md#browsercontextunrouteurl-handler)
- [browserContext.waitForEvent(event[, optionsOrPredicate])](./class-browsercontext.md#browsercontextwaitforeventevent-optionsorpredicate)
<!-- GEN:stop -->

## event: 'backgroundpage'
- <[Page]>

Emitted when new background page is created in the context.

> **NOTE** Only works with persistent context.

## event: 'serviceworker'
- <[Worker]>

Emitted when new service worker is created in the context.

## chromiumBrowserContext.backgroundPages()
- returns: <[Array]<[Page]>> All existing background pages in the context.

## chromiumBrowserContext.newCDPSession(page)
- `page` <[Page]> Page to create new session for.
- returns: <[Promise]<[CDPSession]>> Promise that resolves to the newly created session.

## chromiumBrowserContext.serviceWorkers()
- returns: <[Array]<[Worker]>> All existing service workers in the context.



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
[EvaluationArgument]: ./evaluationargument.md#evaluationargument "Evaluation Argument"
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
[Touchscreen]: ./class-touchscreen.md#class-touchscreen "Touchscreen"
[UIEvent.detail]: https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail "UIEvent.detail"
[URL]: https://nodejs.org/api/url.html
[USKeyboardLayout]: ../src/usKeyboardLayout.ts "USKeyboardLayout"
[UnixTime]: https://en.wikipedia.org/wiki/Unix_time "Unix Time"
[Video]: ./class-video.md#class-video "Video"
[WebKitBrowser]: ./class-webkitbrowser.md#class-webkitbrowser "WebKitBrowser"
[WebSocket]: ./class-websocket.md#class-websocket "WebSocket"
[Worker]: ./class-worker.md#class-worker "Worker"
[boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structuresapi.md#Boolean_type "Boolean"
[function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function "Function"
[iterator]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols "Iterator"
[null]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null
[number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structuresapi.md#Number_type "Number"
[origin]: https://developer.mozilla.org/en-US/docs/Glossary/Origin "Origin"
[selector]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors "selector"
[Readable]: https://nodejs.org/api/stream.htmlapi.md#stream_class_stream_readable "Readable"
[string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structuresapi.md#String_type "String"
[xpath]: https://developer.mozilla.org/en-US/docs/Web/XPath "xpath"
