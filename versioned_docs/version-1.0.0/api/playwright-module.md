---
id: playwright-module
title: "Playwright module"
---


Playwright module provides a method to launch a browser instance.
The following is a typical example of using Playwright to drive automation:
```js
const { chromium, firefox, webkit } = require('playwright');

(async () => {
  const browser = await chromium.launch();  // Or 'firefox' or 'webkit'.
  const page = await browser.newPage();
  await page.goto('http://example.com');
  // other actions...
  await browser.close();
})();
```

By default, the `playwright` NPM package automatically downloads browser executables during installation. The `playwright-core` NPM package can be used to skip automatic downloads.

<!-- GEN:toc -->
- [playwright.chromium](api/playwright-module.md#playwrightchromium)
- [playwright.devices](api/playwright-module.md#playwrightdevices)
- [playwright.errors](api/playwright-module.md#playwrighterrors)
- [playwright.firefox](api/playwright-module.md#playwrightfirefox)
- [playwright.selectors](api/playwright-module.md#playwrightselectors)
- [playwright.webkit](api/playwright-module.md#playwrightwebkit)
<!-- GEN:stop -->

## playwright.chromium
- returns: <[BrowserType]>

This object can be used to launch or connect to Chromium, returning instances of [ChromiumBrowser].

## playwright.devices
- returns: <[Object]>

Returns a list of devices to be used with [`browser.newContext([options])`](api/class-browser.md#browsernewcontextoptions) or [`browser.newPage([options])`](api/class-browser.md#browsernewpageoptions). Actual list of devices can be found in [src/deviceDescriptors.ts](https://github.com/Microsoft/playwright/blob/master/src/deviceDescriptors.ts).

```js
const { webkit, devices } = require('playwright');
const iPhone = devices['iPhone 6'];

(async () => {
  const browser = await webkit.launch();
  const context = await browser.newContext({
    ...iPhone
  });
  const page = await context.newPage();
  await page.goto('http://example.com');
  // other actions...
  await browser.close();
})();
```

## playwright.errors
- returns: <[Object]>
  - `TimeoutError` <[function]> A class of [TimeoutError].

Playwright methods might throw errors if they are unable to fulfill a request. For example, [page.waitForSelector(selector[, options])](api/class-page.md#pagewaitforselectorselector-options)
might fail if the selector doesn't match any nodes during the given timeframe.

For certain types of errors Playwright uses specific error classes.
These classes are available via [`playwright.errors`](#playwrighterrors).

An example of handling a timeout error:
```js
try {
  await page.waitForSelector('.foo');
} catch (e) {
  if (e instanceof playwright.errors.TimeoutError) {
    // Do something if this is a timeout.
  }
}
```

## playwright.firefox
- returns: <[BrowserType]>

This object can be used to launch or connect to Firefox, returning instances of [FirefoxBrowser].

## playwright.selectors
- returns: <[Selectors]>

Selectors can be used to install custom selector engines. See [Working with selectors](api/working-with-selectors.md#working-with-selectors) for more information.

## playwright.webkit
- returns: <[BrowserType]>

This object can be used to launch or connect to WebKit, returning instances of [WebKitBrowser].




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
