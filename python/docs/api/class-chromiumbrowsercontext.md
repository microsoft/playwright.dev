---
id: class-chromiumbrowsercontext
title: "ChromiumBrowserContext"
---

* extends: [BrowserContext]

Chromium-specific features including background pages, service worker support, etc.

```js
const backgroundPage = await context.waitForEvent('backgroundpage');
```


- [chromium_browser_context.on("backgroundpage")](./api/class-chromiumbrowsercontext.md#chromiumbrowsercontextonbackgroundpage)
- [chromium_browser_context.on("serviceworker")](./api/class-chromiumbrowsercontext.md#chromiumbrowsercontextonserviceworker)
- [chromium_browser_context.background_pages()](./api/class-chromiumbrowsercontext.md#chromiumbrowsercontextbackgroundpages)
- [chromium_browser_context.new_cdp_session(page)](./api/class-chromiumbrowsercontext.md#chromiumbrowsercontextnewcdpsessionpage)
- [chromium_browser_context.service_workers()](./api/class-chromiumbrowsercontext.md#chromiumbrowsercontextserviceworkers)
- [browser_context.on("close")](./api/class-browsercontext.md#browsercontextonclose)
- [browser_context.on("page")](./api/class-browsercontext.md#browsercontextonpage)
- [browser_context.add_cookies(cookies)](./api/class-browsercontext.md#browsercontextaddcookiescookies)
- [browser_context.add_init_script(script, **options)](./api/class-browsercontext.md#browsercontextaddinitscriptscript-options)
- [browser_context.browser()](./api/class-browsercontext.md#browsercontextbrowser)
- [browser_context.clear_cookies()](./api/class-browsercontext.md#browsercontextclearcookies)
- [browser_context.clear_permissions()](./api/class-browsercontext.md#browsercontextclearpermissions)
- [browser_context.close()](./api/class-browsercontext.md#browsercontextclose)
- [browser_context.cookies(**options)](./api/class-browsercontext.md#browsercontextcookiesoptions)
- [browser_context.expose_binding(name, callback, **options)](./api/class-browsercontext.md#browsercontextexposebindingname-callback-options)
- [browser_context.expose_function(name, callback)](./api/class-browsercontext.md#browsercontextexposefunctionname-callback)
- [browser_context.grant_permissions(permissions, **options)](./api/class-browsercontext.md#browsercontextgrantpermissionspermissions-options)
- [browser_context.new_page()](./api/class-browsercontext.md#browsercontextnewpage)
- [browser_context.pages()](./api/class-browsercontext.md#browsercontextpages)
- [browser_context.route(url, handler)](./api/class-browsercontext.md#browsercontextrouteurl-handler)
- [browser_context.set_default_navigation_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaultnavigationtimeouttimeout)
- [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout)
- [browser_context.set_extra_http_headers(headers)](./api/class-browsercontext.md#browsercontextsetextrahttpheadersheaders)
- [browser_context.set_geolocation(latitude, longitude, **options)](./api/class-browsercontext.md#browsercontextsetgeolocationlatitude-longitude-options)
- [browser_context.set_http_credentials(http_credentials)](./api/class-browsercontext.md#browsercontextsethttpcredentialshttpcredentials)
- [browser_context.set_offline(offline)](./api/class-browsercontext.md#browsercontextsetofflineoffline)
- [browser_context.storage_state(**options)](./api/class-browsercontext.md#browsercontextstoragestateoptions)
- [browser_context.unroute(url, **options)](./api/class-browsercontext.md#browsercontextunrouteurl-options)
- [browser_context.wait_for_event(event, predicate, **options)](./api/class-browsercontext.md#browsercontextwaitforeventevent-predicate-options)

## chromium_browser_context.on("backgroundpage")
- type: <[Page]>

Emitted when new background page is created in the context.

> **NOTE** Only works with persistent context.

## chromium_browser_context.on("serviceworker")
- type: <[Worker]>

Emitted when new service worker is created in the context.

## chromium_browser_context.background_pages()
- returns: <[Array]<[Page]>>

All existing background pages in the context.

## chromium_browser_context.new_cdp_session(page)
- `page` <[Page]> Page to create new session for.
- returns: <[Promise]<[CDPSession]>>

Returns the newly created session.

## chromium_browser_context.service_workers()
- returns: <[Array]<[Worker]>>

All existing service workers in the context.

[Accessibility]: ./api/class-accessibility.md "Accessibility"
[Browser]: ./api/class-browser.md "Browser"
[BrowserContext]: ./api/class-browsercontext.md "BrowserContext"
[BrowserServer]: ./api/class-browserserver.md "BrowserServer"
[BrowserType]: ./api/class-browsertype.md "BrowserType"
[CDPSession]: ./api/class-cdpsession.md "CDPSession"
[ChromiumBrowser]: ./api/class-chromiumbrowser.md "ChromiumBrowser"
[ChromiumBrowserContext]: ./api/class-chromiumbrowsercontext.md "ChromiumBrowserContext"
[ChromiumCoverage]: ./api/class-chromiumcoverage.md "ChromiumCoverage"
[ConsoleMessage]: ./api/class-consolemessage.md "ConsoleMessage"
[Dialog]: ./api/class-dialog.md "Dialog"
[Download]: ./api/class-download.md "Download"
[ElementHandle]: ./api/class-elementhandle.md "ElementHandle"
[FileChooser]: ./api/class-filechooser.md "FileChooser"
[FirefoxBrowser]: ./api/class-firefoxbrowser.md "FirefoxBrowser"
[Frame]: ./api/class-frame.md "Frame"
[JSHandle]: ./api/class-jshandle.md "JSHandle"
[Keyboard]: ./api/class-keyboard.md "Keyboard"
[Logger]: ./api/class-logger.md "Logger"
[Mouse]: ./api/class-mouse.md "Mouse"
[Page]: ./api/class-page.md "Page"
[Playwright]: ./api/class-playwright.md "Playwright"
[Request]: ./api/class-request.md "Request"
[Response]: ./api/class-response.md "Response"
[Route]: ./api/class-route.md "Route"
[Selectors]: ./api/class-selectors.md "Selectors"
[TimeoutError]: ./api/class-timeouterror.md "TimeoutError"
[Touchscreen]: ./api/class-touchscreen.md "Touchscreen"
[Video]: ./api/class-video.md "Video"
[WebKitBrowser]: ./api/class-webkitbrowser.md "WebKitBrowser"
[WebSocket]: ./api/class-websocket.md "WebSocket"
[Worker]: ./api/class-worker.md "Worker"
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
