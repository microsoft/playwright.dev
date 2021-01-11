---
id: network
title: "Network"
---

Playwright provides APIs to **monitor** and **modify** network traffic, both HTTP and HTTPS. Any requests that page does, including [XHRs](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) and [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) requests, can be tracked, modified and handled.

- [HTTP Authentication](#http-authentication)
- [Handle file downloads](#handle-file-downloads)
- [Network events](#network-events)
- [Handle requests](#handle-requests)
- [Modify requests](#modify-requests)
- [Abort requests](#abort-requests)

<br/>

## HTTP Authentication

#### API reference
- [browser.new_context(**options)](./api/class-browser.md#browsernew_contextoptions)

<br/>

## Handle file downloads

For every attachment downloaded by the page, [page.on("download")](./api/class-page.md#pageondownload) event is emitted. If you create a browser context with the `acceptDownloads: true`, all these attachments are going to be downloaded into a temporary folder. You can obtain the download url, file system path and payload stream using the [Download] object from the event.

#### Variations

If you have no idea what initiates the download, you can still handle the event:

Note that handling the event forks the control flow and makes script harder to follow. Your scenario might end while you are downloading a file since your main control flow is not awaiting for this operation to resolve.

#### API reference
- [Download]
- [page.on("download")](./api/class-page.md#pageondownload)
- [page.wait_for_event(event, **options)](./api/class-page.md#pagewait_for_eventevent-options)

<br/>

## Network events

You can monitor all the requests and responses:

Or wait for a network response after the button click:

#### Variations

#### API reference
- [Request]
- [Response]
- [page.on("request")](./api/class-page.md#pageonrequest)
- [page.on("response")](./api/class-page.md#pageonresponse)
- [page.wait_for_request(url_or_predicate, **options)](./api/class-page.md#pagewait_for_requesturl_or_predicate-options)
- [page.wait_for_response(url_or_predicate, **options)](./api/class-page.md#pagewait_for_responseurl_or_predicate-options)

<br/>

## Handle requests

You can mock API endpoints via handling the network quests in your Playwright script.

#### Variations

#### API reference
- [browser_context.route(url, handler)](./api/class-browsercontext.md#browser_contextrouteurl-handler)
- [browser_context.unroute(url, **options)](./api/class-browsercontext.md#browser_contextunrouteurl-options)
- [page.route(url, handler)](./api/class-page.md#pagerouteurl-handler)
- [page.unroute(url, **options)](./api/class-page.md#pageunrouteurl-options)
- [Route]

<br/>

## Modify requests

You can continue requests with modifications. Example above removes an HTTP header from the outgoing requests.

## Abort requests

#### API reference
- [page.route(url, handler)](./api/class-page.md#pagerouteurl-handler)
- [browser_context.route(url, handler)](./api/class-browsercontext.md#browser_contextrouteurl-handler)
- [route.abort(**options)](./api/class-route.md#routeabortoptions)

<br/>

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