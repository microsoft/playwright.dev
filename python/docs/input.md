---
id: input
title: "Input"
---

- [Text input](#text-input)
- [Checkboxes and radio buttons](#checkboxes-and-radio-buttons)
- [Select options](#select-options)
- [Mouse click](#mouse-click)
- [Type characters](#type-characters)
- [Keys and shortcuts](#keys-and-shortcuts)
- [Upload files](#upload-files)
- [Focus element](#focus-element)

## Text input

This is the easiest way to fill out the form fields. It focuses the element and triggers an `input` event with the entered text. It works for `<input>`, `<textarea>`, `[contenteditable]` and `<label>` associated with an input or textarea.

```python
# async

# Text input
await page.fill('#name', 'Peter')

# Date input
await page.fill('#date', '2020-02-02')

# Time input
await page.fill('#time', '13-15')

# Local datetime input
await page.fill('#local', '2020-03-02T05:15')

# Input through label
await page.fill('text=First Name', 'Peter')
```

```python
# sync

# Text input
page.fill('#name', 'Peter')

# Date input
page.fill('#date', '2020-02-02')

# Time input
page.fill('#time', '13-15')

# Local datetime input
page.fill('#local', '2020-03-02T05:15')

# Input through label
page.fill('text=First Name', 'Peter')
```

#### API reference
- [page.fill(selector, value, **options)](./api/class-page.md#pagefillselector-value-options)
- [frame.fill(selector, value, **options)](./api/class-frame.md#framefillselector-value-options)
- [element_handle.fill(value, **options)](./api/class-elementhandle.md#elementhandlefillvalue-options)

<br/>

## Checkboxes and radio buttons

This is the easiest way to check and uncheck a checkbox or a radio button. This method can be used with `input[type=checkbox]`, `input[type=radio]`, `[role=checkbox]` or `label` associated with checkbox or radio button.

```python
# async

# Check the checkbox
await page.check('#agree')

# Uncheck by input <label>.
await page.uncheck('#subscribe-label')

# Select the radio button
await page.check('text=XL')
```

```python
# sync

# Check the checkbox
page.check('#agree')

# Uncheck by input <label>.
page.uncheck('#subscribe-label')

# Select the radio button
page.check('text=XL')
```

#### API reference
- [page.check(selector, **options)](./api/class-page.md#pagecheckselector-options)
- [page.uncheck(selector, **options)](./api/class-page.md#pageuncheckselector-options)
- [frame.check(selector, **options)](./api/class-frame.md#framecheckselector-options)
- [frame.uncheck(selector, **options)](./api/class-frame.md#frameuncheckselector-options)
- [element_handle.check(**options)](./api/class-elementhandle.md#elementhandlecheckoptions)
- [element_handle.uncheck(**options)](./api/class-elementhandle.md#elementhandleuncheckoptions)

<br/>

## Select options

Selects one or multiple options in the `<select>` element. You can specify option `value`, `label` or `elementHandle` to select. Multiple options can be selected.

```python
# async

# Single selection matching the value
await page.select_option('select#colors', 'blue')

# Single selection matching the label
await page.select_option('select#colors', label='Blue')

# Multiple selected items
await page.select_option('select#colors', ['red', 'green', 'blue'])

# Select the option via element handle
option = await page.query_selector('#best-option')
await page.select_option('select#colors', option)
```

```python
# sync

# Single selection matching the value
page.select_option('select#colors', 'blue')

# Single selection matching the label
page.select_option('select#colors', label='Blue')

# Multiple selected items
page.select_option('select#colors', ['red', 'green', 'blue'])

# Select the option via element handle
option = page.query_selector('#best-option')
page.select_option('select#colors', option)
```

#### API reference
- [page.select_option(selector, **options)](./api/class-page.md#pageselectoptionselector-options)
- [frame.select_option(selector, **options)](./api/class-frame.md#frameselectoptionselector-options)
- [element_handle.select_option(**options)](./api/class-elementhandle.md#elementhandleselectoptionoptions)

<br/>

## Mouse click

Performs a simple human click.

```python
# async

# Generic click
await page.click('button#submit')

# Double click
await page.dblclick('#item')

# Right click
await page.click('#item', button='right')

# Shift + click
await page.click('#item', modifiers=['Shift'])

# Hover over element
await page.hover('#item')

# Click the top left corner
await page.click('#item', position={ 'x': 0, 'y': 0})
```

```python
# sync

# Generic click
page.click('button#submit')

# Double click
page.dblclick('#item')

# Right click
page.click('#item', button='right')

# Shift + click
page.click('#item', modifiers=['Shift'])

# Hover over element
page.hover('#item')

# Click the top left corner
page.click('#item', position={ 'x': 0, 'y': 0})
```

Under the hood, this and other pointer-related methods:
- wait for element with given selector to be in DOM
- wait for it to become displayed, i.e. not empty, no `display:none`, no `visibility:hidden`
- wait for it to stop moving, for example, until css transition finishes
- scroll the element into view
- wait for it to receive pointer events at the action point, for example, waits until element becomes non-obscured by other elements
- retry if the element is detached during any of the above checks

#### Forcing the click

Sometimes, apps use non-trivial logic where hovering the element overlays it with another element that intercepts the click. This behavior is indistinguishable from a bug where element gets covered and the click is dispatched elsewhere. If you know this is taking place, you can bypass the [actionability](./actionability.md) checks and force the click:

```python
# async

await page.click('button#submit', force=True)
```

```python
# sync

page.click('button#submit', force=True)
```

#### Programmatic click

If you are not interested in testing your app under the real conditions and want to simulate the click by any means possible, you can trigger the [`HTMLElement.click()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click) behavior via simply dispatching a click event on the element:

```python
# async

await page.dispatch_event('button#submit', 'click')
```

```python
# sync

page.dispatch_event('button#submit', 'click')
```

#### API reference
- [page.click(selector, **options)](./api/class-page.md#pageclickselector-options)
- [frame.click(selector, **options)](./api/class-frame.md#frameclickselector-options)
- [element_handle.click(**options)](./api/class-elementhandle.md#elementhandleclickoptions)
- [page.dblclick(selector, **options)](./api/class-page.md#pagedblclickselector-options)
- [frame.dblclick(selector, **options)](./api/class-frame.md#framedblclickselector-options)
- [element_handle.dblclick(**options)](./api/class-elementhandle.md#elementhandledblclickoptions)
- [page.hover(selector, **options)](./api/class-page.md#pagehoverselector-options)
- [frame.hover(selector, **options)](./api/class-frame.md#framehoverselector-options)
- [element_handle.hover(**options)](./api/class-elementhandle.md#elementhandlehoveroptions)
- [page.dispatch_event(selector, type, **options)](./api/class-page.md#pagedispatcheventselector-type-options)
- [frame.dispatch_event(selector, type, **options)](./api/class-frame.md#framedispatcheventselector-type-options)
- [element_handle.dispatch_event(type, **options)](./api/class-elementhandle.md#elementhandledispatcheventtype-options)

<br/>

## Type characters

Type into the field character by character, as if it was a user with a real keyboard.

```python
# async

# Type character by character
await page.type('#area', 'Hello World!')
```

```python
# sync

# Type character by character
page.type('#area', 'Hello World!')
```

This method will emit all the necessary keyboard events, with all the `keydown`, `keyup`, `keypress` events in place. You can even specify the optional `delay` between the key presses to simulate real user behavior.

> **NOTE** that most of the time, [page.fill(selector, value, **options)](./api/class-page.md#pagefillselector-value-options) will just work. You only need to type characters if there is special keyboard handling on the page.

#### API reference
- [page.type(selector, text, **options)](./api/class-page.md#pagetypeselector-text-options)
- [frame.type(selector, text, **options)](./api/class-frame.md#frametypeselector-text-options)
- [element_handle.type(text, **options)](./api/class-elementhandle.md#elementhandletypetext-options)
- [keyboard.type(text, **options)](./api/class-keyboard.md#keyboardtypetext-options)

<br/>

## Keys and shortcuts

```python
# async

# Hit Enter
await page.press('#submit', 'Enter')

# Dispatch Control+Right
await page.press('#name', 'Control+ArrowRight')

# Press $ sign on keyboard
await page.press('#value', '$')
```

```python
# sync

# Hit Enter
page.press('#submit', 'Enter')

# Dispatch Control+Right
page.press('#name', 'Control+ArrowRight')

# Press $ sign on keyboard
page.press('#value', '$')
```

This method focuses the selected element and produces a single keystroke. It accepts the logical key names that are emitted in the [keyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) property of the keyboard events:

```
Backquote, Minus, Equal, Backslash, Backspace, Tab, Delete, Escape,
ArrowDown, End, Enter, Home, Insert, PageDown, PageUp, ArrowRight,
ArrowUp, F1 - F12, Digit0 - Digit9, KeyA - KeyZ, etc.
```

- You can alternatively specify a single character you'd like to produce such as `"a"` or `"#"`.
- Following modification shortcuts are also supported: `Shift, Control, Alt, Meta`.

Simple version produces a single character. This character is case-sensitive, so `"a"` and `"A"` will produce different results.

```python
# async

# <input id=name>
await page.press('#name', 'Shift+A')

# <input id=name>
await page.press('#name', 'Shift+ArrowLeft')
```

```python
# sync

# <input id=name>
page.press('#name', 'Shift+A')

# <input id=name>
page.press('#name', 'Shift+ArrowLeft')
```

Shortcuts such as `"Control+o"` or `"Control+Shift+T"` are supported as well. When specified with the modifier, modifier is pressed and being held while the subsequent key is being pressed.

Note that you still need to specify the capital `A` in `Shift-A` to produce the capital character. `Shift-a` produces a lower-case one as if you had the `CapsLock` toggled.

#### API reference
- [page.press(selector, key, **options)](./api/class-page.md#pagepressselector-key-options)
- [frame.press(selector, key, **options)](./api/class-frame.md#framepressselector-key-options)
- [element_handle.press(key, **options)](./api/class-elementhandle.md#elementhandlepresskey-options)
- [keyboard.press(key, **options)](./api/class-keyboard.md#keyboardpresskey-options)

<br/>

## Upload files

```python
# async

from playwright.async_api import FilePayload
# Select one file
await page.set_input_files('input#upload', 'myfile.pdf')

# Select multiple files
await page.set_input_files('input#upload', ['file1.txt', 'file2.txt'])

# Remove all the selected files
await page.set_input_files('input#upload', [])

# Upload buffer from memory
await page.set_input_files(
    "input#upload",
    files=[FilePayload("test.txt", "text/plain", b"this is a test")],
)
```

```python
# sync

from playwright.sync_api import FilePayload
# Select one file
page.set_input_files('input#upload', 'myfile.pdf')

# Select multiple files
page.set_input_files('input#upload', ['file1.txt', 'file2.txt'])

# Remove all the selected files
page.set_input_files('input#upload', [])

# Upload buffer from memory
page.set_input_files(
    "input#upload",
    files=[FilePayload("test.txt", "text/plain", b"this is a test")],
)
```

You can select input files for upload using the [page.set_input_files(selector, files, **options)](./api/class-page.md#pagesetinputfilesselector-files-options) method. It expects first argument to point to an [input element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) with the type `"file"`. Multiple files can be passed in the array. If some of the file paths are relative, they are resolved relative to the [current working directory](https://nodejs.org/api/process.html#process_process_cwd). Empty array clears the selected files.

#### Example

[This script](https://github.com/microsoft/playwright/blob/master/utils/docs/examples/upload.js) uploads a file to an `input` element that accepts file uploads.

#### API reference
- [page.set_input_files(selector, files, **options)](./api/class-page.md#pagesetinputfilesselector-files-options)
- [frame.set_input_files(selector, files, **options)](./api/class-frame.md#framesetinputfilesselector-files-options)
- [element_handle.set_input_files(files, **options)](./api/class-elementhandle.md#elementhandlesetinputfilesfiles-options)

<br/>

## Focus element

For the dynamic pages that handle focus events, you can focus the given element.

```python
# async

await page.focus('input#name')
```

```python
# sync

page.focus('input#name')
```

#### API reference
- [page.focus(selector, **options)](./api/class-page.md#pagefocusselector-options)
- [frame.focus(selector, **options)](./api/class-frame.md#framefocusselector-options)
- [element_handle.focus()](./api/class-elementhandle.md#elementhandlefocus)

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
[pathlib.Path]: https://realpython.com/python-pathlib/ "pathlib.Path"
[str]: https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str "str"
[Union]: https://docs.python.org/3/library/typing.html#typing.Union "Union"