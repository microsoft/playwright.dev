---
id: class-keyboard
title: "class: Keyboard"
---


Keyboard provides an api for managing a virtual keyboard. The high level api is [keyboard.type(text[, options])](api/class-keyboard.md#keyboardtypetext-options), which takes raw
characters and generates proper keydown, keypress/input, and keyup events on your page.

For finer control, you can use [keyboard.down(key)](api/class-keyboard.md#keyboarddownkey), [keyboard.up(key)](api/class-keyboard.md#keyboardupkey), and [keyboard.insertText(text)](api/class-keyboard.md#keyboardinserttexttext) to manually fire
events as if they were generated from a real keyboard.

An example of holding down `Shift` in order to select and delete some text:

```js
await page.keyboard.type('Hello World!');
await page.keyboard.press('ArrowLeft');

await page.keyboard.down('Shift');
for (let i = 0; i < ' World'.length; i++)
  await page.keyboard.press('ArrowLeft');
await page.keyboard.up('Shift');

await page.keyboard.press('Backspace');
// Result text will end up saying 'Hello!'
```

An example of pressing uppercase `A`

```js
await page.keyboard.press('Shift+KeyA');
// or
await page.keyboard.press('Shift+A');
```

An example to trigger select-all with the keyboard

```js
// on Windows and Linux
await page.keyboard.press('Control+A');
// on macOS
await page.keyboard.press('Meta+A');
```

<!-- GEN:toc -->
- [keyboard.down(key)](#keyboarddownkey)
- [keyboard.insertText(text)](#keyboardinserttexttext)
- [keyboard.press(key[, options])](api/class-keyboard.md#keyboardpresskey-options)
- [keyboard.type(text[, options])](#keyboardtypetext-options)
- [keyboard.up(key)](#keyboardupkey)
<!-- GEN:stop -->

## keyboard.down(key)
- `key` <[string]> Name of the key to press or a character to generate, such as `ArrowLeft` or `a`.
- returns: <[Promise]>

Dispatches a `keydown` event.

`key` can specify the intended [keyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)
value or a single character to generate the text for. A superset of the `key` values can be found
[here](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values). Examples of the keys are:

`F1` - `F12`, `Digit0`- `Digit9`, `KeyA`- `KeyZ`, `Backquote`, `Minus`, `Equal`, `Backslash`, `Backspace`, `Tab`,
`Delete`, `Escape`, `ArrowDown`, `End`, `Enter`, `Home`, `Insert`, `PageDown`, `PageUp`, `ArrowRight`, `ArrowUp`, etc.

Following modification shortcuts are also suported: `Shift`, `Control`, `Alt`, `Meta`, `ShiftLeft`.

Holding down `Shift` will type the text that corresponds to the `key` in the upper case.

If `key` is a single character, it is case-sensitive, so the values `a` and `A` will generate different respective
texts.

If `key` is a modifier key, `Shift`, `Meta`, `Control`, or `Alt`, subsequent key presses will be sent with that modifier
active. To release the modifier key, use [keyboard.up(key)](#keyboardupkey).

After the key is pressed once, subsequent calls to [keyboard.down(key)](#keyboarddownkey) will have
[repeat](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/repeat) set to true. To release the key, use
[keyboard.up(key)](#keyboardupkey).

> **NOTE** Modifier keys DO influence `keyboard.down`. Holding down `Shift` will type the text in upper case.

## keyboard.insertText(text)
- `text` <[string]> Sets input to the specified text value.
- returns: <[Promise]>

Dispatches only `input` event, does not emit the `keydown`, `keyup` or `keypress` events.

```js
page.keyboard.insertText('嗨');
```

> **NOTE** Modifier keys DO NOT effect `keyboard.insertText`. Holding down `Shift` will not type the text in upper case.

## keyboard.press(key[, options])
- `key` <[string]> Name of the key to press or a character to generate, such as `ArrowLeft` or `a`.
- `options` <[Object]>
  - `delay` <[number]> Time to wait between `keydown` and `keyup` in milliseconds. Defaults to 0.
- returns: <[Promise]>

`key` can specify the intended [keyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)
value or a single character to generate the text for. A superset of the `key` values can be found
[here](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values). Examples of the keys are:

`F1` - `F12`, `Digit0`- `Digit9`, `KeyA`- `KeyZ`, `Backquote`, `Minus`, `Equal`, `Backslash`, `Backspace`, `Tab`,
`Delete`, `Escape`, `ArrowDown`, `End`, `Enter`, `Home`, `Insert`, `PageDown`, `PageUp`, `ArrowRight`, `ArrowUp`, etc.

Following modification shortcuts are also suported: `Shift`, `Control`, `Alt`, `Meta`, `ShiftLeft`.

Holding down `Shift` will type the text that corresponds to the `key` in the upper case.

If `key` is a single character, it is case-sensitive, so the values `a` and `A` will generate different respective
texts.

Shortcuts such as `key: "Control+o"` or `key: "Control+Shift+T"` are supported as well. When speficied with the
modifier, modifier is pressed and being held while the subsequent key is being pressed.

```js
const page = await browser.newPage();
await page.goto('https://keycode.info');
await page.keyboard.press('A');
await page.screenshot({ path: 'A.png' });
await page.keyboard.press('ArrowLeft');
await page.screenshot({ path: 'ArrowLeft.png' });
await page.keyboard.press('Shift+O');
await page.screenshot({ path: 'O.png' });
await browser.close();
```

Shortcut for [keyboard.down(key)](#keyboarddownkey) and [keyboard.up(key)](#keyboardupkey).

## keyboard.type(text[, options])
- `text` <[string]> A text to type into a focused element.
- `options` <[Object]>
  - `delay` <[number]> Time to wait between key presses in milliseconds. Defaults to 0.
- returns: <[Promise]>

Sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text.

To press a special key, like `Control` or `ArrowDown`, use [keyboard.press(key[, options])](#keyboardpresskey-options).

```js
await page.keyboard.type('Hello'); // Types instantly
await page.keyboard.type('World', {delay: 100}); // Types slower, like a user
```

> **NOTE** Modifier keys DO NOT effect `keyboard.type`. Holding down `Shift` will not type the text in upper case.

## keyboard.up(key)
- `key` <[string]> Name of the key to press or a character to generate, such as `ArrowLeft` or `a`.
- returns: <[Promise]>

Dispatches a `keyup` event.



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
[Touchscreen]: api/class-touchscreen.md#class-touchscreen "Touchscreen"
[UIEvent.detail]: https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail "UIEvent.detail"
[URL]: https://nodejs.org/api/url.html
[USKeyboardLayout]: ../src/usKeyboardLayout.ts "USKeyboardLayout"
[UnixTime]: https://en.wikipedia.org/wiki/Unix_time "Unix Time"
[Video]: api/class-video.md#class-video "Video"
[WebKitBrowser]: api/class-webkitbrowser.md#class-webkitbrowser "WebKitBrowser"
[WebSocket]: api/class-websocket.md#class-websocket "WebSocket"
[Worker]: api/class-worker.md#class-worker "Worker"
[boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structuresapi.md#Boolean_type "Boolean"
[function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function "Function"
[iterator]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols "Iterator"
[null]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null
[number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structuresapi.md#Number_type "Number"
[origin]: https://developer.mozilla.org/en-US/docs/Glossary/Origin "Origin"
[selector]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors "selector"
[Readable]: https://nodejs.org/api/stream.htmlapi.md#stream_class_stream_readable "Readable"
[string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structuresapi.md#String_type "String"
[xpath]: https://developer.mozilla.org/en-US/docs/Web/XPath "xpath"
