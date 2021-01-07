---
id: class-websocket
title: "WebSocket"
---


The [WebSocket] class represents websocket connections in the page.


- [web_socket.on("close")](./api/class-websocket.md#websocketonclose)
- [web_socket.on("framereceived")](./api/class-websocket.md#websocketonframereceived)
- [web_socket.on("framesent")](./api/class-websocket.md#websocketonframesent)
- [web_socket.on("socketerror")](./api/class-websocket.md#websocketonsocketerror)
- [web_socket.is_closed()](./api/class-websocket.md#websocketisclosed)
- [web_socket.url()](./api/class-websocket.md#websocketurl)
- [web_socket.wait_for_event(event, predicate, **options)](./api/class-websocket.md#websocketwaitforeventevent-predicate-options)

## web_socket.on("close")

Fired when the websocket closes.

## web_socket.on("framereceived")
- type: <[Object]>
  - `payload` <[string]|[Buffer]> frame payload

Fired when the websocket recieves a frame.

## web_socket.on("framesent")
- type: <[Object]>
  - `payload` <[string]|[Buffer]> frame payload

Fired when the websocket sends a frame.

## web_socket.on("socketerror")
- type: <[String]>

Fired when the websocket has an error.

## web_socket.is_closed()
- returns: <[boolean]>

Indicates that the web socket has been closed.

## web_socket.url()
- returns: <[string]>

Contains the URL of the WebSocket.

## web_socket.wait_for_event(event, predicate, **options)
- `event` <[string]> Event name, same one would pass into `webSocket.on(event)`.
- `predicate` <[Function]> receives the event data and resolves to truthy value when the waiting should resolve.
- `timeout` <[number]> maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout).
- returns: <[Promise]<[Object]>>

Returns the event data value.

Waits for event to fire and passes its value into the predicate function. Returns when the predicate returns truthy value. Will throw an error if the webSocket is closed before the event is fired.

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
