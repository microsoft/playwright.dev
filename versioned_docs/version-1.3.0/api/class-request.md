---
id: class-request
title: "class: Request"
---


Whenever the page sends a request, such as for a network resource, the following events are emitted by playwright's page:
- [`'request'`](api/class-page.md#event-request) emitted when the request is issued by the page.
- [`'response'`](api/class-page.md#event-response) emitted when/if the response is received for the request.
- [`'requestfinished'`](api/class-page.md#event-requestfinished) emitted when the response body is downloaded and the request is complete.

If request fails at some point, then instead of `'requestfinished'` event (and possibly instead of 'response' event), the  [`'requestfailed'`](api/class-page.md#event-requestfailed) event is emitted.

> **NOTE** HTTP Error responses, such as 404 or 503, are still successful responses from HTTP standpoint, so request will complete with `'requestfinished'` event.

If request gets a 'redirect' response, the request is successfully finished with the 'requestfinished' event, and a new request is  issued to a redirected url.

<!-- GEN:toc -->
- [request.failure()](api/class-request.md#requestfailure)
- [request.frame()](api/class-request.md#requestframe)
- [request.headers()](api/class-request.md#requestheaders)
- [request.isNavigationRequest()](api/class-request.md#requestisnavigationrequest)
- [request.method()](api/class-request.md#requestmethod)
- [request.postData()](api/class-request.md#requestpostdata)
- [request.postDataBuffer()](api/class-request.md#requestpostdatabuffer)
- [request.postDataJSON()](api/class-request.md#requestpostdatajson)
- [request.redirectedFrom()](api/class-request.md#requestredirectedfrom)
- [request.redirectedTo()](api/class-request.md#requestredirectedto)
- [request.resourceType()](api/class-request.md#requestresourcetype)
- [request.response()](api/class-request.md#requestresponse)
- [request.url()](api/class-request.md#requesturl)
<!-- GEN:stop -->

## request.failure()
- returns: <?[Object]> Object describing request failure, if any
  - `errorText` <[string]> Human-readable error message, e.g. `'net::ERR_FAILED'`.

The method returns `null` unless this request has failed, as reported by
`requestfailed` event.

Example of logging of all the failed requests:

```js
page.on('requestfailed', request => {
  console.log(request.url() + ' ' + request.failure().errorText);
});
```

## request.frame()
- returns: <[Frame]> A [Frame] that initiated this request.

## request.headers()
- returns: <[Object]<[string], [string]>> An object with HTTP headers associated with the request. All header names are lower-case.

## request.isNavigationRequest()
- returns: <[boolean]>

Whether this request is driving frame's navigation.

## request.method()
- returns: <[string]> Request's method (GET, POST, etc.)

## request.postData()
- returns: <?[string]> Request's post body, if any.

## request.postDataBuffer()
- returns: <?[Buffer]> Request's post body in a binary form, if any.

## request.postDataJSON()
- returns: <?[Object]> Parsed request's body for `form-urlencoded` and JSON as a fallback if any.

When the response is `application/x-www-form-urlencoded` then a key/value object of the values will be returned. Otherwise it will be parsed as JSON.

## request.redirectedFrom()
- returns: <?[Request]> Request that was redirected by the server to this one, if any.

When the server responds with a redirect, Playwright creates a new [Request] object. The two requests are connected by `redirectedFrom()` and `redirectedTo()` methods. When multiple server redirects has happened, it is possible to construct the whole redirect chain by repeatedly calling `redirectedFrom()`.

For example, if the website `http://example.com` redirects to `https://example.com`:
```js
const response = await page.goto('http://example.com');
console.log(response.request().redirectedFrom().url()); // 'http://example.com'
```

If the website `https://google.com` has no redirects:
```js
const response = await page.goto('https://google.com');
console.log(response.request().redirectedFrom()); // null
```

## request.redirectedTo()
- returns: <?[Request]> New request issued by the browser if the server responded with redirect.

This method is the opposite of [request.redirectedFrom()](#requestredirectedfrom):
```js
console.log(request.redirectedFrom().redirectedTo() === request); // true
```

## request.resourceType()
- returns: <[string]>

Contains the request's resource type as it was perceived by the rendering engine.
ResourceType will be one of the following: `document`, `stylesheet`, `image`, `media`, `font`, `script`, `texttrack`, `xhr`, `fetch`, `eventsource`, `websocket`, `manifest`, `other`.

## request.response()
- returns: <[Promise]<?[Response]>> A matching [Response] object, or `null` if the response was not received due to error.

## request.url()
- returns: <[string]> URL of the request.



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
[EvaluationArgument]: api/evaluationargument.md#evaluationargument "Evaluation Argument"
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
