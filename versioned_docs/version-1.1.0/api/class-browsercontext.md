---
id: class-browsercontext
title: "class: BrowserContext"
---


* extends: [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)

BrowserContexts provide a way to operate multiple independent browser sessions.

If a page opens another page, e.g. with a `window.open` call, the popup will belong to the parent page's browser
context.

Playwright allows creation of "incognito" browser contexts with `browser.newContext()` method.
"Incognito" browser contexts don't write any browsing data to disk.

```js
// Create a new incognito browser context
const context = await browser.newContext();
// Create a new page inside context.
const page = await context.newPage();
await page.goto('https://example.com');
// Dispose context once it's no longer needed.
await context.close();
```

<!-- GEN:toc -->
- [event: 'close'](api/class-browserserver.md#event-close)
- [event: 'page'](api/class-browsercontext.md#event-page)
- [browserContext.addCookies(cookies)](api/class-browsercontext.md#browsercontextaddcookiescookies)
- [browserContext.addInitScript(script[, arg])](api/class-browsercontext.md#browsercontextaddinitscriptscript-arg)
- [browserContext.clearCookies()](api/class-browsercontext.md#browsercontextclearcookies)
- [browserContext.clearPermissions()](api/class-browsercontext.md#browsercontextclearpermissions)
- [browserContext.close()](api/class-browsercontext.md#browsercontextclose)
- [browserContext.cookies([urls])](api/class-browsercontext.md#browsercontextcookiesurls)
- [browserContext.exposeBinding(name, playwrightBinding)](api/class-browsercontext.md#browsercontextexposebindingname-playwrightbinding)
- [browserContext.exposeFunction(name, playwrightFunction)](api/class-browsercontext.md#browsercontextexposefunctionname-playwrightfunction)
- [browserContext.grantPermissions(permissions[][, options])](api/class-browsercontext.md#browsercontextgrantpermissionspermissions-options)
- [browserContext.newPage()](api/class-browsercontext.md#browsercontextnewpage)
- [browserContext.pages()](api/class-browsercontext.md#browsercontextpages)
- [browserContext.route(url, handler)](api/class-browsercontext.md#browsercontextrouteurl-handler)
- [browserContext.setDefaultNavigationTimeout(timeout)](api/class-browsercontext.md#browsercontextsetdefaultnavigationtimeouttimeout)
- [browserContext.setDefaultTimeout(timeout)](api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout)
- [browserContext.setExtraHTTPHeaders(headers)](api/class-browsercontext.md#browsercontextsetextrahttpheadersheaders)
- [browserContext.setGeolocation(geolocation)](api/class-browsercontext.md#browsercontextsetgeolocationgeolocation)
- [browserContext.setHTTPCredentials(httpCredentials)](api/class-browsercontext.md#browsercontextsethttpcredentialshttpcredentials)
- [browserContext.setOffline(offline)](api/class-browsercontext.md#browsercontextsetofflineoffline)
- [browserContext.unroute(url[, handler])](api/class-browsercontext.md#browsercontextunrouteurl-handler)
- [browserContext.waitForEvent(event[, optionsOrPredicate])](api/class-browsercontext.md#browsercontextwaitforeventevent-optionsorpredicate)
<!-- GEN:stop -->

## event: 'close'

Emitted when Browser context gets closed. This might happen because of one of the following:
- Browser context is closed.
- Browser application is closed or crashed.
- The [`browser.close`](api/class-browser.md#browserclose) method was called.

## event: 'page'
- <[Page]>

The event is emitted when a new Page is created in the BrowserContext. The page may still be loading. The event will also fire for popup pages. See also [`Page.on('popup')`](api/class-page.md#event-popup) to receive events about popups relevant to a specific page.

The earliest moment that page is available is when it has navigated to the initial url. For example, when opening a popup with `window.open('http://example.com')`, this event will fire when the network request to "http://example.com" is done and its response has started loading in the popup.

```js
const [page] = await Promise.all([
  context.waitForEvent('page'),
  page.click('a[target=_blank]'),
]);
console.log(await page.evaluate('location.href'));
```

> **NOTE** Use [`page.waitForLoadState([state[, options]])`](api/class-page.md#pagewaitforloadstatestate-options) to wait until the page gets to a particular state (you should not need it in most cases).

## browserContext.addCookies(cookies)
- `cookies` <[Array]<[Object]>>
  - `name` <[string]> **required**
  - `value` <[string]> **required**
  - `url` <[string]> either url or domain / path are required
  - `domain` <[string]> either url or domain / path are required
  - `path` <[string]> either url or domain / path are required
  - `expires` <[number]> Unix time in seconds.
  - `httpOnly` <[boolean]>
  - `secure` <[boolean]>
  - `sameSite` <"Strict"|"Lax"|"None">
- returns: <[Promise]>

```js
await browserContext.addCookies([cookieObject1, cookieObject2]);
```

## browserContext.addInitScript(script[, arg])
- `script` <[function]|[string]|[Object]> Script to be evaluated in all pages in the browser context.
  - `path` <[string]> Path to the JavaScript file. If `path` is a relative path, then it is resolved relative to [current working directory](https://nodejs.org/api/process.html#process_process_cwd).
  - `content` <[string]> Raw script content.
- `arg` <[Serializable]> Optional argument to pass to `script` (only supported when passing a function).
- returns: <[Promise]>

Adds a script which would be evaluated in one of the following scenarios:
- Whenever a page is created in the browser context or is navigated.
- Whenever a child frame is attached or navigated in any page in the browser context. In this case, the script is evaluated in the context of the newly attached frame.

The script is evaluated after the document was created but before any of its scripts were run. This is useful to amend  the JavaScript environment, e.g. to seed `Math.random`.

An example of overriding `Math.random` before the page loads:

```js
// preload.js
Math.random = () => 42;
```

```js
// In your playwright script, assuming the preload.js file is in same folder.
await browserContext.addInitScript({
  path: 'preload.js'
});
```

> **NOTE** The order of evaluation of multiple scripts installed via [browserContext.addInitScript(script[, arg])](#browsercontextaddinitscriptscript-arg) and [page.addInitScript(script[, arg])](api/class-page.md#pageaddinitscriptscript-arg) is not defined.
## browserContext.clearCookies()
- returns: <[Promise]>

Clears context cookies.

## browserContext.clearPermissions()
- returns: <[Promise]>

Clears all permission overrides for the browser context.

```js
const context = await browser.newContext();
await context.grantPermissions(['clipboard-read']);
// do stuff ..
context.clearPermissions();
```

## browserContext.close()
- returns: <[Promise]>

Closes the browser context. All the pages that belong to the browser context
will be closed.

> **NOTE** the default browser context cannot be closed.

## browserContext.cookies([urls])
- `urls` <[string]|[Array]<[string]>>
- returns: <[Promise]<[Array]<[Object]>>>
  - `name` <[string]>
  - `value` <[string]>
  - `domain` <[string]>
  - `path` <[string]>
  - `expires` <[number]> Unix time in seconds.
  - `httpOnly` <[boolean]>
  - `secure` <[boolean]>
  - `sameSite` <"Strict"|"Lax"|"None">

If no URLs are specified, this method returns all cookies.
If URLs are specified, only cookies that affect those URLs are returned.

## browserContext.exposeBinding(name, playwrightBinding)
- `name` <[string]> Name of the function on the window object.
- `playwrightBinding` <[function]> Callback function that will be called in the Playwright's context.
- returns: <[Promise]>

The method adds a function called `name` on the `window` object of every frame in every page in the context.
When called, the function executes `playwrightBinding` in Node.js and returns a [Promise] which resolves to the return value of `playwrightBinding`.
If the `playwrightBinding` returns a [Promise], it will be awaited.

The first argument of the `playwrightBinding` function contains information about the caller:
`{ browserContext: BrowserContext, page: Page, frame: Frame }`.

See [page.exposeBinding(name, playwrightBinding)](api/class-page.md#pageexposebindingname-playwrightbinding) for page-only version.

An example of exposing page URL to all frames in all pages in the context:
```js
const { webkit } = require('playwright');  // Or 'chromium' or 'firefox'.

(async () => {
  const browser = await webkit.launch({ headless: false });
  const context = await browser.newContext();
  await context.exposeBinding('pageURL', ({ page }) => page.url());
  const page = await context.newPage();
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

## browserContext.exposeFunction(name, playwrightFunction)
- `name` <[string]> Name of the function on the window object.
- `playwrightFunction` <[function]> Callback function that will be called in the Playwright's context.
- returns: <[Promise]>

The method adds a function called `name` on the `window` object of every frame in every page in the context.
When called, the function executes `playwrightFunction` in Node.js and returns a [Promise] which resolves to the return value of `playwrightFunction`.

If the `playwrightFunction` returns a [Promise], it will be awaited.

See [page.exposeFunction(name, playwrightFunction)](api/class-page.md#pageexposefunctionname-playwrightfunction) for page-only version.

An example of adding an `md5` function to all pages in the context:
```js
const { webkit } = require('playwright');  // Or 'chromium' or 'firefox'.
const crypto = require('crypto');

(async () => {
  const browser = await webkit.launch({ headless: false });
  const context = await browser.newContext();
  await context.exposeFunction('md5', text => crypto.createHash('md5').update(text).digest('hex'));
  const page = await context.newPage();
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

## browserContext.grantPermissions(permissions[][, options])
- `permissions` <[Array]<[string]>> A permission or an array of permissions to grant. Permissions can be one of the following values:
    - `'*'`
    - `'geolocation'`
    - `'midi'`
    - `'midi-sysex'` (system-exclusive midi)
    - `'notifications'`
    - `'push'`
    - `'camera'`
    - `'microphone'`
    - `'background-sync'`
    - `'ambient-light-sensor'`
    - `'accelerometer'`
    - `'gyroscope'`
    - `'magnetometer'`
    - `'accessibility-events'`
    - `'clipboard-read'`
    - `'clipboard-write'`
    - `'payment-handler'`
- `options` <[Object]>
  - `origin` <[string]> The [origin] to grant permissions to, e.g. "https://example.com".
- returns: <[Promise]>

Grants specified permissions to the browser context. Only grants corresponding permissions to the given origin if specified.

## browserContext.newPage()
- returns: <[Promise]<[Page]>>

Creates a new page in the browser context.

## browserContext.pages()
- returns: <[Array]<[Page]>> All open pages in the context. Non visible pages, such as `"background_page"`, will not be listed here. You can find them using [chromiumBrowserContext.backgroundPages()](api/class-chromiumbrowsercontext.md#chromiumbrowsercontextbackgroundpages).

## browserContext.route(url, handler)
- `url` <[string]|[RegExp]|[function]\([URL]\):[boolean]> A glob pattern, regex pattern or predicate receiving [URL] to match while routing.
- `handler` <[function]\([Route], [Request]\)> handler function to route the request.
- returns: <[Promise]>

Routing provides the capability to modify network requests that are made by any page in the browser context.
Once route is enabled, every request matching the url pattern will stall unless it's continued, fulfilled or aborted.

An example of a naïve handler that aborts all image requests:

```js
const context = await browser.newContext();
await context.route('**/*.{png,jpg,jpeg}', route => route.abort());
const page = await context.newPage();
await page.goto('https://example.com');
await browser.close();
```

or the same snippet using a regex pattern instead:

```js
const context = await browser.newContext();
await context.route(/(\.png$)|(\.jpg$)/, route => route.abort());
const page = await context.newPage();
await page.goto('https://example.com');
await browser.close();
```

Page routes (set up with [page.route(url, handler)](api/class-page.md#pagerouteurl-handler)) take precedence over browser context routes when request matches both handlers.

> **NOTE** Enabling routing disables http cache.

## browserContext.setDefaultNavigationTimeout(timeout)
- `timeout` <[number]> Maximum navigation time in milliseconds

This setting will change the default maximum navigation time for the following methods and related shortcuts:
- [page.goBack([options])](api/class-page.md#pagegobackoptions)
- [page.goForward([options])](api/class-page.md#pagegoforwardoptions)
- [page.goto(url[, options])](api/class-page.md#pagegotourl-options)
- [page.reload([options])](api/class-page.md#pagereloadoptions)
- [page.setContent(html[, options])](api/class-page.md#pagesetcontenthtml-options)
- [page.waitForNavigation([options])](api/class-page.md#pagewaitfornavigationoptions)

> **NOTE** [`page.setDefaultNavigationTimeout`](api/class-page.md#pagesetdefaultnavigationtimeouttimeout) and [`page.setDefaultTimeout`](api/class-page.md#pagesetdefaulttimeouttimeout) take priority over [`browserContext.setDefaultNavigationTimeout`](#browsercontextsetdefaultnavigationtimeouttimeout).

## browserContext.setDefaultTimeout(timeout)
- `timeout` <[number]> Maximum time in milliseconds

This setting will change the default maximum time for all the methods accepting `timeout` option.

> **NOTE** [`page.setDefaultNavigationTimeout`](#pagesetdefaultnavigationtimeouttimeout), [`page.setDefaultTimeout`](#pagesetdefaulttimeouttimeout) and [`browserContext.setDefaultNavigationTimeout`](#browsercontextsetdefaultnavigationtimeouttimeout) take priority over [`browserContext.setDefaultTimeout`](#browsercontextsetdefaulttimeouttimeout).

## browserContext.setExtraHTTPHeaders(headers)
- `headers` <[Object]<[string], [string]>> An object containing additional HTTP headers to be sent with every request. All header values must be strings.
- returns: <[Promise]>

The extra HTTP headers will be sent with every request initiated by any page in the context. These headers are merged with page-specific extra HTTP headers set with [page.setExtraHTTPHeaders()](api/class-page.md#pagesetextrahttpheadersheaders). If page overrides a particular header, page-specific header value will be used instead of the browser context header value.

> **NOTE** `browserContext.setExtraHTTPHeaders` does not guarantee the order of headers in the outgoing requests.

## browserContext.setGeolocation(geolocation)
- `geolocation` <?[Object]>
  - `latitude` <[number]> Latitude between -90 and 90. **required**
  - `longitude` <[number]> Longitude between -180 and 180. **required**
  - `accuracy` <[number]> Non-negative accuracy value. Defaults to `0`.
- returns: <[Promise]>

Sets the contexts's geolocation. Passing `null` or `undefined` emulates position unavailable.

```js
await browserContext.setGeolocation({latitude: 59.95, longitude: 30.31667});
```

> **NOTE** Consider using [browserContext.grantPermissions](#browsercontextgrantpermissionspermissions-options) to grant permissions for the browser context pages to read its geolocation.

## browserContext.setHTTPCredentials(httpCredentials)
- `httpCredentials` <?[Object]>
  - `username` <[string]> **required**
  - `password` <[string]> **required**
- returns: <[Promise]>

Provide credentials for [HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication).

> **NOTE** Browsers may cache credentials that resulted in successful auth. That means passing different credentials after successful authentication or passing `null` to disable authentication is unreliable. Instead, create a separate browser context that will not have previous credentials cached.

## browserContext.setOffline(offline)
- `offline` <[boolean]> Whether to emulate network being offline for the browser context.
- returns: <[Promise]>

## browserContext.unroute(url[, handler])
- `url` <[string]|[RegExp]|[function]\([URL]\):[boolean]> A glob pattern, regex pattern or predicate receiving [URL] to match while routing.
- `handler` <[function]\([Route], [Request]\)> Handler function to route the request.
- returns: <[Promise]>

Removes a route created with [browserContext.route(url, handler)](#browsercontextrouteurl-handler). When `handler` is not specified, removes all routes for the `url`.

## browserContext.waitForEvent(event[, optionsOrPredicate])
- `event` <[string]> Event name, same one would pass into `browserContext.on(event)`.
- `optionsOrPredicate` <[Function]|[Object]> Either a predicate that receives an event or an options object.
  - `predicate` <[Function]> receives the event data and resolves to truthy value when the waiting should resolve.
  - `timeout` <[number]> maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultTimeout(timeout)](#browsercontextsetdefaulttimeouttimeout).
- returns: <[Promise]<[Object]>> Promise which resolves to the event data value.

Waits for event to fire and passes its value into the predicate function. Resolves when the predicate returns truthy value. Will throw an error if the context closes before the event
is fired.

```js
const context = await browser.newContext();
await context.grantPermissions(['geolocation']);
```



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
