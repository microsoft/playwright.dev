---
id: class-route
title: "class: Route"
---


Whenever a network route is set up with [page.route(url, handler)](api/class-page.md#pagerouteurl-handler) or [browserContext.route(url, handler)](api/class-browsercontext.md#browsercontextrouteurl-handler), the `Route` object allows to handle the route.

<!-- GEN:toc -->
- [route.abort([errorCode])](api/class-route.md#routeaborterrorcode)
- [route.continue([overrides])](api/class-route.md#routecontinueoverrides)
- [route.fulfill(response)](api/class-route.md#routefulfillresponse)
- [route.request()](api/class-route.md#routerequest)
<!-- GEN:stop -->

## route.abort([errorCode])
- `errorCode` <[string]> Optional error code. Defaults to `failed`, could be
  one of the following:
  - `'aborted'` - An operation was aborted (due to user action)
  - `'accessdenied'` - Permission to access a resource, other than the network, was denied
  - `'addressunreachable'` - The IP address is unreachable. This usually means
    that there is no route to the specified host or network.
  - `'blockedbyclient'` - The client chose to block the request.
  - `'blockedbyresponse'` - The request failed because the response was delivered along with requirements which are not met ('X-Frame-Options' and 'Content-Security-Policy' ancestor checks, for instance).
  - `'connectionaborted'` - A connection timed out as a result of not receiving an ACK for data sent.
  - `'connectionclosed'` - A connection was closed (corresponding to a TCP FIN).
  - `'connectionfailed'` - A connection attempt failed.
  - `'connectionrefused'` - A connection attempt was refused.
  - `'connectionreset'` - A connection was reset (corresponding to a TCP RST).
  - `'internetdisconnected'` - The Internet connection has been lost.
  - `'namenotresolved'` - The host name could not be resolved.
  - `'timedout'` - An operation timed out.
  - `'failed'` - A generic failure occurred.
- returns: <[Promise]>

Aborts the route's request.

## route.continue([overrides])
- `overrides` <[Object]> Optional request overrides, which can be one of the following:
  - `method` <[string]> If set changes the request method (e.g. GET or POST)
  - `postData` <[string]|[Buffer]> If set changes the post data of request
  - `headers` <[Object]<[string], [string]>> If set changes the request HTTP headers. Header values will be converted to a string.
- returns: <[Promise]>

Continues route's request with optional overrides.

```js
await page.route('**/*', (route, request) => {
  // Override headers
  const headers = Object.assign({}, request.headers(), {
    foo: 'bar', // set "foo" header
    origin: undefined, // remove "origin" header
  });
  route.continue({headers});
});
```

## route.fulfill(response)
- `response` <[Object]> Response that will fulfill this route's request.
  - `status` <[number]> Response status code, defaults to `200`.
  - `headers` <[Object]<[string], [string]>> Optional response headers. Header values will be converted to a string.
  - `contentType` <[string]> If set, equals to setting `Content-Type` response header.
  - `body` <[string]|[Buffer]> Optional response body.
  - `path` <[string]> Optional file path to respond with. The content type will be inferred from file extension. If `path` is a relative path, then it is resolved relative to [current working directory](https://nodejs.org/api/process.html#process_process_cwd).
- returns: <[Promise]>

Fulfills route's request with given response.

An example of fulfilling all requests with 404 responses:

```js
await page.route('**/*', route => {
  route.fulfill({
    status: 404,
    contentType: 'text/plain',
    body: 'Not Found!'
  });
});
```

An example of serving static file:

```js
await page.route('**/xhr_endpoint', route => route.fulfill({ path: 'mock_data.json' }));
```

## route.request()
- returns: <[Request]> A request to be routed.




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
