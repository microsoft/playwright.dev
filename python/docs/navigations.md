---
id: navigations
title: "Navigations"
---

Playwright can navigate to URLs and handle navigations caused by page interactions. This guide covers common scenarios to wait for page navigations and loading to complete.

- [Navigation lifecycle](#navigation-lifecycle)
- [Scenarios initiated by browser UI](#scenarios-initiated-by-browser-ui)
- [Scenarios initiated by page interaction](#scenarios-initiated-by-page-interaction)
- [Advanced patterns](#advanced-patterns)

## Navigation lifecycle

Playwright splits the process of showing a new document in a page into **navigation** and **loading**.

**Navigations** can be initiated by changing the page URL or by interacting with the page (e.g., clicking a link). Navigation ends when response headers have been parsed and session history is updated. The navigation intent may be canceled, for example, on hitting an unresolved DNS address or transformed into a file download. Only after the navigation succeeds, page starts **loading** the document.

**Loading** covers getting the remaining response body over the network, parsing, executing the scripts and firing load events:
- [page.url()](./api/class-page.md#pageurl) is set to the new url
- document content is loaded over network and parsed
- [page.on("domcontentloaded")](./api/class-page.md#pageondomcontentloaded) event is fired
- page executes some scripts and loads resources like stylesheets and images
- [page.on("load")](./api/class-page.md#pageonload) event is fired
- page executes dynamically loaded scripts
- `networkidle` is fired when no new network requests are made for 500 ms

## Scenarios initiated by browser UI

Navigations can be initiated by changing the URL bar, reloading the page or going back or forward in session history.

### Auto-wait

Navigating to a URL auto-waits for the page to fire the `load` event. If the page does a client-side redirect before `load`, `page.goto` will auto-wait for the redirected page to fire the `load` event.

### Custom wait

Override the default behavior to wait until a specific event, like `networkidle`.

### Wait for element

In lazy-loaded pages, it can be useful to wait until an element is visible with [page.wait_for_selector(selector, **options)](./api/class-page.md#pagewaitforselectorselector-options). Alternatively, page interactions like [page.click(selector, **options)](./api/class-page.md#pageclickselector-options) auto-wait for elements.

#### API reference
- [page.goto(url, **options)](./api/class-page.md#pagegotourl-options)
- [page.reload(**options)](./api/class-page.md#pagereloadoptions)
- [page.go_back(**options)](./api/class-page.md#pagegobackoptions)
- [page.go_forward(**options)](./api/class-page.md#pagegoforwardoptions)

## Scenarios initiated by page interaction

In the scenarios below, `page.click` initiates a navigation and then waits for the navigation to complete.

### Auto-wait

By default, `page.click` will wait for the navigation step to complete. This can be combined with a page interaction on the navigated page which would auto-wait for an element.

### Custom wait

`page.click` can be combined with [page.wait_for_load_state(**options)](./api/class-page.md#pagewaitforloadstateoptions) to wait for a loading event.

### Wait for element

In lazy-loaded pages, it can be useful to wait until an element is visible with [page.wait_for_selector(selector, **options)](./api/class-page.md#pagewaitforselectorselector-options). Alternatively, page interactions like [page.click(selector, **options)](./api/class-page.md#pageclickselector-options) auto-wait for elements.

### Asynchronous navigation

Clicking an element could trigger asychronous processing before initiating the navigation. In these cases, it is recommended to explicitly call [page.wait_for_navigation(**options)](./api/class-page.md#pagewaitfornavigationoptions). For example:
* Navigation is triggered from a `setTimeout`
* Page waits for network requests before navigation

The `Promise.all` pattern prevents a race condition between `page.click` and `page.waitForNavigation` when navigation happens quickly.

### Multiple navigations

Clicking an element could trigger multiple navigations. In these cases, it is recommended to explicitly [page.wait_for_navigation(**options)](./api/class-page.md#pagewaitfornavigationoptions) to a specific url. For example:
* Client-side redirects issued after the `load` event
* Multiple pushes to history state

The `Promise.all` pattern prevents a race condition between `page.click` and `page.waitForNavigation` when navigation happens quickly.

### Loading a popup

When popup is opened, explicitly calling [page.wait_for_load_state(**options)](./api/class-page.md#pagewaitforloadstateoptions) ensures that popup is loaded to the desired state.

#### API reference
- [page.click(selector, **options)](./api/class-page.md#pageclickselector-options)
- [page.wait_for_load_state(**options)](./api/class-page.md#pagewaitforloadstateoptions)
- [page.wait_for_selector(selector, **options)](./api/class-page.md#pagewaitforselectorselector-options)
- [page.wait_for_navigation(**options)](./api/class-page.md#pagewaitfornavigationoptions)
- [page.wait_for_function(page_function, **options)](./api/class-page.md#pagewaitforfunctionpagefunction-options)

## Advanced patterns

For pages that have complicated loading patterns, [page.wait_for_function(page_function, **options)](./api/class-page.md#pagewaitforfunctionpagefunction-options) is a powerful and extensible approach to define a custom wait criteria.

#### API reference
- [page.wait_for_function(page_function, **options)](./api/class-page.md#pagewaitforfunctionpagefunction-options)

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
[FirefoxBrowser]: ./api/class-firefoxbrowser.md "FirefoxBrowser"
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
[WebKitBrowser]: ./api/class-webkitbrowser.md "WebKitBrowser"
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