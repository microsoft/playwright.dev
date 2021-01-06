---
id: class-browser
title: "Browser"
---


* extends: [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)

A Browser is created when Playwright connects to a browser instance, either through [`browserType.launch`](./class-browsertype.md#browsertypelaunchoptions) or [`browserType.connect`](./class-browsertype.md#browsertypeconnectoptions).

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
- [event: 'disconnected'](./class-browser.md#event-disconnected)
- [browser.close()](./class-browser.md#browserclose)
- [browser.contexts()](./class-browser.md#browsercontexts)
- [browser.isConnected()](./class-browser.md#browserisconnected)
- [browser.newContext([options])](./class-browser.md#browsernewcontextoptions)
- [browser.newPage([options])](./class-browser.md#browsernewpageoptions)
- [browser.version()](./class-browser.md#browserversion)
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
  - `viewport` <?[Object]> Sets a consistent viewport for each page. Defaults to an 1280x720 viewport. `null` disables the default viewport.
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
  - `permissions` <[Array]<[string]>> A list of permissions to grant to all pages in this context. See [browserContext.grantPermissions](./class-browsercontext.md#browsercontextgrantpermissionspermissions-options) for more details.
  - `extraHTTPHeaders` <[Object]<[string], [string]>> An object containing additional HTTP headers to be sent with every request. All header values must be strings.
  - `offline` <[boolean]> Whether to emulate network being offline. Defaults to `false`.
  - `httpCredentials` <[Object]> Credentials for [HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication).
    - `username` <[string]>
    - `password` <[string]>
  - `colorScheme` <"light"|"dark"|"no-preference"> Emulates `'prefers-colors-scheme'` media feature, supported values are `'light'`, `'dark'`, `'no-preference'`. See [page.emulateMedia(options)](./class-page.md#pageemulatemediaoptions) for more details. Defaults to '`light`'.
  - `logger` <[Logger]> Logger sink for Playwright logging.
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
  - `viewport` <?[Object]> Sets a consistent viewport for each page. Defaults to an 1280x720 viewport. `null` disables the default viewport.
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
- returns: <[Promise]<[Page]>>

Creates a new page in a new browser context. Closing this page will close the context as well.

This is a convenience API that should only be used for the single-page scenarios and short snippets. Production code and testing frameworks should explicitly create [browser.newContext](#browsernewcontextoptions) followed by the [browserContext.newPage](./class-browsercontext.md#browsercontextnewpage) to control their exact life times.

## browser.version()

- returns: <[string]>

Returns the browser version.



[AXNode]: ./class-accessibility.md#accessibilitysnapshotoptions "AXNode"
[Accessibility]: ./class-accessibility.md#class-accessibility "Accessibility"
[Array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array "Array"
[BrowserServer]: ./class-browser.md#class-browserserver  "BrowserServer"
[BrowserContext]: ./class-browsercontext.md#class-browsercontext  "BrowserContext"
[BrowserType]: ./class-browsertype.md#class-browsertype "BrowserType"
[Browser]: ./class-browser.md  "Browser"
[Buffer]: https://nodejs.org/api/buffer.htmlapi.md#buffer_class_buffer "Buffer"
[ChildProcess]: https://nodejs.org/api/child_process.html "ChildProcess"
[ChromiumBrowser]: ./class-chromiumbrowser.md#class-chromiumbrowser "ChromiumBrowser"
[ChromiumBrowserContext]: ./class-chromiumbrowsercontext.md#class-chromiumbrowsercontext "ChromiumBrowserContext"
[ChromiumCoverage]: ./class-chromiumcoverage.md#class-chromiumcoverage "ChromiumCoverage"
[CDPSession]: ./class-cdpsession.md#class-cdpsession  "CDPSession"
[ConsoleMessage]: ./class-consolemessage.md#class-consolemessage "ConsoleMessage"
[Dialog]: ./class-dialog.md#class-dialog "Dialog"
[Download]: ./class-download.md#class-download "Download"
[ElementHandle]: ./class-elementhandle.md#class-elementhandle "ElementHandle"
[Element]: https://developer.mozilla.org/en-US/docs/Web/API/element "Element"
[Error]: https://nodejs.org/api/errors.htmlapi.md#errors_class_error "Error"
[EvaluationArgument]: ./evaluationargument.md#evaluationargument "Evaluation Argument"
[File]: https://developer.mozilla.org/en-US/docs/Web/API/File "File"
[FileChooser]: ./class-filechooser.md#class-filechooser "FileChooser"
[FirefoxBrowser]: ./class-firefoxbrowser.md#class-firefoxbrowser "FirefoxBrowser"
[Frame]: ./class-frame.md#class-frame "Frame"
[JSHandle]: ./class-jshandle.md#class-jshandle "JSHandle"
[Keyboard]: ./class-keyboard.md#class-keyboard "Keyboard"
[Logger]: ./class-logger.md#class-logger "Logger"
[Map]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map "Map"
[Mouse]: ./class-mouse.md#class-mouse "Mouse"
[Object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object "Object"
[Page]: ./class-page.md#class-page "Page"
[Playwright]: ./class-playwright.md "Playwright"
[Promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise "Promise"
[RegExp]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
[Request]: ./class-request.md#class-request  "Request"
[Response]: ./class-response.md#class-response  "Response"
[Route]: ./class-route.md#class-route  "Route"
[Selectors]: ./class-selectors.md#class-selectors  "Selectors"
[Serializable]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringifyapi.md#Description "Serializable"
[TimeoutError]: ./class-timeouterror.md#class-timeouterror "TimeoutError"
[UIEvent.detail]: https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail "UIEvent.detail"
[URL]: https://nodejs.org/api/url.html
[USKeyboardLayout]: ../src/usKeyboardLayout.ts "USKeyboardLayout"
[UnixTime]: https://en.wikipedia.org/wiki/Unix_time "Unix Time"
[WebKitBrowser]: ./class-webkitbrowser.md#class-webkitbrowser "WebKitBrowser"
[Worker]: ./class-worker.md#class-worker "Worker"
[boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structuresapi.md#Boolean_type "Boolean"
[function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function "Function"
[iterator]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols "Iterator"
[number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structuresapi.md#Number_type "Number"
[origin]: https://developer.mozilla.org/en-US/docs/Glossary/Origin "Origin"
[selector]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors "selector"
[Readable]: https://nodejs.org/api/stream.htmlapi.md#stream_class_stream_readable "Readable"
[string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structuresapi.md#String_type "String"
[xpath]: https://developer.mozilla.org/en-US/docs/Web/XPath "xpath"
