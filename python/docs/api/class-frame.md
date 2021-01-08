---
id: class-frame
title: "Frame"
---


At every point of time, page exposes its current frame tree via the [page.main_frame()](./api/class-page.md#pagemainframe) and [frame.child_frames()](./api/class-frame.md#framechildframes) methods.

[Frame] object's lifecycle is controlled by three events, dispatched on the page object:
* [page.on("frameattached")](./api/class-page.md#pageonframeattached) - fired when the frame gets attached to the page. A Frame can be attached to the page only once.
* [page.on("framenavigated")](./api/class-page.md#pageonframenavigated) - fired when the frame commits navigation to a different URL.
* [page.on("framedetached")](./api/class-page.md#pageonframedetached) - fired when the frame gets detached from the page.  A Frame can be detached from the page only once.

An example of dumping frame tree:

An example of getting text from an iframe element:


- [frame.query_selector(selector)](./api/class-frame.md#framequeryselectorselector)
- [frame.query_selector_all(selector)](./api/class-frame.md#framequeryselectorallselector)
- [frame.eval_on_selector(selector, page_function, **options)](./api/class-frame.md#frameevalonselectorselector-pagefunction-options)
- [frame.eval_on_selector_all(selector, page_function, **options)](./api/class-frame.md#frameevalonselectorallselector-pagefunction-options)
- [frame.add_script_tag(**options)](./api/class-frame.md#frameaddscripttagoptions)
- [frame.add_style_tag(**options)](./api/class-frame.md#frameaddstyletagoptions)
- [frame.check(selector, **options)](./api/class-frame.md#framecheckselector-options)
- [frame.child_frames()](./api/class-frame.md#framechildframes)
- [frame.click(selector, **options)](./api/class-frame.md#frameclickselector-options)
- [frame.content()](./api/class-frame.md#framecontent)
- [frame.dblclick(selector, **options)](./api/class-frame.md#framedblclickselector-options)
- [frame.dispatch_event(selector, type, **options)](./api/class-frame.md#framedispatcheventselector-type-options)
- [frame.evaluate(page_function, **options)](./api/class-frame.md#frameevaluatepagefunction-options)
- [frame.evaluate_handle(page_function, **options)](./api/class-frame.md#frameevaluatehandlepagefunction-options)
- [frame.fill(selector, value, **options)](./api/class-frame.md#framefillselector-value-options)
- [frame.focus(selector, **options)](./api/class-frame.md#framefocusselector-options)
- [frame.frame_element()](./api/class-frame.md#frameframeelement)
- [frame.get_attribute(selector, name, **options)](./api/class-frame.md#framegetattributeselector-name-options)
- [frame.goto(url, **options)](./api/class-frame.md#framegotourl-options)
- [frame.hover(selector, **options)](./api/class-frame.md#framehoverselector-options)
- [frame.inner_html(selector, **options)](./api/class-frame.md#frameinnerhtmlselector-options)
- [frame.inner_text(selector, **options)](./api/class-frame.md#frameinnertextselector-options)
- [frame.is_detached()](./api/class-frame.md#frameisdetached)
- [frame.name()](./api/class-frame.md#framename)
- [frame.page()](./api/class-frame.md#framepage)
- [frame.parent_frame()](./api/class-frame.md#frameparentframe)
- [frame.press(selector, key, **options)](./api/class-frame.md#framepressselector-key-options)
- [frame.select_option(selector, **options)](./api/class-frame.md#frameselectoptionselector-options)
- [frame.set_content(html, **options)](./api/class-frame.md#framesetcontenthtml-options)
- [frame.set_input_files(selector, files, **options)](./api/class-frame.md#framesetinputfilesselector-files-options)
- [frame.tap(selector, **options)](./api/class-frame.md#frametapselector-options)
- [frame.text_content(selector, **options)](./api/class-frame.md#frametextcontentselector-options)
- [frame.title()](./api/class-frame.md#frametitle)
- [frame.type(selector, text, **options)](./api/class-frame.md#frametypeselector-text-options)
- [frame.uncheck(selector, **options)](./api/class-frame.md#frameuncheckselector-options)
- [frame.url()](./api/class-frame.md#frameurl)
- [frame.wait_for_function(page_function, **options)](./api/class-frame.md#framewaitforfunctionpagefunction-options)
- [frame.wait_for_load_state(**options)](./api/class-frame.md#framewaitforloadstateoptions)
- [frame.wait_for_navigation(**options)](./api/class-frame.md#framewaitfornavigationoptions)
- [frame.wait_for_selector(selector, **options)](./api/class-frame.md#framewaitforselectorselector-options)
- [frame.wait_for_timeout(timeout)](./api/class-frame.md#framewaitfortimeouttimeout)

## frame.query_selector(selector)
- `selector` <[str]> A selector to query for. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- returns: <[NoneType]|[ElementHandle]>

Returns the ElementHandle pointing to the frame element.

The method finds an element matching the specified selector within the frame. See [Working with selectors](./selectors.md#working-with-selectors) for more details. If no elements match the selector, returns `null`.

## frame.query_selector_all(selector)
- `selector` <[str]> A selector to query for. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- returns: <[List]\[[ElementHandle]\]>

Returns the ElementHandles pointing to the frame elements.

The method finds all elements matching the specified selector within the frame. See [Working with selectors](./selectors.md#working-with-selectors) for more details. If no elements match the selector, returns empty array.

## frame.eval_on_selector(selector, page_function, **options)
- `selector` <[str]> A selector to query for. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- `page_function` <[Callable]\[[Element]\]> Function to be evaluated in browser context
- `arg` <[EvaluationArgument]> Optional argument to pass to `pageFunction`
- returns: <[Serializable]>

Returns the return value of `pageFunction`

The method finds an element matching the specified selector within the frame and passes it as a first argument to `pageFunction`. See [Working with selectors](./selectors.md#working-with-selectors) for more details. If no elements match the selector, the method throws an error.

If `pageFunction` returns a [Promise], then `frame.$eval` would wait for the promise to resolve and return its value.

Examples:

## frame.eval_on_selector_all(selector, page_function, **options)
- `selector` <[str]> A selector to query for. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- `page_function` <[Callable]\[[List]\[[Element]\]\]> Function to be evaluated in browser context
- `arg` <[EvaluationArgument]> Optional argument to pass to `pageFunction`
- returns: <[Serializable]>

Returns the return value of `pageFunction`

The method finds all elements matching the specified selector within the frame and passes an array of matched elements as a first argument to `pageFunction`. See [Working with selectors](./selectors.md#working-with-selectors) for more details.

If `pageFunction` returns a [Promise], then `frame.$$eval` would wait for the promise to resolve and return its value.

Examples:

## frame.add_script_tag(**options)
- `url` <[str]> URL of a script to be added. Optional.
- `path` <[Union]\[[str], [pathlib.Path]\]> Path to the JavaScript file to be injected into frame. If `path` is a relative path, then it is resolved relative to the current working directory. Optional.
- `content` <[str]> Raw JavaScript content to be injected into frame. Optional.
- `type` <[str]> Script type. Use 'module' in order to load a Javascript ES6 module. See [script](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) for more details. Optional.
- returns: <[ElementHandle]>

Returns the added tag when the script's onload fires or when the script content was injected into frame.

Adds a `<script>` tag into the page with the desired url or content.

## frame.add_style_tag(**options)
- `url` <[str]> URL of the `<link>` tag. Optional.
- `path` <[Union]\[[str], [pathlib.Path]\]> Path to the CSS file to be injected into frame. If `path` is a relative path, then it is resolved relative to the current working directory. Optional.
- `content` <[str]> Raw CSS content to be injected into frame. Optional.
- returns: <[ElementHandle]>

Returns the added tag when the stylesheet's onload fires or when the CSS content was injected into frame.

Adds a `<link rel="stylesheet">` tag into the page with the desired url or a `<style type="text/css">` tag with the content.

## frame.check(selector, **options)
- `selector` <[str]> A selector to search for element. If there are multiple elements satisfying the selector, the first will be used. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- `force` <[bool]> Whether to bypass the [actionability](./actionability.md) checks. Defaults to `false`.
- `no_wait_after` <[bool]> Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
- `timeout` <[float]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.

This method checks an element matching `selector` by performing the following steps:
1. Find an element match matching `selector`. If there is none, wait until a matching element is attached to the DOM.
1. Ensure that matched element is a checkbox or a radio input. If not, this method rejects. If the element is already checked, this method returns immediately.
1. Wait for [actionability](./actionability.md) checks on the matched element, unless `force` option is set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [page.mouse](./api/class-page.md#pagemouse) to click in the center of the element.
1. Wait for initiated navigations to either succeed or fail, unless `noWaitAfter` option is set.
1. Ensure that the element is now checked. If not, this method rejects.

When all steps combined have not finished during the specified `timeout`, this method rejects with a [TimeoutError]. Passing zero timeout disables this.

## frame.child_frames()
- returns: <[List]\[[Frame]\]>

## frame.click(selector, **options)
- `selector` <[str]> A selector to search for element. If there are multiple elements satisfying the selector, the first will be used. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- `button` <"left"|"right"|"middle"> Defaults to `left`.
- `click_count` <[int]> defaults to 1. See [UIEvent.detail].
- `delay` <[float]> Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.
- `force` <[bool]> Whether to bypass the [actionability](./actionability.md) checks. Defaults to `false`.
- `modifiers` <[List]\["Alt"|"Control"|"Meta"|"Shift"\]> Modifier keys to press. Ensures that only these modifiers are pressed during the operation, and then restores current modifiers back. If not specified, currently pressed modifiers are used.
- `no_wait_after` <[bool]> Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
- `position` <[Dict]> A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
  - `x` <[float]>
  - `y` <[float]>
- `timeout` <[float]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.

This method clicks an element matching `selector` by performing the following steps:
1. Find an element match matching `selector`. If there is none, wait until a matching element is attached to the DOM.
1. Wait for [actionability](./actionability.md) checks on the matched element, unless `force` option is set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [page.mouse](./api/class-page.md#pagemouse) to click in the center of the element, or the specified `position`.
1. Wait for initiated navigations to either succeed or fail, unless `noWaitAfter` option is set.

When all steps combined have not finished during the specified `timeout`, this method rejects with a [TimeoutError]. Passing zero timeout disables this.

## frame.content()
- returns: <[str]>

Gets the full HTML contents of the frame, including the doctype.

## frame.dblclick(selector, **options)
- `selector` <[str]> A selector to search for element. If there are multiple elements satisfying the selector, the first will be used. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- `button` <"left"|"right"|"middle"> Defaults to `left`.
- `delay` <[float]> Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.
- `force` <[bool]> Whether to bypass the [actionability](./actionability.md) checks. Defaults to `false`.
- `modifiers` <[List]\["Alt"|"Control"|"Meta"|"Shift"\]> Modifier keys to press. Ensures that only these modifiers are pressed during the operation, and then restores current modifiers back. If not specified, currently pressed modifiers are used.
- `no_wait_after` <[bool]> Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
- `position` <[Dict]> A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
  - `x` <[float]>
  - `y` <[float]>
- `timeout` <[float]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.

This method double clicks an element matching `selector` by performing the following steps:
1. Find an element match matching `selector`. If there is none, wait until a matching element is attached to the DOM.
1. Wait for [actionability](./actionability.md) checks on the matched element, unless `force` option is set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [page.mouse](./api/class-page.md#pagemouse) to double click in the center of the element, or the specified `position`.
1. Wait for initiated navigations to either succeed or fail, unless `noWaitAfter` option is set. Note that if the first click of the `dblclick()` triggers a navigation event, this method will reject.

When all steps combined have not finished during the specified `timeout`, this method rejects with a [TimeoutError]. Passing zero timeout disables this.

> **NOTE** `frame.dblclick()` dispatches two `click` events and a single `dblclick` event.

## frame.dispatch_event(selector, type, **options)
- `selector` <[str]> A selector to search for element. If there are multiple elements satisfying the selector, the first will be used. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- `type` <[str]> DOM event type: `"click"`, `"dragstart"`, etc.
- `event_init` <[EvaluationArgument]> Optional event-specific initialization properties.
- `timeout` <[float]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.

The snippet below dispatches the `click` event on the element. Regardless of the visibility state of the elment, `click` is dispatched. This is equivalend to calling [element.click()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click).

Under the hood, it creates an instance of an event based on the given `type`, initializes it with `eventInit` properties and dispatches it on the element. Events are `composed`, `cancelable` and bubble by default.

Since `eventInit` is event-specific, please refer to the events documentation for the lists of initial properties:
* [DragEvent](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent/DragEvent)
* [FocusEvent](https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent/FocusEvent)
* [KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/KeyboardEvent)
* [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/MouseEvent)
* [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/PointerEvent)
* [TouchEvent](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/TouchEvent)
* [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event/Event)

You can also specify `JSHandle` as the property value if you want live objects to be passed into the event:

## frame.evaluate(page_function, **options)
- `page_function` <[Callable]|[str]> Function to be evaluated in browser context
- `arg` <[EvaluationArgument]> Optional argument to pass to `pageFunction`
- returns: <[Serializable]>

Returns the return value of `pageFunction`

If the function passed to the `frame.evaluate` returns a [Promise], then `frame.evaluate` would wait for the promise to resolve and return its value.

If the function passed to the `frame.evaluate` returns a non-[Serializable] value, then `frame.evaluate` returns `undefined`. DevTools Protocol also supports transferring some additional values that are not serializable by `JSON`: `-0`, `NaN`, `Infinity`, `-Infinity`, and bigint literals.

A string can also be passed in instead of a function.

[ElementHandle] instances can be passed as an argument to the `frame.evaluate`:

## frame.evaluate_handle(page_function, **options)
- `page_function` <[Callable]|[str]> Function to be evaluated in the page context
- `arg` <[EvaluationArgument]> Optional argument to pass to `pageFunction`
- returns: <[JSHandle]>

Returns the return value of `pageFunction` as in-page object (JSHandle).

The only difference between `frame.evaluate` and `frame.evaluateHandle` is that `frame.evaluateHandle` returns in-page object (JSHandle).

If the function, passed to the `frame.evaluateHandle`, returns a [Promise], then `frame.evaluateHandle` would wait for the promise to resolve and return its value.

A string can also be passed in instead of a function.

[JSHandle] instances can be passed as an argument to the `frame.evaluateHandle`:

## frame.fill(selector, value, **options)
- `selector` <[str]> A selector to search for element. If there are multiple elements satisfying the selector, the first will be used. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- `value` <[str]> Value to fill for the `<input>`, `<textarea>` or `[contenteditable]` element.
- `no_wait_after` <[bool]> Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
- `timeout` <[float]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.

This method waits for an element matching `selector`, waits for [actionability](./actionability.md) checks, focuses the element, fills it and triggers an `input` event after filling. If the element matching `selector` is not an `<input>`, `<textarea>` or `[contenteditable]` element, this method throws an error. Note that you can pass an empty string to clear the input field.

To send fine-grained keyboard events, use [frame.type(selector, text, **options)](./api/class-frame.md#frametypeselector-text-options).

## frame.focus(selector, **options)
- `selector` <[str]> A selector to search for element. If there are multiple elements satisfying the selector, the first will be used. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- `timeout` <[float]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.

This method fetches an element with `selector` and focuses it. If there's no element matching `selector`, the method waits until a matching element appears in the DOM.

## frame.frame_element()
- returns: <[ElementHandle]>

Returns the `frame` or `iframe` element handle which corresponds to this frame.

This is an inverse of [element_handle.content_frame()](./api/class-elementhandle.md#elementhandlecontentframe). Note that returned handle actually belongs to the parent frame.

This method throws an error if the frame has been detached before `frameElement()` returns.

## frame.get_attribute(selector, name, **options)
- `selector` <[str]> A selector to search for element. If there are multiple elements satisfying the selector, the first will be used. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- `name` <[str]> Attribute name to get the value for.
- `timeout` <[float]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.
- returns: <[NoneType]|[str]>

Returns element attribute value.

## frame.goto(url, **options)
- `url` <[str]> URL to navigate frame to. The url should include scheme, e.g. `https://`.
- `referer` <[str]> Referer header value. If provided it will take preference over the referer header value set by [page.set_extra_http_headers(headers)](./api/class-page.md#pagesetextrahttpheadersheaders).
- `timeout` <[float]> Maximum operation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_navigation_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaultnavigationtimeouttimeout), [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout), [page.set_default_navigation_timeout(timeout)](./api/class-page.md#pagesetdefaultnavigationtimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.
- `wait_until` <"load"|"domcontentloaded"|"networkidle"> When to consider operation succeeded, defaults to `load`. Events can be either:
  * `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
  * `'load'` - consider operation to be finished when the `load` event is fired.
  * `'networkidle'` - consider operation to be finished when there are no network connections for at least `500` ms.
- returns: <[NoneType]|[Response]>

Returns the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect.

`frame.goto` will throw an error if:
* there's an SSL error (e.g. in case of self-signed certificates).
* target URL is invalid.
* the `timeout` is exceeded during navigation.
* the remote server does not respond or is unreachable.
* the main resource failed to load.

`frame.goto` will not throw an error when any valid HTTP status code is returned by the remote server, including 404 "Not Found" and 500 "Internal Server Error".  The status code for such responses can be retrieved by calling [response.status()](./api/class-response.md#responsestatus).

> **NOTE** `frame.goto` either throws an error or returns a main resource response. The only exceptions are navigation to `about:blank` or navigation to the same URL with a different hash, which would succeed and return `null`.
> **NOTE** Headless mode doesn't support navigation to a PDF document. See the [upstream issue](https://bugs.chromium.org/p/chromium/issues/detail?id=761295).

## frame.hover(selector, **options)
- `selector` <[str]> A selector to search for element. If there are multiple elements satisfying the selector, the first will be used. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- `force` <[bool]> Whether to bypass the [actionability](./actionability.md) checks. Defaults to `false`.
- `modifiers` <[List]\["Alt"|"Control"|"Meta"|"Shift"\]> Modifier keys to press. Ensures that only these modifiers are pressed during the operation, and then restores current modifiers back. If not specified, currently pressed modifiers are used.
- `position` <[Dict]> A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
  - `x` <[float]>
  - `y` <[float]>
- `timeout` <[float]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.

This method hovers over an element matching `selector` by performing the following steps:
1. Find an element match matching `selector`. If there is none, wait until a matching element is attached to the DOM.
1. Wait for [actionability](./actionability.md) checks on the matched element, unless `force` option is set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [page.mouse](./api/class-page.md#pagemouse) to hover over the center of the element, or the specified `position`.
1. Wait for initiated navigations to either succeed or fail, unless `noWaitAfter` option is set.

When all steps combined have not finished during the specified `timeout`, this method rejects with a [TimeoutError]. Passing zero timeout disables this.

## frame.inner_html(selector, **options)
- `selector` <[str]> A selector to search for element. If there are multiple elements satisfying the selector, the first will be used. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- `timeout` <[float]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.
- returns: <[str]>

Returns `element.innerHTML`.

## frame.inner_text(selector, **options)
- `selector` <[str]> A selector to search for element. If there are multiple elements satisfying the selector, the first will be used. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- `timeout` <[float]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.
- returns: <[str]>

Returns `element.innerText`.

## frame.is_detached()
- returns: <[bool]>

Returns `true` if the frame has been detached, or `false` otherwise.

## frame.name()
- returns: <[str]>

Returns frame's name attribute as specified in the tag.

If the name is empty, returns the id attribute instead.

> **NOTE** This value is calculated once when the frame is created, and will not update if the attribute is changed later.

## frame.page()
- returns: <[Page]>

Returns the page containing this frame.

## frame.parent_frame()
- returns: <[NoneType]|[Frame]>

Parent frame, if any. Detached frames and main frames return `null`.

## frame.press(selector, key, **options)
- `selector` <[str]> A selector to search for element. If there are multiple elements satisfying the selector, the first will be used. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- `key` <[str]> Name of the key to press or a character to generate, such as `ArrowLeft` or `a`.
- `delay` <[float]> Time to wait between `keydown` and `keyup` in milliseconds. Defaults to 0.
- `no_wait_after` <[bool]> Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
- `timeout` <[float]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.

`key` can specify the intended [keyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) value or a single character to generate the text for. A superset of the `key` values can be found [here](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values). Examples of the keys are:

`F1` - `F12`, `Digit0`- `Digit9`, `KeyA`- `KeyZ`, `Backquote`, `Minus`, `Equal`, `Backslash`, `Backspace`, `Tab`, `Delete`, `Escape`, `ArrowDown`, `End`, `Enter`, `Home`, `Insert`, `PageDown`, `PageUp`, `ArrowRight`, `ArrowUp`, etc.

Following modification shortcuts are also supported: `Shift`, `Control`, `Alt`, `Meta`, `ShiftLeft`.

Holding down `Shift` will type the text that corresponds to the `key` in the upper case.

If `key` is a single character, it is case-sensitive, so the values `a` and `A` will generate different respective texts.

Shortcuts such as `key: "Control+o"` or `key: "Control+Shift+T"` are supported as well. When speficied with the modifier, modifier is pressed and being held while the subsequent key is being pressed.

## frame.select_option(selector, **options)
- `selector` <[str]> A selector to query for. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- `no_wait_after` <[bool]> Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
- `timeout` <[float]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.
- `element` <[ElementHandle]|[List]\[[ElementHandle]\]> Option elements to select. Optional.
- `index` <[int]|[List]\[[int]\]> Options to select by index. Optional.
- `value` <[str]|[List]\[[str]\]> Options to select by value. If the `<select>` has the `multiple` attribute, all given options are selected, otherwise only the first option matching one of the passed options is selected. Optional.
- `label` <[str]|[List]\[[str]\]> Options to select by label. If the `<select>` has the `multiple` attribute, all given options are selected, otherwise only the first option matching one of the passed options is selected. Optional.
- returns: <[List]\[[str]\]>

Returns the array of option values that have been successfully selected.

Triggers a `change` and `input` event once all the provided options have been selected. If there's no `<select>` element matching `selector`, the method throws an error.

## frame.set_content(html, **options)
- `html` <[str]> HTML markup to assign to the page.
- `timeout` <[float]> Maximum operation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_navigation_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaultnavigationtimeouttimeout), [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout), [page.set_default_navigation_timeout(timeout)](./api/class-page.md#pagesetdefaultnavigationtimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.
- `wait_until` <"load"|"domcontentloaded"|"networkidle"> When to consider operation succeeded, defaults to `load`. Events can be either:
  * `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
  * `'load'` - consider operation to be finished when the `load` event is fired.
  * `'networkidle'` - consider operation to be finished when there are no network connections for at least `500` ms.

## frame.set_input_files(selector, files, **options)
- `selector` <[str]> A selector to search for element. If there are multiple elements satisfying the selector, the first will be used. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- `files` <[Union]\[[str], [pathlib.Path]\]|[List]\[[Union]\[[str], [pathlib.Path]\]\]|[Dict]|[List]\[[Dict]\]>
  - `name` <[str]> [File] name **required**
  - `mime_type` <[str]> [File] type **required**
  - `buffer` <[Buffer]> File content **required**
- `no_wait_after` <[bool]> Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
- `timeout` <[float]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.

This method expects `selector` to point to an [input element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input).

Sets the value of the file input to these file paths or files. If some of the `filePaths` are relative paths, then they are resolved relative to the the current working directory. For empty array, clears the selected files.

## frame.tap(selector, **options)
- `selector` <[str]> A selector to search for element. If there are multiple elements satisfying the selector, the first will be used. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- `force` <[bool]> Whether to bypass the [actionability](./actionability.md) checks. Defaults to `false`.
- `modifiers` <[List]\["Alt"|"Control"|"Meta"|"Shift"\]> Modifier keys to press. Ensures that only these modifiers are pressed during the operation, and then restores current modifiers back. If not specified, currently pressed modifiers are used.
- `no_wait_after` <[bool]> Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
- `position` <[Dict]> A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
  - `x` <[float]>
  - `y` <[float]>
- `timeout` <[float]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.

This method taps an element matching `selector` by performing the following steps:
1. Find an element match matching `selector`. If there is none, wait until a matching element is attached to the DOM.
1. Wait for [actionability](./actionability.md) checks on the matched element, unless `force` option is set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [page.touchscreen](./api/class-page.md#pagetouchscreen) to tap the center of the element, or the specified `position`.
1. Wait for initiated navigations to either succeed or fail, unless `noWaitAfter` option is set.

When all steps combined have not finished during the specified `timeout`, this method rejects with a [TimeoutError]. Passing zero timeout disables this.

> **NOTE** `frame.tap()` requires that the `hasTouch` option of the browser context be set to true.

## frame.text_content(selector, **options)
- `selector` <[str]> A selector to search for element. If there are multiple elements satisfying the selector, the first will be used. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- `timeout` <[float]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.
- returns: <[NoneType]|[str]>

Returns `element.textContent`.

## frame.title()
- returns: <[str]>

Returns the page title.

## frame.type(selector, text, **options)
- `selector` <[str]> A selector to search for element. If there are multiple elements satisfying the selector, the first will be used. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- `text` <[str]> A text to type into a focused element.
- `delay` <[float]> Time to wait between key presses in milliseconds. Defaults to 0.
- `no_wait_after` <[bool]> Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
- `timeout` <[float]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.

Sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text. `frame.type` can be used to send fine-grained keyboard events. To fill values in form fields, use [frame.fill(selector, value, **options)](./api/class-frame.md#framefillselector-value-options).

To press a special key, like `Control` or `ArrowDown`, use [keyboard.press(key, **options)](./api/class-keyboard.md#keyboardpresskey-options).

## frame.uncheck(selector, **options)
- `selector` <[str]> A selector to search for element. If there are multiple elements satisfying the selector, the first will be used. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- `force` <[bool]> Whether to bypass the [actionability](./actionability.md) checks. Defaults to `false`.
- `no_wait_after` <[bool]> Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
- `timeout` <[float]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.

This method checks an element matching `selector` by performing the following steps:
1. Find an element match matching `selector`. If there is none, wait until a matching element is attached to the DOM.
1. Ensure that matched element is a checkbox or a radio input. If not, this method rejects. If the element is already unchecked, this method returns immediately.
1. Wait for [actionability](./actionability.md) checks on the matched element, unless `force` option is set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [page.mouse](./api/class-page.md#pagemouse) to click in the center of the element.
1. Wait for initiated navigations to either succeed or fail, unless `noWaitAfter` option is set.
1. Ensure that the element is now unchecked. If not, this method rejects.

When all steps combined have not finished during the specified `timeout`, this method rejects with a [TimeoutError]. Passing zero timeout disables this.

## frame.url()
- returns: <[str]>

Returns frame's url.

## frame.wait_for_function(page_function, **options)
- `page_function` <[Callable]|[str]> Function to be evaluated in browser context
- `arg` <[EvaluationArgument]> Optional argument to pass to `pageFunction`
- `polling` <[float]|"raf"> If `polling` is `'raf'`, then `pageFunction` is constantly executed in `requestAnimationFrame` callback. If `polling` is a number, then it is treated as an interval in milliseconds at which the function would be executed. Defaults to `raf`.
- `timeout` <[float]> maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout).
- returns: <[JSHandle]>

Returns when the `pageFunction` returns a truthy value, returns that value.

The `waitForFunction` can be used to observe viewport size change:

To pass an argument to the predicate of `frame.waitForFunction` function:

## frame.wait_for_load_state(**options)
- `state` <"load"|"domcontentloaded"|"networkidle"> Optional load state to wait for, defaults to `load`. If the state has been already reached while loading current document, the method returns immediately. Can be one of:
  * `'load'` - wait for the `load` event to be fired.
  * `'domcontentloaded'` - wait for the `DOMContentLoaded` event to be fired.
  * `'networkidle'` - wait until there are no network connections for at least `500` ms.
- `timeout` <[float]> Maximum operation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_navigation_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaultnavigationtimeouttimeout), [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout), [page.set_default_navigation_timeout(timeout)](./api/class-page.md#pagesetdefaultnavigationtimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.

Waits for the required load state to be reached.

This returns when the frame reaches a required load state, `load` by default. The navigation must have been committed when this method is called. If current document has already reached the required state, resolves immediately.

## frame.wait_for_navigation(**options)
- `timeout` <[float]> Maximum operation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_navigation_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaultnavigationtimeouttimeout), [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout), [page.set_default_navigation_timeout(timeout)](./api/class-page.md#pagesetdefaultnavigationtimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.
- `url` <[str]|[Pattern]|[Callable]\[[URL]\]:[bool]> URL string, URL regex pattern or predicate receiving [URL] to match while waiting for the navigation.
- `wait_until` <"load"|"domcontentloaded"|"networkidle"> When to consider operation succeeded, defaults to `load`. Events can be either:
  * `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
  * `'load'` - consider operation to be finished when the `load` event is fired.
  * `'networkidle'` - consider operation to be finished when there are no network connections for at least `500` ms.
- returns: <[NoneType]|[Response]>

Returns the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect. In case of navigation to a different anchor or navigation due to History API usage, the navigation will resolve with `null`.

This method waits for the frame to navigate to a new URL. It is useful for when you run code which will indirectly cause the frame to navigate. Consider this example:

**NOTE** Usage of the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) to change the URL is considered a navigation.

## frame.wait_for_selector(selector, **options)
- `selector` <[str]> A selector to query for. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- `state` <"attached"|"detached"|"visible"|"hidden"> Defaults to `'visible'`. Can be either:
  * `'attached'` - wait for element to be present in DOM.
  * `'detached'` - wait for element to not be present in DOM.
  * `'visible'` - wait for element to have non-empty bounding box and no `visibility:hidden`. Note that element without any content or with `display:none` has an empty bounding box and is not considered visible.
  * `'hidden'` - wait for element to be either detached from DOM, or have an empty bounding box or `visibility:hidden`. This is opposite to the `'visible'` option.
- `timeout` <[float]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.
- returns: <[NoneType]|[ElementHandle]>

Returns when element specified by selector satisfies `state` option. Returns `null` if waiting for `hidden` or `detached`.

Wait for the `selector` to satisfy `state` option (either appear/disappear from dom, or become visible/hidden). If at the moment of calling the method `selector` already satisfies the condition, the method will return immediately. If the selector doesn't satisfy the condition for the `timeout` milliseconds, the function will throw.

This method works across navigations:

## frame.wait_for_timeout(timeout)
- `timeout` <[float]> A timeout to wait for

Waits for the given `timeout` in milliseconds.

Note that `frame.waitForTimeout()` should only be used for debugging. Tests using the timer in production are going to be flaky. Use signals such as network events, selectors becoming visible and others instead.

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