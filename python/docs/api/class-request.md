---
id: class-request
title: "Request"
---


Whenever the page sends a request for a network resource the following sequence of events are emitted by [Page]:
* [page.on("request")](./api/class-page.md#pageonrequest) emitted when the request is issued by the page.
* [page.on("response")](./api/class-page.md#pageonresponse) emitted when/if the response status and headers are received for the request.
* [page.on("requestfinished")](./api/class-page.md#pageonrequestfinished) emitted when the response body is downloaded and the request is complete.

If request fails at some point, then instead of `'requestfinished'` event (and possibly instead of 'response' event), the  [page.on("requestfailed")](./api/class-page.md#pageonrequestfailed) event is emitted.

> **NOTE** HTTP Error responses, such as 404 or 503, are still successful responses from HTTP standpoint, so request will complete with `'requestfinished'` event.

If request gets a 'redirect' response, the request is successfully finished with the 'requestfinished' event, and a new request is  issued to a redirected url.


- [request.frame()](./api/class-request.md#requestframe)
- [request.headers()](./api/class-request.md#requestheaders)
- [request.is_navigation_request()](./api/class-request.md#requestisnavigationrequest)
- [request.method()](./api/class-request.md#requestmethod)
- [request.post_data()](./api/class-request.md#requestpostdata)
- [request.post_data_buffer()](./api/class-request.md#requestpostdatabuffer)
- [request.post_data_json()](./api/class-request.md#requestpostdatajson)
- [request.redirected_from()](./api/class-request.md#requestredirectedfrom)
- [request.redirected_to()](./api/class-request.md#requestredirectedto)
- [request.resource_type()](./api/class-request.md#requestresourcetype)
- [request.response()](./api/class-request.md#requestresponse)
- [request.timing()](./api/class-request.md#requesttiming)
- [request.url()](./api/class-request.md#requesturl)
- [request.failure()](./api/class-request.md#requestfailure)

## request.frame()
- returns: <[Frame]>

Returns the [Frame] that initiated this request.

## request.headers()
- returns: <[Dict]\[[str], [str]\]>

An object with HTTP headers associated with the request. All header names are lower-case.

## request.is_navigation_request()
- returns: <[bool]>

Whether this request is driving frame's navigation.

## request.method()
- returns: <[str]>

Request's method (GET, POST, etc.)

## request.post_data()
- returns: <[NoneType]|[str]>

Request's post body, if any.

## request.post_data_buffer()
- returns: <[NoneType]|[Buffer]>

Request's post body in a binary form, if any.

## request.post_data_json()
- returns: <[NoneType]|[Any]>

Returns parsed request's body for `form-urlencoded` and JSON as a fallback if any.

When the response is `application/x-www-form-urlencoded` then a key/value object of the values will be returned. Otherwise it will be parsed as JSON.

## request.redirected_from()
- returns: <[NoneType]|[Request]>

Request that was redirected by the server to this one, if any.

When the server responds with a redirect, Playwright creates a new [Request] object. The two requests are connected by `redirectedFrom()` and `redirectedTo()` methods. When multiple server redirects has happened, it is possible to construct the whole redirect chain by repeatedly calling `redirectedFrom()`.

For example, if the website `http://example.com` redirects to `https://example.com`:

If the website `https://google.com` has no redirects:

## request.redirected_to()
- returns: <[NoneType]|[Request]>

New request issued by the browser if the server responded with redirect.

This method is the opposite of [request.redirected_from()](./api/class-request.md#requestredirectedfrom):

## request.resource_type()
- returns: <[str]>

Contains the request's resource type as it was perceived by the rendering engine. ResourceType will be one of the following: `document`, `stylesheet`, `image`, `media`, `font`, `script`, `texttrack`, `xhr`, `fetch`, `eventsource`, `websocket`, `manifest`, `other`.

## request.response()
- returns: <[NoneType]|[Response]>

Returns the matching [Response] object, or `null` if the response was not received due to error.

## request.timing()
- returns: <[Dict]>
  - `startTime` <[float]> Request start time in milliseconds elapsed since January 1, 1970 00:00:00 UTC
  - `domainLookupStart` <[float]> Time immediately before the browser starts the domain name lookup for the resource. The value is given in milliseconds relative to `startTime`, -1 if not available.
  - `domainLookupEnd` <[float]> Time immediately after the browser starts the domain name lookup for the resource. The value is given in milliseconds relative to `startTime`, -1 if not available.
  - `connectStart` <[float]> Time immediately before the user agent starts establishing the connection to the server to retrieve the resource. The value is given in milliseconds relative to `startTime`, -1 if not available.
  - `secureConnectionStart` <[float]> Time immediately before the browser starts the handshake process to secure the current connection. The value is given in milliseconds relative to `startTime`, -1 if not available.
  - `connectEnd` <[float]> Time immediately before the user agent starts establishing the connection to the server to retrieve the resource. The value is given in milliseconds relative to `startTime`, -1 if not available.
  - `requestStart` <[float]> Time immediately before the browser starts requesting the resource from the server, cache, or local resource. The value is given in milliseconds relative to `startTime`, -1 if not available.
  - `responseStart` <[float]> Time immediately after the browser starts requesting the resource from the server, cache, or local resource. The value is given in milliseconds relative to `startTime`, -1 if not available.
  - `responseEnd` <[float]> Time immediately after the browser receives the last byte of the resource or immediately before the transport connection is closed, whichever comes first. The value is given in milliseconds relative to `startTime`, -1 if not available.

Returns resource timing information for given request. Most of the timing values become available upon the response, `responseEnd` becomes available when request finishes. Find more information at [Resource Timing API](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming).

## request.url()
- returns: <[str]>

URL of the request.

## request.failure()
- returns: <[NoneType]|[str]>

Returns human-readable error message, e.g. `'net::ERR_FAILED'`. The method returns `None` unless this request has failed, as reported by `requestfailed` event.

Example of logging of all the failed requests:

```python
page.on('requestfailed', lambda request: print(request.url + ' ' + request.failure);
```


[Accessibility]: ./api/class-accessibility.md "Accessibility"
[Browser]: ./api/class-browser.md "Browser"
[BrowserContext]: ./api/class-browsercontext.md "BrowserContext"
[BrowserType]: ./api/class-browsertype.md "BrowserType"
[CDPSession]: ./api/class-cdpsession.md "CDPSession"
[ChromiumBrowserContext]: ./api/class-chromiumbrowsercontext.md "ChromiumBrowserContext"
[ConsoleMessage]: ./api/class-consolemessage.md "ConsoleMessage"
[Dialog]: ./api/class-dialog.md "Dialog"
[Download]: ./api/class-download.md "Download"
[ElementHandle]: ./api/class-elementhandle.md "ElementHandle"
[FileChooser]: ./api/class-filechooser.md "FileChooser"
[Frame]: ./api/class-frame.md "Frame"
[JSHandle]: ./api/class-jshandle.md "JSHandle"
[Keyboard]: ./api/class-keyboard.md "Keyboard"
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
[WebSocket]: ./api/class-websocket.md "WebSocket"
[Worker]: ./api/class-worker.md "Worker"
[Element]: https://developer.mozilla.org/en-US/docs/Web/API/element "Element"
[Evaluation Argument]: ./core-concepts.md#evaluationargument "Evaluation Argument"
[Promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise "Promise"
[iterator]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols "Iterator"
[origin]: https://developer.mozilla.org/en-US/docs/Glossary/Origin "Origin"
[selector]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors "selector"
[Serializable]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Description "Serializable"
[UIEvent.detail]: https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail "UIEvent.detail"
[UnixTime]: https://en.wikipedia.org/wiki/Unix_time "Unix Time"
[xpath]: https://developer.mozilla.org/en-US/docs/Web/XPath "xpath"

[Any]: https://docs.python.org/3/library/typing.html#typing.Any "Any"
[bool]: https://docs.python.org/3/library/stdtypes.html "bool"
[Callable]: https://docs.python.org/3/library/typing.html#typing.Callable "Callable"
[Dict]: https://docs.python.org/3/library/typing.html#typing.Dict "Dict"
[float]: https://docs.python.org/3/library/stdtypes.html#numeric-types-int-float-complex "float"
[int]: https://docs.python.org/3/library/stdtypes.html#numeric-types-int-float-complex "int"
[List]: https://docs.python.org/3/library/typing.html#typing.List "List"
[NoneType]: https://docs.python.org/3/library/constants.html#None "None"
[pathlib.Path]: https://realpython.com/python-pathlib/ "pathlib.Path"
[str]: https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str "str"
[Union]: https://docs.python.org/3/library/typing.html#typing.Union "Union"