---
id: core-concepts
title: "Core concepts"
---

Playwright provides a set of APIs to automate Chromium, Firefox and WebKit browsers. By using the Playwright API, you can write JavaScript code to create new browser pages, navigate to URLs and then interact with elements on a page.

Along with a test runner Playwright can be used to automate user interactions to validate and test web applications. The Playwright API enables this through the following primitives.

- [Browser](#browser)
- [Browser contexts](#browser-contexts)
- [Pages and frames](#pages-and-frames)
- [Selectors](#selectors)
- [Auto-waiting](#auto-waiting)
- [Execution contexts: Node.js and Browser](#execution-contexts-nodejs-and-browser)
- [Evaluation Argument](#evaluation-argument)
- [Object & Element handles](#object--element-handles)

<br/>

## Browser

A [Browser] refers to an instance of Chromium, Firefox or WebKit. Playwright scripts generally start with launching a browser instance and end with closing the browser. Browser instances can be launched in headless (without a GUI) or headful mode.

```python
# async

import asyncio
from playwright import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        await browser.close()

asyncio.get_event_loop().run_until_complete(main())
```

```python
# sync

from playwright import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    browser.close()
```

Launching a browser instance can be expensive, and Playwright is designed to maximize what a single instance can do through multiple browser contexts.

#### API reference
- [Browser]

<br/>

## Browser contexts

A [BrowserContext] is an isolated incognito-alike session within a browser instance. Browser contexts are fast and cheap to create. Browser contexts can be used to parallelize isolated test executions.

```python
# async

browser = await playwright.chromium.launch()
context = await browser.new_context()
```

```python
# sync

browser = playwright.chromium.launch()
context = browser.new_context()
```

Browser contexts can also be used to emulate multi-page scenarios involving mobile devices, permissions, locale and color scheme.

```python
# async

import asyncio
from playwright import async_playwright

async def main():
    async with async_playwright() as p:
        iphone_11 = p.devices['iPhone 11 Pro']
        browser = await p.chromium.launch()
        context = await browser.new_context(
            **iphone_11,
            locale='de-DE',
            geolocation={ 'longitude': 12.492507, 'latitude': 41.889938 },
            permissions=['geolocation'],
            color_scheme='dark',
        )
        page = await browser.newPage()
        await browser.close()

asyncio.get_event_loop().run_until_complete(main())
```

```python
# sync

from playwright import sync_playwright

with sync_playwright() as p:
    iphone_11 = p.devices['iPhone 11 Pro']
    browser = p.webkit.launch(headless=False)
    context = browser.new_context(
        **iphone_11,
        locale='de-DE',
        geolocation={ 'longitude': 12.492507, 'latitude': 41.889938 },
        permissions=['geolocation']
    )
    browser.close()
```

#### API reference
- [BrowserContext]
- [browser.new_context(**options)](./api/class-browser.md#browsernewcontextoptions)

<br/>

## Pages and frames

A Browser context can have multiple pages. A [Page] refers to a single tab or a popup window within a browser context. It should be used to navigate to URLs and interact with the page content.

```python
# async

page = await context.new_page()

# Navigate explicitly, similar to entering a URL in the browser.
await page.goto('http://example.com')
# Fill an input.
await page.fill('#search', 'query')

# Navigate implicitly by clicking a link.
await page.click('#submit')
# Expect a new url.
print(page.url)

# Page can navigate from the script - this will be picked up by Playwright.
# window.location.href = 'https://example.com'
```

```python
# sync

page = context.new_page()

# Navigate explicitly, similar to entering a URL in the browser.
page.goto('http://example.com')
# Fill an input.
page.fill('#search', 'query')

# Navigate implicitly by clicking a link.
page.click('#submit')
# Expect a new url.
print(page.url)

# Page can navigate from the script - this will be picked up by Playwright.
# window.location.href = 'https://example.com'
```

> Read more on [page navigation and loading](./navigations.md).

A page can have one or more [Frame] objects attached to it. Each page has a main frame and page-level interactions (like `click`) are assumed to operate in the main frame.

A page can have additional frames attached with the `iframe` HTML tag. These frames can be accessed for interactions inside the frame.

```python
# async

# Get frame using the frame's name attribute
frame = page.frame('frame-login')

# Get frame using frame's URL
frame = page.frame(url=r'.*domain.*')

# Get frame using any other selector
frame_element_handle = await page.query_selector('.frame-class')
frame = await frame_element_handle.content_frame()

# Interact with the frame
await frame.fill('#username-input', 'John')
```

```python
# sync

# Get frame using the frame's name attribute
frame = page.frame('frame-login')

# Get frame using frame's URL
frame = page.frame(url=r'.*domain.*')

# Get frame using any other selector
frame_element_handle = page.query_selector('.frame-class')
frame = frame_element_handle.content_frame()

# Interact with the frame
frame.fill('#username-input', 'John')
```

#### API reference
- [Page]
- [Frame]
- [page.frame(**options)](./api/class-page.md#pageframeoptions)

<br/>

## Selectors

Playwright can search for elements using CSS selectors, XPath selectors, HTML attributes like `id`, `data-test-id` and even text content.

You can explicitly specify the selector engine you are using or let Playwright detect it.

All selector engines except for XPath pierce shadow DOM by default. If you want to enforce regular DOM selection, you can use the `*:light` versions of the selectors. You don't typically need to though.

Learn more about selectors and selector engines [here](./selectors.md).

Some examples below:

```python
# async

# Using data-test-id= selector engine
await page.click('data-test-id=foo')
```

```python
# sync

# Using data-test-id= selector engine
page.click('data-test-id=foo')
```

```python
# async

# CSS and XPath selector engines are automatically detected
await page.click('div')
await page.click('//html/body/div')
```

```python
# sync

# CSS and XPath selector engines are automatically detected
page.click('div')
page.click('//html/body/div')
```

```python
# async

# Find node by text substring
await page.click('text=Hello w')
```

```python
# sync

# Find node by text substring
page.click('text=Hello w')
```

```python
# async

# Explicit CSS and XPath notation
await page.click('css=div')
await page.click('xpath=//html/body/div')
```

```python
# sync

# Explicit CSS and XPath notation
page.click('css=div')
page.click('xpath=//html/body/div')
```

```python
# async

# Only search light DOM, outside WebComponent shadow DOM:
await page.click('css:light=div')
```

```python
# sync

# Only search light DOM, outside WebComponent shadow DOM:
page.click('css:light=div')
```

Selectors using the same or different engines can be combined using the `>>` separator. For example,

```python
# async

# Click an element with text 'Sign Up' inside of a #free-month-promo.
await page.click('#free-month-promo >> text=Sign Up')
```

```python
# sync

# Click an element with text 'Sign Up' inside of a #free-month-promo.
page.click('#free-month-promo >> text=Sign Up')
```

```python
# async

# Capture textContent of a section that contains an element with text 'Selectors'.
section_text = await page.eval_on_selector('*css=section >> text=Selectors', 'e => e.textContent')
```

```python
# sync

# Capture textContent of a section that contains an element with text 'Selectors'.
section_text = page.eval_on_selector('*css=section >> text=Selectors', 'e => e.textContent')
```

<br/>

## Auto-waiting

Actions like [page.click(selector, **options)](./api/class-page.md#pageclickselector-options) and [page.fill(selector, value, **options)](./api/class-page.md#pagefillselector-value-options) auto-wait for the element to be visible and [actionable](./actionability.md). For example, click will:
- wait for an element with the given selector to appear in the DOM
- wait for it to become visible: have non-empty bounding box and no `visibility:hidden`
- wait for it to stop moving: for example, wait until css transition finishes
- scroll the element into view
- wait for it to receive pointer events at the action point: for example, wait until element becomes non-obscured by other elements
- retry if the element is detached during any of the above checks

```python
# async

# Playwright waits for #search element to be in the DOM
await page.fill('#search', 'query')
```

```python
# sync

# Playwright waits for #search element to be in the DOM
page.fill('#search', 'query')
```

```python
# async

# Playwright waits for element to stop animating
# and accept clicks.
await page.click('#search')
```

```python
# sync

# Playwright waits for element to stop animating
# and accept clicks.
page.click('#search')
```

You can explicitly wait for an element to appear in the DOM or to become visible:

```python
# async

# Wait for #search to appear in the DOM.
await page.wait_for_selector('#search', state='attached')
# Wait for #promo to become visible, for example with `visibility:visible`.
await page.wait_for_selector('#promo')
```

```python
# sync

# Wait for #search to appear in the DOM.
page.wait_for_selector('#search', state='attached')
# Wait for #promo to become visible, for example with `visibility:visible`.
page.wait_for_selector('#promo')
```

... or to become hidden or detached

```python
# async

# Wait for #details to become hidden, for example with `display:none`.
await page.wait_for_selector('#details', state='hidden')
# Wait for #promo to be removed from the DOM.
await page.wait_for_selector('#promo', state='detached')
```

```python
# sync

# Wait for #details to become hidden, for example with `display:none`.
page.wait_for_selector('#details', state='hidden')
# Wait for #promo to be removed from the DOM.
page.wait_for_selector('#promo', state='detached')
```

#### API reference
- [page.click(selector, **options)](./api/class-page.md#pageclickselector-options)
- [page.fill(selector, value, **options)](./api/class-page.md#pagefillselector-value-options)
- [page.wait_for_selector(selector, **options)](./api/class-page.md#pagewaitforselectorselector-options)

<br/>

## Execution contexts: Node.js and Browser

Playwright scripts run in your Node.js environment. Your page scripts run in the browser page environment. Those environments don't intersect, they are running in different virtual machines in different processes and even potentially on different computers.

The [page.evaluate(expression, **options)](./api/class-page.md#pageevaluateexpression-options) API can run a JavaScript function in the context of the web page and bring results back to the Node.js environment. Browser globals like `window` and `document` can be used in `evaluate`.

```python
# async

href = await page.evaluate('() => document.location.href')
```

```python
# sync

href = page.evaluate('() => document.location.href')
```

If the result is a Promise or if the function is asynchronous evaluate will automatically wait until it's resolved:

```python
# async

status = await page.evaluate("""async () => {
  response = await fetch(location.href)
  return response.status
}""")
```

```python
# sync

status = page.evaluate("""async () => {
  response = fetch(location.href)
  return response.status
}""")
```

## Evaluation Argument

Playwright evaluation methods like [page.evaluate(expression, **options)](./api/class-page.md#pageevaluateexpression-options) take a single optional argument. This argument can be a mix of [Serializable] values and [JSHandle] or [ElementHandle] instances. Handles are automatically converted to the value they represent.

```python
# async

# A primitive value.
await page.evaluate('num => num', 42)

# An array.
await page.evaluate('array => array.length', [1, 2, 3])

# An object.
await page.evaluate('object => object.foo', { 'foo': 'bar' })

# A single handle.
button = await page.query_selctor('button')
await page.evaluate('button => button.textContent', button)

# Alternative notation using elementHandle.evaluate.
await button.evaluate('(button, from) => button.textContent.substring(from)', 5)

# Object with multiple handles.
button1 = await page.query_selector('.button1')
button2 = await page.query_selector('.button2')
await page.evaluate("""
    o => o.button1.textContent + o.button2.textContent""",
    { 'button1': button1, 'button2': button2 })

# Object destructuring works. Note that property names must match
# between the destructured object and the argument.
# Also note the required parenthesis.
await page.evaluate("""
    ({ button1, button2 }) => button1.textContent + button2.textContent""",
    { 'button1': button1, 'button2': button2 })

# Array works as well. Arbitrary names can be used for destructuring.
# Note the required parenthesis.
await page.evaluate("""
    ([b1, b2]) => b1.textContent + b2.textContent""",
    [button1, button2])

# Any non-cyclic mix of serializables and handles works.
await page.evaluate("""
    x => x.button1.textContent + x.list[0].textContent + String(x.foo)""",
    { 'button1': button1, 'list': [button2], 'foo': None })
```

```python
# sync

# A primitive value.
page.evaluate('num => num', 42)

# An array.
page.evaluate('array => array.length', [1, 2, 3])

# An object.
page.evaluate('object => object.foo', { 'foo': 'bar' })

# A single handle.
button = page.query_selector('button')
page.evaluate('button => button.textContent', button)

# Alternative notation using elementHandle.evaluate.
button.evaluate('(button, from) => button.textContent.substring(from)', 5)

# Object with multiple handles.
button1 = page.query_selector('.button1')
button2 = page.query_selector('.button2')
page.evaluate("""o => o.button1.textContent + o.button2.textContent""",
    { 'button1': button1, 'button2': button2 })

# Object destructuring works. Note that property names must match
# between the destructured object and the argument.
# Also note the required parenthesis.
page.evaluate("""
    ({ button1, button2 }) => button1.textContent + button2.textContent""",
    { 'button1': button1, 'button2': button2 })

# Array works as well. Arbitrary names can be used for destructuring.
# Note the required parenthesis.
page.evaluate("""
    ([b1, b2]) => b1.textContent + b2.textContent""",
    [button1, button2])

# Any non-cyclic mix of serializables and handles works.
page.evaluate("""
    x => x.button1.textContent + x.list[0].textContent + String(x.foo)""",
    { 'button1': button1, 'list': [button2], 'foo': None })
```

Right:

```python
# async

data = { 'text': 'some data', 'value': 1 }
# Pass |data| as a parameter.
result = await page.evaluate("""data => {
  window.myApp.use(data)
}""", data)
```

```python
# sync

data = { 'text': 'some data', 'value': 1 }
# Pass |data| as a parameter.
result = page.evaluate("""data => {
  window.myApp.use(data)
}""", data)
```

Wrong:

```python
# async

data = { 'text': 'some data', 'value': 1 }
result = await page.evaluate("""() => {
  # There is no |data| in the web page.
  window.myApp.use(data)
}""")
```

```python
# sync

data = { 'text': 'some data', 'value': 1 }
result = page.evaluate("""() => {
  # There is no |data| in the web page.
  window.myApp.use(data)
}""")
```

#### API reference
- [page.evaluate(expression, **options)](./api/class-page.md#pageevaluateexpression-options)
- [frame.evaluate(expression, **options)](./api/class-frame.md#frameevaluateexpression-options)
- [EvaluationArgument]

<br/>

## Object & Element handles

Playwright can create Node-side handles to the page DOM elements or any other objects inside the page. These handles live in the Node.js process, whereas the actual objects reside in browser.

There are two types of handles:
- [JSHandle] to reference any JavaScript objects in the page
- [ElementHandle] to reference DOM elements in the page

Note that since any DOM element in the page is also a JavaScript object, Playwright's [ElementHandle] extends [JSHandle].

### Handles Lifecycle
- Handles can be acquired using the page methods [page.evaluate_handle(expression, **options)](./api/class-page.md#pageevaluatehandleexpression-options), [page.query_selector(selector)](./api/class-page.md#pagequeryselectorselector) or [page.query_selector_all(selector)](./api/class-page.md#pagequeryselectorallselector) or their frame counterparts [frame.evaluate_handle(expression, **options)](./api/class-frame.md#frameevaluatehandleexpression-options), [frame.query_selector(selector)](./api/class-frame.md#framequeryselectorselector) or [frame.query_selector_all(selector)](./api/class-frame.md#framequeryselectorallselector).
- Once created, handles will retain object from [garbage collection](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management).
- Handles will be **automatically disposed** once the page or frame they belong to navigates or closes.
- Handles can be **manually disposed** using [js_handle.dispose()](./api/class-jshandle.md#jshandledispose) method.

### Example: ElementHandle

```python
# async

# The first parameter of the elementHandle.evaluate callback is the element handle points to.
ul_element_handle = await page.query_selector('ul')
await ul_element_handle.evaluate("ulElement => getComputedStyle(ulElement).getPropertyValue('display')")
```

```python
# sync

# The first parameter of the elementHandle.evaluate callback is the element handle points to.
ul_element_handle = page.query_selector('ul')
ul_element_handle.evaluate("ulElement => getComputedStyle(ulElement).getPropertyValue('display')")
```

Handles can also be passed as arguments to [page.evaluate(expression, **options)](./api/class-page.md#pageevaluateexpression-options) function:

```python
# async

ul_element_handle = await page.query_selector('ul')
await page.evaluate("uiElement => getComputedStyle(uiElement).getPropertyValue('display')", uiElement)
```

```python
# sync

ul_element_handle = page.query_selector('ul')
page.evaluate("uiElement => getComputedStyle(uiElement).getPropertyValue('display')", uiElement)
```

### Example: JSHandle

```python
# async

# Create a new array in the page, write a reference to it in
# window.myArray and get a handle to it.
my_array_handle = await page.evaluate_handle("""() => {
  window.myArray = [1]
  return myArray
}""")

# Get current length of the array using the handle.
length = await page.evaluate("""
  (arg) => arg.myArray.length""",
  { 'myArray': my_array_handle }
)

# Add one more element to the array using the handle
await page.evaluate("(arg) => arg.myArray.push(arg.newElement)", {
  'myArray': my_array_handle,
  'newElement': 2
})

# Get current length of the array using window.myArray reference.
new_length = await page.evaluate("() => window.myArray.length")

# Release the object when it's no longer needed.
await my_array_handle.dispose()
```

```python
# sync

# Create a new array in the page, write a reference to it in
# window.myArray and get a handle to it.
my_array_handle = page.evaluate_handle("""() => {
  window.myArray = [1]
  return myArray
}""")

# Get current length of the array using the handle.
length = page.evaluate("""
  (arg) => arg.myArray.length""",
  { 'myArray': my_array_handle }
)

# Add one more element to the array using the handle
page.evaluate("(arg) => arg.myArray.push(arg.newElement)", {
  'myArray': my_array_handle,
  'newElement': 2
})

# Get current length of the array using window.myArray reference.
new_length = page.evaluate("() => window.myArray.length")

# Release the object when it's no longer needed.
my_array_handle.dispose()
```

#### API reference
- [JSHandle]
- [ElementHandle]
- [page.evaluate_handle(expression, **options)](./api/class-page.md#pageevaluatehandleexpression-options)
- [page.query_selector(selector)](./api/class-page.md#pagequeryselectorselector)
- [page.query_selector_all(selector)](./api/class-page.md#pagequeryselectorallselector)
- [js_handle.evaluate(expression, **options)](./api/class-jshandle.md#jshandleevaluateexpression-options)

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