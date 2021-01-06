---
id: class-response
title: "Response"
---


[Response] class represents responses which are received by page.

<!-- GEN:toc -->
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
<!-- GEN:stop -->

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
