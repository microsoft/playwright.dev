---
id: class-websocket
title: "WebSocket"
---


The [WebSocket] class represents websocket connections in the page.


- [web_socket.on("close")](./api/class-websocket.md#web_socketonclose)
- [web_socket.on("framereceived")](./api/class-websocket.md#web_socketonframereceived)
- [web_socket.on("framesent")](./api/class-websocket.md#web_socketonframesent)
- [web_socket.on("socketerror")](./api/class-websocket.md#web_socketonsocketerror)
- [web_socket.expect_event(event, **options)](./api/class-websocket.md#web_socketexpect_eventevent-options)
- [web_socket.is_closed()](./api/class-websocket.md#web_socketis_closed)
- [web_socket.url()](./api/class-websocket.md#web_socketurl)
- [web_socket.wait_for_event(event, **options)](./api/class-websocket.md#web_socketwait_for_eventevent-options)

## web_socket.on("close")

Fired when the websocket closes.

## web_socket.on("framereceived")
- type: <[Dict]>
  - `payload` <[str]|[Buffer]> frame payload

Fired when the websocket recieves a frame.

## web_socket.on("framesent")
- type: <[Dict]>
  - `payload` <[str]|[Buffer]> frame payload

Fired when the websocket sends a frame.

## web_socket.on("socketerror")
- type: <[String]>

Fired when the websocket has an error.

## web_socket.expect_event(event, **options)
- `event` <[str]> Event name, same one typically passed into `page.on(event)`.
- `predicate` <[Function]> Receives the event data and resolves to truthy value when the waiting should resolve.
- `timeout` <[float]> Maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browser_contextset_default_timeouttimeout).
- returns: <[EventContextManager]>

Performs action and waits for given `event` to fire. If predicate is provided, it passes event's value into the `predicate` function and waits for `predicate(event)` to return a truthy value. Will throw an error if the socket is closed before the `event` is fired.

```py
# async

async with ws.expect_event(event_name) as event_info:
    await ws.click("button")
value = await event_info.value
```

```py
# sync

with ws.expect_event(event_name) as event_info:
    ws.click("button")
value = event_info.value
```

## web_socket.is_closed()
- returns: <[bool]>

Indicates that the web socket has been closed.

## web_socket.url()
- returns: <[str]>

Contains the URL of the WebSocket.

## web_socket.wait_for_event(event, **options)
- `event` <[str]> Event name, same one would pass into `webSocket.on(event)`.
- `predicate` <[Function]> Receives the event data and resolves to truthy value when the waiting should resolve.
- `timeout` <[float]> Maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browser_contextset_default_timeouttimeout).
- returns: <[Any]>

Returns the event data value.

Waits for event to fire and passes its value into the predicate function. Returns when the predicate returns truthy value. Will throw an error if the webSocket is closed before the event is fired.

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