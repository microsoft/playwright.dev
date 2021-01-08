---
id: class-jshandle
title: "JSHandle"
---


JSHandle represents an in-page JavaScript object. JSHandles can be created with the [page.evaluate_handle(page_function, **options)](./api/class-page.md#pageevaluatehandlepagefunction-options) method.

JSHandle prevents the referenced JavaScript object being garbage collected unless the handle is exposed with [js_handle.dispose()](./api/class-jshandle.md#jshandledispose). JSHandles are auto-disposed when their origin frame gets navigated or the parent context gets destroyed.

JSHandle instances can be used as an argument in [page.$eval(selector, page_function, **options)](./api/class-page.md#pageevalselector-pagefunction-options), [page.evaluate(page_function, **options)](./api/class-page.md#pageevaluatepagefunction-options) and [page.evaluate_handle(page_function, **options)](./api/class-page.md#pageevaluatehandlepagefunction-options) methods.


- [js_handle.as_element()](./api/class-jshandle.md#jshandleaselement)
- [js_handle.dispose()](./api/class-jshandle.md#jshandledispose)
- [js_handle.evaluate(page_function, **options)](./api/class-jshandle.md#jshandleevaluatepagefunction-options)
- [js_handle.evaluate_handle(page_function, **options)](./api/class-jshandle.md#jshandleevaluatehandlepagefunction-options)
- [js_handle.get_properties()](./api/class-jshandle.md#jshandlegetproperties)
- [js_handle.get_property(property_name)](./api/class-jshandle.md#jshandlegetpropertypropertyname)
- [js_handle.json_value()](./api/class-jshandle.md#jshandlejsonvalue)

## js_handle.as_element()
- returns: <[NoneType]|[ElementHandle]>

Returns either `null` or the object handle itself, if the object handle is an instance of [ElementHandle].

## js_handle.dispose()

The `jsHandle.dispose` method stops referencing the element handle.

## js_handle.evaluate(page_function, **options)
- `page_function` <[Callable]> Function to be evaluated in browser context
- `arg` <[EvaluationArgument]> Optional argument to pass to `pageFunction`
- returns: <[Serializable]>

Returns the return value of `pageFunction`

This method passes this handle as the first argument to `pageFunction`.

If `pageFunction` returns a [Promise], then `handle.evaluate` would wait for the promise to resolve and return its value.

Examples:

## js_handle.evaluate_handle(page_function, **options)
- `page_function` <[Callable]|[str]> Function to be evaluated
- `arg` <[EvaluationArgument]> Optional argument to pass to `pageFunction`
- returns: <[JSHandle]>

Returns the return value of `pageFunction` as in-page object (JSHandle).

This method passes this handle as the first argument to `pageFunction`.

The only difference between `jsHandle.evaluate` and `jsHandle.evaluateHandle` is that `jsHandle.evaluateHandle` returns in-page object (JSHandle).

If the function passed to the `jsHandle.evaluateHandle` returns a [Promise], then `jsHandle.evaluateHandle` would wait for the promise to resolve and return its value.

See [page.evaluate_handle(page_function, **options)](./api/class-page.md#pageevaluatehandlepagefunction-options) for more details.

## js_handle.get_properties()
- returns: <[Map]\[[str], [JSHandle]\]>

The method returns a map with **own property names** as keys and JSHandle instances for the property values.

## js_handle.get_property(property_name)
- `property_name` <[str]> property to get
- returns: <[JSHandle]>

Fetches a single property from the referenced object.

## js_handle.json_value()
- returns: <[Serializable]>

Returns a JSON representation of the object. If the object has a `toJSON` function, it **will not be called**.

> **NOTE** The method will return an empty JSON object if the referenced object is not stringifiable. It will throw an error if the object has circular references.

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