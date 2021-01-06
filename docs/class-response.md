---
id: class-response
title: "Response"
---


[Response] class represents responses which are received by page.


- [response.body()](./class-response.md#responsebody)
- [response.finished()](./class-response.md#responsefinished)
- [response.frame()](./class-response.md#responseframe)
- [response.headers()](./class-response.md#responseheaders)
- [response.json()](./class-response.md#responsejson)
- [response.ok()](./class-response.md#responseok)
- [response.request()](./class-response.md#responserequest)
- [response.status()](./class-response.md#responsestatus)
- [response.statusText()](./class-response.md#responsestatustext)
- [response.text()](./class-response.md#responsetext)
- [response.url()](./class-response.md#responseurl)

## response.body()
- returns: <[Promise]<[Buffer]>>

Returns the buffer with response body.

## response.finished()
- returns: <[Promise]<[null]|[Error]>>

Waits for this response to finish, returns failure error if request failed.

## response.frame()
- returns: <[Frame]>

Returns the [Frame] that initiated this response.

## response.headers()
- returns: <[Object]<[string], [string]>>

Returns the object with HTTP headers associated with the response. All header names are lower-case.

## response.json()
- returns: <[Promise]<[Serializable]>>

Returns the JSON representation of response body.

This method will throw if the response body is not parsable via `JSON.parse`.

## response.ok()
- returns: <[boolean]>

Contains a boolean stating whether the response was successful (status in the range 200-299) or not.

## response.request()
- returns: <[Request]>

Returns the matching [Request] object.

## response.status()
- returns: <[number]>

Contains the status code of the response (e.g., 200 for a success).

## response.statusText()
- returns: <[string]>

Contains the status text of the response (e.g. usually an "OK" for a success).

## response.text()
- returns: <[Promise]<[string]>>

Returns the text representation of response body.

## response.url()
- returns: <[string]>

Contains the URL of the response.

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
