---
id: class-chromiumbrowsercontext
title: "class: ChromiumBrowserContext"
---


* extends: [BrowserContext]

Chromium-specific features including background pages, service worker support, etc.

```js
const backgroundPage = await context.waitForEvent('backgroundpage');
```

<!-- GEN:toc -->
- [event: 'backgroundpage'](api/class-chromiumbrowsercontext.md#event-backgroundpage)
- [event: 'serviceworker'](api/class-chromiumbrowsercontext.md#event-serviceworker)
- [chromiumBrowserContext.backgroundPages()](api/class-chromiumbrowsercontext.md#chromiumbrowsercontextbackgroundpages)
- [chromiumBrowserContext.newCDPSession(page)](api/class-chromiumbrowsercontext.md#chromiumbrowsercontextnewcdpsessionpage)
- [chromiumBrowserContext.serviceWorkers()](api/class-chromiumbrowsercontext.md#chromiumbrowsercontextserviceworkers)
<!-- GEN:stop -->
<!-- GEN:toc-extends-BrowserContext -->
- [event: 'close'](api/class-browserserver.md#event-close)
- [event: 'page'](api/class-browsercontext.md#event-page)
- [browserContext.addCookies(cookies)](api/class-browsercontext.md#browsercontextaddcookiescookies)
- [browserContext.addInitScript(script[, arg])](api/class-browsercontext.md#browsercontextaddinitscriptscript-arg)
- [browserContext.clearCookies()](api/class-browsercontext.md#browsercontextclearcookies)
- [browserContext.clearPermissions()](api/class-browsercontext.md#browsercontextclearpermissions)
- [browserContext.close()](api/class-browsercontext.md#browsercontextclose)
- [browserContext.cookies([urls])](api/class-browsercontext.md#browsercontextcookiesurls)
- [browserContext.exposeBinding(name, playwrightBinding)](api/class-browsercontext.md#browsercontextexposebindingname-playwrightbinding)
- [browserContext.exposeFunction(name, playwrightFunction)](api/class-browsercontext.md#browsercontextexposefunctionname-playwrightfunction)
- [browserContext.grantPermissions(permissions[][, options])](api/class-browsercontext.md#browsercontextgrantpermissionspermissions-options)
- [browserContext.newPage()](api/class-browsercontext.md#browsercontextnewpage)
- [browserContext.pages()](api/class-browsercontext.md#browsercontextpages)
- [browserContext.route(url, handler)](api/class-browsercontext.md#browsercontextrouteurl-handler)
- [browserContext.setDefaultNavigationTimeout(timeout)](api/class-browsercontext.md#browsercontextsetdefaultnavigationtimeouttimeout)
- [browserContext.setDefaultTimeout(timeout)](api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout)
- [browserContext.setExtraHTTPHeaders(headers)](api/class-browsercontext.md#browsercontextsetextrahttpheadersheaders)
- [browserContext.setGeolocation(geolocation)](api/class-browsercontext.md#browsercontextsetgeolocationgeolocation)
- [browserContext.setHTTPCredentials(httpCredentials)](api/class-browsercontext.md#browsercontextsethttpcredentialshttpcredentials)
- [browserContext.setOffline(offline)](api/class-browsercontext.md#browsercontextsetofflineoffline)
- [browserContext.unroute(url[, handler])](api/class-browsercontext.md#browsercontextunrouteurl-handler)
- [browserContext.waitForEvent(event[, optionsOrPredicate])](api/class-browsercontext.md#browsercontextwaitforeventevent-optionsorpredicate)
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
