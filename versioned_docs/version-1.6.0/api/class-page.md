---
id: class-page
title: "class: Page"
---


* extends: [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)

Page provides methods to interact with a single tab in a [Browser], or an [extension background page](https://developer.chrome.com/extensions/background_pages) in Chromium. One [Browser] instance might have multiple [Page] instances.

This example creates a page, navigates it to a URL, and then saves a screenshot:
```js
const { webkit } = require('playwright');  // Or 'chromium' or 'firefox'.

(async () => {
  const browser = await webkit.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://example.com');
  await page.screenshot({path: 'screenshot.png'});
  await browser.close();
})();
```

The Page class emits various events (described below) which can be handled using any of Node's native [`EventEmitter`](https://nodejs.org/api/events.html#events_class_eventemitter) methods, such as `on`, `once` or `removeListener`.

This example logs a message for a single page `load` event:
```js
page.once('load', () => console.log('Page loaded!'));
```

To unsubscribe from events use the `removeListener` method:

```js
function logRequest(interceptedRequest) {
  console.log('A request was made:', interceptedRequest.url());
}
page.on('request', logRequest);
// Sometime later...
page.removeListener('request', logRequest);
```

<!-- GEN:toc -->
- [event: 'close'](#event-close-1)
- [event: 'console'](api/class-page.md#event-console)
- [event: 'crash'](api/class-page.md#event-crash)
- [event: 'dialog'](api/class-page.md#event-dialog)
- [event: 'domcontentloaded'](api/class-page.md#event-domcontentloaded)
- [event: 'download'](api/class-page.md#event-download)
- [event: 'filechooser'](api/class-page.md#event-filechooser)
- [event: 'frameattached'](api/class-page.md#event-frameattached)
- [event: 'framedetached'](api/class-page.md#event-framedetached)
- [event: 'framenavigated'](api/class-page.md#event-framenavigated)
- [event: 'load'](api/class-page.md#event-load)
- [event: 'pageerror'](api/class-page.md#event-pageerror)
- [event: 'popup'](api/class-page.md#event-popup)
- [event: 'request'](api/class-page.md#event-request)
- [event: 'requestfailed'](api/class-page.md#event-requestfailed)
- [event: 'requestfinished'](api/class-page.md#event-requestfinished)
- [event: 'response'](api/class-page.md#event-response)
- [event: 'websocket'](api/class-page.md#event-websocket)
- [event: 'worker'](api/class-page.md#event-worker)
- [page.$(selector)](#pageselector)
- [page.$$(selector)](#pageselector-1)
- [page.$eval(selector, pageFunction[, arg])](#pageevalselector-pagefunction-arg)
- [page.$$eval(selector, pageFunction[, arg])](#pageevalselector-pagefunction-arg-1)
- [page.accessibility](api/class-page.md#pageaccessibility)
- [page.addInitScript(script[, arg])](api/class-page.md#pageaddinitscriptscript-arg)
- [page.addScriptTag(options)](api/class-page.md#pageaddscripttagoptions)
- [page.addStyleTag(options)](api/class-page.md#pageaddstyletagoptions)
- [page.bringToFront()](api/class-page.md#pagebringtofront)
- [page.check(selector, [options])](api/class-page.md#pagecheckselector-options)
- [page.click(selector[, options])](api/class-page.md#pageclickselector-options)
- [page.close([options])](api/class-page.md#pagecloseoptions)
- [page.content()](api/class-page.md#pagecontent)
- [page.context()](api/class-page.md#pagecontext)
- [page.coverage](api/class-page.md#pagecoverage)
- [page.dblclick(selector[, options])](api/class-page.md#pagedblclickselector-options)
- [page.dispatchEvent(selector, type[, eventInit, options])](api/class-page.md#pagedispatcheventselector-type-eventinit-options)
- [page.emulateMedia(options)](api/class-page.md#pageemulatemediaoptions)
- [page.evaluate(pageFunction[, arg])](api/class-page.md#pageevaluatepagefunction-arg)
- [page.evaluateHandle(pageFunction[, arg])](api/class-page.md#pageevaluatehandlepagefunction-arg)
- [page.exposeBinding(name, playwrightBinding[, options])](api/class-page.md#pageexposebindingname-playwrightbinding-options)
- [page.exposeFunction(name, playwrightFunction)](api/class-page.md#pageexposefunctionname-playwrightfunction)
- [page.fill(selector, value[, options])](api/class-page.md#pagefillselector-value-options)
- [page.focus(selector[, options])](api/class-page.md#pagefocusselector-options)
- [page.frame(options)](api/class-page.md#pageframeoptions)
- [page.frames()](api/class-page.md#pageframes)
- [page.getAttribute(selector, name[, options])](api/class-page.md#pagegetattributeselector-name-options)
- [page.goBack([options])](api/class-page.md#pagegobackoptions)
- [page.goForward([options])](api/class-page.md#pagegoforwardoptions)
- [page.goto(url[, options])](api/class-page.md#pagegotourl-options)
- [page.hover(selector[, options])](api/class-page.md#pagehoverselector-options)
- [page.innerHTML(selector[, options])](api/class-page.md#pageinnerhtmlselector-options)
- [page.innerText(selector[, options])](api/class-page.md#pageinnertextselector-options)
- [page.isClosed()](api/class-page.md#pageisclosed)
- [page.keyboard](api/class-page.md#pagekeyboard)
- [page.mainFrame()](api/class-page.md#pagemainframe)
- [page.mouse](api/class-page.md#pagemouse)
- [page.opener()](api/class-page.md#pageopener)
- [page.pdf([options])](api/class-page.md#pagepdfoptions)
- [page.press(selector, key[, options])](api/class-page.md#pagepressselector-key-options)
- [page.reload([options])](api/class-page.md#pagereloadoptions)
- [page.route(url, handler)](api/class-page.md#pagerouteurl-handler)
- [page.screenshot([options])](api/class-page.md#pagescreenshotoptions)
- [page.selectOption(selector, values[, options])](api/class-page.md#pageselectoptionselector-values-options)
- [page.setContent(html[, options])](api/class-page.md#pagesetcontenthtml-options)
- [page.setDefaultNavigationTimeout(timeout)](api/class-page.md#pagesetdefaultnavigationtimeouttimeout)
- [page.setDefaultTimeout(timeout)](api/class-page.md#pagesetdefaulttimeouttimeout)
- [page.setExtraHTTPHeaders(headers)](api/class-page.md#pagesetextrahttpheadersheaders)
- [page.setInputFiles(selector, files[, options])](api/class-page.md#pagesetinputfilesselector-files-options)
- [page.setViewportSize(viewportSize)](api/class-page.md#pagesetviewportsizeviewportsize)
- [page.tap(selector[, options])](api/class-page.md#pagetapselector-options)
- [page.textContent(selector[, options])](api/class-page.md#pagetextcontentselector-options)
- [page.title()](api/class-page.md#pagetitle)
- [page.touchscreen](api/class-page.md#pagetouchscreen)
- [page.type(selector, text[, options])](api/class-page.md#pagetypeselector-text-options)
- [page.uncheck(selector, [options])](api/class-page.md#pageuncheckselector-options)
- [page.unroute(url[, handler])](api/class-page.md#pageunrouteurl-handler)
- [page.url()](api/class-page.md#pageurl)
- [page.video()](api/class-page.md#pagevideo)
- [page.viewportSize()](api/class-page.md#pageviewportsize)
- [page.waitForEvent(event[, optionsOrPredicate])](api/class-page.md#pagewaitforeventevent-optionsorpredicate)
- [page.waitForFunction(pageFunction[, arg, options])](api/class-page.md#pagewaitforfunctionpagefunction-arg-options)
- [page.waitForLoadState([state[, options]])](api/class-page.md#pagewaitforloadstatestate-options)
- [page.waitForNavigation([options])](api/class-page.md#pagewaitfornavigationoptions)
- [page.waitForRequest(urlOrPredicate[, options])](api/class-page.md#pagewaitforrequesturlorpredicate-options)
- [page.waitForResponse(urlOrPredicate[, options])](api/class-page.md#pagewaitforresponseurlorpredicate-options)
- [page.waitForSelector(selector[, options])](api/class-page.md#pagewaitforselectorselector-options)
- [page.waitForTimeout(timeout)](api/class-page.md#pagewaitfortimeouttimeout)
- [page.workers()](api/class-page.md#pageworkers)
<!-- GEN:stop -->

## event: 'close'

Emitted when the page closes.

## event: 'console'
- <[ConsoleMessage]>

Emitted when JavaScript within the page calls one of console API methods, e.g. `console.log` or `console.dir`. Also emitted if the page throws an error or a warning.

The arguments passed into `console.log` appear as arguments on the event handler.

An example of handling `console` event:
```js
page.on('console', msg => {
  for (let i = 0; i < msg.args().length; ++i)
    console.log(`${i}: ${msg.args()[i]}`);
});
page.evaluate(() => console.log('hello', 5, {foo: 'bar'}));
```

## event: 'crash'

Emitted when the page crashes. Browser pages might crash if they try to allocate too much memory. When the page crashes, ongoing and subsequent operations will throw.

The most common way to deal with crashes is to catch an exception:
```js
try {
  // Crash might happen during a click.
  await page.click('button');
  // Or while waiting for an event.
  await page.waitForEvent('popup');
} catch (e) {
  // When the page crashes, exception message contains 'crash'.
}
```

However, when manually listening to events, it might be useful to avoid stalling when the page crashes. In this case, handling `crash` event helps:

```js
await new Promise((resolve, reject) => {
  page.on('requestfinished', async request => {
    if (await someProcessing(request))
      resolve(request);
  });
  page.on('crash', error => reject(error));
});
```

## event: 'dialog'
- <[Dialog]>

Emitted when a JavaScript dialog appears, such as `alert`, `prompt`, `confirm` or `beforeunload`. Playwright can respond to the dialog via [Dialog]'s [accept](api/class-dialog.md#dialogacceptprompttext) or [dismiss](api/class-dialog.md#dialogdismiss) methods.

## event: 'domcontentloaded'

Emitted when the JavaScript [`DOMContentLoaded`](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded) event is dispatched.

## event: 'download'
- <[Download]>

Emitted when attachment download started. User can access basic file operations on downloaded content via the passed [Download] instance.

> **NOTE** Browser context **must** be created with the `acceptDownloads` set to `true` when user needs access to the downloaded content. If `acceptDownloads` is not set or set to `false`, download events are emitted, but the actual download is not performed and user has no access to the downloaded files.

## event: 'filechooser'
- <[FileChooser]>

Emitted when a file chooser is supposed to appear, such as after clicking the  `<input type=file>`. Playwright can respond to it via setting the input files using [`fileChooser.setFiles`](api/class-filechooser.md#filechoosersetfilesfiles-options) that can be uploaded after that.

```js
page.on('filechooser', async (fileChooser) => {
  await fileChooser.setFiles('/tmp/myfile.pdf');
});
```

## event: 'frameattached'
- <[Frame]>

Emitted when a frame is attached.

## event: 'framedetached'
- <[Frame]>

Emitted when a frame is detached.

## event: 'framenavigated'
- <[Frame]>

Emitted when a frame is navigated to a new url.

## event: 'load'

Emitted when the JavaScript [`load`](https://developer.mozilla.org/en-US/docs/Web/Events/load) event is dispatched.

## event: 'pageerror'
- <[Error]> The exception message

Emitted when an uncaught exception happens within the page.

## event: 'popup'
- <[Page]> Page corresponding to "popup" window

Emitted when the page opens a new tab or window. This event is emitted in addition to the [`browserContext.on('page')`](api/class-browsercontext.md#event-page), but only for popups relevant to this page.

The earliest moment that page is available is when it has navigated to the initial url. For example, when opening a popup with `window.open('http://example.com')`, this event will fire when the network request to "http://example.com" is done and its response has started loading in the popup.

```js
const [popup] = await Promise.all([
  page.waitForEvent('popup'),
  page.evaluate(() => window.open('https://example.com')),
]);
console.log(await popup.evaluate('location.href'));
```

> **NOTE** Use [`page.waitForLoadState([state[, options]])`](#pagewaitforloadstatestate-options) to wait until the page gets to a particular state (you should not need it in most cases).

## event: 'request'
- <[Request]>

Emitted when a page issues a request. The [request] object is read-only.
In order to intercept and mutate requests, see [`page.route()`](#pagerouteurl-handler) or [`browserContext.route()`](api/class-browsercontext.md#browsercontextrouteurl-handler).

## event: 'requestfailed'
- <[Request]>

Emitted when a request fails, for example by timing out.

> **NOTE** HTTP Error responses, such as 404 or 503, are still successful responses from HTTP standpoint, so request will complete with [`'requestfinished'`](#event-requestfinished) event and not with [`'requestfailed'`](#event-requestfailed).

## event: 'requestfinished'
- <[Request]>

Emitted when a request finishes successfully after downloading the response body. For a successful response, the sequence of events is `request`, `response` and `requestfinished`.

## event: 'response'
- <[Response]>

Emitted when [response] status and headers are received for a request. For a successful response, the sequence of events is `request`, `response` and `requestfinished`.

## event: 'websocket'
- <[WebSocket]> websocket

Emitted when <[WebSocket]> request is sent.

## event: 'worker'
- <[Worker]>

Emitted when a dedicated [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) is spawned by the page.

## page.$(selector)
- `selector` <[string]> A selector to query page for. See [working with selectors](api/working-with-selectors.md#working-with-selectors) for more details.
- returns: <[Promise]<[null]|[ElementHandle]>>

The method finds an element matching the specified selector within the page. If no elements match the selector, the return value resolves to `null`.

Shortcut for [page.mainFrame().$(selector)](#frameselector).

## page.$$(selector)
- `selector` <[string]> A selector to query page for. See [working with selectors](#working-with-selectors) for more details.
- returns: <[Promise]<[Array]<[ElementHandle]>>>

The method finds all elements matching the specified selector within the page. If no elements match the selector, the return value resolves to `[]`.

Shortcut for [page.mainFrame().$$(selector)](#frameselector-1).

## page.$eval(selector, pageFunction[, arg])
- `selector` <[string]> A selector to query page for. See [working with selectors](#working-with-selectors) for more details.
- `pageFunction` <[function]\([Element]\)> Function to be evaluated in browser context
- `arg` <[EvaluationArgument]> Optional argument to pass to `pageFunction`
- returns: <[Promise]<[Serializable]>> Promise which resolves to the return value of `pageFunction`

The method finds an element matching the specified selector within the page and passes it as a first argument to `pageFunction`. If no elements match the selector, the method throws an error.

If `pageFunction` returns a [Promise], then `page.$eval` would wait for the promise to resolve and return its value.

Examples:
```js
const searchValue = await page.$eval('#search', el => el.value);
const preloadHref = await page.$eval('link[rel=preload]', el => el.href);
const html = await page.$eval('.main-container', (e, suffix) => e.outerHTML + suffix, 'hello');
```

Shortcut for [page.mainFrame().$eval(selector, pageFunction)](#frameevalselector-pagefunction-arg).

## page.$$eval(selector, pageFunction[, arg])
- `selector` <[string]> A selector to query page for. See [working with selectors](#working-with-selectors) for more details.
- `pageFunction` <[function]\([Array]<[Element]>\)> Function to be evaluated in browser context
- `arg` <[EvaluationArgument]> Optional argument to pass to `pageFunction`
- returns: <[Promise]<[Serializable]>> Promise which resolves to the return value of `pageFunction`

The method finds all elements matching the specified selector within the page and passes an array of matched elements as a first argument to `pageFunction`.

If `pageFunction` returns a [Promise], then `page.$$eval` would wait for the promise to resolve and return its value.

Examples:
```js
const divsCounts = await page.$$eval('div', (divs, min) => divs.length >= min, 10);
```

## page.accessibility
- returns: <[Accessibility]>

## page.addInitScript(script[, arg])
- `script` <[function]|[string]|[Object]> Script to be evaluated in the page.
  - `path` <[string]> Path to the JavaScript file. If `path` is a relative path, then it is resolved relative to [current working directory](https://nodejs.org/api/process.html#process_process_cwd).
  - `content` <[string]> Raw script content.
- `arg` <[Serializable]> Optional argument to pass to `script` (only supported when passing a function).
- returns: <[Promise]>

Adds a script which would be evaluated in one of the following scenarios:
- Whenever the page is navigated.
- Whenever the child frame is attached or navigated. In this case, the script is evaluated in the context of the newly attached frame.

The script is evaluated after the document was created but before any of its scripts were run. This is useful to amend  the JavaScript environment, e.g. to seed `Math.random`.

An example of overriding `Math.random` before the page loads:

```js
// preload.js
Math.random = () => 42;

// In your playwright script, assuming the preload.js file is in same directory
const preloadFile = fs.readFileSync('./preload.js', 'utf8');
await page.addInitScript(preloadFile);
```

> **NOTE** The order of evaluation of multiple scripts installed via [browserContext.addInitScript(script[, arg])](api/class-browsercontext.md#browsercontextaddinitscriptscript-arg) and [page.addInitScript(script[, arg])](#pageaddinitscriptscript-arg) is not defined.

## page.addScriptTag(options)
- `options` <[Object]>
  - `url` <[string]> URL of a script to be added.
  - `path` <[string]> Path to the JavaScript file to be injected into frame. If `path` is a relative path, then it is resolved relative to [current working directory](https://nodejs.org/api/process.html#process_process_cwd).
  - `content` <[string]> Raw JavaScript content to be injected into frame.
  - `type` <[string]> Script type. Use 'module' in order to load a Javascript ES6 module. See [script](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) for more details.
- returns: <[Promise]<[ElementHandle]>> which resolves to the added tag when the script's onload fires or when the script content was injected into frame.

Adds a `<script>` tag into the page with the desired url or content.

Shortcut for [page.mainFrame().addScriptTag(options)](api/class-frame.md#frameaddscripttagoptions).

## page.addStyleTag(options)
- `options` <[Object]>
  - `url` <[string]> URL of the `<link>` tag.
  - `path` <[string]> Path to the CSS file to be injected into frame. If `path` is a relative path, then it is resolved relative to [current working directory](https://nodejs.org/api/process.html#process_process_cwd).
  - `content` <[string]> Raw CSS content to be injected into frame.
- returns: <[Promise]<[ElementHandle]>> which resolves to the added tag when the stylesheet's onload fires or when the CSS content was injected into frame.

Adds a `<link rel="stylesheet">` tag into the page with the desired url or a `<style type="text/css">` tag with the content.

Shortcut for [page.mainFrame().addStyleTag(options)](api/class-frame.md#frameaddstyletagoptions).


## page.bringToFront()

- returns: <[Promise]>

Brings page to front (activates tab).


## page.check(selector, [options])
- `selector` <[string]> A selector to search for checkbox or radio button to check. If there are multiple elements satisfying the selector, the first will be checked. See [working with selectors](#working-with-selectors) for more details.
- `options` <[Object]>
  - `force` <[boolean]> Whether to bypass the [actionability](./actionability.md) checks. Defaults to `false`.
  - `noWaitAfter` <[boolean]> Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
  - `timeout` <[number]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultTimeout(timeout)](api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
- returns: <[Promise]> Promise that resolves when the element matching `selector` is successfully checked.

This method checks an element matching `selector` by performing the following steps:
1. Find an element match matching `selector`. If there is none, wait until a matching element is attached to the DOM.
1. Ensure that matched element is a checkbox or a radio input. If not, this method rejects. If the element is already checked, this method returns immediately.
1. Wait for [actionability](./actionability.md) checks on the matched element, unless `force` option is set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [page.mouse](#pagemouse) to click in the center of the element.
1. Wait for initiated navigations to either succeed or fail, unless `noWaitAfter` option is set.
1. Ensure that the element is now checked. If not, this method rejects.

When all steps combined have not finished during the specified `timeout`, this method rejects with a [TimeoutError]. Passing zero timeout disables this.

Shortcut for [page.mainFrame().check(selector[, options])](api/class-frame.md#framecheckselector-options).

## page.click(selector[, options])
- `selector` <[string]> A selector to search for element to click. If there are multiple elements satisfying the selector, the first will be clicked. See [working with selectors](#working-with-selectors) for more details.
- `options` <[Object]>
  - `button` <"left"|"right"|"middle"> Defaults to `left`.
  - `clickCount` <[number]> defaults to 1. See [UIEvent.detail].
  - `delay` <[number]> Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.
  - `position` <[Object]> A point to click relative to the top-left corner of element padding box. If not specified, clicks to some visible point of the element.
    - `x` <[number]>
    - `y` <[number]>
  - `modifiers` <[Array]<"Alt"|"Control"|"Meta"|"Shift">> Modifier keys to press. Ensures that only these modifiers are pressed during the click, and then restores current modifiers back. If not specified, currently pressed modifiers are used.
  - `force` <[boolean]> Whether to bypass the [actionability](./actionability.md) checks. Defaults to `false`.
  - `noWaitAfter` <[boolean]> Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
  - `timeout` <[number]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
- returns: <[Promise]> Promise that resolves when the element matching `selector` is successfully clicked.

This method clicks an element matching `selector` by performing the following steps:
1. Find an element match matching `selector`. If there is none, wait until a matching element is attached to the DOM.
1. Wait for [actionability](./actionability.md) checks on the matched element, unless `force` option is set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [page.mouse](#pagemouse) to click in the center of the element, or the specified `position`.
1. Wait for initiated navigations to either succeed or fail, unless `noWaitAfter` option is set.

When all steps combined have not finished during the specified `timeout`, this method rejects with a [TimeoutError]. Passing zero timeout disables this.

Shortcut for [page.mainFrame().click(selector[, options])](api/class-frame.md#frameclickselector-options).

## page.close([options])
- `options` <[Object]>
  - `runBeforeUnload` <[boolean]> Defaults to `false`. Whether to run the
    [before unload](https://developer.mozilla.org/en-US/docs/Web/Events/beforeunload)
    page handlers.
- returns: <[Promise]>

If `runBeforeUnload` is `false` the result will resolve only after the page has been closed.
If `runBeforeUnload` is `true` the method will **not** wait for the page to close.
By default, `page.close()` **does not** run beforeunload handlers.

> **NOTE** if `runBeforeUnload` is passed as true, a `beforeunload` dialog might be summoned
> and should be handled manually via page's ['dialog'](#event-dialog) event.

## page.content()
- returns: <[Promise]<[string]>>

Gets the full HTML contents of the page, including the doctype.

## page.context()

- returns: <[BrowserContext]>

Get the browser context that the page belongs to.

## page.coverage

- returns: <[null]|[ChromiumCoverage]>

Browser-specific Coverage implementation, only available for Chromium atm. See [ChromiumCoverage](api/class-chromiumcoverage.md#class-chromiumcoverage) for more details.

## page.dblclick(selector[, options])
- `selector` <[string]> A selector to search for element to double click. If there are multiple elements satisfying the selector, the first will be double clicked. See [working with selectors](#working-with-selectors) for more details.
- `options` <[Object]>
  - `button` <"left"|"right"|"middle"> Defaults to `left`.
  - `delay` <[number]> Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.
  - `position` <[Object]> A point to double click relative to the top-left corner of element padding box. If not specified, double clicks to some visible point of the element.
    - `x` <[number]>
    - `y` <[number]>
  - `modifiers` <[Array]<"Alt"|"Control"|"Meta"|"Shift">> Modifier keys to press. Ensures that only these modifiers are pressed during the double click, and then restores current modifiers back. If not specified, currently pressed modifiers are used.
  - `force` <[boolean]> Whether to bypass the [actionability](./actionability.md) checks. Defaults to `false`.
  - `noWaitAfter` <[boolean]> Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
  - `timeout` <[number]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
- returns: <[Promise]> Promise that resolves when the element matching `selector` is successfully double clicked.

This method double clicks an element matching `selector` by performing the following steps:
1. Find an element match matching `selector`. If there is none, wait until a matching element is attached to the DOM.
1. Wait for [actionability](./actionability.md) checks on the matched element, unless `force` option is set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [page.mouse](#pagemouse) to double click in the center of the element, or the specified `position`.
1. Wait for initiated navigations to either succeed or fail, unless `noWaitAfter` option is set. Note that if the first click of the `dblclick()` triggers a navigation event, this method will reject.

When all steps combined have not finished during the specified `timeout`, this method rejects with a [TimeoutError]. Passing zero timeout disables this.

> **NOTE** `page.dblclick()` dispatches two `click` events and a single `dblclick` event.

Shortcut for [page.mainFrame().dblclick(selector[, options])](api/class-frame.md#framedblclickselector-options).


## page.dispatchEvent(selector, type[, eventInit, options])
- `selector` <[string]> A selector to search for element to use. If there are multiple elements satisfying the selector, the first will be used. See [working with selectors](#working-with-selectors) for more details.
- `type` <[string]> DOM event type: `"click"`, `"dragstart"`, etc.
- `eventInit` <[EvaluationArgument]> event-specific initialization properties.
- `options` <[Object]>
  - `timeout` <[number]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
- returns: <[Promise]>

The snippet below dispatches the `click` event on the element. Regardless of the visibility state of the elment, `click` is dispatched. This is equivalend to calling [`element.click()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click).

```js
await page.dispatchEvent('button#submit', 'click');
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
const dataTransfer = await page.evaluateHandle(() => new DataTransfer());
await page.dispatchEvent('#source', 'dragstart', { dataTransfer });
```

## page.emulateMedia(options)
- `options` <[Object]>
  - `media` <[null]|"screen"|"print"> Changes the CSS media type of the page. The only allowed values are `'screen'`, `'print'` and `null`. Passing `null` disables CSS media emulation. Omitting `media` or passing `undefined` does not change the emulated value.
  - `colorScheme` <[null]|"light"|"dark"|"no-preference"> Emulates `'prefers-colors-scheme'` media feature, supported values are `'light'`, `'dark'`, `'no-preference'`. Passing `null` disables color scheme emulation. Omitting `colorScheme` or passing `undefined` does not change the emulated value.
- returns: <[Promise]>

```js
await page.evaluate(() => matchMedia('screen').matches);
// → true
await page.evaluate(() => matchMedia('print').matches);
// → false

await page.emulateMedia({ media: 'print' });
await page.evaluate(() => matchMedia('screen').matches);
// → false
await page.evaluate(() => matchMedia('print').matches);
// → true

await page.emulateMedia({});
await page.evaluate(() => matchMedia('screen').matches);
// → true
await page.evaluate(() => matchMedia('print').matches);
// → false
```

```js
await page.emulateMedia({ colorScheme: 'dark' }] });
await page.evaluate(() => matchMedia('(prefers-color-scheme: dark)').matches);
// → true
await page.evaluate(() => matchMedia('(prefers-color-scheme: light)').matches);
// → false
await page.evaluate(() => matchMedia('(prefers-color-scheme: no-preference)').matches);
// → false
```

## page.evaluate(pageFunction[, arg])
- `pageFunction` <[function]|[string]> Function to be evaluated in the page context
- `arg` <[EvaluationArgument]> Optional argument to pass to `pageFunction`
- returns: <[Promise]<[Serializable]>> Promise which resolves to the return value of `pageFunction`

If the function passed to the `page.evaluate` returns a [Promise], then `page.evaluate` would wait for the promise to resolve and return its value.

If the function passed to the `page.evaluate` returns a non-[Serializable] value, then `page.evaluate` resolves to `undefined`. DevTools Protocol also supports transferring some additional values that are not serializable by `JSON`: `-0`, `NaN`, `Infinity`, `-Infinity`, and bigint literals.

Passing argument to `pageFunction`:
```js
const result = await page.evaluate(([x, y]) => {
  return Promise.resolve(x * y);
}, [7, 8]);
console.log(result); // prints "56"
```

A string can also be passed in instead of a function:
```js
console.log(await page.evaluate('1 + 2')); // prints "3"
const x = 10;
console.log(await page.evaluate(`1 + ${x}`)); // prints "11"
```

[ElementHandle] instances can be passed as an argument to the `page.evaluate`:
```js
const bodyHandle = await page.$('body');
const html = await page.evaluate(([body, suffix]) => body.innerHTML + suffix, [bodyHandle, 'hello']);
await bodyHandle.dispose();
```

Shortcut for [page.mainFrame().evaluate(pageFunction[, arg])](api/class-frame.md#frameevaluatepagefunction-arg).

## page.evaluateHandle(pageFunction[, arg])
- `pageFunction` <[function]|[string]> Function to be evaluated in the page context
- `arg` <[EvaluationArgument]> Optional argument to pass to `pageFunction`
- returns: <[Promise]<[JSHandle]>> Promise which resolves to the return value of `pageFunction` as in-page object (JSHandle)

The only difference between `page.evaluate` and `page.evaluateHandle` is that `page.evaluateHandle` returns in-page object (JSHandle).

If the function passed to the `page.evaluateHandle` returns a [Promise], then `page.evaluateHandle` would wait for the promise to resolve and return its value.

A string can also be passed in instead of a function:
```js
const aHandle = await page.evaluateHandle('document'); // Handle for the 'document'
```

[JSHandle] instances can be passed as an argument to the `page.evaluateHandle`:
```js
const aHandle = await page.evaluateHandle(() => document.body);
const resultHandle = await page.evaluateHandle(body => body.innerHTML, aHandle);
console.log(await resultHandle.jsonValue());
await resultHandle.dispose();
```

## page.exposeBinding(name, playwrightBinding[, options])
- `name` <[string]> Name of the function on the window object.
- `playwrightBinding` <[function]> Callback function that will be called in the Playwright's context.
- `options` <[Object]>
  - `handle` <[boolean]> Whether to pass the argument as a handle, instead of passing by value. When passing a handle, only one argument is supported. When passing by value, multiple arguments are supported.
- returns: <[Promise]>

The method adds a function called `name` on the `window` object of every frame in this page.
When called, the function executes `playwrightBinding` in Node.js and returns a [Promise] which resolves to the return value of `playwrightBinding`.
If the `playwrightBinding` returns a [Promise], it will be awaited.

The first argument of the `playwrightBinding` function contains information about the caller:
`{ browserContext: BrowserContext, page: Page, frame: Frame }`.

See [browserContext.exposeBinding(name, playwrightBinding)](api/class-browsercontext.md#browsercontextexposebindingname-playwrightbinding-options) for the context-wide version.

> **NOTE** Functions installed via `page.exposeBinding` survive navigations.

An example of exposing page URL to all frames in a page:
```js
const { webkit } = require('playwright');  // Or 'chromium' or 'firefox'.

(async () => {
  const browser = await webkit.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.exposeBinding('pageURL', ({ page }) => page.url());
  await page.setContent(`
    <script>
      async function onClick() {
        document.querySelector('div').textContent = await window.pageURL();
      }
    </script>
    <button onclick="onClick()">Click me</button>
    <div></div>
  `);
  await page.click('button');
})();
```

An example of passing an element handle:
```js
await page.exposeBinding('clicked', async (source, element) => {
  console.log(await element.textContent());
}, { handle: true });
await page.setContent(`
  <script>
    document.addEventListener('click', event => window.clicked(event.target));
  </script>
  <div>Click me</div>
  <div>Or click me</div>
`);
```

## page.exposeFunction(name, playwrightFunction)
- `name` <[string]> Name of the function on the window object
- `playwrightFunction` <[function]> Callback function which will be called in Playwright's context.
- returns: <[Promise]>

The method adds a function called `name` on the `window` object of every frame in the page.
When called, the function executes `playwrightFunction` in Node.js and returns a [Promise] which resolves to the return value of `playwrightFunction`.

If the `playwrightFunction` returns a [Promise], it will be awaited.

See [browserContext.exposeFunction(name, playwrightFunction)](api/class-browsercontext.md#browsercontextexposefunctionname-playwrightfunction) for context-wide exposed function.

> **NOTE** Functions installed via `page.exposeFunction` survive navigations.

An example of adding an `md5` function to the page:
```js
const { webkit } = require('playwright');  // Or 'chromium' or 'firefox'.
const crypto = require('crypto');

(async () => {
  const browser = await webkit.launch({ headless: false });
  const page = await browser.newPage();
  await page.exposeFunction('md5', text => crypto.createHash('md5').update(text).digest('hex'));
  await page.setContent(`
    <script>
      async function onClick() {
        document.querySelector('div').textContent = await window.md5('PLAYWRIGHT');
      }
    </script>
    <button onclick="onClick()">Click me</button>
    <div></div>
  `);
  await page.click('button');
})();
```

An example of adding a `window.readfile` function to the page:

```js
const { chromium } = require('playwright');  // Or 'firefox' or 'webkit'.
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log(msg.text()));
  await page.exposeFunction('readfile', async filePath => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, text) => {
        if (err)
          reject(err);
        else
          resolve(text);
      });
    });
  });
  await page.evaluate(async () => {
    // use window.readfile to read contents of a file
    const content = await window.readfile('/etc/hosts');
    console.log(content);
  });
  await browser.close();
})();
```

## page.fill(selector, value[, options])
- `selector` <[string]> A selector to query page for. See [working with selectors](#working-with-selectors) for more details.
- `value` <[string]> Value to fill for the `<input>`, `<textarea>` or `[contenteditable]` element.
- `options` <[Object]>
  - `noWaitAfter` <[boolean]> Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
  - `timeout` <[number]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
- returns: <[Promise]>

This method waits for an element matching `selector`, waits for [actionability](./actionability.md) checks, focuses the element, fills it and triggers an `input` event after filling.
If the element matching `selector` is not an `<input>`, `<textarea>` or `[contenteditable]` element, this method throws an error.
Note that you can pass an empty string to clear the input field.

To send fine-grained keyboard events, use [`page.type`](#pagetypeselector-text-options).

Shortcut for [page.mainFrame().fill()](api/class-frame.md#framefillselector-value-options)

## page.focus(selector[, options])
- `selector` <[string]> A selector of an element to focus. If there are multiple elements satisfying the selector, the first will be focused. See [working with selectors](#working-with-selectors) for more details.
- `options` <[Object]>
  - `timeout` <[number]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
- returns: <[Promise]> Promise which resolves when the element matching `selector` is successfully focused. The promise will be rejected if there is no element matching `selector`.

This method fetches an element with `selector` and focuses it.
If there's no element matching `selector`, the method waits until a matching element appears in the DOM.

Shortcut for [page.mainFrame().focus(selector)](api/class-frame.md#framefocusselector-options).

## page.frame(options)
- `options` <[string]|[Object]> Frame name or other frame lookup options.
  - `name` <[string]> frame name specified in the `iframe`'s `name` attribute
  - `url` <[string]|[RegExp]|[Function]> A glob pattern, regex pattern or predicate receiving frame's `url` as a [URL] object.
- returns: <[null]|[Frame]> frame matching the criteria. Returns `null` if no frame matches.

```js
const frame = page.frame('frame-name');
```

```js
const frame = page.frame({ url: /.*domain.*/ });
```

Returns frame matching the specified criteria. Either `name` or `url` must be specified.

## page.frames()
- returns: <[Array]<[Frame]>> An array of all frames attached to the page.

## page.getAttribute(selector, name[, options])
- `selector` <[string]> A selector to search for an element. If there are multiple elements satisfying the selector, the first will be picked. See [working with selectors](#working-with-selectors) for more details.
- `name` <[string]> Attribute name to get the value for.
- `options` <[Object]>
  - `timeout` <[number]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
- returns: <[Promise]<[null]|[string]>>

Returns element attribute value.

## page.goBack([options])
- `options` <[Object]> Navigation parameters which might have the following properties:
  - `timeout` <[number]> Maximum navigation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultNavigationTimeout(timeout)](api/class-browsercontext.md#browsercontextsetdefaultnavigationtimeouttimeout), [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout), [page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
  - `waitUntil` <"load"|"domcontentloaded"|"networkidle"> When to consider navigation succeeded, defaults to `load`. Events can be either:
    - `'domcontentloaded'` - consider navigation to be finished when the `DOMContentLoaded` event is fired.
    - `'load'` - consider navigation to be finished when the `load` event is fired.
    - `'networkidle'` - consider navigation to be finished when there are no network connections for at least `500` ms.
- returns: <[Promise]<[null]|[Response]>> Promise which resolves to the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect. If
can not go back, resolves to `null`.

Navigate to the previous page in history.

## page.goForward([options])
- `options` <[Object]> Navigation parameters which might have the following properties:
  - `timeout` <[number]> Maximum navigation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultNavigationTimeout(timeout)](#browsercontextsetdefaultnavigationtimeouttimeout), [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout), [page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
  - `waitUntil` <"load"|"domcontentloaded"|"networkidle"> When to consider navigation succeeded, defaults to `load`. Events can be either:
    - `'domcontentloaded'` - consider navigation to be finished when the `DOMContentLoaded` event is fired.
    - `'load'` - consider navigation to be finished when the `load` event is fired.
    - `'networkidle'` - consider navigation to be finished when there are no network connections for at least `500` ms.
- returns: <[Promise]<[null]|[Response]>> Promise which resolves to the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect. If
can not go forward, resolves to `null`.

Navigate to the next page in history.

## page.goto(url[, options])
- `url` <[string]> URL to navigate page to. The url should include scheme, e.g. `https://`.
- `options` <[Object]> Navigation parameters which might have the following properties:
  - `timeout` <[number]> Maximum navigation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultNavigationTimeout(timeout)](#browsercontextsetdefaultnavigationtimeouttimeout), [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout), [page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
  - `waitUntil` <"load"|"domcontentloaded"|"networkidle"> When to consider navigation succeeded, defaults to `load`. Events can be either:
    - `'domcontentloaded'` - consider navigation to be finished when the `DOMContentLoaded` event is fired.
    - `'load'` - consider navigation to be finished when the `load` event is fired.
    - `'networkidle'` - consider navigation to be finished when there are no network connections for at least `500` ms.
  - `referer` <[string]> Referer header value. If provided it will take preference over the referer header value set by [page.setExtraHTTPHeaders()](#pagesetextrahttpheadersheaders).
- returns: <[Promise]<[null]|[Response]>> Promise which resolves to the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect.

`page.goto` will throw an error if:
- there's an SSL error (e.g. in case of self-signed certificates).
- target URL is invalid.
- the `timeout` is exceeded during navigation.
- the remote server does not respond or is unreachable.
- the main resource failed to load.

`page.goto` will not throw an error when any valid HTTP status code is returned by the remote server, including 404 "Not Found" and 500 "Internal Server Error".  The status code for such responses can be retrieved by calling [response.status()](api/class-response.md#responsestatus).

> **NOTE** `page.goto` either throws an error or returns a main resource response. The only exceptions are navigation to `about:blank` or navigation to the same URL with a different hash, which would succeed and return `null`.

> **NOTE** Headless mode doesn't support navigation to a PDF document. See the [upstream issue](https://bugs.chromium.org/p/chromium/issues/detail?id=761295).

Shortcut for [page.mainFrame().goto(url[, options])](api/class-frame.md#framegotourl-options)

## page.hover(selector[, options])
- `selector` <[string]> A selector to search for element to hover. If there are multiple elements satisfying the selector, the first will be hovered. See [working with selectors](#working-with-selectors) for more details.
- `options` <[Object]>
  - `position` <[Object]> A point to hover relative to the top-left corner of element padding box. If not specified, hovers over some visible point of the element.
    - `x` <[number]>
    - `y` <[number]>
  - `modifiers` <[Array]<"Alt"|"Control"|"Meta"|"Shift">> Modifier keys to press. Ensures that only these modifiers are pressed during the hover, and then restores current modifiers back. If not specified, currently pressed modifiers are used.
  - `force` <[boolean]> Whether to bypass the [actionability](./actionability.md) checks. Defaults to `false`.
  - `timeout` <[number]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
- returns: <[Promise]> Promise that resolves when the element matching `selector` is successfully hovered.

This method hovers over an element matching `selector` by performing the following steps:
1. Find an element match matching `selector`. If there is none, wait until a matching element is attached to the DOM.
1. Wait for [actionability](./actionability.md) checks on the matched element, unless `force` option is set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [page.mouse](#pagemouse) to hover over the center of the element, or the specified `position`.
1. Wait for initiated navigations to either succeed or fail, unless `noWaitAfter` option is set.

When all steps combined have not finished during the specified `timeout`, this method rejects with a [TimeoutError]. Passing zero timeout disables this.

Shortcut for [page.mainFrame().hover(selector[, options])](api/class-frame.md#framehoverselector-options).

## page.innerHTML(selector[, options])
- `selector` <[string]> A selector to search for an element. If there are multiple elements satisfying the selector, the first will be picked. See [working with selectors](#working-with-selectors) for more details.
- `options` <[Object]>
  - `timeout` <[number]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
- returns: <[Promise]<[string]>>

Resolves to the `element.innerHTML`.

## page.innerText(selector[, options])
- `selector` <[string]> A selector to search for an element. If there are multiple elements satisfying the selector, the first will be picked. See [working with selectors](#working-with-selectors) for more details.
- `options` <[Object]>
  - `timeout` <[number]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
- returns: <[Promise]<[string]>>

Resolves to the `element.innerText`.

## page.isClosed()

- returns: <[boolean]>

Indicates that the page has been closed.

## page.keyboard

- returns: <[Keyboard]>

## page.mainFrame()
- returns: <[Frame]> The page's main frame.

Page is guaranteed to have a main frame which persists during navigations.

## page.mouse

- returns: <[Mouse]>

## page.opener()

- returns: <[Promise]<[null]|[Page]>> Promise which resolves to the opener for popup pages and `null` for others. If the opener has been closed already the promise may resolve to `null`.

## page.pdf([options])
- `options` <[Object]> Options object which might have the following properties:
  - `path` <[string]> The file path to save the PDF to. If `path` is a relative path, then it is resolved relative to [current working directory](https://nodejs.org/api/process.html#process_process_cwd). If no path is provided, the PDF won't be saved to the disk.
  - `scale` <[number]> Scale of the webpage rendering. Defaults to `1`. Scale amount must be between 0.1 and 2.
  - `displayHeaderFooter` <[boolean]> Display header and footer. Defaults to `false`.
  - `headerTemplate` <[string]> HTML template for the print header. Should be valid HTML markup with following classes used to inject printing values into them:
    - `'date'` formatted print date
    - `'title'` document title
    - `'url'` document location
    - `'pageNumber'` current page number
    - `'totalPages'` total pages in the document
  - `footerTemplate` <[string]> HTML template for the print footer. Should use the same format as the `headerTemplate`.
  - `printBackground` <[boolean]> Print background graphics. Defaults to `false`.
  - `landscape` <[boolean]> Paper orientation. Defaults to `false`.
  - `pageRanges` <[string]> Paper ranges to print, e.g., '1-5, 8, 11-13'. Defaults to the empty string, which means print all pages.
  - `format` <[string]> Paper format. If set, takes priority over `width` or `height` options. Defaults to 'Letter'.
  - `width` <[string]|[number]> Paper width, accepts values labeled with units.
  - `height` <[string]|[number]> Paper height, accepts values labeled with units.
  - `margin` <[Object]> Paper margins, defaults to none.
    - `top` <[string]|[number]> Top margin, accepts values labeled with units. Defaults to `0`.
    - `right` <[string]|[number]> Right margin, accepts values labeled with units. Defaults to `0`.
    - `bottom` <[string]|[number]> Bottom margin, accepts values labeled with units. Defaults to `0`.
    - `left` <[string]|[number]> Left margin, accepts values labeled with units. Defaults to `0`.
  - `preferCSSPageSize` <[boolean]> Give any CSS `@page` size declared in the page priority over what is declared in `width` and `height` or `format` options. Defaults to `false`, which will scale the content to fit the paper size.
- returns: <[Promise]<[Buffer]>> Promise which resolves with PDF buffer.

> **NOTE** Generating a pdf is currently only supported in Chromium headless.

`page.pdf()` generates a pdf of the page with `print` css media. To generate a pdf with `screen` media, call [page.emulateMedia({ media: 'screen' })](#pageemulatemediaoptions) before calling `page.pdf()`:

> **NOTE** By default, `page.pdf()` generates a pdf with modified colors for printing. Use the [`-webkit-print-color-adjust`](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-print-color-adjust) property to force rendering of exact colors.

```js
// Generates a PDF with 'screen' media type.
await page.emulateMedia({media: 'screen'});
await page.pdf({path: 'page.pdf'});
```

The `width`, `height`, and `margin` options accept values labeled with units. Unlabeled values are treated as pixels.

A few examples:
- `page.pdf({width: 100})` - prints with width set to 100 pixels
- `page.pdf({width: '100px'})` - prints with width set to 100 pixels
- `page.pdf({width: '10cm'})` - prints with width set to 10 centimeters.

All possible units are:
- `px` - pixel
- `in` - inch
- `cm` - centimeter
- `mm` - millimeter

The `format` options are:
- `Letter`: 8.5in x 11in
- `Legal`: 8.5in x 14in
- `Tabloid`: 11in x 17in
- `Ledger`: 17in x 11in
- `A0`: 33.1in x 46.8in
- `A1`: 23.4in x 33.1in
- `A2`: 16.54in x 23.4in
- `A3`: 11.7in x 16.54in
- `A4`: 8.27in x 11.7in
- `A5`: 5.83in x 8.27in
- `A6`: 4.13in x 5.83in

> **NOTE** `headerTemplate` and `footerTemplate` markup have the following limitations:
> 1. Script tags inside templates are not evaluated.
> 2. Page styles are not visible inside templates.

## page.press(selector, key[, options])
- `selector` <[string]> A selector of an element to type into. If there are multiple elements satisfying the selector, the first will be used. See [working with selectors](#working-with-selectors) for more details.
- `key` <[string]> Name of the key to press or a character to generate, such as `ArrowLeft` or `a`.
- `options` <[Object]>
  - `delay` <[number]> Time to wait between `keydown` and `keyup` in milliseconds. Defaults to 0.
  - `noWaitAfter` <[boolean]> Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
  - `timeout` <[number]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
- returns: <[Promise]>

Focuses the element, and then uses [`keyboard.down`](api/class-keyboard.md#keyboarddownkey) and [`keyboard.up`](api/class-keyboard.md#keyboardupkey).

`key` can specify the intended [keyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) value or a single character to generate the text for. A superset of the `key` values can be found [here](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values). Examples of the keys are:

  `F1` - `F12`, `Digit0`- `Digit9`, `KeyA`- `KeyZ`, `Backquote`, `Minus`, `Equal`, `Backslash`, `Backspace`, `Tab`, `Delete`, `Escape`, `ArrowDown`, `End`, `Enter`, `Home`, `Insert`, `PageDown`, `PageUp`, `ArrowRight`, `ArrowUp`, etc.

Following modification shortcuts are also suported: `Shift`, `Control`, `Alt`, `Meta`, `ShiftLeft`.

Holding down `Shift` will type the text that corresponds to the `key` in the upper case.

If `key` is a single character, it is case-sensitive, so the values `a` and `A` will generate different respective texts.

Shortcuts such as `key: "Control+o"` or `key: "Control+Shift+T"` are supported as well. When speficied with the modifier, modifier is pressed and being held while the subsequent key is being pressed.

```js
const page = await browser.newPage();
await page.goto('https://keycode.info');
await page.press('body', 'A');
await page.screenshot({ path: 'A.png' });
await page.press('body', 'ArrowLeft');
await page.screenshot({ path: 'ArrowLeft.png' });
await page.press('body', 'Shift+O');
await page.screenshot({ path: 'O.png' });
await browser.close();
```

## page.reload([options])
- `options` <[Object]> Navigation parameters which might have the following properties:
  - `timeout` <[number]> Maximum navigation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultNavigationTimeout(timeout)](#browsercontextsetdefaultnavigationtimeouttimeout), [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout), [page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
  - `waitUntil` <"load"|"domcontentloaded"|"networkidle"> When to consider navigation succeeded, defaults to `load`. Events can be either:
    - `'domcontentloaded'` - consider navigation to be finished when the `DOMContentLoaded` event is fired.
    - `'load'` - consider navigation to be finished when the `load` event is fired.
    - `'networkidle'` - consider navigation to be finished when there are no network connections for at least `500` ms.
- returns: <[Promise]<[null]|[Response]>> Promise which resolves to the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect.

## page.route(url, handler)
- `url` <[string]|[RegExp]|[function]\([URL]\):[boolean]> A glob pattern, regex pattern or predicate receiving [URL] to match while routing.
- `handler` <[function]\([Route], [Request]\)> handler function to route the request.
- returns: <[Promise]>.

Routing provides the capability to modify network requests that are made by a page.

Once routing is enabled, every request matching the url pattern will stall unless it's continued, fulfilled or aborted.

> **NOTE** The handler will only be called for the first url if the response is a redirect.

An example of a naïve handler that aborts all image requests:

```js
const page = await browser.newPage();
await page.route('**/*.{png,jpg,jpeg}', route => route.abort());
await page.goto('https://example.com');
await browser.close();
```

or the same snippet using a regex pattern instead:

```js
const page = await browser.newPage();
await page.route(/(\.png$)|(\.jpg$)/, route => route.abort());
await page.goto('https://example.com');
await browser.close();
```

Page routes take precedence over browser context routes (set up with [browserContext.route(url, handler)](#browsercontextrouteurl-handler)) when request matches both handlers.

> **NOTE** Enabling routing disables http cache.

## page.screenshot([options])
- `options` <[Object]> Options object which might have the following properties:
  - `path` <[string]> The file path to save the image to. The screenshot type will be inferred from file extension. If `path` is a relative path, then it is resolved relative to [current working directory](https://nodejs.org/api/process.html#process_process_cwd). If no path is provided, the image won't be saved to the disk.
  - `type` <"png"|"jpeg"> Specify screenshot type, defaults to `png`.
  - `quality` <[number]> The quality of the image, between 0-100. Not applicable to `png` images.
  - `fullPage` <[boolean]> When true, takes a screenshot of the full scrollable page, instead of the currently visible viewport. Defaults to `false`.
  - `clip` <[Object]> An object which specifies clipping of the resulting image. Should have the following fields:
    - `x` <[number]> x-coordinate of top-left corner of clip area
    - `y` <[number]> y-coordinate of top-left corner of clip area
    - `width` <[number]> width of clipping area
    - `height` <[number]> height of clipping area
  - `omitBackground` <[boolean]> Hides default white background and allows capturing screenshots with transparency. Not applicable to `jpeg` images. Defaults to `false`.
  - `timeout` <[number]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
- returns: <[Promise]<[Buffer]>> Promise which resolves to buffer with the captured screenshot.

> **NOTE** Screenshots take at least 1/6 second on Chromium OS X and Chromium Windows. See https://crbug.com/741689 for discussion.

## page.selectOption(selector, values[, options])
- `selector` <[string]> A selector to query page for. See [working with selectors](#working-with-selectors) for more details.
- `values` <[null]|[string]|[ElementHandle]|[Array]<[string]>|[Object]|[Array]<[ElementHandle]>|[Array]<[Object]>> Options to select. If the `<select>` has the `multiple` attribute, all matching options are selected, otherwise only the first option matching one of the passed options is selected. String values are equivalent to `{value:'string'}`. Option is considered matching if all specified properties match.
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
page.selectOption('select#colors', 'blue');

// single selection matching both the value and the label
page.selectOption('select#colors', { label: 'Blue' });

// multiple selection
page.selectOption('select#colors', ['red', 'green', 'blue']);

```

Shortcut for [page.mainFrame().selectOption()](api/class-frame.md#frameselectoptionselector-values-options)

## page.setContent(html[, options])
- `html` <[string]> HTML markup to assign to the page.
- `options` <[Object]> Parameters which might have the following properties:
  - `timeout` <[number]> Maximum time in milliseconds for resources to load, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultNavigationTimeout(timeout)](#browsercontextsetdefaultnavigationtimeouttimeout), [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout), [page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
  - `waitUntil` <"load"|"domcontentloaded"|"networkidle"> When to consider setting markup succeeded, defaults to `load`. Given an array of event strings, setting content is considered to be successful after all events have been fired. Events can be either:
    - `'load'` - consider setting content to be finished when the `load` event is fired.
    - `'domcontentloaded'` - consider setting content to be finished when the `DOMContentLoaded` event is fired.
    - `'networkidle'` - consider setting content to be finished when there are no network connections for at least `500` ms.
- returns: <[Promise]>

## page.setDefaultNavigationTimeout(timeout)
- `timeout` <[number]> Maximum navigation time in milliseconds

This setting will change the default maximum navigation time for the following methods and related shortcuts:
- [page.goBack([options])](#pagegobackoptions)
- [page.goForward([options])](#pagegoforwardoptions)
- [page.goto(url[, options])](#pagegotourl-options)
- [page.reload([options])](#pagereloadoptions)
- [page.setContent(html[, options])](#pagesetcontenthtml-options)
- [page.waitForNavigation([options])](#pagewaitfornavigationoptions)

> **NOTE** [`page.setDefaultNavigationTimeout`](#pagesetdefaultnavigationtimeouttimeout) takes priority over [`page.setDefaultTimeout`](#pagesetdefaulttimeouttimeout), [`browserContext.setDefaultTimeout`](#browsercontextsetdefaulttimeouttimeout) and [`browserContext.setDefaultNavigationTimeout`](#browsercontextsetdefaultnavigationtimeouttimeout).


## page.setDefaultTimeout(timeout)
- `timeout` <[number]> Maximum time in milliseconds

This setting will change the default maximum time for all the methods accepting `timeout` option.

> **NOTE** [`page.setDefaultNavigationTimeout`](#pagesetdefaultnavigationtimeouttimeout) takes priority over [`page.setDefaultTimeout`](#pagesetdefaulttimeouttimeout).

## page.setExtraHTTPHeaders(headers)
- `headers` <[Object]<[string], [string]>> An object containing additional HTTP headers to be sent with every request. All header values must be strings.
- returns: <[Promise]>

The extra HTTP headers will be sent with every request the page initiates.

> **NOTE** page.setExtraHTTPHeaders does not guarantee the order of headers in the outgoing requests.

## page.setInputFiles(selector, files[, options])
- `selector` <[string]> A selector to search for element to click. If there are multiple elements satisfying the selector, the first will be clicked. See [working with selectors](#working-with-selectors) for more details.
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


## page.setViewportSize(viewportSize)
- `viewportSize` <[Object]>
  - `width` <[number]> page width in pixels. **required**
  - `height` <[number]> page height in pixels. **required**
- returns: <[Promise]>

In the case of multiple pages in a single browser, each page can have its own viewport size. However, [browser.newContext([options])](api/class-browser.md#browsernewcontextoptions) allows to set viewport size (and more) for all pages in the context at once.

`page.setViewportSize` will resize the page. A lot of websites don't expect phones to change size, so you should set the viewport size before navigating to the page.

```js
const page = await browser.newPage();
await page.setViewportSize({
  width: 640,
  height: 480,
});
await page.goto('https://example.com');
```

## page.tap(selector[, options])
- `selector` <[string]> A selector to search for element to tap. If there are multiple elements satisfying the selector, the first will be tapped. See [working with selectors](#working-with-selectors) for more details.
- `options` <[Object]>
  - `position` <[Object]> A point to tap relative to the top-left corner of element padding box. If not specified, taps some visible point of the element.
    - `x` <[number]>
    - `y` <[number]>
  - `modifiers` <[Array]<"Alt"|"Control"|"Meta"|"Shift">> Modifier keys to press. Ensures that only these modifiers are pressed during the tap, and then restores current modifiers back. If not specified, currently pressed modifiers are used.
  - `noWaitAfter` <[boolean]> Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
  - `force` <[boolean]> Whether to bypass the [actionability](./actionability.md) checks. Defaults to `false`.
  - `timeout` <[number]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
- returns: <[Promise]> Promise that resolves when the element matching `selector` is successfully tapped.

This method taps an element matching `selector` by performing the following steps:
1. Find an element match matching `selector`. If there is none, wait until a matching element is attached to the DOM.
1. Wait for [actionability](./actionability.md) checks on the matched element, unless `force` option is set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [page.touchscreen](#pagemouse) to tap the center of the element, or the specified `position`.
1. Wait for initiated navigations to either succeed or fail, unless `noWaitAfter` option is set.

When all steps combined have not finished during the specified `timeout`, this method rejects with a [TimeoutError]. Passing zero timeout disables this.

> **NOTE** `page.tap()` requires that the `hasTouch` option of the browser context be set to true.

Shortcut for [page.mainFrame().tap()](api/class-frame.md#framename).

## page.textContent(selector[, options])
- `selector` <[string]> A selector to search for an element. If there are multiple elements satisfying the selector, the first will be picked. See [working with selectors](#working-with-selectors) for more details.
- `options` <[Object]>
  - `timeout` <[number]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
- returns: <[Promise]<[null]|[string]>>

Resolves to the `element.textContent`.

## page.title()
- returns: <[Promise]<[string]>> The page's title.

Shortcut for [page.mainFrame().title()](api/class-frame.md#frametitle).

## page.touchscreen

- returns: <[Touchscreen]>

## page.type(selector, text[, options])
- `selector` <[string]> A selector of an element to type into. If there are multiple elements satisfying the selector, the first will be used. See [working with selectors](#working-with-selectors) for more details.
- `text` <[string]> A text to type into a focused element.
- `options` <[Object]>
  - `delay` <[number]> Time to wait between key presses in milliseconds. Defaults to 0.
  - `noWaitAfter` <[boolean]> Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
  - `timeout` <[number]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
- returns: <[Promise]>

Sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text. `page.type` can be used to send fine-grained keyboard events. To fill values in form fields, use [`page.fill`](#pagefillselector-value-options).

To press a special key, like `Control` or `ArrowDown`, use [`keyboard.press`](api/class-keyboard.md#keyboardpresskey-options).

```js
await page.type('#mytextarea', 'Hello'); // Types instantly
await page.type('#mytextarea', 'World', {delay: 100}); // Types slower, like a user
```

Shortcut for [page.mainFrame().type(selector, text[, options])](api/class-frame.md#frametypeselector-text-options).

## page.uncheck(selector, [options])
- `selector` <[string]> A selector to search for uncheckbox to check. If there are multiple elements satisfying the selector, the first will be checked. See [working with selectors](#working-with-selectors) for more details.
- `options` <[Object]>
  - `force` <[boolean]> Whether to bypass the [actionability](./actionability.md) checks. Defaults to `false`.
  - `noWaitAfter` <[boolean]> Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
  - `timeout` <[number]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
- returns: <[Promise]> Promise that resolves when the element matching `selector` is successfully unchecked.

This method unchecks an element matching `selector` by performing the following steps:
1. Find an element match matching `selector`. If there is none, wait until a matching element is attached to the DOM.
1. Ensure that matched element is a checkbox or a radio input. If not, this method rejects. If the element is already unchecked, this method returns immediately.
1. Wait for [actionability](./actionability.md) checks on the matched element, unless `force` option is set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [page.mouse](#pagemouse) to click in the center of the element.
1. Wait for initiated navigations to either succeed or fail, unless `noWaitAfter` option is set.
1. Ensure that the element is now unchecked. If not, this method rejects.

When all steps combined have not finished during the specified `timeout`, this method rejects with a [TimeoutError]. Passing zero timeout disables this.

Shortcut for [page.mainFrame().uncheck(selector[, options])](api/class-frame.md#frameuncheckselector-options).

## page.unroute(url[, handler])
- `url` <[string]|[RegExp]|[function]\([URL]\):[boolean]> A glob pattern, regex pattern or predicate receiving [URL] to match while routing.
- `handler` <[function]\([Route], [Request]\)> Handler function to route the request.
- returns: <[Promise]>

Removes a route created with [page.route(url, handler)](#pagerouteurl-handler). When `handler` is not specified, removes all routes for the `url`.

## page.url()
- returns: <[string]>

This is a shortcut for [page.mainFrame().url()](api/class-frame.md#frameurl)

## page.video()
- returns: <[null]|[Video]>

Video object associated with this page.

## page.viewportSize()
- returns: <[null]|[Object]>
  - `width` <[number]> page width in pixels.
  - `height` <[number]> page height in pixels.

## page.waitForEvent(event[, optionsOrPredicate])
- `event` <[string]> Event name, same one would pass into `page.on(event)`.
- `optionsOrPredicate` <[Function]|[Object]> Either a predicate that receives an event or an options object.
  - `predicate` <[Function]> receives the event data and resolves to truthy value when the waiting should resolve.
  - `timeout` <[number]> maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
- returns: <[Promise]<[Object]>> Promise which resolves to the event data value.

Waits for event to fire and passes its value into the predicate function. Resolves when the predicate returns truthy value. Will throw an error if the page is closed before the event
is fired.

## page.waitForFunction(pageFunction[, arg, options])
- `pageFunction` <[function]|[string]> Function to be evaluated in browser context
- `arg` <[EvaluationArgument]> Optional argument to pass to `pageFunction`
- `options` <[Object]> Optional waiting parameters
  - `polling` <[number]|"raf"> If `polling` is `'raf'`, then `pageFunction` is constantly executed in `requestAnimationFrame` callback. If `polling` is a number, then it is treated as an interval in milliseconds at which the function would be executed. Defaults to `raf`.
  - `timeout` <[number]> maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) method.
- returns: <[Promise]<[JSHandle]>> Promise which resolves when the `pageFunction` returns a truthy value. It resolves to a JSHandle of the truthy value.

The `waitForFunction` can be used to observe viewport size change:
```js
const { webkit } = require('playwright');  // Or 'chromium' or 'firefox'.

(async () => {
  const browser = await webkit.launch();
  const page = await browser.newPage();
  const watchDog = page.waitForFunction('window.innerWidth < 100');
  await page.setViewportSize({width: 50, height: 50});
  await watchDog;
  await browser.close();
})();
```

To pass an argument from Node.js to the predicate of `page.waitForFunction` function:

```js
const selector = '.foo';
await page.waitForFunction(selector => !!document.querySelector(selector), selector);
```

Shortcut for [page.mainFrame().waitForFunction(pageFunction[, arg, options])](api/class-frame.md#framewaitforfunctionpagefunction-arg-options).

## page.waitForLoadState([state[, options]])
- `state` <"load"|"domcontentloaded"|"networkidle"> Load state to wait for, defaults to `load`. If the state has been already reached while loading current document, the method resolves immediately.
  - `'load'` - wait for the `load` event to be fired.
  - `'domcontentloaded'` - wait for the `DOMContentLoaded` event to be fired.
  - `'networkidle'` - wait until there are no network connections for at least `500` ms.
- `options` <[Object]>
  - `timeout` <[number]> Maximum waiting time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultNavigationTimeout(timeout)](#browsercontextsetdefaultnavigationtimeouttimeout), [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout), [page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
- returns: <[Promise]> Promise which resolves when the required load state has been reached.

This resolves when the page reaches a required load state, `load` by default. The navigation must have been committed when this method is called. If current document has already reached the required state, resolves immediately.

```js
await page.click('button'); // Click triggers navigation.
await page.waitForLoadState(); // The promise resolves after 'load' event.
```

```js
const [popup] = await Promise.all([
  page.waitForEvent('popup'),
  page.click('button'), // Click triggers a popup.
])
await popup.waitForLoadState('domcontentloaded'); // The promise resolves after 'domcontentloaded' event.
console.log(await popup.title()); // Popup is ready to use.
```

Shortcut for [page.mainFrame().waitForLoadState([options])](api/class-frame.md#framewaitforloadstatestate-options).

## page.waitForNavigation([options])
- `options` <[Object]> Navigation parameters which might have the following properties:
  - `timeout` <[number]> Maximum navigation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultNavigationTimeout(timeout)](#browsercontextsetdefaultnavigationtimeouttimeout), [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout), [page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
  - `url` <[string]|[RegExp]|[Function]> A glob pattern, regex pattern or predicate receiving [URL] to match while waiting for the navigation.
  - `waitUntil` <"load"|"domcontentloaded"|"networkidle"> When to consider navigation succeeded, defaults to `load`. Events can be either:
    - `'domcontentloaded'` - consider navigation to be finished when the `DOMContentLoaded` event is fired.
    - `'load'` - consider navigation to be finished when the `load` event is fired.
    - `'networkidle'` - consider navigation to be finished when there are no network connections for at least `500` ms.
- returns: <[Promise]<[null]|[Response]>> Promise which resolves to the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect. In case of navigation to a different anchor or navigation due to History API usage, the navigation will resolve with `null`.

This resolves when the page navigates to a new URL or reloads. It is useful for when you run code
which will indirectly cause the page to navigate. e.g. The click target has an `onclick` handler that triggers navigation from a `setTimeout`. Consider this example:

```js
const [response] = await Promise.all([
  page.waitForNavigation(), // The promise resolves after navigation has finished
  page.click('a.delayed-navigation'), // Clicking the link will indirectly cause a navigation
]);
```

**NOTE** Usage of the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) to change the URL is considered a navigation.

Shortcut for [page.mainFrame().waitForNavigation(options)](api/class-frame.md#framewaitfornavigationoptions).

## page.waitForRequest(urlOrPredicate[, options])
- `urlOrPredicate` <[string]|[RegExp]|[Function]> Request URL string, regex or predicate receiving [Request] object.
- `options` <[Object]> Optional waiting parameters
  - `timeout` <[number]> Maximum wait time in milliseconds, defaults to 30 seconds, pass `0` to disable the timeout. The default value can be changed by using the [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) method.
- returns: <[Promise]<[Request]>> Promise which resolves to the matched request.

```js
const firstRequest = await page.waitForRequest('http://example.com/resource');
const finalRequest = await page.waitForRequest(request => request.url() === 'http://example.com' && request.method() === 'GET');
return firstRequest.url();
```

```js
await page.waitForRequest(request => request.url().searchParams.get('foo') === 'bar' && request.url().searchParams.get('foo2') === 'bar2');
```

## page.waitForResponse(urlOrPredicate[, options])
- `urlOrPredicate` <[string]|[RegExp]|[Function]> Request URL string, regex or predicate receiving [Response] object.
- `options` <[Object]> Optional waiting parameters
  - `timeout` <[number]> Maximum wait time in milliseconds, defaults to 30 seconds, pass `0` to disable the timeout. The default value can be changed by using the [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
- returns: <[Promise]<[Response]>> Promise which resolves to the matched response.

```js
const firstResponse = await page.waitForResponse('https://example.com/resource');
const finalResponse = await page.waitForResponse(response => response.url() === 'https://example.com' && response.status() === 200);
return finalResponse.ok();
```

## page.waitForSelector(selector[, options])
- `selector` <[string]> A selector of an element to wait for. See [working with selectors](#working-with-selectors) for more details.
- `options` <[Object]>
  - `state` <"attached"|"detached"|"visible"|"hidden"> Defaults to `'visible'`. Can be either:
    - `'attached'` - wait for element to be present in DOM.
    - `'detached'` - wait for element to not be present in DOM.
    - `'visible'` - wait for element to have non-empty bounding box and no `visibility:hidden`. Note that element without any content or with `display:none` has an empty bounding box and is not considered visible.
    - `'hidden'` - wait for element to be either detached from DOM, or have an empty bounding box or `visibility:hidden`. This is opposite to the `'visible'` option.
  - `timeout` <[number]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
- returns: <[Promise]<[null]|[ElementHandle]>> Promise which resolves when element specified by selector satisfies `state` option. Resolves to `null` if waiting for `hidden` or `detached`.

Wait for the `selector` to satisfy `state` option (either appear/disappear from dom, or become visible/hidden). If at the moment of calling the method `selector` already satisfies the condition, the method will return immediately. If the selector doesn't satisfy the condition for the `timeout` milliseconds, the function will throw.

This method works across navigations:
```js
const { chromium } = require('playwright');  // Or 'firefox' or 'webkit'.

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let currentURL;
  page
    .waitForSelector('img')
    .then(() => console.log('First URL with image: ' + currentURL));
  for (currentURL of ['https://example.com', 'https://google.com', 'https://bbc.com']) {
    await page.goto(currentURL);
  }
  await browser.close();
})();
```
Shortcut for [page.mainFrame().waitForSelector(selector[, options])](api/class-frame.md#framewaitforselectorselector-options).

## page.waitForTimeout(timeout)
- `timeout` <[number]> A timeout to wait for
- returns: <[Promise]>

Returns a promise that resolves after the timeout.

Note that `page.waitForTimeout()` should only be used for debugging. Tests using the timer in production are going to be flaky. Use signals such as network events, selectors becoming visible and others instead.

```js
// wait for 1 second
await page.waitForTimeout(1000);
```

Shortcut for [page.mainFrame().waitForTimeout(timeout)](#pagewaitfortimeouttimeout).

## page.workers()
- returns: <[Array]<[Worker]>>
This method returns all of the dedicated [WebWorkers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) associated with the page.

> **NOTE** This does not contain ServiceWorkers



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
