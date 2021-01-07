---
id: class-browsercontext
title: "BrowserContext"
---

* extends: [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)

BrowserContexts provide a way to operate multiple independent browser sessions.

If a page opens another page, e.g. with a `window.open` call, the popup will belong to the parent page's browser context.

Playwright allows creation of "incognito" browser contexts with `browser.newContext()` method. "Incognito" browser contexts don't write any browsing data to disk.

```js
// Create a new incognito browser context
const context = await browser.newContext();
// Create a new page inside context.
const page = await context.newPage();
await page.goto('https://example.com');
// Dispose context once it's no longer needed.
await context.close();
```


- [browser_context.on("close")](./api/class-browsercontext.md#browsercontextonclose)
- [browser_context.on("page")](./api/class-browsercontext.md#browsercontextonpage)
- [browser_context.add_cookies(cookies)](./api/class-browsercontext.md#browsercontextaddcookiescookies)
- [browser_context.add_init_script(script, **options)](./api/class-browsercontext.md#browsercontextaddinitscriptscript-options)
- [browser_context.browser()](./api/class-browsercontext.md#browsercontextbrowser)
- [browser_context.clear_cookies()](./api/class-browsercontext.md#browsercontextclearcookies)
- [browser_context.clear_permissions()](./api/class-browsercontext.md#browsercontextclearpermissions)
- [browser_context.close()](./api/class-browsercontext.md#browsercontextclose)
- [browser_context.cookies(**options)](./api/class-browsercontext.md#browsercontextcookiesoptions)
- [browser_context.expose_binding(name, callback, **options)](./api/class-browsercontext.md#browsercontextexposebindingname-callback-options)
- [browser_context.expose_function(name, callback)](./api/class-browsercontext.md#browsercontextexposefunctionname-callback)
- [browser_context.grant_permissions(permissions, **options)](./api/class-browsercontext.md#browsercontextgrantpermissionspermissions-options)
- [browser_context.new_page()](./api/class-browsercontext.md#browsercontextnewpage)
- [browser_context.pages()](./api/class-browsercontext.md#browsercontextpages)
- [browser_context.route(url, handler)](./api/class-browsercontext.md#browsercontextrouteurl-handler)
- [browser_context.set_default_navigation_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaultnavigationtimeouttimeout)
- [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout)
- [browser_context.set_extra_http_headers(headers)](./api/class-browsercontext.md#browsercontextsetextrahttpheadersheaders)
- [browser_context.set_geolocation(latitude, longitude, **options)](./api/class-browsercontext.md#browsercontextsetgeolocationlatitude-longitude-options)
- [browser_context.set_http_credentials(http_credentials)](./api/class-browsercontext.md#browsercontextsethttpcredentialshttpcredentials)
- [browser_context.set_offline(offline)](./api/class-browsercontext.md#browsercontextsetofflineoffline)
- [browser_context.storage_state(**options)](./api/class-browsercontext.md#browsercontextstoragestateoptions)
- [browser_context.unroute(url, **options)](./api/class-browsercontext.md#browsercontextunrouteurl-options)
- [browser_context.wait_for_event(event, predicate, **options)](./api/class-browsercontext.md#browsercontextwaitforeventevent-predicate-options)

## browser_context.on("close")

Emitted when Browser context gets closed. This might happen because of one of the following:
* Browser context is closed.
* Browser application is closed or crashed.
* The [browser.close()](./api/class-browser.md#browserclose) method was called.

## browser_context.on("page")
- type: <[Page]>

The event is emitted when a new Page is created in the BrowserContext. The page may still be loading. The event will also fire for popup pages. See also [page.on("popup")](./api/class-page.md#pageonpopup) to receive events about popups relevant to a specific page.

The earliest moment that page is available is when it has navigated to the initial url. For example, when opening a popup with `window.open('http://example.com')`, this event will fire when the network request to "http://example.com" is done and its response has started loading in the popup.

```js
const [page] = await Promise.all([
  context.waitForEvent('page'),
  page.click('a[target=_blank]'),
]);
console.log(await page.evaluate('location.href'));
```

> **NOTE** Use [page.wait_for_load_state(**options)](./api/class-page.md#pagewaitforloadstateoptions) to wait until the page gets to a particular state (you should not need it in most cases).

## browser_context.add_cookies(cookies)
- `cookies` <[Array]<[Object]>>
  - `name` <[string]> **required**
  - `value` <[string]> **required**
  - `url` <[string]> either url or domain / path are required. Optional.
  - `domain` <[string]> either url or domain / path are required Optional.
  - `path` <[string]> either url or domain / path are required Optional.
  - `expires` <[number]> Unix time in seconds. Optional.
  - `http_only` <[boolean]> Optional.
  - `secure` <[boolean]> Optional.
  - `same_site` <"Strict"|"Lax"|"None"> Optional.
- returns: <[Promise]>

Adds cookies into this browser context. All pages within this context will have these cookies installed. Cookies can be obtained via [browser_context.cookies(**options)](./api/class-browsercontext.md#browsercontextcookiesoptions).

```js
await browserContext.addCookies([cookieObject1, cookieObject2]);
```

## browser_context.add_init_script(script, **options)
- `script` <[function]|[string]|[Object]> Script to be evaluated in all pages in the browser context.
  - `path` <[string]> Path to the JavaScript file. If `path` is a relative path, then it is resolved relative to the current working directory. Optional.
  - `content` <[string]> Raw script content. Optional.
- `arg` <[Serializable]> Optional argument to pass to `script` (only supported when passing a function).
- returns: <[Promise]>

Adds a script which would be evaluated in one of the following scenarios:
* Whenever a page is created in the browser context or is navigated.
* Whenever a child frame is attached or navigated in any page in the browser context. In this case, the script is evaluated in the context of the newly attached frame.

The script is evaluated after the document was created but before any of its scripts were run. This is useful to amend the JavaScript environment, e.g. to seed `Math.random`.

An example of overriding `Math.random` before the page loads:

```js
// preload.js
Math.random = () => 42;
```

```js
// In your playwright script, assuming the preload.js file is in same directory.
await browserContext.addInitScript({
  path: 'preload.js'
});
```

> **NOTE** The order of evaluation of multiple scripts installed via [browser_context.add_init_script(script, **options)](./api/class-browsercontext.md#browsercontextaddinitscriptscript-options) and [page.add_init_script(script, **options)](./api/class-page.md#pageaddinitscriptscript-options) is not defined.

## browser_context.browser()
- returns: <[null]|[Browser]>

Returns the browser instance of the context. If it was launched as a persistent context null gets returned.

## browser_context.clear_cookies()
- returns: <[Promise]>

Clears context cookies.

## browser_context.clear_permissions()
- returns: <[Promise]>

Clears all permission overrides for the browser context.

```js
const context = await browser.newContext();
await context.grantPermissions(['clipboard-read']);
// do stuff ..
context.clearPermissions();
```

## browser_context.close()
- returns: <[Promise]>

Closes the browser context. All the pages that belong to the browser context will be closed.

> **NOTE** the default browser context cannot be closed.

## browser_context.cookies(**options)
- `urls` <[string]|[Array]<[string]>> Optional list of URLs.
- returns: <[Promise]<[Array]<[Object]>>>
  - `name` <[string]>
  - `value` <[string]>
  - `domain` <[string]>
  - `path` <[string]>
  - `expires` <[number]> Unix time in seconds.
  - `http_only` <[boolean]>
  - `secure` <[boolean]>
  - `same_site` <"Strict"|"Lax"|"None">

If no URLs are specified, this method returns all cookies. If URLs are specified, only cookies that affect those URLs are returned.

## browser_context.expose_binding(name, callback, **options)
- `name` <[string]> Name of the function on the window object.
- `callback` <[function]> Callback function that will be called in the Playwright's context.
- `handle` <[boolean]> Whether to pass the argument as a handle, instead of passing by value. When passing a handle, only one argument is supported. When passing by value, multiple arguments are supported.
- returns: <[Promise]>

The method adds a function called `name` on the `window` object of every frame in every page in the context. When called, the function executes `callback` and returns a [Promise] which resolves to the return value of `callback`. If the `callback` returns a [Promise], it will be awaited.

The first argument of the `callback` function contains information about the caller: `{ browserContext: BrowserContext, page: Page, frame: Frame }`.

See [page.expose_binding(name, callback, **options)](./api/class-page.md#pageexposebindingname-callback-options) for page-only version.

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

An example of passing an element handle:

```js
await context.exposeBinding('clicked', async (source, element) => {
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

## browser_context.expose_function(name, callback)
- `name` <[string]> Name of the function on the window object.
- `callback` <[function]> Callback function that will be called in the Playwright's context.
- returns: <[Promise]>

The method adds a function called `name` on the `window` object of every frame in every page in the context. When called, the function executes `callback` and returns a [Promise] which resolves to the return value of `callback`.

If the `callback` returns a [Promise], it will be awaited.

See [page.expose_function(name, callback)](./api/class-page.md#pageexposefunctionname-callback) for page-only version.

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

## browser_context.grant_permissions(permissions, **options)
- `permissions` <[Array]<[string]>> A permission or an array of permissions to grant. Permissions can be one of the following values:
  * `'geolocation'`
  * `'midi'`
  * `'midi-sysex'` (system-exclusive midi)
  * `'notifications'`
  * `'push'`
  * `'camera'`
  * `'microphone'`
  * `'background-sync'`
  * `'ambient-light-sensor'`
  * `'accelerometer'`
  * `'gyroscope'`
  * `'magnetometer'`
  * `'accessibility-events'`
  * `'clipboard-read'`
  * `'clipboard-write'`
  * `'payment-handler'`
- `origin` <[string]> The [origin] to grant permissions to, e.g. "https://example.com".
- returns: <[Promise]>

Grants specified permissions to the browser context. Only grants corresponding permissions to the given origin if specified.

## browser_context.new_page()
- returns: <[Promise]<[Page]>>

Creates a new page in the browser context.

## browser_context.pages()
- returns: <[Array]<[Page]>>

Returns all open pages in the context. Non visible pages, such as `"background_page"`, will not be listed here. You can find them using [chromium_browser_context.background_pages()](./api/class-chromiumbrowsercontext.md#chromiumbrowsercontextbackgroundpages).

## browser_context.route(url, handler)
- `url` <[string]|[RegExp]|[function]\([URL]\):[boolean]> A glob pattern, regex pattern or predicate receiving [URL] to match while routing.
- `handler` <[function]\([Route], [Request]\)> handler function to route the request.
- returns: <[Promise]>

Routing provides the capability to modify network requests that are made by any page in the browser context. Once route is enabled, every request matching the url pattern will stall unless it's continued, fulfilled or aborted.

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

Page routes (set up with [page.route(url, handler)](./api/class-page.md#pagerouteurl-handler)) take precedence over browser context routes when request matches both handlers.

> **NOTE** Enabling routing disables http cache.

## browser_context.set_default_navigation_timeout(timeout)
- `timeout` <[number]> Maximum navigation time in milliseconds

This setting will change the default maximum navigation time for the following methods and related shortcuts:
* [page.go_back(**options)](./api/class-page.md#pagegobackoptions)
* [page.go_forward(**options)](./api/class-page.md#pagegoforwardoptions)
* [page.goto(url, **options)](./api/class-page.md#pagegotourl-options)
* [page.reload(**options)](./api/class-page.md#pagereloadoptions)
* [page.set_content(html, **options)](./api/class-page.md#pagesetcontenthtml-options)
* [page.wait_for_navigation(**options)](./api/class-page.md#pagewaitfornavigationoptions)

> **NOTE** [page.set_default_navigation_timeout(timeout)](./api/class-page.md#pagesetdefaultnavigationtimeouttimeout) and [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) take priority over [browser_context.set_default_navigation_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaultnavigationtimeouttimeout).

## browser_context.set_default_timeout(timeout)
- `timeout` <[number]> Maximum time in milliseconds

This setting will change the default maximum time for all the methods accepting `timeout` option.

> **NOTE** [page.set_default_navigation_timeout(timeout)](./api/class-page.md#pagesetdefaultnavigationtimeouttimeout), [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) and [browser_context.set_default_navigation_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaultnavigationtimeouttimeout) take priority over [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout).

## browser_context.set_extra_http_headers(headers)
- `headers` <[Object]<[string], [string]>> An object containing additional HTTP headers to be sent with every request. All header values must be strings.
- returns: <[Promise]>

The extra HTTP headers will be sent with every request initiated by any page in the context. These headers are merged with page-specific extra HTTP headers set with [page.set_extra_http_headers(headers)](./api/class-page.md#pagesetextrahttpheadersheaders). If page overrides a particular header, page-specific header value will be used instead of the browser context header value.

> **NOTE** `browserContext.setExtraHTTPHeaders` does not guarantee the order of headers in the outgoing requests.

## browser_context.set_geolocation(latitude, longitude, **options)
- `latitude` <[number]> Latitude between -90 and 90. **required**
- `longitude` <[number]> Longitude between -180 and 180. **required**
- `accuracy` <[number]> Non-negative accuracy value. Defaults to `0`.
- returns: <[Promise]>

Sets the context's geolocation. Passing `null` or `undefined` emulates position unavailable.

```js
await browserContext.setGeolocation({latitude: 59.95, longitude: 30.31667});
```

> **NOTE** Consider using [browser_context.grant_permissions(permissions, **options)](./api/class-browsercontext.md#browsercontextgrantpermissionspermissions-options) to grant permissions for the browser context pages to read its geolocation.

## browser_context.set_http_credentials(http_credentials)
- `http_credentials` <[null]|[Object]>
  - `username` <[string]> **required**
  - `password` <[string]> **required**
- returns: <[Promise]>

**DEPRECATED** Browsers may cache credentials after successful authentication. Create a new browser context instead.

## browser_context.set_offline(offline)
- `offline` <[boolean]> Whether to emulate network being offline for the browser context.
- returns: <[Promise]>

## browser_context.storage_state(**options)
- `path` <[string]> The file path to save the storage state to. If `path` is a relative path, then it is resolved relative to [current working directory](https://nodejs.org/api/process.html#process_process_cwd). If no path is provided, storage state is still returned, but won't be saved to the disk.
- returns: <[Promise]<[Object]>>
  - `cookies` <[Array]<[Object]>>
    - `name` <[string]>
    - `value` <[string]>
    - `domain` <[string]>
    - `path` <[string]>
    - `expires` <[number]> Unix time in seconds.
    - `http_only` <[boolean]>
    - `secure` <[boolean]>
    - `same_site` <"Strict"|"Lax"|"None">
  - `origins` <[Array]<[Object]>>
    - `origin` <[string]>
    - `local_storage` <[Array]<[Object]>>
      - `name` <[string]>
      - `value` <[string]>

Returns storage state for this browser context, contains current cookies and local storage snapshot.

## browser_context.unroute(url, **options)
- `url` <[string]|[RegExp]|[function]\([URL]\):[boolean]> A glob pattern, regex pattern or predicate receiving [URL] used to register a routing with [browser_context.route(url, handler)](./api/class-browsercontext.md#browsercontextrouteurl-handler).
- `handler` <[function]\([Route], [Request]\)> Optional handler function used to register a routing with [browser_context.route(url, handler)](./api/class-browsercontext.md#browsercontextrouteurl-handler).
- returns: <[Promise]>

Removes a route created with [browser_context.route(url, handler)](./api/class-browsercontext.md#browsercontextrouteurl-handler). When `handler` is not specified, removes all routes for the `url`.

## browser_context.wait_for_event(event, predicate, **options)
- `event` <[string]> Event name, same one would pass into `browserContext.on(event)`.
- `predicate` <[Function]> receives the event data and resolves to truthy value when the waiting should resolve.
- `timeout` <[number]> maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout).
- returns: <[Promise]<[Object]>>

Waits for event to fire and passes its value into the predicate function. Returns when the predicate returns truthy value. Will throw an error if the context closes before the event is fired. Returns the event data value.

```js
const context = await browser.newContext();
await context.grantPermissions(['geolocation']);
```


[Accessibility]: ./api/class-accessibility.md "Accessibility"
[Browser]: ./api/class-browser.md "Browser"
[BrowserContext]: ./api/class-browsercontext.md "BrowserContext"
[BrowserServer]: ./api/class-browserserver.md "BrowserServer"
[BrowserType]: ./api/class-browsertype.md "BrowserType"
[CDPSession]: ./api/class-cdpsession.md "CDPSession"
[ChromiumBrowser]: ./api/class-chromiumbrowser.md "ChromiumBrowser"
[ChromiumBrowserContext]: ./api/class-chromiumbrowsercontext.md "ChromiumBrowserContext"
[ChromiumCoverage]: ./api/class-chromiumcoverage.md "ChromiumCoverage"
[ConsoleMessage]: ./api/class-consolemessage.md "ConsoleMessage"
[Dialog]: ./api/class-dialog.md "Dialog"
[Download]: ./api/class-download.md "Download"
[ElementHandle]: ./api/class-elementhandle.md "ElementHandle"
[FileChooser]: ./api/class-filechooser.md "FileChooser"
[FirefoxBrowser]: ./api/class-firefoxbrowser.md "FirefoxBrowser"
[Frame]: ./api/class-frame.md "Frame"
[JSHandle]: ./api/class-jshandle.md "JSHandle"
[Keyboard]: ./api/class-keyboard.md "Keyboard"
[Logger]: ./api/class-logger.md "Logger"
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
[Array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array "Array"
[Buffer]: https://nodejs.org/api/buffer.html#buffer_class_buffer "Buffer"
[ChildProcess]: https://nodejs.org/api/child_process.html "ChildProcess"
[Element]: https://developer.mozilla.org/en-US/docs/Web/API/element "Element"
[Error]: https://nodejs.org/api/errors.html#errors_class_error "Error"
[Evaluation Argument]: ./core-concepts.md#evaluationargument "Evaluation Argument"
[Map]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map "Map"
[Object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object "Object"
[Promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise "Promise"
[RegExp]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp "RegExp"
[Serializable]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Description "Serializable"
[UIEvent.detail]: https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail "UIEvent.detail"
[URL]: https://nodejs.org/api/url.html "URL"
[USKeyboardLayout]: ../src/usKeyboardLayout.ts "USKeyboardLayout"
[UnixTime]: https://en.wikipedia.org/wiki/Unix_time "Unix Time"
[boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type "Boolean"
[function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function "Function"
[iterator]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols "Iterator"
[null]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null "null"
[number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type "Number"
[origin]: https://developer.mozilla.org/en-US/docs/Glossary/Origin "Origin"
[selector]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors "selector"
[Readable]: https://nodejs.org/api/stream.html#stream_class_stream_readable "Readable"
[string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type "string"
[xpath]: https://developer.mozilla.org/en-US/docs/Web/XPath "xpath"
