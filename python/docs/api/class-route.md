---
id: class-route
title: "Route"
---


Whenever a network route is set up with [page.route(url, handler)](./api/class-page.md#pagerouteurl-handler) or [browser_context.route(url, handler)](./api/class-browsercontext.md#browser_contextrouteurl-handler), the `Route` object allows to handle the route.


- [route.abort(**options)](./api/class-route.md#routeabortoptions)
- [route.continue_(**options)](./api/class-route.md#routecontinue_options)
- [route.fulfill(**options)](./api/class-route.md#routefulfilloptions)
- [route.request](./api/class-route.md#routerequest)

## route.abort(**options)
- `error_code` <[str]> Optional error code. Defaults to `failed`, could be one of the following:
  * `'aborted'` - An operation was aborted (due to user action)
  * `'accessdenied'` - Permission to access a resource, other than the network, was denied
  * `'addressunreachable'` - The IP address is unreachable. This usually means that there is no route to the specified host or network.
  * `'blockedbyclient'` - The client chose to block the request.
  * `'blockedbyresponse'` - The request failed because the response was delivered along with requirements which are not met ('X-Frame-Options' and 'Content-Security-Policy' ancestor checks, for instance).
  * `'connectionaborted'` - A connection timed out as a result of not receiving an ACK for data sent.
  * `'connectionclosed'` - A connection was closed (corresponding to a TCP FIN).
  * `'connectionfailed'` - A connection attempt failed.
  * `'connectionrefused'` - A connection attempt was refused.
  * `'connectionreset'` - A connection was reset (corresponding to a TCP RST).
  * `'internetdisconnected'` - The Internet connection has been lost.
  * `'namenotresolved'` - The host name could not be resolved.
  * `'timedout'` - An operation timed out.
  * `'failed'` - A generic failure occurred.

Aborts the route's request.

## route.continue_(**options)
- `headers` <[Dict]\[[str], [str]\]> If set changes the request HTTP headers. Header values will be converted to a string.
- `method` <[str]> If set changes the request method (e.g. GET or POST)
- `post_data` <[str]|[Buffer]> If set changes the post data of request
- `url` <[str]> If set changes the request URL. New URL must have same protocol as original one.

Continues route's request with optional overrides.

```py
# async

async def handle(route, request):
    # override headers
    headers = {
        **request.headers,
        "foo": "bar" # set "foo" header
        "origin": None # remove "origin" header
    }
    await route.continue(headers=headers)
}
await page.route("**/*", handle)
```

```py
# sync

def handle(route, request):
    # override headers
    headers = {
        **request.headers,
        "foo": "bar" # set "foo" header
        "origin": None # remove "origin" header
    }
    route.continue(headers=headers)
}
page.route("**/*", handle)
```

## route.fulfill(**options)
- `body` <[str]|[Buffer]> Response body.
- `content_type` <[str]> If set, equals to setting `Content-Type` response header.
- `headers` <[Dict]\[[str], [str]\]> Response headers. Header values will be converted to a string.
- `path` <[Union]\[[str], [pathlib.Path]\]> File path to respond with. The content type will be inferred from file extension. If `path` is a relative path, then it is resolved relative to the current working directory.
- `status` <[int]> Response status code, defaults to `200`.

Fulfills route's request with given response.

An example of fulfilling all requests with 404 responses:

```py
# async

await page.route("**/*", lambda route: route.fulfill(
    status=404,
    content_type="text/plain",
    body="not found!"))
```

```py
# sync

page.route("**/*", lambda route: route.fulfill(
    status=404,
    content_type="text/plain",
    body="not found!"))
```

An example of serving static file:

```py
# async

await page.route("**/xhr_endpoint", lambda route: route.fulfill(path="mock_data.json"))
```

```py
# sync

page.route("**/xhr_endpoint", lambda route: route.fulfill(path="mock_data.json"))
```

## route.request
- returns: <[Request]>

A request to be routed.

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
[EventContextManager]: https://docs.python.org/3/reference/datamodel.html#context-managers "Event context manager"
[Dict]: https://docs.python.org/3/library/typing.html#typing.Dict "Dict"
[float]: https://docs.python.org/3/library/stdtypes.html#numeric-types-int-float-complex "float"
[int]: https://docs.python.org/3/library/stdtypes.html#numeric-types-int-float-complex "int"
[List]: https://docs.python.org/3/library/typing.html#typing.List "List"
[NoneType]: https://docs.python.org/3/library/constants.html#None "None"
[Pattern]: https://docs.python.org/3/library/re.html "Pattern"
[URL]: https://en.wikipedia.org/wiki/URL "URL"
[pathlib.Path]: https://realpython.com/python-pathlib/ "pathlib.Path"
[str]: https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str "str"
[Union]: https://docs.python.org/3/library/typing.html#typing.Union "Union"