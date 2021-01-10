---
id: class-browser
title: "Browser"
---

* extends: [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)

A Browser is created via [browser_type.launch(**options)](./api/class-browsertype.md#browsertypelaunchoptions). An example of using a [Browser] to create a [Page]:

See [ChromiumBrowser], [FirefoxBrowser] and [WebKitBrowser] for browser-specific features. Note that [browser_type.launch(**options)](./api/class-browsertype.md#browsertypelaunchoptions) always returns a specific browser instance, based on the browser being launched.


- [browser.on("disconnected")](./api/class-browser.md#browserondisconnected)
- [browser.close()](./api/class-browser.md#browserclose)
- [browser.contexts()](./api/class-browser.md#browsercontexts)
- [browser.is_connected()](./api/class-browser.md#browserisconnected)
- [browser.new_context(**options)](./api/class-browser.md#browsernewcontextoptions)
- [browser.new_page(**options)](./api/class-browser.md#browsernewpageoptions)
- [browser.version()](./api/class-browser.md#browserversion)

## browser.on("disconnected")

Emitted when Browser gets disconnected from the browser application. This might happen because of one of the following:
* Browser application is closed or crashed.
* The [browser.close()](./api/class-browser.md#browserclose) method was called.

## browser.close()

In case this browser is obtained using [browser_type.launch(**options)](./api/class-browsertype.md#browsertypelaunchoptions), closes the browser and all of its pages (if any were opened).

In case this browser is connected to, clears all created contexts belonging to this browser and disconnects from the browser server.

The [Browser] object itself is considered to be disposed and cannot be used anymore.

## browser.contexts()
- returns: <[List]\[[BrowserContext]\]>

Returns an array of all open browser contexts. In a newly created browser, this will return zero browser contexts.

## browser.is_connected()
- returns: <[bool]>

Indicates that the browser is connected.

## browser.new_context(**options)
- `accept_downloads` <[bool]> Whether to automatically download all the attachments. Defaults to `false` where all the downloads are canceled.
- `bypass_csp` <[bool]> Toggles bypassing page's Content-Security-Policy.
- `color_scheme` <"light"|"dark"|"no-preference"> Emulates `'prefers-colors-scheme'` media feature, supported values are `'light'`, `'dark'`, `'no-preference'`. See [page.emulate_media(**options)](./api/class-page.md#pageemulatemediaoptions) for more details. Defaults to '`light`'.
- `device_scale_factor` <[float]> Specify device scale factor (can be thought of as dpr). Defaults to `1`.
- `extra_http_headers` <[Dict]\[[str], [str]\]> An object containing additional HTTP headers to be sent with every request. All header values must be strings.
- `geolocation` <[Dict]>
  - `latitude` <[float]> Latitude between -90 and 90.
  - `longitude` <[float]> Longitude between -180 and 180.
  - `accuracy` <[float]> Non-negative accuracy value. Defaults to `0`.
- `has_touch` <[bool]> Specifies if viewport supports touch events. Defaults to false.
- `http_credentials` <[Dict]> Credentials for [HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication).
  - `username` <[str]>
  - `password` <[str]>
- `ignore_https_errors` <[bool]> Whether to ignore HTTPS errors during navigation. Defaults to `false`.
- `is_mobile` <[bool]> Whether the `meta viewport` tag is taken into account and touch events are enabled. Defaults to `false`. Not supported in Firefox.
- `java_script_enabled` <[bool]> Whether or not to enable JavaScript in the context. Defaults to `true`.
- `locale` <[str]> Specify user locale, for example `en-GB`, `de-DE`, etc. Locale will affect `navigator.language` value, `Accept-Language` request header value as well as number and date formatting rules.
- `no_viewport` <[bool]> Disables the default viewport.
- `offline` <[bool]> Whether to emulate network being offline. Defaults to `false`.
- `permissions` <[List]\[[str]\]> A list of permissions to grant to all pages in this context. See [browser_context.grant_permissions(permissions, **options)](./api/class-browsercontext.md#browsercontextgrantpermissionspermissions-options) for more details.
- `proxy` <[Dict]> Network proxy settings to use with this context. Note that browser needs to be launched with the global proxy for this option to work. If all contexts override the proxy, global proxy will be never used and can be any string, for example `launch({ proxy: { server: 'per-context' } })`.
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
- `storage_state` <[Union]\[[str], [pathlib.Path]\]|[Dict]> Populates context with given storage state. This method can be used to initialize context with logged-in information obtained via [browser_context.storage_state(**options)](./api/class-browsercontext.md#browsercontextstoragestateoptions). Either a path to the file with saved storage, or an object with the following fields:
  - `cookies` <[List]\[[Dict]\]> Optional cookies to set for context
    - `name` <[str]>
    - `value` <[str]>
    - `url` <[str]> Optional either url or domain / path are required
    - `domain` <[str]> Optional either url or domain / path are required
    - `path` <[str]> Optional either url or domain / path are required
    - `expires` <[float]> Optional Unix time in seconds.
    - `httpOnly` <[bool]> Optional httpOnly flag
    - `secure` <[bool]> Optional secure flag
    - `sameSite` <"Strict"|"Lax"|"None"> Optional sameSite flag
  - `origins` <[List]\[[Dict]\]> Optional localStorage to set for context
    - `origin` <[str]>
    - `localStorage` <[List]\[[Dict]\]>
      - `name` <[str]>
      - `value` <[str]>
- `timezone_id` <[str]> Changes the timezone of the context. See [ICU's metaZones.txt](https://cs.chromium.org/chromium/src/third_party/icu/source/data/misc/metaZones.txt?rcl=faee8bc70570192d82d2978a71e2a615788597d1) for a list of supported timezone IDs.
- `user_agent` <[str]> Specific user agent to use in this context.
- `video_size` <[Dict]> **DEPRECATED** Use `recordVideo` instead.
  - `width` <[int]> Video frame width.
  - `height` <[int]> Video frame height.
- `videos_path` <[Union]\[[str], [pathlib.Path]\]> **DEPRECATED** Use `recordVideo` instead.
- `viewport` <[NoneType]|[Dict]> Sets a consistent viewport for each page. Defaults to an 1280x720 viewport. `no_viewport` disables the fixed viewport.
  - `width` <[int]> page width in pixels.
  - `height` <[int]> page height in pixels.
- returns: <[BrowserContext]>

Creates a new browser context. It won't share cookies/cache with other browser contexts.

## browser.new_page(**options)
- `accept_downloads` <[bool]> Whether to automatically download all the attachments. Defaults to `false` where all the downloads are canceled.
- `bypass_csp` <[bool]> Toggles bypassing page's Content-Security-Policy.
- `color_scheme` <"light"|"dark"|"no-preference"> Emulates `'prefers-colors-scheme'` media feature, supported values are `'light'`, `'dark'`, `'no-preference'`. See [page.emulate_media(**options)](./api/class-page.md#pageemulatemediaoptions) for more details. Defaults to '`light`'.
- `device_scale_factor` <[float]> Specify device scale factor (can be thought of as dpr). Defaults to `1`.
- `extra_http_headers` <[Dict]\[[str], [str]\]> An object containing additional HTTP headers to be sent with every request. All header values must be strings.
- `geolocation` <[Dict]>
  - `latitude` <[float]> Latitude between -90 and 90.
  - `longitude` <[float]> Longitude between -180 and 180.
  - `accuracy` <[float]> Non-negative accuracy value. Defaults to `0`.
- `has_touch` <[bool]> Specifies if viewport supports touch events. Defaults to false.
- `http_credentials` <[Dict]> Credentials for [HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication).
  - `username` <[str]>
  - `password` <[str]>
- `ignore_https_errors` <[bool]> Whether to ignore HTTPS errors during navigation. Defaults to `false`.
- `is_mobile` <[bool]> Whether the `meta viewport` tag is taken into account and touch events are enabled. Defaults to `false`. Not supported in Firefox.
- `java_script_enabled` <[bool]> Whether or not to enable JavaScript in the context. Defaults to `true`.
- `locale` <[str]> Specify user locale, for example `en-GB`, `de-DE`, etc. Locale will affect `navigator.language` value, `Accept-Language` request header value as well as number and date formatting rules.
- `no_viewport` <[bool]> Disables the default viewport.
- `offline` <[bool]> Whether to emulate network being offline. Defaults to `false`.
- `permissions` <[List]\[[str]\]> A list of permissions to grant to all pages in this context. See [browser_context.grant_permissions(permissions, **options)](./api/class-browsercontext.md#browsercontextgrantpermissionspermissions-options) for more details.
- `proxy` <[Dict]> Network proxy settings to use with this context. Note that browser needs to be launched with the global proxy for this option to work. If all contexts override the proxy, global proxy will be never used and can be any string, for example `launch({ proxy: { server: 'per-context' } })`.
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
- `storage_state` <[Union]\[[str], [pathlib.Path]\]|[Dict]> Populates context with given storage state. This method can be used to initialize context with logged-in information obtained via [browser_context.storage_state(**options)](./api/class-browsercontext.md#browsercontextstoragestateoptions). Either a path to the file with saved storage, or an object with the following fields:
  - `cookies` <[List]\[[Dict]\]> Optional cookies to set for context
    - `name` <[str]>
    - `value` <[str]>
    - `url` <[str]> Optional either url or domain / path are required
    - `domain` <[str]> Optional either url or domain / path are required
    - `path` <[str]> Optional either url or domain / path are required
    - `expires` <[float]> Optional Unix time in seconds.
    - `httpOnly` <[bool]> Optional httpOnly flag
    - `secure` <[bool]> Optional secure flag
    - `sameSite` <"Strict"|"Lax"|"None"> Optional sameSite flag
  - `origins` <[List]\[[Dict]\]> Optional localStorage to set for context
    - `origin` <[str]>
    - `localStorage` <[List]\[[Dict]\]>
      - `name` <[str]>
      - `value` <[str]>
- `timezone_id` <[str]> Changes the timezone of the context. See [ICU's metaZones.txt](https://cs.chromium.org/chromium/src/third_party/icu/source/data/misc/metaZones.txt?rcl=faee8bc70570192d82d2978a71e2a615788597d1) for a list of supported timezone IDs.
- `user_agent` <[str]> Specific user agent to use in this context.
- `video_size` <[Dict]> **DEPRECATED** Use `recordVideo` instead.
  - `width` <[int]> Video frame width.
  - `height` <[int]> Video frame height.
- `videos_path` <[Union]\[[str], [pathlib.Path]\]> **DEPRECATED** Use `recordVideo` instead.
- `viewport` <[NoneType]|[Dict]> Sets a consistent viewport for each page. Defaults to an 1280x720 viewport. `no_viewport` disables the fixed viewport.
  - `width` <[int]> page width in pixels.
  - `height` <[int]> page height in pixels.
- returns: <[Page]>

Creates a new page in a new browser context. Closing this page will close the context as well.

This is a convenience API that should only be used for the single-page scenarios and short snippets. Production code and testing frameworks should explicitly create [browser.new_context(**options)](./api/class-browser.md#browsernewcontextoptions) followed by the [browser_context.new_page()](./api/class-browsercontext.md#browsercontextnewpage) to control their exact life times.

## browser.version()
- returns: <[str]>

Returns the browser version.

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