---
id: class-browsertype
title: "BrowserType"
---


BrowserType provides methods to launch a specific browser instance or connect to an existing one. The following is a typical example of using Playwright to drive automation:


- [browser_type.executable_path](./api/class-browsertype.md#browser_typeexecutable_path)
- [browser_type.launch(**options)](./api/class-browsertype.md#browser_typelaunchoptions)
- [browser_type.launch_persistent_context(user_data_dir, **options)](./api/class-browsertype.md#browser_typelaunch_persistent_contextuser_data_dir-options)
- [browser_type.name](./api/class-browsertype.md#browser_typename)

## browser_type.executable_path
- returns: <[str]>

A path where Playwright expects to find a bundled browser executable.

## browser_type.launch(**options)
- `args` <[List]\[[str]\]> Additional arguments to pass to the browser instance. The list of Chromium flags can be found [here](http://peter.sh/experiments/chromium-command-line-switches/).
- `chromium_sandbox` <[bool]> Enable Chromium sandboxing. Defaults to `false`.
- `devtools` <[bool]> **Chromium-only** Whether to auto-open a Developer Tools panel for each tab. If this option is `true`, the `headless` option will be set `false`.
- `downloads_path` <[Union]\[[str], [pathlib.Path]\]> If specified, accepted downloads are downloaded into this directory. Otherwise, temporary directory is created and is deleted when browser is closed.
- `env` <[Dict]\[[str], [str]|[float]|[bool]\]> Specify environment variables that will be visible to the browser. Defaults to `process.env`.
- `executable_path` <[Union]\[[str], [pathlib.Path]\]> Path to a browser executable to run instead of the bundled one. If `executable_path` is a relative path, then it is resolved relative to the current working directory. Note that Playwright only works with the bundled Chromium, Firefox or WebKit, use at your own risk.
- `firefox_user_prefs` <[Dict]\[[str], [str]|[float]|[bool]\]> Firefox user preferences. Learn more about the Firefox user preferences at [`about:config`](https://support.mozilla.org/en-US/kb/about-config-editor-firefox).
- `handle_sighup` <[bool]> Close the browser process on SIGHUP. Defaults to `true`.
- `handle_sigint` <[bool]> Close the browser process on Ctrl-C. Defaults to `true`.
- `handle_sigterm` <[bool]> Close the browser process on SIGTERM. Defaults to `true`.
- `headless` <[bool]> Whether to run browser in headless mode. More details for [Chromium](https://developers.google.com/web/updates/2017/04/headless-chrome) and [Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Headless_mode). Defaults to `true` unless the `devtools` option is `true`.
- `ignore_default_args` <[bool]|[List]\[[str]\]> If `true`, Playwright does not pass its own configurations args and only uses the ones from `args`. If an array is given, then filters out the given default arguments. Dangerous option; use with care. Defaults to `false`.
- `proxy` <[Dict]> Network proxy settings.
  - `server` <[str]> Proxy to be used for all requests. HTTP and SOCKS proxies are supported, for example `http://myproxy.com:3128` or `socks5://myproxy.com:3128`. Short form `myproxy.com:3128` is considered an HTTP proxy.
  - `bypass` <[str]> Optional coma-separated domains to bypass proxy, for example `".com, chromium.org, .domain.com"`.
  - `username` <[str]> Optional username to use if HTTP proxy requires authentication.
  - `password` <[str]> Optional password to use if HTTP proxy requires authentication.
- `slow_mo` <[float]> Slows down Playwright operations by the specified amount of milliseconds. Useful so that you can see what is going on.
- `timeout` <[float]> Maximum time in milliseconds to wait for the browser instance to start. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.
- returns: <[Browser]>

Returns the browser instance.

You can use `ignore_default_args` to filter out `--mute-audio` from default arguments:

> **Chromium-only** Playwright can also be used to control the Chrome browser, but it works best with the version of Chromium it is bundled with. There is no guarantee it will work with any other version. Use `executable_path` option with extreme caution.
>
> If Google Chrome (rather than Chromium) is preferred, a [Chrome Canary](https://www.google.com/chrome/browser/canary.html) or [Dev Channel](https://www.chromium.org/getting-involved/dev-channel) build is suggested.
>
> In [browser_type.launch(**options)](./api/class-browsertype.md#browser_typelaunchoptions) above, any mention of Chromium also applies to Chrome.
>
> See [`this article`](https://www.howtogeek.com/202825/what%E2%80%99s-the-difference-between-chromium-and-chrome/) for a description of the differences between Chromium and Chrome. [`This article`](https://chromium.googlesource.com/chromium/src/+/lkgr/docs/chromium_browser_vs_google_chrome.md) describes some differences for Linux users.

## browser_type.launch_persistent_context(user_data_dir, **options)
- `user_data_dir` <[Union]\[[str], [pathlib.Path]\]> Path to a User Data Directory, which stores browser session data like cookies and local storage. More details for [Chromium](https://chromium.googlesource.com/chromium/src/+/master/docs/user_data_dir.md) and [Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Command_Line_Options#User_Profile).
- `accept_downloads` <[bool]> Whether to automatically download all the attachments. Defaults to `false` where all the downloads are canceled.
- `args` <[List]\[[str]\]> Additional arguments to pass to the browser instance. The list of Chromium flags can be found [here](http://peter.sh/experiments/chromium-command-line-switches/).
- `bypass_csp` <[bool]> Toggles bypassing page's Content-Security-Policy.
- `chromium_sandbox` <[bool]> Enable Chromium sandboxing. Defaults to `true`.
- `color_scheme` <"light"|"dark"|"no-preference"> Emulates `'prefers-colors-scheme'` media feature, supported values are `'light'`, `'dark'`, `'no-preference'`. See [page.emulate_media(**options)](./api/class-page.md#pageemulate_mediaoptions) for more details. Defaults to '`light`'.
- `device_scale_factor` <[float]> Specify device scale factor (can be thought of as dpr). Defaults to `1`.
- `devtools` <[bool]> **Chromium-only** Whether to auto-open a Developer Tools panel for each tab. If this option is `true`, the `headless` option will be set `false`.
- `downloads_path` <[Union]\[[str], [pathlib.Path]\]> If specified, accepted downloads are downloaded into this directory. Otherwise, temporary directory is created and is deleted when browser is closed.
- `env` <[Dict]\[[str], [str]|[float]|[bool]\]> Specify environment variables that will be visible to the browser. Defaults to `process.env`.
- `executable_path` <[Union]\[[str], [pathlib.Path]\]> Path to a browser executable to run instead of the bundled one. If `executable_path` is a relative path, then it is resolved relative to the current working directory. **BEWARE**: Playwright is only guaranteed to work with the bundled Chromium, Firefox or WebKit, use at your own risk.
- `extra_http_headers` <[Dict]\[[str], [str]\]> An object containing additional HTTP headers to be sent with every request. All header values must be strings.
- `geolocation` <[Dict]>
  - `latitude` <[float]> Latitude between -90 and 90.
  - `longitude` <[float]> Longitude between -180 and 180.
  - `accuracy` <[float]> Non-negative accuracy value. Defaults to `0`.
- `handle_sighup` <[bool]> Close the browser process on SIGHUP. Defaults to `true`.
- `handle_sigint` <[bool]> Close the browser process on Ctrl-C. Defaults to `true`.
- `handle_sigterm` <[bool]> Close the browser process on SIGTERM. Defaults to `true`.
- `has_touch` <[bool]> Specifies if viewport supports touch events. Defaults to false.
- `headless` <[bool]> Whether to run browser in headless mode. More details for [Chromium](https://developers.google.com/web/updates/2017/04/headless-chrome) and [Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Headless_mode). Defaults to `true` unless the `devtools` option is `true`.
- `http_credentials` <[Dict]> Credentials for [HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication).
  - `username` <[str]>
  - `password` <[str]>
- `ignore_default_args` <[bool]|[List]\[[str]\]> If `true`, then do not use any of the default arguments. If an array is given, then filter out the given default arguments. Dangerous option; use with care. Defaults to `false`.
- `ignore_https_errors` <[bool]> Whether to ignore HTTPS errors during navigation. Defaults to `false`.
- `is_mobile` <[bool]> Whether the `meta viewport` tag is taken into account and touch events are enabled. Defaults to `false`. Not supported in Firefox.
- `java_script_enabled` <[bool]> Whether or not to enable JavaScript in the context. Defaults to `true`.
- `locale` <[str]> Specify user locale, for example `en-GB`, `de-DE`, etc. Locale will affect `navigator.language` value, `Accept-Language` request header value as well as number and date formatting rules.
- `no_viewport` <[bool]> Does not enforce fixed viewport, allows resizing window in the headed mode.
- `offline` <[bool]> Whether to emulate network being offline. Defaults to `false`.
- `permissions` <[List]\[[str]\]> A list of permissions to grant to all pages in this context. See [browser_context.grant_permissions(permissions, **options)](./api/class-browsercontext.md#browser_contextgrant_permissionspermissions-options) for more details.
- `proxy` <[Dict]> Network proxy settings.
  - `server` <[str]> Proxy to be used for all requests. HTTP and SOCKS proxies are supported, for example `http://myproxy.com:3128` or `socks5://myproxy.com:3128`. Short form `myproxy.com:3128` is considered an HTTP proxy.
  - `bypass` <[str]> Optional coma-separated domains to bypass proxy, for example `".com, chromium.org, .domain.com"`.
  - `username` <[str]> Optional username to use if HTTP proxy requires authentication.
  - `password` <[str]> Optional password to use if HTTP proxy requires authentication.
- `record_har_omit_content` <[bool]> Optional setting to control whether to omit request content from the HAR. Defaults to `false`.
- `record_har_path` <[Union]\[[str], [pathlib.Path]\]> Path on the filesystem to write the HAR file to.
- `record_video_dir` <[Union]\[[str], [pathlib.Path]\]> Path to the directory to put videos into.
- `record_video_size` <[Dict]> Optional dimensions of the recorded videos. If not specified the size will be equal to `viewport`.
  - `width` <[int]> Video frame width.
  - `height` <[int]> Video frame height.
- `slow_mo` <[float]> Slows down Playwright operations by the specified amount of milliseconds. Useful so that you can see what is going on. Defaults to 0.
- `timeout` <[float]> Maximum time in milliseconds to wait for the browser instance to start. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.
- `timezone_id` <[str]> Changes the timezone of the context. See [ICU's metaZones.txt](https://cs.chromium.org/chromium/src/third_party/icu/source/data/misc/metaZones.txt?rcl=faee8bc70570192d82d2978a71e2a615788597d1) for a list of supported timezone IDs.
- `user_agent` <[str]> Specific user agent to use in this context.
- `viewport` <[NoneType]|[Dict]> Sets a consistent viewport for each page. Defaults to an 1280x720 viewport. `no_viewport` disables the fixed viewport.
  - `width` <[int]> page width in pixels.
  - `height` <[int]> page height in pixels.
- returns: <[BrowserContext]>

Returns the persistent browser context instance.

Launches browser that uses persistent storage located at `user_data_dir` and returns the only context. Closing this context will automatically close the browser.

## browser_type.name
- returns: <[str]>

Returns browser name. For example: `'chromium'`, `'webkit'` or `'firefox'`.

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
[Pattern]: https://docs.python.org/3/library/re.html "Pattern"
[URL]: https://en.wikipedia.org/wiki/URL "URL"
[pathlib.Path]: https://realpython.com/python-pathlib/ "pathlib.Path"
[str]: https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str "str"
[Union]: https://docs.python.org/3/library/typing.html#typing.Union "Union"