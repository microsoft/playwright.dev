---
id: class-browser
title: "class: Browser"
---


* extends: [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)

A Browser is created when Playwright connects to a browser instance, either through [`browserType.launch`](api/class-browsertype.md#browsertypelaunchoptions) or [`browserType.connect`](api/class-browsertype.md#browsertypeconnectoptions).

An example of using a [Browser] to create a [Page]:
```js
const { firefox } = require('playwright');  // Or 'chromium' or 'webkit'.

(async () => {
  const browser = await firefox.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await browser.close();
})();
```

See [ChromiumBrowser], [FirefoxBrowser] and [WebKitBrowser] for browser-specific features. Note that [browserType.connect(options)](#browsertypeconnectoptions) and [browserType.launch([options])](#browsertypelaunchoptions) always return a specific browser instance, based on the browser being connected to or launched.

<!-- GEN:toc -->
- [event: 'disconnected'](api/class-browser.md#event-disconnected)
- [browser.close()](api/class-browser.md#browserclose)
- [browser.contexts()](api/class-browser.md#browsercontexts)
- [browser.isConnected()](api/class-browser.md#browserisconnected)
- [browser.newContext([options])](api/class-browser.md#browsernewcontextoptions)
- [browser.newPage([options])](api/class-browser.md#browsernewpageoptions)
- [browser.version()](api/class-browser.md#browserversion)
<!-- GEN:stop -->

## event: 'disconnected'
Emitted when Browser gets disconnected from the browser application. This might happen because of one of the following:
- Browser application is closed or crashed.
- The [`browser.close`](#browserclose) method was called.

## browser.close()
- returns: <[Promise]>

In case this browser is obtained using [browserType.launch](#browsertypelaunchoptions), closes the browser and all of its pages (if any were opened).

In case this browser is obtained using [browserType.connect](#browsertypeconnectoptions), clears all created contexts belonging to this browser and disconnects from the browser server.

The [Browser] object itself is considered to be disposed and cannot be used anymore.

## browser.contexts()
- returns: <[Array]<[BrowserContext]>>

Returns an array of all open browser contexts. In a newly created browser, this will return zero
browser contexts.

```js
const browser = await pw.webkit.launch();
console.log(browser.contexts().length); // prints `0`

const context = await browser.newContext();
console.log(browser.contexts().length); // prints `1`
```

## browser.isConnected()

- returns: <[boolean]>

Indicates that the browser is connected.

## browser.newContext([options])
- `options` <[Object]>
  - `acceptDownloads` <[boolean]> Whether to automatically download all the attachments. Defaults to `false` where all the downloads are canceled.
  - `ignoreHTTPSErrors` <[boolean]> Whether to ignore HTTPS errors during navigation. Defaults to `false`.
  - `bypassCSP` <[boolean]> Toggles bypassing page's Content-Security-Policy.
  - `viewport` <[null]|[Object]> Sets a consistent viewport for each page. Defaults to an 1280x720 viewport. `null` disables the default viewport.
    - `width` <[number]> page width in pixels.
    - `height` <[number]> page height in pixels.
  - `userAgent` <[string]> Specific user agent to use in this context.
  - `deviceScaleFactor` <[number]> Specify device scale factor (can be thought of as dpr). Defaults to `1`.
  - `isMobile` <[boolean]> Whether the `meta viewport` tag is taken into account and touch events are enabled. Defaults to `false`. Not supported in Firefox.
  - `hasTouch` <[boolean]> Specifies if viewport supports touch events. Defaults to false.
  - `javaScriptEnabled` <[boolean]> Whether or not to enable JavaScript in the context. Defaults to true.
  - `timezoneId` <[string]> Changes the timezone of the context. See [ICU’s `metaZones.txt`](https://cs.chromium.org/chromium/src/third_party/icu/source/data/misc/metaZones.txt?rcl=faee8bc70570192d82d2978a71e2a615788597d1) for a list of supported timezone IDs.
  - `geolocation` <[Object]>
    - `latitude` <[number]> Latitude between -90 and 90.
    - `longitude` <[number]> Longitude between -180 and 180.
    - `accuracy` <[number]> Non-negative accuracy value. Defaults to `0`.
  - `locale` <[string]> Specify user locale, for example `en-GB`, `de-DE`, etc. Locale will affect `navigator.language` value, `Accept-Language` request header value as well as number and date formatting rules.
  - `permissions` <[Array]<[string]>> A list of permissions to grant to all pages in this context. See [browserContext.grantPermissions](api/class-browsercontext.md#browsercontextgrantpermissionspermissions-options) for more details.
  - `extraHTTPHeaders` <[Object]<[string], [string]>> An object containing additional HTTP headers to be sent with every request. All header values must be strings.
  - `offline` <[boolean]> Whether to emulate network being offline. Defaults to `false`.
  - `httpCredentials` <[Object]> Credentials for [HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication).
    - `username` <[string]>
    - `password` <[string]>
  - `colorScheme` <"light"|"dark"|"no-preference"> Emulates `'prefers-colors-scheme'` media feature, supported values are `'light'`, `'dark'`, `'no-preference'`. See [page.emulateMedia(options)](api/class-page.md#pageemulatemediaoptions) for more details. Defaults to '`light`'.
  - `logger` <[Logger]> Logger sink for Playwright logging.
  - `proxy` <[Object]> Network proxy settings to use with this context. Note that browser needs to be launched with the global proxy for this option to work. If all contexts override the proxy, global proxy will be never used and can be any string, for example `launch({ proxy: { server: 'per-context' } })`.
    - `server` <[string]> Proxy to be used for all requests. HTTP and SOCKS proxies are supported, for example `http://myproxy.com:3128` or `socks5://myproxy.com:3128`. Short form `myproxy.com:3128` is considered an HTTP proxy.
    - `bypass` <[string]> Optional coma-separated domains to bypass proxy, for example `".com, chromium.org, .domain.com"`.
    - `username` <[string]> Optional username to use if HTTP proxy requires authentication.
    - `password` <[string]> Optional password to use if HTTP proxy requires authentication.
  - `videosPath` <[string]> **NOTE** Use `recordVideo` instead, it takes precedence over `videosPath`. Enables video recording for all pages to `videosPath` directory. If not specified, videos are not recorded. Make sure to await [`browserContext.close`](api/class-browsercontext.md#browsercontextclose) for videos to be saved.
  - `videoSize` <[Object]> **NOTE** Use `recordVideo` instead, it takes precedence over `videoSize`. Specifies dimensions of the automatically recorded video. Can only be used if `videosPath` is set. If not specified the size will be equal to `viewport`. If `viewport` is not configured explicitly the video size defaults to 1280x720. Actual picture of the page will be scaled down if necessary to fit specified size.
    - `width` <[number]> Video frame width.
    - `height` <[number]> Video frame height.
  - `recordHar` <[Object]> Enables [HAR](http://www.softwareishard.com/blog/har-12-spec) recording for all pages into `recordHar.path` file. If not specified, the HAR is not recorded. Make sure to await [`browserContext.close`](#browsercontextclose) for the HAR to be saved.
    - `omitContent` <[boolean]> Optional setting to control whether to omit request content from the HAR. Defaults to `false`.
    - `path` <[string]> Path on the filesystem to write the HAR file to.
  - `recordVideo` <[Object]> Enables video recording for all pages into `recordVideo.dir` directory. If not specified videos are not recorded. Make sure to await [`browserContext.close`](#browsercontextclose) for videos to be saved.
    - `dir` <[string]> Path to the directory to put videos into.
    - `size` <[Object]> Optional dimensions of the recorded videos. If not specified the size will be equal to `viewport`. If `viewport` is not configured explicitly the video size defaults to 1280x720. Actual picture of each page will be scaled down if necessary to fit the specified size.
      - `width` <[number]> Video frame width.
      - `height` <[number]> Video frame height.
- returns: <[Promise]<[BrowserContext]>>

Creates a new browser context. It won't share cookies/cache with other browser contexts.

```js
(async () => {
  const browser = await playwright.firefox.launch();  // Or 'chromium' or 'webkit'.
  // Create a new incognito browser context.
  const context = await browser.newContext();
  // Create a new page in a pristine context.
  const page = await context.newPage();
  await page.goto('https://example.com');
})();
```

## browser.newPage([options])
- `options` <[Object]>
  - `acceptDownloads` <[boolean]> Whether to automatically download all the attachments. Defaults to `false` where all the downloads are canceled.
  - `ignoreHTTPSErrors` <[boolean]> Whether to ignore HTTPS errors during navigation. Defaults to `false`.
  - `bypassCSP` <[boolean]> Toggles bypassing page's Content-Security-Policy.
  - `viewport` <[null]|[Object]> Sets a consistent viewport for each page. Defaults to an 1280x720 viewport. `null` disables the default viewport.
    - `width` <[number]> page width in pixels.
    - `height` <[number]> page height in pixels.
  - `userAgent` <[string]> Specific user agent to use in this context.
  - `deviceScaleFactor` <[number]> Specify device scale factor (can be thought of as dpr). Defaults to `1`.
  - `isMobile` <[boolean]> Whether the `meta viewport` tag is taken into account and touch events are enabled. Defaults to `false`. Not supported in Firefox.
  - `hasTouch` <[boolean]> Specifies if viewport supports touch events. Defaults to false.
  - `javaScriptEnabled` <[boolean]> Whether or not to enable JavaScript in the context. Defaults to `true`.
  - `timezoneId` <[string]> Changes the timezone of the context. See [ICU’s `metaZones.txt`](https://cs.chromium.org/chromium/src/third_party/icu/source/data/misc/metaZones.txt?rcl=faee8bc70570192d82d2978a71e2a615788597d1) for a list of supported timezone IDs.
  - `geolocation` <[Object]>
    - `latitude` <[number]> Latitude between -90 and 90.
    - `longitude` <[number]> Longitude between -180 and 180.
    - `accuracy` <[number]> Non-negative accuracy value. Defaults to `0`.
  - `locale` <[string]> Specify user locale, for example `en-GB`, `de-DE`, etc. Locale will affect `navigator.language` value, `Accept-Language` request header value as well as number and date formatting rules.
  - `permissions` <[Array]<[string]>> A list of permissions to grant to all pages in this context. See [browserContext.grantPermissions](#browsercontextgrantpermissionspermissions-options) for more details.
  - `extraHTTPHeaders` <[Object]<[string], [string]>> An object containing additional HTTP headers to be sent with every request. All header values must be strings.
  - `offline` <[boolean]> Whether to emulate network being offline. Defaults to `false`.
  - `httpCredentials` <[Object]> Credentials for [HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication).
    - `username` <[string]>
    - `password` <[string]>
  - `colorScheme` <"light"|"dark"|"no-preference"> Emulates `'prefers-colors-scheme'` media feature, supported values are `'light'`, `'dark'`, `'no-preference'`. See [page.emulateMedia(options)](#pageemulatemediaoptions) for more details. Defaults to '`light`'.
  - `logger` <[Logger]> Logger sink for Playwright logging.
  - `proxy` <[Object]> Network proxy settings to use with this context. Note that browser needs to be launched with the global proxy for this option to work. If all contexts override the proxy, global proxy will be never used and can be any string, for example `launch({ proxy: { server: 'per-context' } })`.
    - `server` <[string]> Proxy to be used for all requests. HTTP and SOCKS proxies are supported, for example `http://myproxy.com:3128` or `socks5://myproxy.com:3128`. Short form `myproxy.com:3128` is considered an HTTP proxy.
    - `bypass` <[string]> Optional coma-separated domains to bypass proxy, for example `".com, chromium.org, .domain.com"`.
    - `username` <[string]> Optional username to use if HTTP proxy requires authentication.
    - `password` <[string]> Optional password to use if HTTP proxy requires authentication.
  - `videosPath` <[string]> **NOTE** Use `recordVideo` instead, it takes precedence over `videosPath`. Enables video recording for all pages to `videosPath` directory. If not specified, videos are not recorded. Make sure to await [`page.close`](api/class-page.md#pagecloseoptions) for videos to be saved.
  - `videoSize` <[Object]> **NOTE** Use `recordVideo` instead, it takes precedence over `videoSize`. Specifies dimensions of the automatically recorded video. Can only be used if `videosPath` is set. If not specified the size will be equal to `viewport`. If `viewport` is not configured explicitly the video size defaults to 1280x720. Actual picture of the page will be scaled down if necessary to fit specified size.
    - `width` <[number]> Video frame width.
    - `height` <[number]> Video frame height.
  - `recordHar` <[Object]> Enables [HAR](http://www.softwareishard.com/blog/har-12-spec) recording for all pages into `recordHar.path` file. If not specified, the HAR is not recorded. Make sure to await [`page.close`](#pagecloseoptions) for the HAR to be saved.
    - `omitContent` <[boolean]> Optional setting to control whether to omit request content from the HAR. Defaults to `false`.
    - `path` <[string]> Path on the filesystem to write the HAR file to.
  - `recordVideo` <[Object]> Enables video recording for all pages into `recordVideo.dir` directory. If not specified videos are not recorded. Make sure to await [`page.close`](#pagecloseoptions) for videos to be saved.
    - `dir` <[string]> Path to the directory to put videos into.
    - `size` <[Object]> Optional dimensions of the recorded videos. If not specified the size will be equal to `viewport`. If `viewport` is not configured explicitly the video size defaults to 1280x720. Actual picture of each page will be scaled down if necessary to fit the specified size.
      - `width` <[number]> Video frame width.
      - `height` <[number]> Video frame height.
- returns: <[Promise]<[Page]>>

Creates a new page in a new browser context. Closing this page will close the context as well.

This is a convenience API that should only be used for the single-page scenarios and short snippets. Production code and testing frameworks should explicitly create [browser.newContext](#browsernewcontextoptions) followed by the [browserContext.newPage](api/class-browsercontext.md#browsercontextnewpage) to control their exact life times.

## browser.version()

- returns: <[string]>

Returns the browser version.



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
