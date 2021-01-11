---
id: actionability
title: "Actionability"
---

Playwright does a range of actionability checks on the elements before performing certain actions. These checks ensure that action behaves as expected, for example Playwright does not click on a disabled button.

Playwright waits until all the relevant actionability checks pass before performing an action. This means that action will fail with the `TimeoutError` if checks do not pass within the specified `timeout`.

Some actions like [page.click(selector, **options)](./api/class-page.md#pageclickselector-options) support `force` option that disables non-essential actionability checks, for example passing truthy `force` to [page.click(selector, **options)](./api/class-page.md#pageclickselector-options) method will not check that the target element actually receives click events.

| Action | [Attached] | [Visible] | [Stable] | [Receiving Events] | [Enabled] | [Editable] |
| :- | :-: | :-: | :-: | :-: | :-: | :-: |
| check | Yes | Yes | Yes | Yes | Yes | - |
| click | Yes | Yes | Yes | Yes | Yes | - |
| dblclick | Yes | Yes | Yes | Yes | Yes | - |
| tap | Yes | Yes | Yes | Yes | Yes | - |
| uncheck | Yes | Yes | Yes | Yes | Yes | - |
| hover | Yes | Yes | Yes | Yes | - | - |
| scrollIntoViewIfNeeded | Yes | Yes | Yes | - | - | - |
| screenshot | Yes | Yes | Yes | - | - | - |
| fill | Yes | Yes | - | - | Yes | Yes |
| selectText | Yes | Yes | - | - | - | - |
| dispatchEvent | Yes | - | - | - | - | - |
| focus | Yes | - | - | - | - | - |
| getAttribute | Yes | - | - | - | - | - |
| innerText | Yes | - | - | - | - | - |
| innerHTML | Yes | - | - | - | - | - |
| press | Yes | - | - | - | - | - |
| setInputFiles | Yes | - | - | - | - | - |
| selectOption | Yes | - | - | - | - | - |
| textContent | Yes | - | - | - | - | - |
| type | Yes | - | - | - | - | - |

<br/>

### Visible

Element is considered visible when it has non-empty bounding box and does not have `visibility:hidden` computed style. Note that elements of zero size or with `display:none` are not considered visible.

### Stable

Element is considered stable when it has maintained the same bounding box for at least two consecutive animation frames.

### Enabled

Element is considered enabled when it is not a `<button>`, `<select>`, `<input>` or `<textarea>` with a `disabled` property set.

### Editable

Element is considered editable when it is [enabled] and does not have `readonly` property set.

### Receiving events

Element is considered receiving pointer events when it is the hit target of the pointer event at the action point. For example, when clicking at the point `(10;10)`, Playwright checks whether some other element (usually an overlay) will instead capture the click at `(10;10)`.

### Attached

Element is considered attached when it is [connected](https://developer.mozilla.org/en-US/docs/Web/API/Node/isConnected) to a Document or a ShadowRoot.

Attached check differs between selector-based and handle-based actions, like [page.click(selector, **options)](./api/class-page.md#pageclickselector-options) as opposite to [element_handle.click(**options)](./api/class-elementhandle.md#element_handleclickoptions):
- For selector-based actions, Playwright first waits for an element matching `selector` to be attached to the DOM, and then checks that element is still attached before performing the action. If element was detached, the action is retried from the start.
- For handle-based actions, Playwright throws if the element is not attached.

For example, consider a scenario where Playwright will click `Sign Up` button regardless of when the [page.click(selector, **options)](./api/class-page.md#pageclickselector-options) call was made:
- page is checking that user name is unique and `Sign Up` button is disabled;
- after checking with the server, the disabled `Sign Up` button is replaced with another one that is now enabled.

[Visible]: #visible "Visible"
[Stable]: #stable "Stable"
[Enabled]: #enabled "Enabled"
[Editable]: #editable "Editable"
[Receiving Events]: #receiving-events "Receiving Events"
[Attached]: #attached "Attached"

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