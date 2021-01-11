---
id: class-page
title: "Page"
---

* extends: [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)

Page provides methods to interact with a single tab in a [Browser], or an [extension background page](https://developer.chrome.com/extensions/background_pages) in Chromium. One [Browser] instance might have multiple [Page] instances.

This example creates a page, navigates it to a URL, and then saves a screenshot:

The Page class emits various events (described below) which can be handled using any of Node's native [`EventEmitter`](https://nodejs.org/api/events.html#events_class_eventemitter) methods, such as `on`, `once` or `removeListener`.

This example logs a message for a single page `load` event:

To unsubscribe from events use the `removeListener` method:


- [page.on("close")](./api/class-page.md#pageonclose)
- [page.on("console")](./api/class-page.md#pageonconsole)
- [page.on("crash")](./api/class-page.md#pageoncrash)
- [page.on("dialog")](./api/class-page.md#pageondialog)
- [page.on("domcontentloaded")](./api/class-page.md#pageondomcontentloaded)
- [page.on("download")](./api/class-page.md#pageondownload)
- [page.on("filechooser")](./api/class-page.md#pageonfilechooser)
- [page.on("frameattached")](./api/class-page.md#pageonframeattached)
- [page.on("framedetached")](./api/class-page.md#pageonframedetached)
- [page.on("framenavigated")](./api/class-page.md#pageonframenavigated)
- [page.on("load")](./api/class-page.md#pageonload)
- [page.on("pageerror")](./api/class-page.md#pageonpageerror)
- [page.on("popup")](./api/class-page.md#pageonpopup)
- [page.on("request")](./api/class-page.md#pageonrequest)
- [page.on("requestfailed")](./api/class-page.md#pageonrequestfailed)
- [page.on("requestfinished")](./api/class-page.md#pageonrequestfinished)
- [page.on("response")](./api/class-page.md#pageonresponse)
- [page.on("websocket")](./api/class-page.md#pageonwebsocket)
- [page.on("worker")](./api/class-page.md#pageonworker)
- [page.query_selector(selector)](./api/class-page.md#pagequeryselectorselector)
- [page.query_selector_all(selector)](./api/class-page.md#pagequeryselectorallselector)
- [page.eval_on_selector(selector, expression, **options)](./api/class-page.md#pageevalonselectorselector-expression-options)
- [page.eval_on_selector_all(selector, expression, **options)](./api/class-page.md#pageevalonselectorallselector-expression-options)
- [page.accessibility](./api/class-page.md#pageaccessibility)
- [page.add_init_script(**options)](./api/class-page.md#pageaddinitscriptoptions)
- [page.add_script_tag(**options)](./api/class-page.md#pageaddscripttagoptions)
- [page.add_style_tag(**options)](./api/class-page.md#pageaddstyletagoptions)
- [page.bring_to_front()](./api/class-page.md#pagebringtofront)
- [page.check(selector, **options)](./api/class-page.md#pagecheckselector-options)
- [page.click(selector, **options)](./api/class-page.md#pageclickselector-options)
- [page.close(**options)](./api/class-page.md#pagecloseoptions)
- [page.content()](./api/class-page.md#pagecontent)
- [page.context()](./api/class-page.md#pagecontext)
- [page.dblclick(selector, **options)](./api/class-page.md#pagedblclickselector-options)
- [page.dispatch_event(selector, type, **options)](./api/class-page.md#pagedispatcheventselector-type-options)
- [page.emulate_media(**options)](./api/class-page.md#pageemulatemediaoptions)
- [page.evaluate(expression, **options)](./api/class-page.md#pageevaluateexpression-options)
- [page.evaluate_handle(expression, **options)](./api/class-page.md#pageevaluatehandleexpression-options)
- [page.expose_binding(name, callback, **options)](./api/class-page.md#pageexposebindingname-callback-options)
- [page.expose_function(name, callback)](./api/class-page.md#pageexposefunctionname-callback)
- [page.fill(selector, value, **options)](./api/class-page.md#pagefillselector-value-options)
- [page.focus(selector, **options)](./api/class-page.md#pagefocusselector-options)
- [page.frame(**options)](./api/class-page.md#pageframeoptions)
- [page.frames()](./api/class-page.md#pageframes)
- [page.get_attribute(selector, name, **options)](./api/class-page.md#pagegetattributeselector-name-options)
- [page.go_back(**options)](./api/class-page.md#pagegobackoptions)
- [page.go_forward(**options)](./api/class-page.md#pagegoforwardoptions)
- [page.goto(url, **options)](./api/class-page.md#pagegotourl-options)
- [page.hover(selector, **options)](./api/class-page.md#pagehoverselector-options)
- [page.inner_html(selector, **options)](./api/class-page.md#pageinnerhtmlselector-options)
- [page.inner_text(selector, **options)](./api/class-page.md#pageinnertextselector-options)
- [page.is_checked(selector, **options)](./api/class-page.md#pageischeckedselector-options)
- [page.is_closed()](./api/class-page.md#pageisclosed)
- [page.is_disabled(selector, **options)](./api/class-page.md#pageisdisabledselector-options)
- [page.is_editable(selector, **options)](./api/class-page.md#pageiseditableselector-options)
- [page.is_enabled(selector, **options)](./api/class-page.md#pageisenabledselector-options)
- [page.is_hidden(selector, **options)](./api/class-page.md#pageishiddenselector-options)
- [page.is_visible(selector, **options)](./api/class-page.md#pageisvisibleselector-options)
- [page.keyboard](./api/class-page.md#pagekeyboard)
- [page.main_frame()](./api/class-page.md#pagemainframe)
- [page.mouse](./api/class-page.md#pagemouse)
- [page.opener()](./api/class-page.md#pageopener)
- [page.pdf(**options)](./api/class-page.md#pagepdfoptions)
- [page.press(selector, key, **options)](./api/class-page.md#pagepressselector-key-options)
- [page.reload(**options)](./api/class-page.md#pagereloadoptions)
- [page.route(url, handler)](./api/class-page.md#pagerouteurl-handler)
- [page.screenshot(**options)](./api/class-page.md#pagescreenshotoptions)
- [page.select_option(selector, **options)](./api/class-page.md#pageselectoptionselector-options)
- [page.set_content(html, **options)](./api/class-page.md#pagesetcontenthtml-options)
- [page.set_default_navigation_timeout(timeout)](./api/class-page.md#pagesetdefaultnavigationtimeouttimeout)
- [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout)
- [page.set_extra_http_headers(headers)](./api/class-page.md#pagesetextrahttpheadersheaders)
- [page.set_input_files(selector, files, **options)](./api/class-page.md#pagesetinputfilesselector-files-options)
- [page.set_viewport_size(viewport_size)](./api/class-page.md#pagesetviewportsizeviewportsize)
- [page.tap(selector, **options)](./api/class-page.md#pagetapselector-options)
- [page.text_content(selector, **options)](./api/class-page.md#pagetextcontentselector-options)
- [page.title()](./api/class-page.md#pagetitle)
- [page.touchscreen](./api/class-page.md#pagetouchscreen)
- [page.type(selector, text, **options)](./api/class-page.md#pagetypeselector-text-options)
- [page.uncheck(selector, **options)](./api/class-page.md#pageuncheckselector-options)
- [page.unroute(url, **options)](./api/class-page.md#pageunrouteurl-options)
- [page.url()](./api/class-page.md#pageurl)
- [page.video()](./api/class-page.md#pagevideo)
- [page.viewport_size()](./api/class-page.md#pageviewportsize)
- [page.wait_for_event(event, **options)](./api/class-page.md#pagewaitforeventevent-options)
- [page.wait_for_function(expression, **options)](./api/class-page.md#pagewaitforfunctionexpression-options)
- [page.wait_for_load_state(**options)](./api/class-page.md#pagewaitforloadstateoptions)
- [page.wait_for_navigation(**options)](./api/class-page.md#pagewaitfornavigationoptions)
- [page.wait_for_request(url_or_predicate, **options)](./api/class-page.md#pagewaitforrequesturlorpredicate-options)
- [page.wait_for_response(url_or_predicate, **options)](./api/class-page.md#pagewaitforresponseurlorpredicate-options)
- [page.wait_for_selector(selector, **options)](./api/class-page.md#pagewaitforselectorselector-options)
- [page.wait_for_timeout(timeout)](./api/class-page.md#pagewaitfortimeouttimeout)
- [page.workers()](./api/class-page.md#pageworkers)

## page.on("close")

Emitted when the page closes.

## page.on("console")
- type: <[ConsoleMessage]>

Emitted when JavaScript within the page calls one of console API methods, e.g. `console.log` or `console.dir`. Also emitted if the page throws an error or a warning.

The arguments passed into `console.log` appear as arguments on the event handler.

An example of handling `console` event:

## page.on("crash")

Emitted when the page crashes. Browser pages might crash if they try to allocate too much memory. When the page crashes, ongoing and subsequent operations will throw.

The most common way to deal with crashes is to catch an exception:

However, when manually listening to events, it might be useful to avoid stalling when the page crashes. In this case, handling `crash` event helps:

## page.on("dialog")
- type: <[Dialog]>

Emitted when a JavaScript dialog appears, such as `alert`, `prompt`, `confirm` or `beforeunload`. Playwright can respond to the dialog via [dialog.accept(**options)](./api/class-dialog.md#dialogacceptoptions) or [dialog.dismiss()](./api/class-dialog.md#dialogdismiss) methods.

## page.on("domcontentloaded")

Emitted when the JavaScript [`DOMContentLoaded`](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded) event is dispatched.

## page.on("download")
- type: <[Download]>

Emitted when attachment download started. User can access basic file operations on downloaded content via the passed [Download] instance.

> **NOTE** Browser context **must** be created with the `acceptDownloads` set to `true` when user needs access to the downloaded content. If `acceptDownloads` is not set or set to `false`, download events are emitted, but the actual download is not performed and user has no access to the downloaded files.

## page.on("filechooser")
- type: <[FileChooser]>

Emitted when a file chooser is supposed to appear, such as after clicking the  `<input type=file>`. Playwright can respond to it via setting the input files using [file_chooser.set_files(files, **options)](./api/class-filechooser.md#filechoosersetfilesfiles-options) that can be uploaded after that.

## page.on("frameattached")
- type: <[Frame]>

Emitted when a frame is attached.

## page.on("framedetached")
- type: <[Frame]>

Emitted when a frame is detached.

## page.on("framenavigated")
- type: <[Frame]>

Emitted when a frame is navigated to a new url.

## page.on("load")

Emitted when the JavaScript [`load`](https://developer.mozilla.org/en-US/docs/Web/Events/load) event is dispatched.

## page.on("pageerror")
- type: <[Error]>

Emitted when an uncaught exception happens within the page.

## page.on("popup")
- type: <[Page]>

Emitted when the page opens a new tab or window. This event is emitted in addition to the [browser_context.on("page")](./api/class-browsercontext.md#browsercontextonpage), but only for popups relevant to this page.

The earliest moment that page is available is when it has navigated to the initial url. For example, when opening a popup with `window.open('http://example.com')`, this event will fire when the network request to "http://example.com" is done and its response has started loading in the popup.

> **NOTE** Use [page.wait_for_load_state(**options)](./api/class-page.md#pagewaitforloadstateoptions) to wait until the page gets to a particular state (you should not need it in most cases).

## page.on("request")
- type: <[Request]>

Emitted when a page issues a request. The [request] object is read-only. In order to intercept and mutate requests, see [page.route(url, handler)](./api/class-page.md#pagerouteurl-handler) or [browser_context.route(url, handler)](./api/class-browsercontext.md#browsercontextrouteurl-handler).

## page.on("requestfailed")
- type: <[Request]>

Emitted when a request fails, for example by timing out.

> **NOTE** HTTP Error responses, such as 404 or 503, are still successful responses from HTTP standpoint, so request will complete with [page.on("requestfinished")](./api/class-page.md#pageonrequestfinished) event and not with [page.on("requestfailed")](./api/class-page.md#pageonrequestfailed).

## page.on("requestfinished")
- type: <[Request]>

Emitted when a request finishes successfully after downloading the response body. For a successful response, the sequence of events is `request`, `response` and `requestfinished`.

## page.on("response")
- type: <[Response]>

Emitted when [response] status and headers are received for a request. For a successful response, the sequence of events is `request`, `response` and `requestfinished`.

## page.on("websocket")
- type: <[WebSocket]>

Emitted when <[WebSocket]> request is sent.

## page.on("worker")
- type: <[Worker]>

Emitted when a dedicated [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) is spawned by the page.

## page.query_selector(selector)
- `selector` <[str]> A selector to query for. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- returns: <[NoneType]|[ElementHandle]>

The method finds an element matching the specified selector within the page. If no elements match the selector, the return value resolves to `null`.

Shortcut for main frame's [frame.query_selector(selector)](./api/class-frame.md#framequeryselectorselector).

## page.query_selector_all(selector)
- `selector` <[str]> A selector to query for. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- returns: <[List]\[[ElementHandle]\]>

The method finds all elements matching the specified selector within the page. If no elements match the selector, the return value resolves to `[]`.

Shortcut for main frame's [frame.query_selector_all(selector)](./api/class-frame.md#framequeryselectorallselector).

## page.eval_on_selector(selector, expression, **options)
- `selector` <[str]> A selector to query for. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- `arg` <[EvaluationArgument]> Optional argument to pass to `pageFunction`
- `expression` <[str]> JavaScript expression to be evaluated in the browser context. If it looks like a function declaration, it is interpreted as a function. Otherwise, evaluated as an expression.
- `force_expr` <[bool]> Whether to treat given `expression` as JavaScript evaluate expression, even though it looks like an arrow function. Optional.
- returns: <[Serializable]>

The method finds an element matching the specified selector within the page and passes it as a first argument to `pageFunction`. If no elements match the selector, the method throws an error. Returns the value of `pageFunction`.

If `pageFunction` returns a [Promise], then [page.eval_on_selector(selector, expression, **options)](./api/class-page.md#pageevalonselectorselector-expression-options) would wait for the promise to resolve and return its value.

Examples:

Shortcut for main frame's [frame.eval_on_selector(selector, expression, **options)](./api/class-frame.md#frameevalonselectorselector-expression-options).

## page.eval_on_selector_all(selector, expression, **options)
- `selector` <[str]> A selector to query for. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- `arg` <[EvaluationArgument]> Optional argument to pass to `pageFunction`
- `expression` <[str]> JavaScript expression to be evaluated in the browser context. If it looks like a function declaration, it is interpreted as a function. Otherwise, evaluated as an expression.
- `force_expr` <[bool]> Whether to treat given `expression` as JavaScript evaluate expression, even though it looks like an arrow function. Optional.
- returns: <[Serializable]>

The method finds all elements matching the specified selector within the page and passes an array of matched elements as a first argument to `pageFunction`. Returns the result of `pageFunction` invocation.

If `pageFunction` returns a [Promise], then [page.eval_on_selector_all(selector, expression, **options)](./api/class-page.md#pageevalonselectorallselector-expression-options) would wait for the promise to resolve and return its value.

Examples:

## page.accessibility
- type: <[Accessibility]>

## page.add_init_script(**options)
- `path` <[Union]\[[str], [pathlib.Path]\]> Path to the JavaScript file. If `path` is a relative path, then it is resolved relative to the current working directory. Optional.
- `script` <[str]> Script to be evaluated in all pages in the browser context. Optional.

Adds a script which would be evaluated in one of the following scenarios:
* Whenever the page is navigated.
* Whenever the child frame is attached or navigated. In this case, the script is evaluated in the context of the newly attached frame.

The script is evaluated after the document was created but before any of its scripts were run. This is useful to amend the JavaScript environment, e.g. to seed `Math.random`.

An example of overriding `Math.random` before the page loads:

> **NOTE** The order of evaluation of multiple scripts installed via [browser_context.add_init_script(**options)](./api/class-browsercontext.md#browsercontextaddinitscriptoptions) and [page.add_init_script(**options)](./api/class-page.md#pageaddinitscriptoptions) is not defined.

## page.add_script_tag(**options)
- `content` <[str]> Raw JavaScript content to be injected into frame.
- `path` <[Union]\[[str], [pathlib.Path]\]> Path to the JavaScript file to be injected into frame. If `path` is a relative path, then it is resolved relative to the current working directory.
- `type` <[str]> Script type. Use 'module' in order to load a Javascript ES6 module. See [script](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) for more details.
- `url` <[str]> URL of a script to be added.
- returns: <[ElementHandle]>

Adds a `<script>` tag into the page with the desired url or content. Returns the added tag when the script's onload fires or when the script content was injected into frame.

Shortcut for main frame's [frame.add_script_tag(**options)](./api/class-frame.md#frameaddscripttagoptions).

## page.add_style_tag(**options)
- `content` <[str]> Raw CSS content to be injected into frame.
- `path` <[Union]\[[str], [pathlib.Path]\]> Path to the CSS file to be injected into frame. If `path` is a relative path, then it is resolved relative to the current working directory.
- `url` <[str]> URL of the `<link>` tag.
- returns: <[ElementHandle]>

Adds a `<link rel="stylesheet">` tag into the page with the desired url or a `<style type="text/css">` tag with the content. Returns the added tag when the stylesheet's onload fires or when the CSS content was injected into frame.

Shortcut for main frame's [frame.add_style_tag(**options)](./api/class-frame.md#frameaddstyletagoptions).

## page.bring_to_front()

Brings page to front (activates tab).

## page.check(selector, **options)
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

Shortcut for main frame's [frame.check(selector, **options)](./api/class-frame.md#framecheckselector-options).

## page.click(selector, **options)
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

Shortcut for main frame's [frame.click(selector, **options)](./api/class-frame.md#frameclickselector-options).

## page.close(**options)
- `run_before_unload` <[bool]> Defaults to `false`. Whether to run the [before unload](https://developer.mozilla.org/en-US/docs/Web/Events/beforeunload) page handlers.

If `runBeforeUnload` is `false`, does not run any unload handlers and waits for the page to be closed. If `runBeforeUnload` is `true` the method will run unload handlers, but will **not** wait for the page to close.

By default, `page.close()` **does not** run `beforeunload` handlers.

> **NOTE** if `runBeforeUnload` is passed as true, a `beforeunload` dialog might be summoned
> and should be handled manually via [page.on("dialog")](./api/class-page.md#pageondialog) event.

## page.content()
- returns: <[str]>

Gets the full HTML contents of the page, including the doctype.

## page.context()
- returns: <[BrowserContext]>

Get the browser context that the page belongs to.

## page.dblclick(selector, **options)
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

> **NOTE** `page.dblclick()` dispatches two `click` events and a single `dblclick` event.

Shortcut for main frame's [frame.dblclick(selector, **options)](./api/class-frame.md#framedblclickselector-options).

## page.dispatch_event(selector, type, **options)
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

## page.emulate_media(**options)
- `media` <[NoneType]|"screen"|"print"> Changes the CSS media type of the page. The only allowed values are `'screen'`, `'print'` and `null`. Passing `null` disables CSS media emulation. Omitting `media` or passing `undefined` does not change the emulated value. Optional.
- `color_scheme` <[NoneType]|"light"|"dark"|"no-preference"> Emulates `'prefers-colors-scheme'` media feature, supported values are `'light'`, `'dark'`, `'no-preference'`. Passing `null` disables color scheme emulation. Omitting `colorScheme` or passing `undefined` does not change the emulated value. Optional.

## page.evaluate(expression, **options)
- `arg` <[EvaluationArgument]> Optional argument to pass to `pageFunction`
- `expression` <[str]> JavaScript expression to be evaluated in the browser context. If it looks like a function declaration, it is interpreted as a function. Otherwise, evaluated as an expression.
- `force_expr` <[bool]> Whether to treat given `expression` as JavaScript evaluate expression, even though it looks like an arrow function. Optional.
- returns: <[Serializable]>

Returns the value of the `pageFunction` invocation.

If the function passed to the `page.evaluate` returns a [Promise], then `page.evaluate` would wait for the promise to resolve and return its value.

If the function passed to the `page.evaluate` returns a non-[Serializable] value, then `page.evaluate` resolves to `undefined`. DevTools Protocol also supports transferring some additional values that are not serializable by `JSON`: `-0`, `NaN`, `Infinity`, `-Infinity`, and bigint literals.

Passing argument to `pageFunction`:

A string can also be passed in instead of a function:

[ElementHandle] instances can be passed as an argument to the `page.evaluate`:

Shortcut for main frame's [frame.evaluate(expression, **options)](./api/class-frame.md#frameevaluateexpression-options).

## page.evaluate_handle(expression, **options)
- `arg` <[EvaluationArgument]> Optional argument to pass to `pageFunction`
- `expression` <[str]> JavaScript expression to be evaluated in the browser context. If it looks like a function declaration, it is interpreted as a function. Otherwise, evaluated as an expression.
- `force_expr` <[bool]> Whether to treat given `expression` as JavaScript evaluate expression, even though it looks like an arrow function. Optional.
- returns: <[JSHandle]>

Returns the value of the `pageFunction` invocation as in-page object (JSHandle).

The only difference between `page.evaluate` and `page.evaluateHandle` is that `page.evaluateHandle` returns in-page object (JSHandle).

If the function passed to the `page.evaluateHandle` returns a [Promise], then `page.evaluateHandle` would wait for the promise to resolve and return its value.

A string can also be passed in instead of a function:

[JSHandle] instances can be passed as an argument to the `page.evaluateHandle`:

## page.expose_binding(name, callback, **options)
- `name` <[str]> Name of the function on the window object.
- `callback` <[Callable]> Callback function that will be called in the Playwright's context.
- `handle` <[bool]> Whether to pass the argument as a handle, instead of passing by value. When passing a handle, only one argument is supported. When passing by value, multiple arguments are supported.

The method adds a function called `name` on the `window` object of every frame in this page. When called, the function executes `callback` and returns a [Promise] which resolves to the return value of `callback`. If the `callback` returns a [Promise], it will be awaited.

The first argument of the `callback` function contains information about the caller: `{ browserContext: BrowserContext, page: Page, frame: Frame }`.

See [browser_context.expose_binding(name, callback, **options)](./api/class-browsercontext.md#browsercontextexposebindingname-callback-options) for the context-wide version.

> **NOTE** Functions installed via `page.exposeBinding` survive navigations.

An example of exposing page URL to all frames in a page:

An example of passing an element handle:

## page.expose_function(name, callback)
- `name` <[str]> Name of the function on the window object
- `callback` <[Callable]> Callback function which will be called in Playwright's context.

The method adds a function called `name` on the `window` object of every frame in the page. When called, the function executes `callback` and returns a [Promise] which resolves to the return value of `callback`.

If the `callback` returns a [Promise], it will be awaited.

See [browser_context.expose_function(name, callback)](./api/class-browsercontext.md#browsercontextexposefunctionname-callback) for context-wide exposed function.

> **NOTE** Functions installed via `page.exposeFunction` survive navigations.

An example of adding an `md5` function to the page:

An example of adding a `window.readfile` function to the page:

## page.fill(selector, value, **options)
- `selector` <[str]> A selector to search for element. If there are multiple elements satisfying the selector, the first will be used. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- `value` <[str]> Value to fill for the `<input>`, `<textarea>` or `[contenteditable]` element.
- `no_wait_after` <[bool]> Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
- `timeout` <[float]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.

This method waits for an element matching `selector`, waits for [actionability](./actionability.md) checks, focuses the element, fills it and triggers an `input` event after filling. If the element matching `selector` is not an `<input>`, `<textarea>` or `[contenteditable]` element, this method throws an error. Note that you can pass an empty string to clear the input field.

To send fine-grained keyboard events, use [page.type(selector, text, **options)](./api/class-page.md#pagetypeselector-text-options).

Shortcut for main frame's [frame.fill(selector, value, **options)](./api/class-frame.md#framefillselector-value-options)

## page.focus(selector, **options)
- `selector` <[str]> A selector to search for element. If there are multiple elements satisfying the selector, the first will be used. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- `timeout` <[float]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.

This method fetches an element with `selector` and focuses it. If there's no element matching `selector`, the method waits until a matching element appears in the DOM.

Shortcut for main frame's [frame.focus(selector, **options)](./api/class-frame.md#framefocusselector-options).

## page.frame(**options)
- `name` <[str]> Frame name specified in the `iframe`'s `name` attribute. Optional.
- `url` <[str]|[Pattern]|[Callable]\[[URL]\]:[bool]> A glob pattern, regex pattern or predicate receiving frame's `url` as a [URL] object. Optional.
- returns: <[NoneType]|[Frame]>

Returns frame matching the specified criteria. Either `name` or `url` must be specified.

## page.frames()
- returns: <[List]\[[Frame]\]>

An array of all frames attached to the page.

## page.get_attribute(selector, name, **options)
- `selector` <[str]> A selector to search for element. If there are multiple elements satisfying the selector, the first will be used. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- `name` <[str]> Attribute name to get the value for.
- `timeout` <[float]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.
- returns: <[NoneType]|[str]>

Returns element attribute value.

## page.go_back(**options)
- `timeout` <[float]> Maximum operation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_navigation_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaultnavigationtimeouttimeout), [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout), [page.set_default_navigation_timeout(timeout)](./api/class-page.md#pagesetdefaultnavigationtimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.
- `wait_until` <"load"|"domcontentloaded"|"networkidle"> When to consider operation succeeded, defaults to `load`. Events can be either:
  * `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
  * `'load'` - consider operation to be finished when the `load` event is fired.
  * `'networkidle'` - consider operation to be finished when there are no network connections for at least `500` ms.
- returns: <[NoneType]|[Response]>

Returns the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect. If can not go back, returns `null`.

Navigate to the previous page in history.

## page.go_forward(**options)
- `timeout` <[float]> Maximum operation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_navigation_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaultnavigationtimeouttimeout), [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout), [page.set_default_navigation_timeout(timeout)](./api/class-page.md#pagesetdefaultnavigationtimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.
- `wait_until` <"load"|"domcontentloaded"|"networkidle"> When to consider operation succeeded, defaults to `load`. Events can be either:
  * `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
  * `'load'` - consider operation to be finished when the `load` event is fired.
  * `'networkidle'` - consider operation to be finished when there are no network connections for at least `500` ms.
- returns: <[NoneType]|[Response]>

Returns the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect. If can not go forward, returns `null`.

Navigate to the next page in history.

## page.goto(url, **options)
- `url` <[str]> URL to navigate page to. The url should include scheme, e.g. `https://`.
- `referer` <[str]> Referer header value. If provided it will take preference over the referer header value set by [page.set_extra_http_headers(headers)](./api/class-page.md#pagesetextrahttpheadersheaders).
- `timeout` <[float]> Maximum operation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_navigation_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaultnavigationtimeouttimeout), [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout), [page.set_default_navigation_timeout(timeout)](./api/class-page.md#pagesetdefaultnavigationtimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.
- `wait_until` <"load"|"domcontentloaded"|"networkidle"> When to consider operation succeeded, defaults to `load`. Events can be either:
  * `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
  * `'load'` - consider operation to be finished when the `load` event is fired.
  * `'networkidle'` - consider operation to be finished when there are no network connections for at least `500` ms.
- returns: <[NoneType]|[Response]>

Returns the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect.

`page.goto` will throw an error if:
* there's an SSL error (e.g. in case of self-signed certificates).
* target URL is invalid.
* the `timeout` is exceeded during navigation.
* the remote server does not respond or is unreachable.
* the main resource failed to load.

`page.goto` will not throw an error when any valid HTTP status code is returned by the remote server, including 404 "Not Found" and 500 "Internal Server Error".  The status code for such responses can be retrieved by calling [response.status()](./api/class-response.md#responsestatus).

> **NOTE** `page.goto` either throws an error or returns a main resource response. The only exceptions are navigation to `about:blank` or navigation to the same URL with a different hash, which would succeed and return `null`.
> **NOTE** Headless mode doesn't support navigation to a PDF document. See the [upstream issue](https://bugs.chromium.org/p/chromium/issues/detail?id=761295).

Shortcut for main frame's [frame.goto(url, **options)](./api/class-frame.md#framegotourl-options)

## page.hover(selector, **options)
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

Shortcut for main frame's [frame.hover(selector, **options)](./api/class-frame.md#framehoverselector-options).

## page.inner_html(selector, **options)
- `selector` <[str]> A selector to search for element. If there are multiple elements satisfying the selector, the first will be used. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- `timeout` <[float]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.
- returns: <[str]>

Returns `element.innerHTML`.

## page.inner_text(selector, **options)
- `selector` <[str]> A selector to search for element. If there are multiple elements satisfying the selector, the first will be used. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- `timeout` <[float]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.
- returns: <[str]>

Returns `element.innerText`.

## page.is_checked(selector, **options)
- `selector` <[str]> A selector to search for element. If there are multiple elements satisfying the selector, the first will be used. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- `timeout` <[float]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.
- returns: <[bool]>

Returns whether the element is checked. Throws if the element is not a checkbox or radio input.

## page.is_closed()
- returns: <[bool]>

Indicates that the page has been closed.

## page.is_disabled(selector, **options)
- `selector` <[str]> A selector to search for element. If there are multiple elements satisfying the selector, the first will be used. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- `timeout` <[float]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.
- returns: <[bool]>

Returns whether the element is disabled, the opposite of [enabled](./actionability.md#enabled).

## page.is_editable(selector, **options)
- `selector` <[str]> A selector to search for element. If there are multiple elements satisfying the selector, the first will be used. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- `timeout` <[float]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.
- returns: <[bool]>

Returns whether the element is [editable](./actionability.md#editable).

## page.is_enabled(selector, **options)
- `selector` <[str]> A selector to search for element. If there are multiple elements satisfying the selector, the first will be used. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- `timeout` <[float]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.
- returns: <[bool]>

Returns whether the element is [enabled](./actionability.md#enabled).

## page.is_hidden(selector, **options)
- `selector` <[str]> A selector to search for element. If there are multiple elements satisfying the selector, the first will be used. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- `timeout` <[float]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.
- returns: <[bool]>

Returns whether the element is hidden, the opposite of [visible](./actionability.md#visible).

## page.is_visible(selector, **options)
- `selector` <[str]> A selector to search for element. If there are multiple elements satisfying the selector, the first will be used. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- `timeout` <[float]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.
- returns: <[bool]>

Returns whether the element is [visible](./actionability.md#visible).

## page.keyboard
- type: <[Keyboard]>

## page.main_frame()
- returns: <[Frame]>

The page's main frame. Page is guaranteed to have a main frame which persists during navigations.

## page.mouse
- type: <[Mouse]>

## page.opener()
- returns: <[NoneType]|[Page]>

Returns the opener for popup pages and `null` for others. If the opener has been closed already the returns `null`.

## page.pdf(**options)
- `display_header_footer` <[bool]> Display header and footer. Defaults to `false`.
- `footer_template` <[str]> HTML template for the print footer. Should use the same format as the `headerTemplate`.
- `format` <[str]> Paper format. If set, takes priority over `width` or `height` options. Defaults to 'Letter'.
- `header_template` <[str]> HTML template for the print header. Should be valid HTML markup with following classes used to inject printing values into them:
  * `'date'` formatted print date
  * `'title'` document title
  * `'url'` document location
  * `'pageNumber'` current page number
  * `'totalPages'` total pages in the document
- `height` <[str]|[float]> Paper height, accepts values labeled with units.
- `landscape` <[bool]> Paper orientation. Defaults to `false`.
- `margin` <[Dict]> Paper margins, defaults to none.
  - `top` <[str]|[float]> Top margin, accepts values labeled with units. Defaults to `0`.
  - `right` <[str]|[float]> Right margin, accepts values labeled with units. Defaults to `0`.
  - `bottom` <[str]|[float]> Bottom margin, accepts values labeled with units. Defaults to `0`.
  - `left` <[str]|[float]> Left margin, accepts values labeled with units. Defaults to `0`.
- `page_ranges` <[str]> Paper ranges to print, e.g., '1-5, 8, 11-13'. Defaults to the empty string, which means print all pages.
- `path` <[Union]\[[str], [pathlib.Path]\]> The file path to save the PDF to. If `path` is a relative path, then it is resolved relative to the current working directory. If no path is provided, the PDF won't be saved to the disk.
- `prefer_css_page_size` <[bool]> Give any CSS `@page` size declared in the page priority over what is declared in `width` and `height` or `format` options. Defaults to `false`, which will scale the content to fit the paper size.
- `print_background` <[bool]> Print background graphics. Defaults to `false`.
- `scale` <[float]> Scale of the webpage rendering. Defaults to `1`. Scale amount must be between 0.1 and 2.
- `width` <[str]|[float]> Paper width, accepts values labeled with units.
- returns: <[Buffer]>

Returns the PDF buffer.

> **NOTE** Generating a pdf is currently only supported in Chromium headless.

`page.pdf()` generates a pdf of the page with `print` css media. To generate a pdf with `screen` media, call [page.emulate_media(**options)](./api/class-page.md#pageemulatemediaoptions) before calling `page.pdf()`:

> **NOTE** By default, `page.pdf()` generates a pdf with modified colors for printing. Use the [`-webkit-print-color-adjust`](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-print-color-adjust) property to force rendering of exact colors.

The `width`, `height`, and `margin` options accept values labeled with units. Unlabeled values are treated as pixels.

A few examples:
* `page.pdf({width: 100})` - prints with width set to 100 pixels
* `page.pdf({width: '100px'})` - prints with width set to 100 pixels
* `page.pdf({width: '10cm'})` - prints with width set to 10 centimeters.

All possible units are:
* `px` - pixel
* `in` - inch
* `cm` - centimeter
* `mm` - millimeter

The `format` options are:
* `Letter`: 8.5in x 11in
* `Legal`: 8.5in x 14in
* `Tabloid`: 11in x 17in
* `Ledger`: 17in x 11in
* `A0`: 33.1in x 46.8in
* `A1`: 23.4in x 33.1in
* `A2`: 16.54in x 23.4in
* `A3`: 11.7in x 16.54in
* `A4`: 8.27in x 11.7in
* `A5`: 5.83in x 8.27in
* `A6`: 4.13in x 5.83in

> **NOTE** `headerTemplate` and `footerTemplate` markup have the following limitations:
> 1. Script tags inside templates are not evaluated.
> 2. Page styles are not visible inside templates.

## page.press(selector, key, **options)
- `selector` <[str]> A selector to search for element. If there are multiple elements satisfying the selector, the first will be used. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- `key` <[str]> Name of the key to press or a character to generate, such as `ArrowLeft` or `a`.
- `delay` <[float]> Time to wait between `keydown` and `keyup` in milliseconds. Defaults to 0.
- `no_wait_after` <[bool]> Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
- `timeout` <[float]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.

Focuses the element, and then uses [keyboard.down(key)](./api/class-keyboard.md#keyboarddownkey) and [keyboard.up(key)](./api/class-keyboard.md#keyboardupkey).

`key` can specify the intended [keyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) value or a single character to generate the text for. A superset of the `key` values can be found [here](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values). Examples of the keys are:

`F1` - `F12`, `Digit0`- `Digit9`, `KeyA`- `KeyZ`, `Backquote`, `Minus`, `Equal`, `Backslash`, `Backspace`, `Tab`, `Delete`, `Escape`, `ArrowDown`, `End`, `Enter`, `Home`, `Insert`, `PageDown`, `PageUp`, `ArrowRight`, `ArrowUp`, etc.

Following modification shortcuts are also supported: `Shift`, `Control`, `Alt`, `Meta`, `ShiftLeft`.

Holding down `Shift` will type the text that corresponds to the `key` in the upper case.

If `key` is a single character, it is case-sensitive, so the values `a` and `A` will generate different respective texts.

Shortcuts such as `key: "Control+o"` or `key: "Control+Shift+T"` are supported as well. When speficied with the modifier, modifier is pressed and being held while the subsequent key is being pressed.

## page.reload(**options)
- `timeout` <[float]> Maximum operation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_navigation_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaultnavigationtimeouttimeout), [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout), [page.set_default_navigation_timeout(timeout)](./api/class-page.md#pagesetdefaultnavigationtimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.
- `wait_until` <"load"|"domcontentloaded"|"networkidle"> When to consider operation succeeded, defaults to `load`. Events can be either:
  * `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
  * `'load'` - consider operation to be finished when the `load` event is fired.
  * `'networkidle'` - consider operation to be finished when there are no network connections for at least `500` ms.
- returns: <[NoneType]|[Response]>

Returns the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect.

## page.route(url, handler)
- `url` <[str]|[Pattern]|[Callable]\[[URL]\]:[bool]> A glob pattern, regex pattern or predicate receiving [URL] to match while routing.
- `handler` <[Callable]\[[Route], [Request]\]> handler function to route the request.

Routing provides the capability to modify network requests that are made by a page.

Once routing is enabled, every request matching the url pattern will stall unless it's continued, fulfilled or aborted.

> **NOTE** The handler will only be called for the first url if the response is a redirect.

An example of a naïve handler that aborts all image requests:

or the same snippet using a regex pattern instead:

Page routes take precedence over browser context routes (set up with [browser_context.route(url, handler)](./api/class-browsercontext.md#browsercontextrouteurl-handler)) when request matches both handlers.

> **NOTE** Enabling routing disables http cache.

## page.screenshot(**options)
- `clip` <[Dict]> An object which specifies clipping of the resulting image. Should have the following fields:
  - `x` <[float]> x-coordinate of top-left corner of clip area
  - `y` <[float]> y-coordinate of top-left corner of clip area
  - `width` <[float]> width of clipping area
  - `height` <[float]> height of clipping area
- `full_page` <[bool]> When true, takes a screenshot of the full scrollable page, instead of the currently visible viewport. Defaults to `false`.
- `omit_background` <[bool]> Hides default white background and allows capturing screenshots with transparency. Not applicable to `jpeg` images. Defaults to `false`.
- `path` <[Union]\[[str], [pathlib.Path]\]> The file path to save the image to. The screenshot type will be inferred from file extension. If `path` is a relative path, then it is resolved relative to the current working directory. If no path is provided, the image won't be saved to the disk.
- `quality` <[int]> The quality of the image, between 0-100. Not applicable to `png` images.
- `timeout` <[float]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.
- `type` <"png"|"jpeg"> Specify screenshot type, defaults to `png`.
- returns: <[Buffer]>

Returns the buffer with the captured screenshot.

> **NOTE** Screenshots take at least 1/6 second on Chromium OS X and Chromium Windows. See https://crbug.com/741689 for discussion.

## page.select_option(selector, **options)
- `selector` <[str]> A selector to search for element. If there are multiple elements satisfying the selector, the first will be used. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- `no_wait_after` <[bool]> Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
- `timeout` <[float]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.
- `element` <[ElementHandle]|[List]\[[ElementHandle]\]> Option elements to select. Optional.
- `index` <[int]|[List]\[[int]\]> Options to select by index. Optional.
- `value` <[str]|[List]\[[str]\]> Options to select by value. If the `<select>` has the `multiple` attribute, all given options are selected, otherwise only the first option matching one of the passed options is selected. Optional.
- `label` <[str]|[List]\[[str]\]> Options to select by label. If the `<select>` has the `multiple` attribute, all given options are selected, otherwise only the first option matching one of the passed options is selected. Optional.
- returns: <[List]\[[str]\]>

Returns the array of option values that have been successfully selected.

Triggers a `change` and `input` event once all the provided options have been selected. If there's no `<select>` element matching `selector`, the method throws an error.

Shortcut for main frame's [frame.select_option(selector, **options)](./api/class-frame.md#frameselectoptionselector-options)

## page.set_content(html, **options)
- `html` <[str]> HTML markup to assign to the page.
- `timeout` <[float]> Maximum operation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_navigation_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaultnavigationtimeouttimeout), [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout), [page.set_default_navigation_timeout(timeout)](./api/class-page.md#pagesetdefaultnavigationtimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.
- `wait_until` <"load"|"domcontentloaded"|"networkidle"> When to consider operation succeeded, defaults to `load`. Events can be either:
  * `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
  * `'load'` - consider operation to be finished when the `load` event is fired.
  * `'networkidle'` - consider operation to be finished when there are no network connections for at least `500` ms.

## page.set_default_navigation_timeout(timeout)
- `timeout` <[float]> Maximum navigation time in milliseconds

This setting will change the default maximum navigation time for the following methods and related shortcuts:
* [page.go_back(**options)](./api/class-page.md#pagegobackoptions)
* [page.go_forward(**options)](./api/class-page.md#pagegoforwardoptions)
* [page.goto(url, **options)](./api/class-page.md#pagegotourl-options)
* [page.reload(**options)](./api/class-page.md#pagereloadoptions)
* [page.set_content(html, **options)](./api/class-page.md#pagesetcontenthtml-options)
* [page.wait_for_navigation(**options)](./api/class-page.md#pagewaitfornavigationoptions)

> **NOTE** [page.set_default_navigation_timeout(timeout)](./api/class-page.md#pagesetdefaultnavigationtimeouttimeout) takes priority over [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout), [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout) and [browser_context.set_default_navigation_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaultnavigationtimeouttimeout).

## page.set_default_timeout(timeout)
- `timeout` <[float]> Maximum time in milliseconds

This setting will change the default maximum time for all the methods accepting `timeout` option.

> **NOTE** [page.set_default_navigation_timeout(timeout)](./api/class-page.md#pagesetdefaultnavigationtimeouttimeout) takes priority over [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout).

## page.set_extra_http_headers(headers)
- `headers` <[Dict]\[[str], [str]\]> An object containing additional HTTP headers to be sent with every request. All header values must be strings.

The extra HTTP headers will be sent with every request the page initiates.

> **NOTE** page.setExtraHTTPHeaders does not guarantee the order of headers in the outgoing requests.

## page.set_input_files(selector, files, **options)
- `selector` <[str]> A selector to search for element. If there are multiple elements satisfying the selector, the first will be used. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- `files` <[Union]\[[str], [pathlib.Path]\]|[List]\[[Union]\[[str], [pathlib.Path]\]\]|[Dict]|[List]\[[Dict]\]>
  - `name` <[str]> [File] name
  - `mimeType` <[str]> [File] type
  - `buffer` <[Buffer]> File content
- `no_wait_after` <[bool]> Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
- `timeout` <[float]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.

This method expects `selector` to point to an [input element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input).

Sets the value of the file input to these file paths or files. If some of the `filePaths` are relative paths, then they are resolved relative to the the current working directory. For empty array, clears the selected files.

## page.set_viewport_size(viewport_size)
- `viewport_size` <[Dict]>
  - `width` <[int]> page width in pixels.
  - `height` <[int]> page height in pixels.

In the case of multiple pages in a single browser, each page can have its own viewport size. However, [browser.new_context(**options)](./api/class-browser.md#browsernewcontextoptions) allows to set viewport size (and more) for all pages in the context at once.

`page.setViewportSize` will resize the page. A lot of websites don't expect phones to change size, so you should set the viewport size before navigating to the page.

## page.tap(selector, **options)
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

> **NOTE** `page.tap()` requires that the `hasTouch` option of the browser context be set to true.

Shortcut for main frame's [frame.tap(selector, **options)](./api/class-frame.md#frametapselector-options).

## page.text_content(selector, **options)
- `selector` <[str]> A selector to search for element. If there are multiple elements satisfying the selector, the first will be used. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- `timeout` <[float]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.
- returns: <[NoneType]|[str]>

Returns `element.textContent`.

## page.title()
- returns: <[str]>

Returns the page's title. Shortcut for main frame's [frame.title()](./api/class-frame.md#frametitle).

## page.touchscreen
- type: <[Touchscreen]>

## page.type(selector, text, **options)
- `selector` <[str]> A selector to search for element. If there are multiple elements satisfying the selector, the first will be used. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- `text` <[str]> A text to type into a focused element.
- `delay` <[float]> Time to wait between key presses in milliseconds. Defaults to 0.
- `no_wait_after` <[bool]> Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
- `timeout` <[float]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.

Sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text. `page.type` can be used to send fine-grained keyboard events. To fill values in form fields, use [page.fill(selector, value, **options)](./api/class-page.md#pagefillselector-value-options).

To press a special key, like `Control` or `ArrowDown`, use [keyboard.press(key, **options)](./api/class-keyboard.md#keyboardpresskey-options).

Shortcut for main frame's [frame.type(selector, text, **options)](./api/class-frame.md#frametypeselector-text-options).

## page.uncheck(selector, **options)
- `selector` <[str]> A selector to search for element. If there are multiple elements satisfying the selector, the first will be used. See [working with selectors](./selectors.md#working-with-selectors) for more details.
- `force` <[bool]> Whether to bypass the [actionability](./actionability.md) checks. Defaults to `false`.
- `no_wait_after` <[bool]> Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
- `timeout` <[float]> Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.

This method unchecks an element matching `selector` by performing the following steps:
1. Find an element match matching `selector`. If there is none, wait until a matching element is attached to the DOM.
1. Ensure that matched element is a checkbox or a radio input. If not, this method rejects. If the element is already unchecked, this method returns immediately.
1. Wait for [actionability](./actionability.md) checks on the matched element, unless `force` option is set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [page.mouse](./api/class-page.md#pagemouse) to click in the center of the element.
1. Wait for initiated navigations to either succeed or fail, unless `noWaitAfter` option is set.
1. Ensure that the element is now unchecked. If not, this method rejects.

When all steps combined have not finished during the specified `timeout`, this method rejects with a [TimeoutError]. Passing zero timeout disables this.

Shortcut for main frame's [frame.uncheck(selector, **options)](./api/class-frame.md#frameuncheckselector-options).

## page.unroute(url, **options)
- `url` <[str]|[Pattern]|[Callable]\[[URL]\]:[bool]> A glob pattern, regex pattern or predicate receiving [URL] to match while routing.
- `handler` <[Callable]\[[Route], [Request]\]> Optional handler function to route the request.

Removes a route created with [page.route(url, handler)](./api/class-page.md#pagerouteurl-handler). When `handler` is not specified, removes all routes for the `url`.

## page.url()
- returns: <[str]>

Shortcut for main frame's [frame.url()](./api/class-frame.md#frameurl).

## page.video()
- returns: <[NoneType]|[Video]>

Video object associated with this page.

## page.viewport_size()
- returns: <[NoneType]|[Dict]>
  - `width` <[int]> page width in pixels.
  - `height` <[int]> page height in pixels.

## page.wait_for_event(event, **options)
- `event` <[str]> Event name, same one would pass into `page.on(event)`.
- `predicate` <[Function]> Receives the event data and resolves to truthy value when the waiting should resolve.
- `timeout` <[float]> Maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout).
- returns: <[Any]>

Returns the event data value.

Waits for event to fire and passes its value into the predicate function. Returns when the predicate returns truthy value. Will throw an error if the page is closed before the event is fired.

## page.wait_for_function(expression, **options)
- `arg` <[EvaluationArgument]> Optional argument to pass to `pageFunction`
- `polling` <[float]|"raf"> If `polling` is `'raf'`, then `pageFunction` is constantly executed in `requestAnimationFrame` callback. If `polling` is a number, then it is treated as an interval in milliseconds at which the function would be executed. Defaults to `raf`.
- `timeout` <[float]> maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout).
- `expression` <[str]> JavaScript expression to be evaluated in the browser context. If it looks like a function declaration, it is interpreted as a function. Otherwise, evaluated as an expression.
- `force_expr` <[bool]> Whether to treat given `expression` as JavaScript evaluate expression, even though it looks like an arrow function. Optional.
- returns: <[JSHandle]>

Returns when the `pageFunction` returns a truthy value. It resolves to a JSHandle of the truthy value.

The `waitForFunction` can be used to observe viewport size change:

To pass an argument to the predicate of `page.waitForFunction` function:

Shortcut for main frame's [frame.wait_for_function(expression, **options)](./api/class-frame.md#framewaitforfunctionexpression-options).

## page.wait_for_load_state(**options)
- `state` <"load"|"domcontentloaded"|"networkidle"> Optional load state to wait for, defaults to `load`. If the state has been already reached while loading current document, the method resolves immediately. Can be one of:
  * `'load'` - wait for the `load` event to be fired.
  * `'domcontentloaded'` - wait for the `DOMContentLoaded` event to be fired.
  * `'networkidle'` - wait until there are no network connections for at least `500` ms.
- `timeout` <[float]> Maximum operation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_navigation_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaultnavigationtimeouttimeout), [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout), [page.set_default_navigation_timeout(timeout)](./api/class-page.md#pagesetdefaultnavigationtimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.

Returns when the required load state has been reached.

This resolves when the page reaches a required load state, `load` by default. The navigation must have been committed when this method is called. If current document has already reached the required state, resolves immediately.

Shortcut for main frame's [frame.wait_for_load_state(**options)](./api/class-frame.md#framewaitforloadstateoptions).

## page.wait_for_navigation(**options)
- `timeout` <[float]> Maximum operation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_navigation_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaultnavigationtimeouttimeout), [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout), [page.set_default_navigation_timeout(timeout)](./api/class-page.md#pagesetdefaultnavigationtimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.
- `url` <[str]|[Pattern]|[Callable]\[[URL]\]:[bool]> A glob pattern, regex pattern or predicate receiving [URL] to match while waiting for the navigation.
- `wait_until` <"load"|"domcontentloaded"|"networkidle"> When to consider operation succeeded, defaults to `load`. Events can be either:
  * `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
  * `'load'` - consider operation to be finished when the `load` event is fired.
  * `'networkidle'` - consider operation to be finished when there are no network connections for at least `500` ms.
- returns: <[NoneType]|[Response]>

Returns the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect. In case of navigation to a different anchor or navigation due to History API usage, the navigation will resolve with `null`.

This resolves when the page navigates to a new URL or reloads. It is useful for when you run code which will indirectly cause the page to navigate. e.g. The click target has an `onclick` handler that triggers navigation from a `setTimeout`. Consider this example:

**NOTE** Usage of the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) to change the URL is considered a navigation.

Shortcut for main frame's [frame.wait_for_navigation(**options)](./api/class-frame.md#framewaitfornavigationoptions).

## page.wait_for_request(url_or_predicate, **options)
- `url_or_predicate` <[str]|[Pattern]|[Callable]\[[Request]\]:[bool]> Request URL string, regex or predicate receiving [Request] object.
- `timeout` <[float]> Maximum wait time in milliseconds, defaults to 30 seconds, pass `0` to disable the timeout. The default value can be changed by using the [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) method.
- returns: <[Request]>

Waits for the matching request and returns it.

## page.wait_for_response(url_or_predicate, **options)
- `url_or_predicate` <[str]|[Pattern]|[Callable]\[[Response]\]:[bool]> Request URL string, regex or predicate receiving [Response] object.
- `timeout` <[float]> Maximum wait time in milliseconds, defaults to 30 seconds, pass `0` to disable the timeout. The default value can be changed by using the [browser_context.set_default_timeout(timeout)](./api/class-browsercontext.md#browsercontextsetdefaulttimeouttimeout) or [page.set_default_timeout(timeout)](./api/class-page.md#pagesetdefaulttimeouttimeout) methods.
- returns: <[Response]>

Returns the matched response.

## page.wait_for_selector(selector, **options)
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

## page.wait_for_timeout(timeout)
- `timeout` <[float]> A timeout to wait for

Waits for the given `timeout` in milliseconds.

Note that `page.waitForTimeout()` should only be used for debugging. Tests using the timer in production are going to be flaky. Use signals such as network events, selectors becoming visible and others instead.

Shortcut for main frame's [frame.wait_for_timeout(timeout)](./api/class-frame.md#framewaitfortimeouttimeout).

## page.workers()
- returns: <[List]\[[Worker]\]>

This method returns all of the dedicated [WebWorkers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) associated with the page.

> **NOTE** This does not contain ServiceWorkers

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