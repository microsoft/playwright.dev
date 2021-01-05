---
id: class-frame
title: "class: Frame"
---


At every point of time, page exposes its current frame tree via the [page.mainFrame()](api/class-page.md#pagemainframe) and [frame.childFrames()](api/class-frame.md#framechildframes) methods.

[Frame] object's lifecycle is controlled by three events, dispatched on the page object:
- ['frameattached'](api/class-page.md#event-frameattached) - fired when the frame gets attached to the page. A Frame can be attached to the page only once.
- ['framenavigated'](api/class-page.md#event-framenavigated) - fired when the frame commits navigation to a different URL.
- ['framedetached'](api/class-page.md#event-framedetached) - fired when the frame gets detached from the page.  A Frame can be detached from the page only once.

An example of dumping frame tree:

```js
const { firefox } = require('playwright');  // Or 'chromium' or 'webkit'.

(async () => {
  const browser = await firefox.launch();
  const page = await browser.newPage();
  await page.goto('https://www.google.com/chrome/browser/canary.html');
  dumpFrameTree(page.mainFrame(), '');
  await browser.close();

  function dumpFrameTree(frame, indent) {
    console.log(indent + frame.url());
    for (const child of frame.childFrames()) {
      dumpFrameTree(child, indent + '  ');
    }
  }
})();
```

An example of getting text from an iframe element:

```js
  const frame = page.frames().find(frame => frame.name() === 'myframe');
  const text = await frame.$eval('.selector', element => element.textContent);
  console.log(text);
```

<!-- GEN:toc -->
- [frame.$(selector)](#frameselector)
- [frame.$$(selector)](#frameselector-1)
- [frame.$eval(selector, pageFunction[, arg])](#frameevalselector-pagefunction-arg)
- [frame.$$eval(selector, pageFunction[, arg])](#frameevalselector-pagefunction-arg-1)
- [frame.addScriptTag(options)](api/class-frame.md#frameaddscripttagoptions)
- [frame.addStyleTag(options)](api/class-frame.md#frameaddstyletagoptions)
- [frame.check(selector, [options])](api/class-frame.md#framecheckselector-options)
- [frame.childFrames()](#framechildframes)
- [frame.click(selector[, options])](api/class-frame.md#frameclickselector-options)
- [frame.content()](api/class-frame.md#framecontent)
- [frame.dblclick(selector[, options])](api/class-frame.md#framedblclickselector-options)
- [frame.dispatchEvent(selector, type[, eventInit, options])](api/class-frame.md#framedispatcheventselector-type-eventinit-options)
- [frame.evaluate(pageFunction[, arg])](api/class-frame.md#frameevaluatepagefunction-arg)
- [frame.evaluateHandle(pageFunction[, arg])](api/class-frame.md#frameevaluatehandlepagefunction-arg)
- [frame.fill(selector, value[, options])](api/class-frame.md#framefillselector-value-options)
- [frame.focus(selector[, options])](api/class-frame.md#framefocusselector-options)
- [frame.frameElement()](api/class-frame.md#frameframeelement)
- [frame.goto(url[, options])](api/class-frame.md#framegotourl-options)
- [frame.hover(selector[, options])](api/class-frame.md#framehoverselector-options)
- [frame.isDetached()](api/class-frame.md#frameisdetached)
- [frame.name()](api/class-frame.md#framename)
- [frame.parentFrame()](api/class-frame.md#frameparentframe)
- [frame.press(selector, key[, options])](api/class-frame.md#framepressselector-key-options)
- [frame.selectOption(selector, values[, options])](api/class-frame.md#frameselectoptionselector-values-options)
- [frame.setContent(html[, options])](api/class-frame.md#framesetcontenthtml-options)
- [frame.setInputFiles(selector, files[, options])](api/class-frame.md#framesetinputfilesselector-files-options)
- [frame.title()](api/class-frame.md#frametitle)
- [frame.type(selector, text[, options])](api/class-frame.md#frametypeselector-text-options)
- [frame.uncheck(selector, [options])](api/class-frame.md#frameuncheckselector-options)
- [frame.url()](api/class-frame.md#frameurl)
- [frame.waitForFunction(pageFunction[, arg, options])](api/class-frame.md#framewaitforfunctionpagefunction-arg-options)
- [frame.waitForLoadState([state[, options]])](api/class-frame.md#framewaitforloadstatestate-options)
- [frame.waitForNavigation([options])](api/class-frame.md#framewaitfornavigationoptions)
- [frame.waitForSelector(selector[, options])](api/class-frame.md#framewaitforselectorselector-options)
- [frame.waitForTimeout(timeout)](api/class-frame.md#framewaitfortimeouttimeout)
<!-- GEN:stop -->

## frame.$(selector)
- `selector` <[string]> A selector to query frame for
- returns: <[Promise]<?[ElementHandle]>> Promise which resolves to ElementHandle pointing to the frame element.

The method finds an element matching the specified selector within the frame. See [Working with selectors](api/working-with-selectors.md#working-with-selectors) for more details. If no elements match the selector, the return value resolves to `null`.

## frame.$$(selector)
- `selector` <[string]> A selector to query frame for
- returns: <[Promise]<[Array]<[ElementHandle]>>> Promise which resolves to ElementHandles pointing to the frame elements.

The method finds all elements matching the specified selector within the frame. See [Working with selectors](#working-with-selectors) for more details. If no elements match the selector, the return value resolves to `[]`.

## frame.$eval(selector, pageFunction[, arg])
- `selector` <[string]> A selector to query frame for
- `pageFunction` <[function]\([Element]\)> Function to be evaluated in browser context
- `arg` <[Serializable]|[JSHandle]> Optional argument to pass to `pageFunction`
- returns: <[Promise]<[Serializable]>> Promise which resolves to the return value of `pageFunction`

The method finds an element matching the specified selector within the frame and passes it as a first argument to `pageFunction`. See [Working with selectors](#working-with-selectors) for more details. If no elements match the selector, the method throws an error.

If `pageFunction` returns a [Promise], then `frame.$eval` would wait for the promise to resolve and return its value.

Examples:
```js
const searchValue = await frame.$eval('#search', el => el.value);
const preloadHref = await frame.$eval('link[rel=preload]', el => el.href);
const html = await frame.$eval('.main-container', (e, suffix) => e.outerHTML + suffix, 'hello');
```

## frame.$$eval(selector, pageFunction[, arg])
- `selector` <[string]> A selector to query frame for
- `pageFunction` <[function]\([Array]<[Element]>\)> Function to be evaluated in browser context
- `arg` <[Serializable]|[JSHandle]> Optional argument to pass to `pageFunction`
- returns: <[Promise]<[Serializable]>> Promise which resolves to the return value of `pageFunction`

The method finds all elements matching the specified selector within the frame and passes an array of matched elements as a first argument to `pageFunction`. See [Working with selectors](#working-with-selectors) for more details.

If `pageFunction` returns a [Promise], then `frame.$$eval` would wait for the promise to resolve and return its value.

Examples:
```js
const divsCounts = await frame.$$eval('div', (divs, min) => divs.length >= min, 10);
```

## frame.addScriptTag(options)
- `options` <[Object]>
  - `url` <[string]> URL of a script to be added.
  - `path` <[string]> Path to the JavaScript file to be injected into frame. If `path` is a relative path, then it is resolved relative to [current working directory](https://nodejs.org/api/process.html#process_process_cwd).
  - `content` <[string]> Raw JavaScript content to be injected into frame.
  - `type` <[string]> Script type. Use 'module' in order to load a Javascript ES6 module. See [script](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) for more details.
- returns: <[Promise]<[ElementHandle]>> which resolves to the added tag when the script's onload fires or when the script content was injected into frame.

Adds a `<script>` tag into the page with the desired url or content.

## frame.addStyleTag(options)
- `options` <[Object]>
  - `url` <[string]> URL of the `<link>` tag.
  - `path` <[string]> Path to the CSS file to be injected into frame. If `path` is a relative path, then it is resolved relative to [current working directory](https://nodejs.org/api/process.html#process_process_cwd).
  - `content` <[string]> Raw CSS content to be injected into frame.
- returns: <[Promise]<[ElementHandle]>> which resolves to the added tag when the stylesheet's onload fires or when the CSS content was injected into frame.

Adds a `<link rel="stylesheet">` tag into the page with the desired url or a `<style type="text/css">` tag with the content.

## frame.check(selector, [options])
- `selector` <[string]> A selector to search for checkbox to check. If there are multiple elements satisfying the selector, the first will be checked.
- `options` <[Object]>
  - `force` <[boolean]> Whether to bypass the actionability checks. By default actions wait until the element is:
    - displayed: has non-empty bounding box and no `visibility:hidden` (note that elements of zero size or with `display:none` are considered not displayed),
    - is not moving (for example, css transition has finished),
    - receives pointer events at the action point (for example, element is not covered by other elements).
    Even if the action is forced, it will wait for the element matching selector to be in the DOM. Defaults to `false`.
  - `noWaitAfter` <[boolean]> Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
  - `timeout` <[number]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultTimeout(timeout)](api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout) or [page.setDefaultTimeout(timeout)](api/class-page.md#pagesetdefaulttimeouttimeout) methods.
- returns: <[Promise]> Promise which resolves when the element matching `selector` is successfully checked. The Promise will be rejected if there is no element matching `selector`.

This method fetches an element with `selector`, if element is not already checked, it scrolls it into view if needed, and then uses [frame.click](#frameclickselector-options) to click in the center of the element.
If there's no element matching `selector`, the method waits until a matching element appears in the DOM. If the element is detached during the actionability checks, the action is retried.

## frame.childFrames()
- returns: <[Array]<[Frame]>>

## frame.click(selector[, options])
- `selector` <[string]> A selector to search for element to click. If there are multiple elements satisfying the selector, the first will be clicked.
- `options` <[Object]>
  - `button` <"left"|"right"|"middle"> Defaults to `left`.
  - `clickCount` <[number]> defaults to 1. See [UIEvent.detail].
  - `delay` <[number]> Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.
  - `position` <[Object]> A point to click relative to the top-left corner of element padding box. If not specified, clicks to some visible point of the element.
    - x <[number]>
    - y <[number]>
  - `modifiers` <[Array]<"Alt"|"Control"|"Meta"|"Shift">> Modifier keys to press. Ensures that only these modifiers are pressed during the click, and then restores current modifiers back. If not specified, currently pressed modifiers are used.
  - `force` <[boolean]> Whether to bypass the actionability checks. By default actions wait until the element is:
    - displayed: has non-empty bounding box and no `visibility:hidden` (note that elements of zero size or with `display:none` are considered not displayed),
    - is not moving (for example, css transition has finished),
    - receives pointer events at the action point (for example, element is not covered by other elements).
    Even if the action is forced, it will wait for the element matching selector to be in the DOM. Defaults to `false`.
  - `noWaitAfter` <[boolean]> Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
  - `timeout` <[number]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
- returns: <[Promise]> Promise which resolves when the element matching `selector` is successfully clicked. The Promise will be rejected if there is no element matching `selector`.

This method fetches an element with `selector`, scrolls it into view if needed, and then uses [page.mouse](api/class-page.md#pagemouse) to click in the center of the element.
If there's no element matching `selector`, the method waits until a matching element appears in the DOM. If the element is detached during the actionability checks, the action is retried.

## frame.content()
- returns: <[Promise]<[string]>>

Gets the full HTML contents of the frame, including the doctype.

## frame.dblclick(selector[, options])
- `selector` <[string]> A selector to search for element to double click. If there are multiple elements satisfying the selector, the first will be double clicked.
- `options` <[Object]>
  - `button` <"left"|"right"|"middle"> Defaults to `left`.
  - `delay` <[number]> Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.
  - `position` <[Object]> A point to double click relative to the top-left corner of element padding box. If not specified, double clicks to some visible point of the element.
    - x <[number]>
    - y <[number]>
  - `modifiers` <[Array]<"Alt"|"Control"|"Meta"|"Shift">> Modifier keys to press. Ensures that only these modifiers are pressed during the double click, and then restores current modifiers back. If not specified, currently pressed modifiers are used.
  - `force` <[boolean]> Whether to bypass the actionability checks. By default actions wait until the element is:
    - displayed: has non-empty bounding box and no `visibility:hidden` (note that elements of zero size or with `display:none` are considered not displayed),
    - is not moving (for example, css transition has finished),
    - receives pointer events at the action point (for example, element is not covered by other elements).
    Even if the action is forced, it will wait for the element matching selector to be in the DOM. Defaults to `false`.
  - `noWaitAfter` <[boolean]> Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
  - `timeout` <[number]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
- returns: <[Promise]> Promise which resolves when the element matching `selector` is successfully double clicked. The Promise will be rejected if there is no element matching `selector`.

This method fetches an element with `selector`, scrolls it into view if needed, and then uses [page.mouse](#pagemouse) to double click in the center of the element.
If there's no element matching `selector`, the method waits until a matching element appears in the DOM. If the element is detached during the actionability checks, the action is retried.

Bear in mind that if the first click of the `dblclick()` triggers a navigation event, there will be an exception.

> **NOTE** `frame.dblclick()` dispatches two `click` events and a single `dblclick` event.

## frame.dispatchEvent(selector, type[, eventInit, options])
- `selector` <[string]> A selector to search for element to use. If there are multiple elements satisfying the selector, the first will be double clicked.
- `type` <[string]> DOM event type: `"click"`, `"dragstart"`, etc.
- `eventInit` <[Object]> event-specific initialization properties.
- `options` <[Object]>
  - `timeout` <[number]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
- returns: <[Promise]>

The snippet below dispatches the `click` event on the element. Regardless of the visibility state of the elment, `click` is dispatched. This is equivalend to calling [`element.click()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click).

```js
await frame.dispatchEvent('button#submit', 'click');
```

Under the hood, it creates an instance of an event based on the given `type`, initializes it with `eventInit` properties and dispatches it on the element. Events are `composed`, `cancelable` and bubble by default.

Since `eventInit` is event-specific, please refer to the events documentation for the lists of initial properties:
- [DragEvent](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent/DragEvent)
- [FocusEvent](https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent/FocusEvent)
- [KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/KeyboardEvent)
- [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/MouseEvent)
- [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/PointerEvent)
- [TouchEvent](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/TouchEvent)
- [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event/Event)

 You can also specify `JSHandle` as the property value if you want live objects to be passed into the event:

```js
// Note you can only create DataTransfer in Chromium and Firefox
const dataTransfer = await frame.evaluateHandle(() => new DataTransfer());
await frame.dispatchEvent('#source', 'dragstart', { dataTransfer });
```

## frame.evaluate(pageFunction[, arg])
- `pageFunction` <[function]|[string]> Function to be evaluated in browser context
- `arg` <[Serializable]|[JSHandle]> Optional argument to pass to `pageFunction`
- returns: <[Promise]<[Serializable]>> Promise which resolves to the return value of `pageFunction`

If the function passed to the `frame.evaluate` returns a [Promise], then `frame.evaluate` would wait for the promise to resolve and return its value.

If the function passed to the `frame.evaluate` returns a non-[Serializable] value, then `frame.evaluate` resolves to `undefined`. DevTools Protocol also supports transferring some additional values that are not serializable by `JSON`: `-0`, `NaN`, `Infinity`, `-Infinity`, and bigint literals.

```js
const result = await frame.evaluate(([x, y]) => {
  return Promise.resolve(x * y);
}, [7, 8]);
console.log(result); // prints "56"
```

A string can also be passed in instead of a function.

```js
console.log(await frame.evaluate('1 + 2')); // prints "3"
```

[ElementHandle] instances can be passed as an argument to the `frame.evaluate`:
```js
const bodyHandle = await frame.$('body');
const html = await frame.evaluate(([body, suffix]) => body.innerHTML + suffix, [bodyHandle, 'hello']);
await bodyHandle.dispose();
```

## frame.evaluateHandle(pageFunction[, arg])
- `pageFunction` <[function]|[string]> Function to be evaluated in the page context
- `arg` <[Serializable]|[JSHandle]> Optional argument to pass to `pageFunction`
- returns: <[Promise]<[JSHandle]>> Promise which resolves to the return value of `pageFunction` as in-page object (JSHandle)

The only difference between `frame.evaluate` and `frame.evaluateHandle` is that `frame.evaluateHandle` returns in-page object (JSHandle).

If the function, passed to the `frame.evaluateHandle`, returns a [Promise], then `frame.evaluateHandle` would wait for the promise to resolve and return its value.

```js
const aWindowHandle = await frame.evaluateHandle(() => Promise.resolve(window));
aWindowHandle; // Handle for the window object.
```

A string can also be passed in instead of a function.

```js
const aHandle = await frame.evaluateHandle('document'); // Handle for the 'document'.
```

[JSHandle] instances can be passed as an argument to the `frame.evaluateHandle`:
```js
const aHandle = await frame.evaluateHandle(() => document.body);
const resultHandle = await frame.evaluateHandle(([body, suffix]) => body.innerHTML + suffix, [aHandle, 'hello']);
console.log(await resultHandle.jsonValue());
await resultHandle.dispose();
```

## frame.fill(selector, value[, options])
- `selector` <[string]> A selector to query page for.
- `value` <[string]> Value to fill for the `<input>`, `<textarea>` or `[contenteditable]` element.
- `options` <[Object]>
  - `noWaitAfter` <[boolean]> Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
  - `timeout` <[number]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
- returns: <[Promise]> Promise which resolves when the element matching `selector` is successfully filled. The promise will be rejected if there is no element matching `selector`.

This method focuses the element and triggers an `input` event after filling.
If there's no text `<input>`, `<textarea>` or `[contenteditable]` element matching `selector`, the method throws an error.

To send fine-grained keyboard events, use [`frame.type`](#frametypeselector-text-options).

## frame.focus(selector[, options])
- `selector` <[string]> A selector of an element to focus. If there are multiple elements satisfying the selector, the first will be focused.
- `options` <[Object]>
  - `timeout` <[number]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
- returns: <[Promise]> Promise which resolves when the element matching `selector` is successfully focused. The promise will be rejected if there is no element matching `selector`.

This method fetches an element with `selector` and focuses it.
If there's no element matching `selector`, the method waits until a matching element appears in the DOM.

## frame.frameElement()
- returns: <[Promise]<[ElementHandle]>> Promise that resolves with a `frame` or `iframe` element handle which corresponds to this frame.

This is an inverse of [elementHandle.contentFrame()](api/class-elementhandle.md#elementhandlecontentframe). Note that returned handle actually belongs to the parent frame.

This method throws an error if the frame has been detached before `frameElement()` returns.

```js
const frameElement = await frame.frameElement();
const contentFrame = await frameElement.contentFrame();
console.log(frame === contentFrame);  // -> true
```

## frame.goto(url[, options])
- `url` <[string]> URL to navigate frame to. The url should include scheme, e.g. `https://`.
- `options` <[Object]> Navigation parameters which might have the following properties:
  - `timeout` <[number]> Maximum navigation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultNavigationTimeout(timeout)](api/class-browsercontext.md#browsercontextsetdefaultnavigationtimeouttimeout), [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout), [page.setDefaultNavigationTimeout(timeout)](api/class-page.md#pagesetdefaultnavigationtimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
  - `waitUntil` <"load"|"domcontentloaded"|"networkidle">  When to consider navigation succeeded, defaults to `load`. Events can be either:
    - `'domcontentloaded'` - consider navigation to be finished when the `DOMContentLoaded` event is fired.
    - `'load'` - consider navigation to be finished when the `load` event is fired.
    - `'networkidle'` - consider navigation to be finished when there are no network connections for at least `500` ms.
  - `referer` <[string]> Referer header value. If provided it will take preference over the referer header value set by [page.setExtraHTTPHeaders()](api/class-page.md#pagesetextrahttpheadersheaders).
- returns: <[Promise]<?[Response]>> Promise which resolves to the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect.

`frame.goto` will throw an error if:
- there's an SSL error (e.g. in case of self-signed certificates).
- target URL is invalid.
- the `timeout` is exceeded during navigation.
- the remote server does not respond or is unreachable.
- the main resource failed to load.

`frame.goto` will not throw an error when any valid HTTP status code is returned by the remote server, including 404 "Not Found" and 500 "Internal Server Error".  The status code for such responses can be retrieved by calling [response.status()](api/class-response.md#responsestatus).

> **NOTE** `frame.goto` either throws an error or returns a main resource response. The only exceptions are navigation to `about:blank` or navigation to the same URL with a different hash, which would succeed and return `null`.

> **NOTE** Headless mode doesn't support navigation to a PDF document. See the [upstream issue](https://bugs.chromium.org/p/chromium/issues/detail?id=761295).


## frame.hover(selector[, options])
- `selector` <[string]> A selector to search for element to hover. If there are multiple elements satisfying the selector, the first will be hovered.
- `options` <[Object]>
  - `position` <[Object]> A point to hover relative to the top-left corner of element padding box. If not specified, hovers over some visible point of the element.
    - x <[number]>
    - y <[number]>
  - `modifiers` <[Array]<"Alt"|"Control"|"Meta"|"Shift">> Modifier keys to press. Ensures that only these modifiers are pressed during the hover, and then restores current modifiers back. If not specified, currently pressed modifiers are used.
  - `force` <[boolean]> Whether to bypass the actionability checks. By default actions wait until the element is:
    - displayed: has non-empty bounding box and no `visibility:hidden` (note that elements of zero size or with `display:none` are considered not displayed),
    - is not moving (for example, css transition has finished),
    - receives pointer events at the action point (for example, element is not covered by other elements).
    Even if the action is forced, it will wait for the element matching selector to be in the DOM. Defaults to `false`.
  - `timeout` <[number]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
- returns: <[Promise]> Promise which resolves when the element matching `selector` is successfully hovered. Promise gets rejected if there's no element matching `selector`.

This method fetches an element with `selector`, scrolls it into view if needed, and then uses [page.mouse](#pagemouse) to hover over the center of the element.
If there's no element matching `selector`, the method waits until a matching element appears in the DOM. If the element is detached during the actionability checks, the action is retried.

## frame.isDetached()
- returns: <[boolean]>

Returns `true` if the frame has been detached, or `false` otherwise.

## frame.name()
- returns: <[string]>

Returns frame's name attribute as specified in the tag.

If the name is empty, returns the id attribute instead.

> **NOTE** This value is calculated once when the frame is created, and will not update if the attribute is changed later.

## frame.parentFrame()
- returns: <?[Frame]> Parent frame, if any. Detached frames and main frames return `null`.

## frame.press(selector, key[, options])
- `selector` <[string]> A selector of an element to type into. If there are multiple elements satisfying the selector, the first will be used.
- `key` <[string]> Name of the key to press or a character to generate, such as `ArrowLeft` or `a`.
- `options` <[Object]>
  - `delay` <[number]> Time to wait between `keydown` and `keyup` in milliseconds. Defaults to 0.
  - `noWaitAfter` <[boolean]> Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
  - `timeout` <[number]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
- returns: <[Promise]>

`key` can specify the intended [keyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) value or a single character to generate the text for. A superset of the `key` values can be found [here](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values). Examples of the keys are:

  `F1` - `F12`, `Digit0`- `Digit9`, `KeyA`- `KeyZ`, `Backquote`, `Minus`, `Equal`, `Backslash`, `Backspace`, `Tab`, `Delete`, `Escape`, `ArrowDown`, `End`, `Enter`, `Home`, `Insert`, `PageDown`, `PageUp`, `ArrayRight`, `ArrowUp`, etc.

Following modification shortcuts are also suported: `Shift`, `Control`, `Alt`, `Meta`, `ShiftLeft`.

Holding down `Shift` will type the text that corresponds to the `key` in the upper case.

If `key` is a single character, it is case-sensitive, so the values `a` and `A` will generate different respective texts.

Shortcuts such as `key: "Control+o"` or `key: "Control+Shift+T"` are supported as well. When speficied with the modifier, modifier is pressed and being held while the subsequent key is being pressed.

## frame.selectOption(selector, values[, options])
- `selector` <[string]> A selector to query frame for.
- `values` <[string]|[ElementHandle]|[Array]<[string]>|[Object]|[Array]<[ElementHandle]>|[Array]<[Object]>> Options to select. If the `<select>` has the `multiple` attribute, all matching options are selected, otherwise only the first option matching one of the passed options is selected. String values are equivalent to `{value:'string'}`. Option is considered matching if all specified properties match.
  - `value` <[string]> Matches by `option.value`.
  - `label` <[string]> Matches by `option.label`.
  - `index` <[number]> Matches by the index.
- `options` <[Object]>
  - `noWaitAfter` <[boolean]> Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
  - `timeout` <[number]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
- returns: <[Promise]<[Array]<[string]>>> An array of option values that have been successfully selected.

Triggers a `change` and `input` event once all the provided options have been selected.
If there's no `<select>` element matching `selector`, the method throws an error.

```js
// single selection matching the value
frame.selectOption('select#colors', 'blue');

// single selection matching both the value and the label
frame.selectOption('select#colors', { label: 'Blue' });

// multiple selection
frame.selectOption('select#colors', 'red', 'green', 'blue');
```

## frame.setContent(html[, options])
- `html` <[string]> HTML markup to assign to the page.
- `options` <[Object]> Parameters which might have the following properties:
  - `timeout` <[number]> Maximum time in milliseconds for resources to load, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultNavigationTimeout(timeout)](#browsercontextsetdefaultnavigationtimeouttimeout), [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout), [page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
  - `waitUntil` <"load"|"domcontentloaded"|"networkidle">  When to consider navigation succeeded, defaults to `load`. Events can be either:
    - `'domcontentloaded'` - consider setting content to be finished when the `DOMContentLoaded` event is fired.
    - `'load'` - consider setting content to be finished when the `load` event is fired.
    - `'networkidle'` - consider setting content to be finished when there are no network connections for at least `500` ms.
- returns: <[Promise]>

## frame.setInputFiles(selector, files[, options])
- `selector` <[string]> A selector to search for element to click. If there are multiple elements satisfying the selector, the first will be clicked.
- `files` <[string]|[Array]<[string]>|[Object]|[Array]<[Object]>>
  - `name` <[string]> [File] name **required**
  - `mimeType` <[string]> [File] type **required**
  - `buffer` <[Buffer]> File content **required**
- `options` <[Object]>
  - `noWaitAfter` <[boolean]> Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
  - `timeout` <[number]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
- returns: <[Promise]>

This method expects `selector` to point to an [input element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input).

Sets the value of the file input to these file paths or files. If some of the `filePaths` are relative paths, then they are resolved relative to the [current working directory](https://nodejs.org/api/process.html#process_process_cwd). For empty array, clears the selected files.

## frame.title()
- returns: <[Promise]<[string]>> The page's title.

## frame.type(selector, text[, options])
- `selector` <[string]> A selector of an element to type into. If there are multiple elements satisfying the selector, the first will be used.
- `text` <[string]> A text to type into a focused element.
- `options` <[Object]>
  - `delay` <[number]> Time to wait between key presses in milliseconds. Defaults to 0.
  - `noWaitAfter` <[boolean]> Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
  - `timeout` <[number]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
- returns: <[Promise]>

Sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text. `frame.type` can be used to send fine-grained keyboard events. To fill values in form fields, use [`frame.fill`](#framefillselector-value-options).

To press a special key, like `Control` or `ArrowDown`, use [`keyboard.press`](api/class-keyboard.md#keyboardpresskey-options).

```js
await frame.type('#mytextarea', 'Hello'); // Types instantly
await frame.type('#mytextarea', 'World', {delay: 100}); // Types slower, like a user
```

## frame.uncheck(selector, [options])
- `selector` <[string]> A selector to search for uncheckbox to check. If there are multiple elements satisfying the selector, the first will be checked.
- `options` <[Object]>
  - `force` <[boolean]> Whether to bypass the actionability checks. By default actions wait until the element is:
    - displayed: has non-empty bounding box and no `visibility:hidden` (note that elements of zero size or with `display:none` are considered not displayed),
    - is not moving (for example, css transition has finished),
    - receives pointer events at the action point (for example, element is not covered by other elements).
    Even if the action is forced, it will wait for the element matching selector to be in the DOM. Defaults to `false`.
  - `noWaitAfter` <[boolean]> Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
  - `timeout` <[number]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
- returns: <[Promise]> Promise which resolves when the element matching `selector` is successfully unchecked. The Promise will be rejected if there is no element matching `selector`.

This method fetches an element with `selector`, if element is not already unchecked, it scrolls it into view if needed, and then uses [frame.click](#frameclickselector-options) to click in the center of the element.
If there's no element matching `selector`, the method waits until a matching element appears in the DOM. If the element is detached during the actionability checks, the action is retried.

## frame.url()
- returns: <[string]>

Returns frame's url.

## frame.waitForFunction(pageFunction[, arg, options])
- `pageFunction` <[function]|[string]> Function to be evaluated in browser context
- `arg` <[Serializable]|[JSHandle]> Optional argument to pass to `pageFunction`
- `options` <[Object]> Optional waiting parameters
  - `polling` <[number]|"raf"> If `polling` is `'raf'`, then `pageFunction` is constantly executed in `requestAnimationFrame` callback. If `polling` is a number, then it is treated as an interval in milliseconds at which the function would be executed. Defaults to `raf`.
  - `timeout` <[number]> maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
- returns: <[Promise]<[JSHandle]>> Promise which resolves when the `pageFunction` returns a truthy value. It resolves to a JSHandle of the truthy value.

The `waitForFunction` can be used to observe viewport size change:
```js
const { firefox } = require('playwright');  // Or 'chromium' or 'webkit'.

(async () => {
  const browser = await firefox.launch();
  const page = await browser.newPage();
  const watchDog = page.mainFrame().waitForFunction('window.innerWidth < 100');
  page.setViewportSize({width: 50, height: 50});
  await watchDog;
  await browser.close();
})();
```

To pass an argument from node.js to the predicate of `frame.waitForFunction` function:

```js
const selector = '.foo';
await frame.waitForFunction(selector => !!document.querySelector(selector), selector);
```

## frame.waitForLoadState([state[, options]])
- `state` <"load"|"domcontentloaded"|"networkidle"> Load state to wait for, defaults to `load`. If the state has been already reached while loading current document, the method resolves immediately.
  - `'load'` - wait for the `load` event to be fired.
  - `'domcontentloaded'` - wait for the `DOMContentLoaded` event to be fired.
  - `'networkidle'` - wait until there are no network connections for at least `500` ms.
- `options` <[Object]>
  - `timeout` <[number]> Maximum waiting time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultNavigationTimeout(timeout)](#browsercontextsetdefaultnavigationtimeouttimeout), [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout), [page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
- returns: <[Promise]> Promise which resolves when the required load state has been reached.

This resolves when the frame reaches a required load state, `load` by default. The navigation must have been committed when this method is called. If current document has already reached the required state, resolves immediately.

```js
await frame.click('button'); // Click triggers navigation.
await frame.waitForLoadState(); // The promise resolves after 'load' event.
```

## frame.waitForNavigation([options])
- `options` <[Object]> Navigation parameters which might have the following properties:
  - `timeout` <[number]> Maximum navigation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultNavigationTimeout(timeout)](#browsercontextsetdefaultnavigationtimeouttimeout), [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout), [page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
  - `url` <[string]|[RegExp]|[Function]> URL string, URL regex pattern or predicate receiving [URL] to match while waiting for the navigation.
  - `waitUntil` <"load"|"domcontentloaded"|"networkidle">  When to consider navigation succeeded, defaults to `load`. Events can be either:
    - `'domcontentloaded'` - consider navigation to be finished when the `DOMContentLoaded` event is fired.
    - `'load'` - consider navigation to be finished when the `load` event is fired.
    - `'networkidle'` - consider navigation to be finished when there are no network connections for at least `500` ms.
- returns: <[Promise]<?[Response]>> Promise which resolves to the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect. In case of navigation to a different anchor or navigation due to History API usage, the navigation will resolve with `null`.

This resolves when the frame navigates to a new URL. It is useful for when you run code
which will indirectly cause the frame to navigate. Consider this example:

```js
const [response] = await Promise.all([
  frame.waitForNavigation(), // The navigation promise resolves after navigation has finished
  frame.click('a.my-link'), // Clicking the link will indirectly cause a navigation
]);
```

**NOTE** Usage of the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) to change the URL is considered a navigation.

## frame.waitForSelector(selector[, options])
- `selector` <[string]> A selector of an element to wait for
- `options` <[Object]>
  - `state` <"attached"|"detached"|"visible"|"hidden"> Wait for element to become visible (`visible`), hidden (`hidden`), present in dom (`attached`) or not present in dom (`detached`). Defaults to `visible`.
  - `timeout` <[number]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
- returns: <[Promise]<?[ElementHandle]>> Promise which resolves when element specified by selector satisfies `state` option. Resolves to `null` if waiting for `hidden` or `detached`.

Wait for the `selector` to satisfy `state` option (either appear/disappear from dom, or become visible/hidden). If at the moment of calling the method `selector` already satisfies the condition, the method will return immediately. If the selector doesn't satisfy the condition for the `timeout` milliseconds, the function will throw.

Element is considered `visible` when it has non-empty bounding box and no `visibility:hidden`. Note that element without any content or with `display:none` has an empty bounding box and is not considered visible. Element is considired `hidden` when it is not `visible` as defined above.

This method works across navigations:
```js
const { webkit } = require('playwright');  // Or 'chromium' or 'firefox'.

(async () => {
  const browser = await webkit.launch();
  const page = await browser.newPage();
  let currentURL;
  page.mainFrame()
    .waitForSelector('img')
    .then(() => console.log('First URL with image: ' + currentURL));
  for (currentURL of ['https://example.com', 'https://google.com', 'https://bbc.com']) {
    await page.goto(currentURL);
  }
  await browser.close();
})();
```

## frame.waitForTimeout(timeout)
- `timeout` <[number]> A timeout to wait for
- returns: <[Promise]>

Returns a promise that resolves after the timeout.

Note that `frame.waitForTimeout()` should only be used for debugging. Tests using the timer in production are going to be flaky. Use signals such as network events, selectors becoming visible and others instead.



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
[UIEvent.detail]: https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail "UIEvent.detail"
[URL]: https://nodejs.org/api/url.html
[USKeyboardLayout]: ../src/usKeyboardLayout.ts "USKeyboardLayout"
[UnixTime]: https://en.wikipedia.org/wiki/Unix_time "Unix Time"
[WebKitBrowser]: api/class-webkitbrowser.md#class-webkitbrowser "WebKitBrowser"
[WebSocket]: api.md#class-websocket "WebSocket"
[Worker]: api/class-worker.md#class-worker "Worker"
[boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structuresapi.md#Boolean_type "Boolean"
[function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function "Function"
[iterator]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols "Iterator"
[number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structuresapi.md#Number_type "Number"
[origin]: https://developer.mozilla.org/en-US/docs/Glossary/Origin "Origin"
[selector]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors "selector"
[Readable]: https://nodejs.org/api/stream.htmlapi.md#stream_class_stream_readable "Readable"
[string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structuresapi.md#String_type "String"
[xpath]: https://developer.mozilla.org/en-US/docs/Web/XPath "xpath"
