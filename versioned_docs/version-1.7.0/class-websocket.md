---
id: class-websocket
title: "WebSocket"
---


The [WebSocket] class represents websocket connections in the page.

<!-- GEN:toc -->
- [webSocket.on('close')](./class-websocket.md#websocketonclose)
- [webSocket.on('framereceived')](./class-websocket.md#websocketonframereceived)
- [webSocket.on('framesent')](./class-websocket.md#websocketonframesent)
- [webSocket.on('socketerror')](./class-websocket.md#websocketonsocketerror)
- [webSocket.isClosed()](./class-websocket.md#websocketisclosed)
- [webSocket.url()](./class-websocket.md#websocketurl)
- [webSocket.waitForEvent(event[, optionsOrPredicate])](./class-websocket.md#websocketwaitforeventevent-optionsorpredicate)
<!-- GEN:stop -->

## webSocket.on('close')

Fired when the websocket closes.

## webSocket.on('framereceived')
- <[Object]> web socket frame data
  - `payload` <[string]|[Buffer]> frame payload

Fired when the websocket recieves a frame.

## webSocket.on('framesent')
- <[Object]> web socket frame data
  - `payload` <[string]|[Buffer]> frame payload

Fired when the websocket sends a frame.

## webSocket.on('socketerror')
- <[String]> the error message

Fired when the websocket has an error.

## webSocket.isClosed()
- returns: <[boolean]>

Indicates that the web socket has been closed.

## webSocket.url()
- returns: <[string]>

Contains the URL of the WebSocket.

## webSocket.waitForEvent(event[, optionsOrPredicate])
- `event` <[string]> Event name, same one would pass into `webSocket.on(event)`.
- `optionsOrPredicate` <[Function]|[Object]> Either a predicate that receives an event or an options object. Optional.
  - `predicate` <[Function]> receives the event data and resolves to truthy value when the waiting should resolve.
  - `timeout` <[number]> maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultTimeout(timeout)](./class-browsercontext.md#browsercontextsetdefaulttimeouttimeout).
- returns: <[Promise]<[Object]>>

Returns the event data value.

Waits for event to fire and passes its value into the predicate function. Resolves when the predicate returns truthy
value. Will throw an error if the webSocket is closed before the event is fired.



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
