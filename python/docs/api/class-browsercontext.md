---
id: class-browsercontext
title: "BrowserContext"
---

* extends: [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)

BrowserContexts provide a way to operate multiple independent browser sessions.

If a page opens another page, e.g. with a `window.open` call, the popup will belong to the parent page's browser context.

Playwright allows creation of "incognito" browser contexts with `browser.newContext()` method. "Incognito" browser contexts don't write any browsing data to disk.


- [browser_context.on("close")](./api/class-browsercontext.md#browsercontextonclose)
- [browser_context.on("page")](./api/class-browsercontext.md#browsercontextonpage)
- [browser_context.add_cookies(cookies)](./api/class-browsercontext.md#browsercontextaddcookiescookies)
- [browser_context.add_init_script(**options)](./api/class-browsercontext.md#browsercontextaddinitscriptoptions)
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
- [browser_context.reset_geolocation()](./api/class-browsercontext.md#browsercontextresetgeolocation)

## browser_context.on("close")

Emitted when Browser context gets closed. This might happen because of one of the following:
* Browser context is closed.
* Browser application is closed or crashed.
* The [browser.close()](./api/class-browser.md#browserclose) method was called.

## browser_context.on("page")
- type: <[Page]>

The event is emitted when a new Page is created in the BrowserContext. The page may still be loading. The event will also fire for popup pages. See also [page.on("popup")](./api/class-page.md#pageonpopup) to receive events about popups relevant to a specific page.

The earliest moment that page is available is when it has navigated to the initial url. For example, when opening a popup with `window.open('http://example.com')`, this event will fire when the network request to "http://example.com" is done and its response has started loading in the popup.

> **NOTE** Use [page.wait_for_load_state(**options)](./api/class-page.md#pagewaitforloadstateoptions) to wait until the page gets to a particular state (you should not need it in most cases).

## browser_context.add_cookies(cookies)
- `cookies` <[List]\[[Dict]\]>
  - `name` <[str]> **required**
  - `value` <[str]> **required**
  - `url` <[str]> either url or domain / path are required. Optional.
  - `domain` <[str]> either url or domain / path are required Optional.
  - `path` <[str]> either url or domain / path are required Optional.
  - `expires` <[float]> Unix time in seconds. Optional.
  - `http_only` <[bool]> Optional.
  - `secure` <[bool]> Optional.
  - `same_site` <"Strict"|"Lax"|"None"> Optional.

Adds cookies into this browser context. All pages within this context will have these cookies installed. Cookies can be obtained via [browser_context.cookies(**options)](./api/class-browsercontext.md#browsercontextcookiesoptions).

## browser_context.add_init_script(**options)
- `path` <[Union]\[[str], [pathlib.Path]\]> Path to the JavaScript file. If `path` is a relative path, then it is resolved relative to the current working directory. Optional.
- `script` <[str]> Script to be evaluated in all pages in the browser context. Optional.

Adds a script which would be evaluated in one of the following scenarios:
* Whenever a page is created in the browser context or is navigated.
* Whenever a child frame is attached or navigated in any page in the browser context. In this case, the script is evaluated in the context of the newly attached frame.

The script is evaluated after the document was created but before any of its scripts were run. This is useful to amend the JavaScript environment, e.g. to seed `Math.random`.

An example of overriding `Math.random` before the page loads:

> **NOTE** The order of evaluation of multiple scripts installed via [browser_context.add_init_script(**options)](./api/class-browsercontext.md#browsercontextaddinitscriptoptions) and [page.add_init_script(**options)](./api/class-page.md#pageaddinitscriptoptions) is not defined.

## browser_context.browser()
- returns: <[NoneType]|[Browser]>

Returns the browser instance of the context. If it was launched as a persistent context null gets returned.

## browser_context.clear_cookies()

Clears context cookies.

## browser_context.clear_permissions()

Clears all permission overrides for the browser context.

## browser_context.close()

Closes the browser context. All the pages that belong to the browser context will be closed.

> **NOTE** the default browser context cannot be closed.

## browser_context.cookies(**options)
- `urls` <[str]|[List]\[[str]\]> Optional list of URLs.
- returns: <[List]\[[Dict]\]>
  - `name` <[str]>
  - `value` <[str]>
  - `domain` <[str]>
  - `path` <[str]>
  - `expires` <[float]> Unix time in seconds.
  - `http_only` <[bool]>
  - `secure` <[bool]>
  - `same_site` <"Strict"|"Lax"|"None">

If no URLs are specified, this method returns all cookies. If URLs are specified, only cookies that affect those URLs are returned.

## browser_context.expose_binding(name, callback, **options)
- `name` <[str]> Name of the function on the window object.
- `callback` <[Callable]> Callback function that will be called in the Playwright's context.
- `handle` <[bool]> Whether to pass the argument as a handle, instead of passing by value. When passing a handle, only one argument is supported. When passing by value, multiple arguments are supported.

The method adds a function called `name` on the `window` object of every frame in every page in the context. When called, the function executes `callback` and returns a [Promise] which resolves to the return value of `callback`. If the `callback` returns a [Promise], it will be awaited.

The first argument of the `callback` function contains information about the caller: `{ browserContext: BrowserContext, page: Page, frame: Frame }`.

See [page.expose_binding(name, callback, **options)](./api/class-page.md#pageexposebindingname-callback-options) for page-only version.

An example of exposing page URL to all frames in all pages in the context:

An example of passing an element handle:

## browser_context.expose_function(name, callback)
- `name` <[str]> Name of the function on the window object.
- `callback` <[Callable]> Callback function that will be called in the Playwright's context.

The method adds a function called `name` on the `window` object of every frame in every page in the context. When called, the function executes `callback` and returns a [Promise] which resolves to the return value of `callback`.

If the `callback` returns a [Promise], it will be awaited.

See [page.expose_function(name, callback)](./api/class-page.md#pageexposefunctionname-callback) for page-only version.

An example of adding an `md5` function to all pages in the context:

## browser_context.grant_permissions(permissions, **options)
- `permissions` <[List]\[[str]\]> A permission or an array of permissions to grant. Permissions can be one of the following values:
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
- `origin` <[str]> The [origin] to grant permissions to, e.g. "https://example.com".

Grants specified permissions to the browser context. Only grants corresponding permissions to the given origin if specified.

## browser_context.new_page()
- returns: <[Page]>

Creates a new page in the browser context.

## browser_context.pages()
- returns: <[List]\[[Page]\]>

Returns all open pages in the context. Non visible pages, such as `"background_page"`, will not be listed here. You can find them using [chromium_browser_context.background_pages()](./api/class-chromiumbrowsercontext.md#chromiumbrowsercontextbackgroundpages).

## browser_context.route(url, handler)
- `url` <[str]|[Pattern]|[Callable]\[[URL]\]:[bool]> A glob pattern, regex pattern or predicate receiving [URL] to match while routing.
- `handler` <[Callable]\[[Route], [Request]\]> handler function to route the request.

Routing provides the capability to modify network requests that are made by any page in the browser context. Once route is enabled, every request matching the url pattern will stall unless it's continued, fulfilled or aborted.

An example of a naïve handler that aborts all image requests:

or the same snippet using a regex pattern instead:

Page routes (set up with [page.route(url, handler)](./api/class-page.md#pagerouteurl-handler)) take precedence over browser context routes when request matches both handlers.

> **NOTE** Enabling routing disables http cache.

## browser_context.set_default_navigation_timeout(timeout)
- `timeout` <[float]> Maximum navigation time in milliseconds

This setting will change the default maximum navigation time for the following methods and related shortcuts:
* [page.go_back(**options)](./api/class-page.md#pagegobackoptions)
* [page.go_forward(**options)](./api/class-page.md#pagegoforwardoptions)
* [page.goto(url, **options)](./api/class-page.md#pagegotourl-options)
* [page.reload(**options)](./api/class-page.md#pagereloadoptions)
* [page.set_content(html, **options)](./api/class-page.md#pagesetcontenthtml-options)
* [page.wait_for_navigation(**options)](./api/class-page.md#pagewaitfornavigationoptions)

> **NOTE** [page.set_default_navigation_timeout(timeout)](./api/class-page.md#pagesetdefaultnavigationtimeouttimeout) and [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) take priority over [browser_context.set_default_navigation_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaultnavigationtimeouttimeout).

## browser_context.set_default_timeout(timeout)
- `timeout` <[float]> Maximum time in milliseconds

This setting will change the default maximum time for all the methods accepting `timeout` option.

> **NOTE** [page.set_default_navigation_timeout(timeout)](./api/class-page.md#pagesetdefaultnavigationtimeouttimeout), [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) and [browser_context.set_default_navigation_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaultnavigationtimeouttimeout) take priority over [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout).

## browser_context.set_extra_http_headers(headers)
- `headers` <[Dict]\[[str], [str]\]> An object containing additional HTTP headers to be sent with every request. All header values must be strings.

The extra HTTP headers will be sent with every request initiated by any page in the context. These headers are merged with page-specific extra HTTP headers set with [page.set_extra_http_headers(headers)](./api/class-page.md#pagesetextrahttpheadersheaders). If page overrides a particular header, page-specific header value will be used instead of the browser context header value.

> **NOTE** `browserContext.setExtraHTTPHeaders` does not guarantee the order of headers in the outgoing requests.

## browser_context.set_geolocation(latitude, longitude, **options)
- `latitude` <[float]> Latitude between -90 and 90. **required**
- `longitude` <[float]> Longitude between -180 and 180. **required**
- `accuracy` <[float]> Non-negative accuracy value. Defaults to `0`. Optional.

Sets the context's geolocation. Passing `null` or `undefined` emulates position unavailable.

> **NOTE** Consider using [browser_context.grant_permissions(permissions, **options)](./api/class-browsercontext.md#browsercontextgrantpermissionspermissions-options) to grant permissions for the browser context pages to read its geolocation.

## browser_context.set_http_credentials(http_credentials)
- `http_credentials` <[NoneType]|[Dict]>
  - `username` <[str]> **required**
  - `password` <[str]> **required**

**DEPRECATED** Browsers may cache credentials after successful authentication. Create a new browser context instead.

## browser_context.set_offline(offline)
- `offline` <[bool]> Whether to emulate network being offline for the browser context.

## browser_context.storage_state(**options)
- `path` <[Union]\[[str], [pathlib.Path]\]> The file path to save the storage state to. If `path` is a relative path, then it is resolved relative to [current working directory](https://nodejs.org/api/process.html#process_process_cwd). If no path is provided, storage state is still returned, but won't be saved to the disk.
- returns: <[Dict]>
  - `cookies` <[List]\[[Dict]\]>
    - `name` <[str]>
    - `value` <[str]>
    - `domain` <[str]>
    - `path` <[str]>
    - `expires` <[float]> Unix time in seconds.
    - `http_only` <[bool]>
    - `secure` <[bool]>
    - `same_site` <"Strict"|"Lax"|"None">
  - `origins` <[List]\[[Dict]\]>
    - `origin` <[str]>
    - `local_storage` <[List]\[[Dict]\]>
      - `name` <[str]>
      - `value` <[str]>

Returns storage state for this browser context, contains current cookies and local storage snapshot.

## browser_context.unroute(url, **options)
- `url` <[str]|[Pattern]|[Callable]\[[URL]\]:[bool]> A glob pattern, regex pattern or predicate receiving [URL] used to register a routing with [browser_context.route(url, handler)](./api/class-browsercontext.md#browsercontextrouteurl-handler).
- `handler` <[Callable]\[[Route], [Request]\]> Optional handler function used to register a routing with [browser_context.route(url, handler)](./api/class-browsercontext.md#browsercontextrouteurl-handler).

Removes a route created with [browser_context.route(url, handler)](./api/class-browsercontext.md#browsercontextrouteurl-handler). When `handler` is not specified, removes all routes for the `url`.

## browser_context.wait_for_event(event, predicate, **options)
- `event` <[str]> Event name, same one would pass into `browserContext.on(event)`.
- `predicate` <[Function]> receives the event data and resolves to truthy value when the waiting should resolve.
- `timeout` <[float]> maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout).
- returns: <[Any]>

Waits for event to fire and passes its value into the predicate function. Returns when the predicate returns truthy value. Will throw an error if the context closes before the event is fired. Returns the event data value.

## browser_context.reset_geolocation()

Emulates position unavailable state.

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