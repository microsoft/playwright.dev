---
id: verification
title: "Verification"
---

- [Videos](#videos)
- [Screenshots](#screenshots)
- [Console logs](#console-logs)
- [Page errors](#page-errors)
- [Page events](#page-events)

## Videos

Playwright can record videos for all pages in a [browser context](./core-concepts.md#browser-contexts). Videos are saved upon context closure, so make sure to await [browser_context.close()](./api/class-browsercontext.md#browser_contextclose).

#### API reference
- [BrowserContext]
- [browser.new_context(**options)](./api/class-browser.md#browsernew_contextoptions)
- [browser.new_page(**options)](./api/class-browser.md#browsernew_pageoptions)
- [browser_context.close()](./api/class-browsercontext.md#browser_contextclose)

## Screenshots

#### API reference
- [page.screenshot(**options)](./api/class-page.md#pagescreenshotoptions)
- [element_handle.screenshot(**options)](./api/class-elementhandle.md#element_handlescreenshotoptions)

<br/>

## Console logs

Console messages logged in the page can be brought into the Node.js context.

#### API reference
- [ConsoleMessage]
- [Page]
- [page.on("console")](./api/class-page.md#pageonconsole)

<br/>

## Page errors

Listen for uncaught exceptions in the page with the `pagerror` event.

#### API reference
- [Page]
- [page.on("pageerror")](./api/class-page.md#pageonpageerror)

<br/>

## Page events

#### `"requestfailed"`

#### `"dialog"` - handle alert, confirm, prompt

#### `"popup"` - handle popup windows

#### API reference
- [Page]
- [page.on("requestfailed")](./api/class-page.md#pageonrequestfailed)
- [page.on("dialog")](./api/class-page.md#pageondialog)
- [page.on("popup")](./api/class-page.md#pageonpopup)

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
[pathlib.Path]: https://realpython.com/python-pathlib/ "pathlib.Path"
[str]: https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str "str"
[Union]: https://docs.python.org/3/library/typing.html#typing.Union "Union"