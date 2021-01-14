---
id: class-accessibility
title: "Accessibility"
---


The Accessibility class provides methods for inspecting Chromium's accessibility tree. The accessibility tree is used by assistive technology such as [screen readers](https://en.wikipedia.org/wiki/Screen_reader) or [switches](https://en.wikipedia.org/wiki/Switch_access).

Accessibility is a very platform-specific thing. On different platforms, there are different screen readers that might have wildly different output.

Rendering engines of Chromium, Firefox and Webkit have a concept of "accessibility tree", which is then translated into different platform-specific APIs. Accessibility namespace gives access to this Accessibility Tree.

Most of the accessibility tree gets filtered out when converting from internal browser AX Tree to Platform-specific AX-Tree or by assistive technologies themselves. By default, Playwright tries to approximate this filtering, exposing only the "interesting" nodes of the tree.


- [accessibility.snapshot(**options)](./api/class-accessibility.md#accessibilitysnapshotoptions)

## accessibility.snapshot(**options)
- `interesting_only` <[bool]> Prune uninteresting nodes from the tree. Defaults to `true`.
- `root` <[ElementHandle]> The root DOM element for the snapshot. Defaults to the whole page.
- returns: <[NoneType]|[Dict]>
  - `role` <[str]> The [role](https://www.w3.org/TR/wai-aria/#usage_intro).
  - `name` <[str]> A human readable name for the node.
  - `value` <[str]|[float]> The current value of the node, if applicable.
  - `description` <[str]> An additional human readable description of the node, if applicable.
  - `keyshortcuts` <[str]> Keyboard shortcuts associated with this node, if applicable.
  - `roledescription` <[str]> A human readable alternative to the role, if applicable.
  - `valuetext` <[str]> A description of the current value, if applicable.
  - `disabled` <[bool]> Whether the node is disabled, if applicable.
  - `expanded` <[bool]> Whether the node is expanded or collapsed, if applicable.
  - `focused` <[bool]> Whether the node is focused, if applicable.
  - `modal` <[bool]> Whether the node is [modal](https://en.wikipedia.org/wiki/Modal_window), if applicable.
  - `multiline` <[bool]> Whether the node text input supports multiline, if applicable.
  - `multiselectable` <[bool]> Whether more than one child can be selected, if applicable.
  - `readonly` <[bool]> Whether the node is read only, if applicable.
  - `required` <[bool]> Whether the node is required, if applicable.
  - `selected` <[bool]> Whether the node is selected in its parent node, if applicable.
  - `checked` <[bool]|"mixed"> Whether the checkbox is checked, or "mixed", if applicable.
  - `pressed` <[bool]|"mixed"> Whether the toggle button is checked, or "mixed", if applicable.
  - `level` <[int]> The level of a heading, if applicable.
  - `valuemin` <[float]> The minimum value in a node, if applicable.
  - `valuemax` <[float]> The maximum value in a node, if applicable.
  - `autocomplete` <[str]> What kind of autocomplete is supported by a control, if applicable.
  - `haspopup` <[str]> What kind of popup is currently being shown for a node, if applicable.
  - `invalid` <[str]> Whether and in what way this node's value is invalid, if applicable.
  - `orientation` <[str]> Whether the node is oriented horizontally or vertically, if applicable.
  - `children` <[List]\[[Dict]\]> Child nodes, if any, if applicable.

Captures the current state of the accessibility tree. The returned object represents the root accessible node of the page.

:::note
The Chromium accessibility tree contains nodes that go unused on most platforms and by most screen readers. Playwright will discard them as well for an easier to process tree, unless `interesting_only` is set to `false`.
:::

An example of dumping the entire accessibility tree:

```py
# async

snapshot = await page.accessibility.snapshot()
print(snapshot)
```

```py
# sync

snapshot = page.accessibility.snapshot()
print(snapshot)
```

An example of logging the focused node's name:

```py
# async

def find_focused_node(node):
    if (node.get("focused"))
        return node
    for child in (node.get("children") or []):
        found_node = find_focused_node(child)
        return found_node
    return None

snapshot = await page.accessibility.snapshot()
node = find_focused_node(snapshot)
if node:
    print(node["name"])
```

```py
# sync

def find_focused_node(node):
    if (node.get("focused"))
        return node
    for child in (node.get("children") or []):
        found_node = find_focused_node(child)
        return found_node
    return None

snapshot = page.accessibility.snapshot()
node = find_focused_node(snapshot)
if node:
    print(node["name"])
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
[EventEmitter]: https://pyee.readthedocs.io/en/latest/#pyee.BaseEventEmitter "EventEmitter"
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