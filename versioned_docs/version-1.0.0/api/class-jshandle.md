---
id: class-jshandle
title: "class: JSHandle"
---


JSHandle represents an in-page JavaScript object. JSHandles can be created with the [page.evaluateHandle](api/class-page.md#pageevaluatehandlepagefunction-arg) method.

```js
const windowHandle = await page.evaluateHandle(() => window);
// ...
```

JSHandle prevents the referenced JavaScript object being garbage collected unless the handle is [disposed](api/class-jshandle.md#jshandledispose). JSHandles are auto-disposed when their origin frame gets navigated or the parent context gets destroyed.

JSHandle instances can be used as an argument in [`page.$eval()`](#pageevalselector-pagefunction-arg), [`page.evaluate()`](api/class-page.md#pageevaluatepagefunction-arg) and [`page.evaluateHandle()`](#pageevaluatehandlepagefunction-arg) methods.

<!-- GEN:toc -->
- [jsHandle.asElement()](api/class-jshandle.md#jshandleaselement)
- [jsHandle.dispose()](#jshandledispose)
- [jsHandle.evaluate(pageFunction[, arg])](api/class-jshandle.md#jshandleevaluatepagefunction-arg)
- [jsHandle.evaluateHandle(pageFunction[, arg])](api/class-jshandle.md#jshandleevaluatehandlepagefunction-arg)
- [jsHandle.getProperties()](api/class-jshandle.md#jshandlegetproperties)
- [jsHandle.getProperty(propertyName)](api/class-jshandle.md#jshandlegetpropertypropertyname)
- [jsHandle.jsonValue()](api/class-jshandle.md#jshandlejsonvalue)
<!-- GEN:stop -->

## jsHandle.asElement()
- returns: <?[ElementHandle]>

Returns either `null` or the object handle itself, if the object handle is an instance of [ElementHandle].

## jsHandle.dispose()
- returns: <[Promise]> Promise which resolves when the object handle is successfully disposed.

The `jsHandle.dispose` method stops referencing the element handle.

## jsHandle.evaluate(pageFunction[, arg])
- `pageFunction` <[function]\([Object]\)> Function to be evaluated in browser context
- `arg` <[Serializable]|[JSHandle]> Optional argument to pass to `pageFunction`
- returns: <[Promise]<[Serializable]>> Promise which resolves to the return value of `pageFunction`

This method passes this handle as the first argument to `pageFunction`.

If `pageFunction` returns a [Promise], then `handle.evaluate` would wait for the promise to resolve and return its value.

Examples:
```js
const tweetHandle = await page.$('.tweet .retweets');
expect(await tweetHandle.evaluate((node, suffix) => node.innerText, ' retweets')).toBe('10 retweets');
```

## jsHandle.evaluateHandle(pageFunction[, arg])
- `pageFunction` <[function]|[string]> Function to be evaluated
- `arg` <[Serializable]|[JSHandle]> Optional argument to pass to `pageFunction`
- returns: <[Promise]<[JSHandle]>> Promise which resolves to the return value of `pageFunction` as in-page object (JSHandle)

This method passes this handle as the first argument to `pageFunction`.

The only difference between `jsHandle.evaluate` and `jsHandle.evaluateHandle` is that `jsHandle.evaluateHandle` returns in-page object (JSHandle).

If the function passed to the `jsHandle.evaluateHandle` returns a [Promise], then `jsHandle.evaluateHandle` would wait for the promise to resolve and return its value.

See [page.evaluateHandle()](#pageevaluatehandlepagefunction-arg) for more details.

## jsHandle.getProperties()
- returns: <[Promise]<[Map]<[string], [JSHandle]>>>

The method returns a map with **own property names** as keys and JSHandle instances for the property values.

```js
const handle = await page.evaluateHandle(() => ({window, document}));
const properties = await handle.getProperties();
const windowHandle = properties.get('window');
const documentHandle = properties.get('document');
await handle.dispose();
```

## jsHandle.getProperty(propertyName)
- `propertyName` <[string]> property to get
- returns: <[Promise]<[JSHandle]>>

Fetches a single property from the referenced object.

## jsHandle.jsonValue()
- returns: <[Promise]<[Object]>>

Returns a JSON representation of the object. If the object has a
[`toJSON`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#toJSON()_behavior)
function, it **will not be called**.

> **NOTE** The method will return an empty JSON object if the referenced object is not stringifiable. It will throw an error if the object has circular references.



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
