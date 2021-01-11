---
id: class-keyboard
title: "Keyboard"
---


Keyboard provides an api for managing a virtual keyboard. The high level api is [keyboard.type(text, **options)](./api/class-keyboard.md#keyboardtypetext-options), which takes raw characters and generates proper keydown, keypress/input, and keyup events on your page.

For finer control, you can use [keyboard.down(key)](./api/class-keyboard.md#keyboarddownkey), [keyboard.up(key)](./api/class-keyboard.md#keyboardupkey), and [keyboard.insert_text(text)](./api/class-keyboard.md#keyboardinserttexttext) to manually fire events as if they were generated from a real keyboard.

An example of holding down `Shift` in order to select and delete some text:

An example of pressing uppercase `A`

An example to trigger select-all with the keyboard


- [keyboard.down(key)](./api/class-keyboard.md#keyboarddownkey)
- [keyboard.insert_text(text)](./api/class-keyboard.md#keyboardinserttexttext)
- [keyboard.press(key, **options)](./api/class-keyboard.md#keyboardpresskey-options)
- [keyboard.type(text, **options)](./api/class-keyboard.md#keyboardtypetext-options)
- [keyboard.up(key)](./api/class-keyboard.md#keyboardupkey)

## keyboard.down(key)
- `key` <[str]> Name of the key to press or a character to generate, such as `ArrowLeft` or `a`.

Dispatches a `keydown` event.

`key` can specify the intended [keyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) value or a single character to generate the text for. A superset of the `key` values can be found [here](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values). Examples of the keys are:

`F1` - `F12`, `Digit0`- `Digit9`, `KeyA`- `KeyZ`, `Backquote`, `Minus`, `Equal`, `Backslash`, `Backspace`, `Tab`, `Delete`, `Escape`, `ArrowDown`, `End`, `Enter`, `Home`, `Insert`, `PageDown`, `PageUp`, `ArrowRight`, `ArrowUp`, etc.

Following modification shortcuts are also supported: `Shift`, `Control`, `Alt`, `Meta`, `ShiftLeft`.

Holding down `Shift` will type the text that corresponds to the `key` in the upper case.

If `key` is a single character, it is case-sensitive, so the values `a` and `A` will generate different respective texts.

If `key` is a modifier key, `Shift`, `Meta`, `Control`, or `Alt`, subsequent key presses will be sent with that modifier active. To release the modifier key, use [keyboard.up(key)](./api/class-keyboard.md#keyboardupkey).

After the key is pressed once, subsequent calls to [keyboard.down(key)](./api/class-keyboard.md#keyboarddownkey) will have [repeat](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/repeat) set to true. To release the key, use [keyboard.up(key)](./api/class-keyboard.md#keyboardupkey).

> **NOTE** Modifier keys DO influence `keyboard.down`. Holding down `Shift` will type the text in upper case.

## keyboard.insert_text(text)
- `text` <[str]> Sets input to the specified text value.

Dispatches only `input` event, does not emit the `keydown`, `keyup` or `keypress` events.

> **NOTE** Modifier keys DO NOT effect `keyboard.insertText`. Holding down `Shift` will not type the text in upper case.

## keyboard.press(key, **options)
- `key` <[str]> Name of the key to press or a character to generate, such as `ArrowLeft` or `a`.
- `delay` <[float]> Time to wait between `keydown` and `keyup` in milliseconds. Defaults to 0.

`key` can specify the intended [keyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) value or a single character to generate the text for. A superset of the `key` values can be found [here](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values). Examples of the keys are:

`F1` - `F12`, `Digit0`- `Digit9`, `KeyA`- `KeyZ`, `Backquote`, `Minus`, `Equal`, `Backslash`, `Backspace`, `Tab`, `Delete`, `Escape`, `ArrowDown`, `End`, `Enter`, `Home`, `Insert`, `PageDown`, `PageUp`, `ArrowRight`, `ArrowUp`, etc.

Following modification shortcuts are also supported: `Shift`, `Control`, `Alt`, `Meta`, `ShiftLeft`.

Holding down `Shift` will type the text that corresponds to the `key` in the upper case.

If `key` is a single character, it is case-sensitive, so the values `a` and `A` will generate different respective texts.

Shortcuts such as `key: "Control+o"` or `key: "Control+Shift+T"` are supported as well. When speficied with the modifier, modifier is pressed and being held while the subsequent key is being pressed.

Shortcut for [keyboard.down(key)](./api/class-keyboard.md#keyboarddownkey) and [keyboard.up(key)](./api/class-keyboard.md#keyboardupkey).

## keyboard.type(text, **options)
- `text` <[str]> A text to type into a focused element.
- `delay` <[float]> Time to wait between key presses in milliseconds. Defaults to 0.

Sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text.

To press a special key, like `Control` or `ArrowDown`, use [keyboard.press(key, **options)](./api/class-keyboard.md#keyboardpresskey-options).

> **NOTE** Modifier keys DO NOT effect `keyboard.type`. Holding down `Shift` will not type the text in upper case.

## keyboard.up(key)
- `key` <[str]> Name of the key to press or a character to generate, such as `ArrowLeft` or `a`.

Dispatches a `keyup` event.

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