---
id: debug
title: "Debugging tools"
---

Playwright scripts work with existing debugging tools, like Node.js debuggers and browser developer tools. Playwright also introduces new debugging features for browser automation.

- [Run in headful mode](#run-in-headful-mode)
- [Visual Studio Code debugger](#visual-studio-code-debugger)
- [Browser Developer Tools](#browser-developer-tools)
- [Run in Debug Mode](#run-in-debug-mode)
- [Verbose API logs](#verbose-api-logs)

## Run in headful mode

Playwright runs browsers in headless mode by default. To change this behavior, use `headless: false` as a launch option. You can also use the `slowMo` option to slow down execution and follow along while debugging.

```js
await chromium.launch({ headless: false, slowMo: 100 }); // or firefox, webkit
```

## Visual Studio Code debugger

The VS Code debugger can be used to pause and resume execution of Playwright scripts with breakpoints. The debugger can be configured in two ways.

### Use launch config

Setup [`launch.json` configuration](https://code.visualstudio.com/docs/nodejs/nodejs-debugging) for your Node.js project. Once configured launch the scripts with F5 and use breakpoints.

### Use the new JavaScript debugger

VS Code 1.46+ introduces the new JavaScript debugger behind a feature flag. The new debugger does not require a `launch.json` configuration. To use this:
1. Enable the preview debugger
   * Open JSON settings and add `"debug.javascript.usePreview": true`
   * Open settings UI and enable the `Debug › JavaScript: Use Preview` setting
1. Set a breakpoint in VS Code
   * Use the `debugger` keyword or set a breakpoint in the VS Code UI
1. Run your Node.js script from the terminal

## Browser Developer Tools

You can use browser developer tools in Chromium, Firefox and WebKit while running a Playwright script. Developer tools help to:
* Inspect the DOM tree and **find element selectors**
* **See console logs** during execution (or learn how to [read logs via API](./verification.md#console-logs))
* Check **network activity** and other developer tools features

<a href="https://user-images.githubusercontent.com/284612/77234134-5f21a500-6b69-11ea-92ec-1c146e1333ec.png"><img src="https://user-images.githubusercontent.com/284612/77234134-5f21a500-6b69-11ea-92ec-1c146e1333ec.png" width="500" alt="Chromium Developer Tools"></img></a>

> **For WebKit**: Note that launching WebKit Inspector during the execution will prevent the Playwright script from executing any further.

### API for Chromium

In Chromium, you can also open developer tools through a launch option.

```js
await chromium.launch({ devtools: true });
```

## Run in Debug Mode

Set the `PWDEBUG` environment variable to run your scripts in debug mode. This configures the browser for debugging.

```sh
# Linux/macOS
$ PWDEBUG=1 npm run test

# Windows
$ set PWDEBUG=1
$ npm run test
```

### Defaults

With PWDEBUG, the following defaults are configured for you:
* **Run in headful**: With PWDEBUG, browsers always launch in headful mode
* **Disables timeout**: PWDEBUG sets timeout to 0 (= no timeout)
* **Preserve DevTools preferences**: When used with `devtools: true`, PWDEBUG preserves the docked/undocked state of Chrome DevTools

### Debugging Selectors

PWDEBUG configures a `playwright` object in the browser to highlight [Playwright selectors](./selectors.md). This can be used to verify text or composite selectors. To use this:
1. Setup a breakpoint to pause the execution
1. Open the console panel in browser developer tools
1. Use the `playwright` API
   * `playwright.$(selector)`: Highlight the first occurrence of the selector. This reflects how `page.$` would see the page.
   * `playwright.$$(selector)`: Highlight all occurrences of the selector. This reflects how `page.$$` would see the page.
   * `playwright.inspect(selector)`: Inspect the selector in the Elements panel.
   * `playwright.clear()`: Clear existing highlights.

<a href="https://user-images.githubusercontent.com/284612/86857345-299abc00-c073-11ea-9e31-02923a9f0d4b.png"><img src="https://user-images.githubusercontent.com/284612/86857345-299abc00-c073-11ea-9e31-02923a9f0d4b.png" width="500" alt="Highlight selectors"></img></a>

### Evaluate Source Maps

PWDEBUG also enables source maps for [`page.evaluate` executions](./core-concepts.md#evaluation). This improves the debugging experience for JavaScript executions in the page context.

<a href="https://user-images.githubusercontent.com/284612/86857568-a6c63100-c073-11ea-82a4-bfd531a4ec87.png"><img src="https://user-images.githubusercontent.com/284612/86857568-a6c63100-c073-11ea-82a4-bfd531a4ec87.png" width="500" alt="Highlight selectors"></img></a>

## Verbose API logs

Playwright supports verbose logging with the `DEBUG` environment variable.

```sh
# Linux/macOS
$ DEBUG=pw:api npm run test

# Windows
$ set DEBUG=pw:api
$ npm run test
```


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