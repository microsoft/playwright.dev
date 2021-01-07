---
id: class-browsertype
title: "BrowserType"
---


BrowserType provides methods to launch a specific browser instance or connect to an existing one. The following is a typical example of using Playwright to drive automation:

```js
const { chromium } = require('playwright');  // Or 'firefox' or 'webkit'.

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  // other actions...
  await browser.close();
})();
```


- [browser_type.connect(ws_endpoint, **options)](./api/class-browsertype.md#browsertypeconnectwsendpoint-options)
- [browser_type.executable_path()](./api/class-browsertype.md#browsertypeexecutablepath)
- [browser_type.launch(**options)](./api/class-browsertype.md#browsertypelaunchoptions)
- [browser_type.launch_persistent_context(user_data_dir, **options)](./api/class-browsertype.md#browsertypelaunchpersistentcontextuserdatadir-options)
- [browser_type.launch_server(**options)](./api/class-browsertype.md#browsertypelaunchserveroptions)
- [browser_type.name()](./api/class-browsertype.md#browsertypename)

## browser_type.connect(ws_endpoint, **options)
- `ws_endpoint` <[string]> A browser websocket endpoint to connect to. **required**
- `slow_mo` <[number]> Slows down Playwright operations by the specified amount of milliseconds. Useful so that you can see what is going on. Defaults to 0.
- `logger` <[Logger]> Logger sink for Playwright logging. Optional.
- `timeout` <[number]> Maximum time in milliseconds to wait for the connection to be established. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.
- returns: <[Promise]<[Browser]>>

This methods attaches Playwright to an existing browser instance.

## browser_type.executable_path()
- returns: <[string]>

A path where Playwright expects to find a bundled browser executable.

## browser_type.launch(**options)
- `args` <[Array]<[string]>> Additional arguments to pass to the browser instance. The list of Chromium flags can be found [here](http://peter.sh/experiments/chromium-command-line-switches/).
- `chromium_sandbox` <[boolean]> Enable Chromium sandboxing. Defaults to `false`.
- `devtools` <[boolean]> **Chromium-only** Whether to auto-open a Developer Tools panel for each tab. If this option is `true`, the `headless` option will be set `false`.
- `downloads_path` <[string]> If specified, accepted downloads are downloaded into this directory. Otherwise, temporary directory is created and is deleted when browser is closed.
- `env` <[Object]<[string], [string]|[number]|[boolean]>> Specify environment variables that will be visible to the browser. Defaults to `process.env`.
- `executable_path` <[string]> Path to a browser executable to run instead of the bundled one. If `executablePath` is a relative path, then it is resolved relative to the current working directory. Note that Playwright only works with the bundled Chromium, Firefox or WebKit, use at your own risk.
- `firefox_user_prefs` <[Object]<[string], [string]|[number]|[boolean]>> Firefox user preferences. Learn more about the Firefox user preferences at [`about:config`](https://support.mozilla.org/en-US/kb/about-config-editor-firefox).
- `handle_sighup` <[boolean]> Close the browser process on SIGHUP. Defaults to `true`.
- `handle_sigint` <[boolean]> Close the browser process on Ctrl-C. Defaults to `true`.
- `handle_sigterm` <[boolean]> Close the browser process on SIGTERM. Defaults to `true`.
- `headless` <[boolean]> Whether to run browser in headless mode. More details for [Chromium](https://developers.google.com/web/updates/2017/04/headless-chrome) and [Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Headless_mode). Defaults to `true` unless the `devtools` option is `true`.
- `ignore_default_args` <[boolean]|[Array]<[string]>> If `true`, Playwright does not pass its own configurations args and only uses the ones from `args`. If an array is given, then filters out the given default arguments. Dangerous option; use with care. Defaults to `false`.
- `logger` <[Logger]> Logger sink for Playwright logging.
- `proxy` <[Object]> Network proxy settings.
  - `server` <[string]> Proxy to be used for all requests. HTTP and SOCKS proxies are supported, for example `http://myproxy.com:3128` or `socks5://myproxy.com:3128`. Short form `myproxy.com:3128` is considered an HTTP proxy.
  - `bypass` <[string]> Optional coma-separated domains to bypass proxy, for example `".com, chromium.org, .domain.com"`.
  - `username` <[string]> Optional username to use if HTTP proxy requires authentication.
  - `password` <[string]> Optional password to use if HTTP proxy requires authentication.
- `slow_mo` <[number]> Slows down Playwright operations by the specified amount of milliseconds. Useful so that you can see what is going on.
- `timeout` <[number]> Maximum time in milliseconds to wait for the browser instance to start. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.
- returns: <[Promise]<[Browser]>>

Returns the browser instance.

You can use `ignoreDefaultArgs` to filter out `--mute-audio` from default arguments:

```js
const browser = await chromium.launch({  // Or 'firefox' or 'webkit'.
  ignoreDefaultArgs: ['--mute-audio']
});
```

> **Chromium-only** Playwright can also be used to control the Chrome browser, but it works best with the version of Chromium it is bundled with. There is no guarantee it will work with any other version. Use `executablePath` option with extreme caution.
>
> If Google Chrome (rather than Chromium) is preferred, a [Chrome Canary](https://www.google.com/chrome/browser/canary.html) or [Dev Channel](https://www.chromium.org/getting-involved/dev-channel) build is suggested.
>
> In [browser_type.launch(**options)](./api/class-browsertype.md#browsertypelaunchoptions) above, any mention of Chromium also applies to Chrome.
>
> See [`this article`](https://www.howtogeek.com/202825/what%E2%80%99s-the-difference-between-chromium-and-chrome/) for a description of the differences between Chromium and Chrome. [`This article`](https://chromium.googlesource.com/chromium/src/+/lkgr/docs/chromium_browser_vs_google_chrome.md) describes some differences for Linux users.

## browser_type.launch_persistent_context(user_data_dir, **options)
- `user_data_dir` <[string]> Path to a User Data Directory, which stores browser session data like cookies and local storage. More details for [Chromium](https://chromium.googlesource.com/chromium/src/+/master/docs/user_data_dir.md) and [Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Command_Line_Options#User_Profile).
- `accept_downloads` <[boolean]> Whether to automatically download all the attachments. Defaults to `false` where all the downloads are canceled.
- `args` <[Array]<[string]>> Additional arguments to pass to the browser instance. The list of Chromium flags can be found [here](http://peter.sh/experiments/chromium-command-line-switches/).
- `bypass_csp` <[boolean]> Toggles bypassing page's Content-Security-Policy.
- `chromium_sandbox` <[boolean]> Enable Chromium sandboxing. Defaults to `true`.
- `color_scheme` <"light"|"dark"|"no-preference"> Emulates `'prefers-colors-scheme'` media feature, supported values are `'light'`, `'dark'`, `'no-preference'`. See [page.emulate_media(**options)](./api/class-page.md#pageemulatemediaoptions) for more details. Defaults to '`light`'.
- `device_scale_factor` <[number]> Specify device scale factor (can be thought of as dpr). Defaults to `1`.
- `devtools` <[boolean]> **Chromium-only** Whether to auto-open a Developer Tools panel for each tab. If this option is `true`, the `headless` option will be set `false`.
- `downloads_path` <[string]> If specified, accepted downloads are downloaded into this directory. Otherwise, temporary directory is created and is deleted when browser is closed.
- `env` <[Object]<[string], [string]|[number]|[boolean]>> Specify environment variables that will be visible to the browser. Defaults to `process.env`.
- `executable_path` <[string]> Path to a browser executable to run instead of the bundled one. If `executablePath` is a relative path, then it is resolved relative to the current working directory. **BEWARE**: Playwright is only guaranteed to work with the bundled Chromium, Firefox or WebKit, use at your own risk.
- `extra_http_headers` <[Object]<[string], [string]>> An object containing additional HTTP headers to be sent with every request. All header values must be strings.
- `geolocation` <[Object]>
  - `latitude` <[number]> Latitude between -90 and 90.
  - `longitude` <[number]> Longitude between -180 and 180.
  - `accuracy` <[number]> Non-negative accuracy value. Defaults to `0`.
- `handle_sighup` <[boolean]> Close the browser process on SIGHUP. Defaults to `true`.
- `handle_sigint` <[boolean]> Close the browser process on Ctrl-C. Defaults to `true`.
- `handle_sigterm` <[boolean]> Close the browser process on SIGTERM. Defaults to `true`.
- `has_touch` <[boolean]> Specifies if viewport supports touch events. Defaults to false.
- `headless` <[boolean]> Whether to run browser in headless mode. More details for [Chromium](https://developers.google.com/web/updates/2017/04/headless-chrome) and [Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Headless_mode). Defaults to `true` unless the `devtools` option is `true`.
- `http_credentials` <[Object]> Credentials for [HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication).
  - `username` <[string]>
  - `password` <[string]>
- `ignore_default_args` <[boolean]|[Array]<[string]>> If `true`, then do not use any of the default arguments. If an array is given, then filter out the given default arguments. Dangerous option; use with care. Defaults to `false`.
- `ignore_https_errors` <[boolean]> Whether to ignore HTTPS errors during navigation. Defaults to `false`.
- `is_mobile` <[boolean]> Whether the `meta viewport` tag is taken into account and touch events are enabled. Defaults to `false`. Not supported in Firefox.
- `java_script_enabled` <[boolean]> Whether or not to enable JavaScript in the context. Defaults to `true`.
- `locale` <[string]> Specify user locale, for example `en-GB`, `de-DE`, etc. Locale will affect `navigator.language` value, `Accept-Language` request header value as well as number and date formatting rules.
- `logger` <[Logger]> Logger sink for Playwright logging.
- `offline` <[boolean]> Whether to emulate network being offline. Defaults to `false`.
- `permissions` <[Array]<[string]>> A list of permissions to grant to all pages in this context. See [browser_context.grant_permissions(permissions, **options)](./api/class-browsercontext.md#browsercontextgrantpermissionspermissions-options) for more details.
- `proxy` <[Object]> Network proxy settings.
  - `server` <[string]> Proxy to be used for all requests. HTTP and SOCKS proxies are supported, for example `http://myproxy.com:3128` or `socks5://myproxy.com:3128`. Short form `myproxy.com:3128` is considered an HTTP proxy.
  - `bypass` <[string]> Optional coma-separated domains to bypass proxy, for example `".com, chromium.org, .domain.com"`.
  - `username` <[string]> Optional username to use if HTTP proxy requires authentication.
  - `password` <[string]> Optional password to use if HTTP proxy requires authentication.
- `record_har` <[Object]> Enables [HAR](http://www.softwareishard.com/blog/har-12-spec) recording for all pages into `recordHar.path` file. If not specified, the HAR is not recorded. Make sure to await [browser_context.close()](./api/class-browsercontext.md#browsercontextclose) for the HAR to be saved.
  - `omit_content` <[boolean]> Optional setting to control whether to omit request content from the HAR. Defaults to `false`.
  - `path` <[string]> Path on the filesystem to write the HAR file to.
- `record_video` <[Object]> Enables video recording for all pages into `recordVideo.dir` directory. If not specified videos are not recorded. Make sure to await [browser_context.close()](./api/class-browsercontext.md#browsercontextclose) for videos to be saved.
  - `dir` <[string]> Path to the directory to put videos into.
  - `size` <[Object]> Optional dimensions of the recorded videos. If not specified the size will be equal to `viewport`. If `viewport` is not configured explicitly the video size defaults to 1280x720. Actual picture of each page will be scaled down if necessary to fit the specified size.
    - `width` <[number]> Video frame width.
    - `height` <[number]> Video frame height.
- `slow_mo` <[number]> Slows down Playwright operations by the specified amount of milliseconds. Useful so that you can see what is going on. Defaults to 0.
- `timeout` <[number]> Maximum time in milliseconds to wait for the browser instance to start. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.
- `timezone_id` <[string]> Changes the timezone of the context. See [ICU's metaZones.txt](https://cs.chromium.org/chromium/src/third_party/icu/source/data/misc/metaZones.txt?rcl=faee8bc70570192d82d2978a71e2a615788597d1) for a list of supported timezone IDs.
- `user_agent` <[string]> Specific user agent to use in this context.
- `video_size` <[Object]> **DEPRECATED** Use `recordVideo` instead.
  - `width` <[number]> Video frame width.
  - `height` <[number]> Video frame height.
- `videos_path` <[string]> **DEPRECATED** Use `recordVideo` instead.
- `viewport` <[null]|[Object]> Sets a consistent viewport for each page. Defaults to an 1280x720 viewport. `null` disables the default viewport.
  - `width` <[number]> page width in pixels.
  - `height` <[number]> page height in pixels.
- returns: <[Promise]<[BrowserContext]>>

Returns the persistent browser context instance.

Launches browser that uses persistent storage located at `userDataDir` and returns the only context. Closing this context will automatically close the browser.

## browser_type.launch_server(**options)
- `args` <[Array]<[string]>> Additional arguments to pass to the browser instance. The list of Chromium flags can be found [here](http://peter.sh/experiments/chromium-command-line-switches/).
- `chromium_sandbox` <[boolean]> Enable Chromium sandboxing. Defaults to `true`.
- `devtools` <[boolean]> **Chromium-only** Whether to auto-open a Developer Tools panel for each tab. If this option is `true`, the `headless` option will be set `false`.
- `downloads_path` <[string]> If specified, accepted downloads are downloaded into this directory. Otherwise, temporary directory is created and is deleted when browser is closed.
- `env` <[Object]<[string], [string]|[number]|[boolean]>> Specify environment variables that will be visible to the browser. Defaults to `process.env`.
- `executable_path` <[string]> Path to a browser executable to run instead of the bundled one. If `executablePath` is a relative path, then it is resolved relative to the current working directory. **BEWARE**: Playwright is only guaranteed to work with the bundled Chromium, Firefox or WebKit, use at your own risk.
- `firefox_user_prefs` <[Object]<[string], [string]|[number]|[boolean]>> Firefox user preferences. Learn more about the Firefox user preferences at [`about:config`](https://support.mozilla.org/en-US/kb/about-config-editor-firefox).
- `handle_sighup` <[boolean]> Close the browser process on SIGHUP. Defaults to `true`.
- `handle_sigint` <[boolean]> Close the browser process on Ctrl-C. Defaults to `true`.
- `handle_sigterm` <[boolean]> Close the browser process on SIGTERM. Defaults to `true`.
- `headless` <[boolean]> Whether to run browser in headless mode. More details for [Chromium](https://developers.google.com/web/updates/2017/04/headless-chrome) and [Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Headless_mode). Defaults to `true` unless the `devtools` option is `true`.
- `ignore_default_args` <[boolean]|[Array]<[string]>> If `true`, then do not use any of the default arguments. If an array is given, then filter out the given default arguments. Dangerous option; use with care. Defaults to `false`.
- `logger` <[Logger]> Logger sink for Playwright logging.
- `port` <[number]> Port to use for the web socket. Defaults to 0 that picks any available port.
- `proxy` <[Object]> Network proxy settings.
  - `server` <[string]> Proxy to be used for all requests. HTTP and SOCKS proxies are supported, for example `http://myproxy.com:3128` or `socks5://myproxy.com:3128`. Short form `myproxy.com:3128` is considered an HTTP proxy.
  - `bypass` <[string]> Optional coma-separated domains to bypass proxy, for example `".com, chromium.org, .domain.com"`.
  - `username` <[string]> Optional username to use if HTTP proxy requires authentication.
  - `password` <[string]> Optional password to use if HTTP proxy requires authentication.
- `timeout` <[number]> Maximum time in milliseconds to wait for the browser instance to start. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.
- returns: <[Promise]<[BrowserServer]>>

Returns the browser app instance.

Launches browser server that client can connect to. An example of launching a browser executable and connecting to it later:

```js
const { chromium } = require('playwright');  // Or 'webkit' or 'firefox'.

(async () => {
  const browserServer = await chromium.launchServer();
  const wsEndpoint = browserServer.wsEndpoint();
  // Use web socket endpoint later to establish a connection.
  const browser = await chromium.connect({ wsEndpoint });
  // Close browser instance.
  await browserServer.close();
})();
```

## browser_type.name()
- returns: <[string]>

Returns browser name. For example: `'chromium'`, `'webkit'` or `'firefox'`.

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
