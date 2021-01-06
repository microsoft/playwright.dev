---
id: class-worker
title: "Worker"
---


The Worker class represents a [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API). `worker` event is emitted on the page object to signal a worker creation. `close` event is emitted on the worker object when the worker is gone.

```js
page.on('worker', worker => {
  console.log('Worker created: ' + worker.url());
  worker.on('close', worker => console.log('Worker destroyed: ' + worker.url()));
});

console.log('Current workers:');
for (const worker of page.workers())
  console.log('  ' + worker.url());
```


- [worker.on('close')](./class-worker.md#workeronclose)
- [worker.evaluate(pageFunction[, arg])](./class-worker.md#workerevaluatepagefunction-arg)
- [worker.evaluateHandle(pageFunction[, arg])](./class-worker.md#workerevaluatehandlepagefunction-arg)
- [worker.url()](./class-worker.md#workerurl)

## worker.on('close')
- type: <[Worker]>

Emitted when this dedicated [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) is terminated.

## worker.evaluate(pageFunction[, arg])
- `pageFunction` <[function]|[string]> Function to be evaluated in the worker context
- `arg` <[EvaluationArgument]> Optional argument to pass to `pageFunction`
- returns: <[Promise]<[Serializable]>>

Returns the return value of `pageFunction`

If the function passed to the `worker.evaluate` returns a [Promise], then `worker.evaluate` would wait for the promise to resolve and return its value.

If the function passed to the `worker.evaluate` returns a non-[Serializable] value, then `worker.evaluate` returns `undefined`. DevTools Protocol also supports transferring some additional values that are not serializable by `JSON`: `-0`, `NaN`, `Infinity`, `-Infinity`, and bigint literals.

## worker.evaluateHandle(pageFunction[, arg])
- `pageFunction` <[function]|[string]> Function to be evaluated in the page context
- `arg` <[EvaluationArgument]> Optional argument to pass to `pageFunction`
- returns: <[Promise]<[JSHandle]>>

Returns the return value of `pageFunction` as in-page object (JSHandle).

The only difference between `worker.evaluate` and `worker.evaluateHandle` is that `worker.evaluateHandle` returns in-page object (JSHandle).

If the function passed to the `worker.evaluateHandle` returns a [Promise], then `worker.evaluateHandle` would wait for the promise to resolve and return its value.

## worker.url()
- returns: <[string]>

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
