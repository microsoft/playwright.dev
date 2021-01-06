---
id: class-selectors
title: "Selectors"
---


Selectors can be used to install custom selector engines. See [Working with selectors](./selectors.md#working-with-selectors) for more information.


- [selectors.register(name, script[, options])](./class-selectors.md#selectorsregistername-script-options)

## selectors.register(name, script[, options])
- `name` <[string]> Name that is used in selectors as a prefix, e.g. `{name: 'foo'}` enables `foo=myselectorbody` selectors. May only contain `[a-zA-Z0-9_]` characters.
- `script` <[function]|[string]|[Object]> Script that evaluates to a selector engine instance.
  - `path` <[string]> Path to the JavaScript file. If `path` is a relative path, then it is resolved relative to the current working directory. Optional.
  - `content` <[string]> Raw script content. Optional.
- `options` <[Object]>
  - `contentScript` <[boolean]> Whether to run this selector engine in isolated JavaScript environment. This environment has access to the same DOM, but not any JavaScript objects from the frame's scripts. Defaults to `false`. Note that running as a content script is not guaranteed when this engine is used together with other registered engines.
- returns: <[Promise]>

An example of registering selector engine that queries elements based on a tag name:

```js
const { selectors, firefox } = require('playwright');  // Or 'chromium' or 'webkit'.

(async () => {
  // Must be a function that evaluates to a selector engine instance.
  const createTagNameEngine = () => ({
    // Returns the first element matching given selector in the root's subtree.
    query(root, selector) {
      return root.querySelector(selector);
    },

    // Returns all elements matching given selector in the root's subtree.
    queryAll(root, selector) {
      return Array.from(root.querySelectorAll(selector));
    }
  });

  // Register the engine. Selectors will be prefixed with "tag=".
  await selectors.register('tag', createTagNameEngine);

  const browser = await firefox.launch();
  const page = await browser.newPage();
  await page.setContent(`<div><button>Click me</button></div>`);

  // Use the selector prefixed with its name.
  const button = await page.$('tag=button');
  // Combine it with other selector engines.
  await page.click('tag=div >> text="Click me"');
  // Can use it in any methods supporting selectors.
  const buttonCount = await page.$$eval('tag=button', buttons => buttons.length);

  await browser.close();
})();
```


[Playwright]: ./class-playwright.md "Playwright"
[Browser]: ./class-browser.md "Browser"
[BrowserContext]: ./class-browsercontext.md "BrowserContext"
[Page]: ./class-page.md "Page"
[Frame]: ./class-frame.md "Frame"
[ElementHandle]: ./class-elementhandle.md "ElementHandle"
[JSHandle]: ./class-jshandle.md "JSHandle"
[ConsoleMessage]: ./class-consolemessage.md "ConsoleMessage"
[Dialog]: ./class-dialog.md "Dialog"
[Download]: ./class-download.md "Download"
[Video]: ./class-video.md "Video"
[FileChooser]: ./class-filechooser.md "FileChooser"
[Keyboard]: ./class-keyboard.md "Keyboard"
[Mouse]: ./class-mouse.md "Mouse"
[Touchscreen]: ./class-touchscreen.md "Touchscreen"
[Request]: ./class-request.md "Request"
[Response]: ./class-response.md "Response"
[Selectors]: ./class-selectors.md "Selectors"
[Route]: ./class-route.md "Route"
[WebSocket]: ./class-websocket.md "WebSocket"
[TimeoutError]: ./class-timeouterror.md "TimeoutError"
[Accessibility]: ./class-accessibility.md "Accessibility"
[Worker]: ./class-worker.md "Worker"
[BrowserServer]: ./class-browserserver.md "BrowserServer"
[BrowserType]: ./class-browsertype.md "BrowserType"
[Logger]: ./class-logger.md "Logger"
[ChromiumBrowser]: ./class-chromiumbrowser.md "ChromiumBrowser"
[ChromiumBrowserContext]: ./class-chromiumbrowsercontext.md "ChromiumBrowserContext"
[ChromiumCoverage]: ./class-chromiumcoverage.md "ChromiumCoverage"
[CDPSession]: ./class-cdpsession.md "CDPSession"
[FirefoxBrowser]: ./class-firefoxbrowser.md "FirefoxBrowser"
[WebKitBrowser]: ./class-webkitbrowser.md "WebKitBrowser"
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
