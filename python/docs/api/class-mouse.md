---
id: class-mouse
title: "Mouse"
---


The Mouse class operates in main-frame CSS pixels relative to the top-left corner of the viewport.

Every `page` object has its own Mouse, accessible with [page.mouse](./api/class-page.md#pagemouse).


- [mouse.click(x, y, **options)](./api/class-mouse.md#mouseclickx-y-options)
- [mouse.dblclick(x, y, **options)](./api/class-mouse.md#mousedblclickx-y-options)
- [mouse.down(**options)](./api/class-mouse.md#mousedownoptions)
- [mouse.move(x, y, **options)](./api/class-mouse.md#mousemovex-y-options)
- [mouse.up(**options)](./api/class-mouse.md#mouseupoptions)

## mouse.click(x, y, **options)
- `x` <[float]>
- `y` <[float]>
- `button` <"left"|"right"|"middle"> Defaults to `left`.
- `click_count` <[int]> defaults to 1. See [UIEvent.detail].
- `delay` <[float]> Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.

Shortcut for [mouse.move(x, y, **options)](./api/class-mouse.md#mousemovex-y-options), [mouse.down(**options)](./api/class-mouse.md#mousedownoptions), [mouse.up(**options)](./api/class-mouse.md#mouseupoptions).

## mouse.dblclick(x, y, **options)
- `x` <[float]>
- `y` <[float]>
- `button` <"left"|"right"|"middle"> Defaults to `left`.
- `delay` <[float]> Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.

Shortcut for [mouse.move(x, y, **options)](./api/class-mouse.md#mousemovex-y-options), [mouse.down(**options)](./api/class-mouse.md#mousedownoptions), [mouse.up(**options)](./api/class-mouse.md#mouseupoptions), [mouse.down(**options)](./api/class-mouse.md#mousedownoptions) and [mouse.up(**options)](./api/class-mouse.md#mouseupoptions).

## mouse.down(**options)
- `button` <"left"|"right"|"middle"> Defaults to `left`.
- `click_count` <[int]> defaults to 1. See [UIEvent.detail].

Dispatches a `mousedown` event.

## mouse.move(x, y, **options)
- `x` <[float]>
- `y` <[float]>
- `steps` <[int]> defaults to 1. Sends intermediate `mousemove` events.

Dispatches a `mousemove` event.

## mouse.up(**options)
- `button` <"left"|"right"|"middle"> Defaults to `left`.
- `click_count` <[int]> defaults to 1. See [UIEvent.detail].

Dispatches a `mouseup` event.

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