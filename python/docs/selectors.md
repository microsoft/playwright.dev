---
id: selectors
title: "Element selectors"
---

Selectors query elements on the web page for interactions, like [page.click(selector, **options)](./api/class-page.md#pageclickselector-options), and to obtain `ElementHandle` through [page.query_selector(selector)](./api/class-page.md#pagequery_selectorselector). Built-in selectors auto-pierce [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM).

- [Working with selectors](#working-with-selectors)
- [Syntax](#syntax)
- [Best practices](#best-practices)
- [CSS selector engine](#css-selector-engine)
- [Xpath selector engine](#xpath-selector-engine)
- [Text selector engine](#text-selector-engine)

## Working with selectors

Selector describes an element in the page. It can be used to obtain `ElementHandle` (see [page.query_selector(selector)](./api/class-page.md#pagequery_selectorselector) for example) or shortcut element operations to avoid intermediate handle (see [page.click(selector, **options)](./api/class-page.md#pageclickselector-options) for example).

Selector has the following format: `engine=body [>> engine=body]*`. Here `engine` is one of the supported [selector engines](./selectors.md) (e.g. `css` or `xpath`), and `body` is a selector body in the format of the particular engine. When multiple `engine=body` clauses are present (separated by `>>`), next one is queried relative to the previous one's result.

Playwright supports various selector engines:
* [Text] selectors, for example `text="Log in"`
* [CSS] selectors, including the following extensions:
  - [Shadow piercing](#shadow-piercing) by default and [`:light`](#css-extension-light) pseudo-class
  - [`:visible`](#css-extension-visible) pseudo-class
  - [`:text`](#css-extension-text) pseudo-class
  - [`:has`](#css-extension-has) and [`:is`](#css-extension-is) pseudo-classes
  - [Position selectors](#css-extension-position), for example `button:right-of(article)`
* [XPath] selectors, for example `xpath=//html/body/div`
* [id selectors][id], for example `id=sign-in`
* [Custom selector engines](./extensibility.md)

For convenience, selectors in the wrong format are heuristically converted to the right format:
- selector starting with `//` or `..` is assumed to be `xpath=selector`;
- selector starting and ending with a quote (either `"` or `'`) is assumed to be `text=selector`;
- otherwise selector is assumed to be `css=selector`.

## Syntax

Selectors are defined by selector engine name and selector body, `engine=body`.
* `engine` refers to one of the supported engines
  * Built-in selector engines: [css], [text], [xpath] and [id selectors][id]
  * Learn more about [custom selector engines](./extensibility.md)
* `body` refers to the query string for the respective engine
  * For `text`, body is the text content
  * For `css`, body is a [css selector](https://developer.mozilla.org/en/docs/Web/CSS/CSS_Selectors)

Body format is assumed to ignore leading and trailing white spaces, so that extra whitespace can be added for readability.

### Short-forms

For convenience, common selectors have short-forms:
- Selector starting with `//` or `..` is assumed to be `xpath=selector`
  - Example: `'//html'` is converted to `'xpath=//html'`.
- Selector starting and ending with a quote (either `"` or `'`) is assumed to be `text=selector`
  - Example: `'"foo"'` is converted to `'text="foo"'`.
- Otherwise, selector is assumed to be `css=selector`
  - Example: `'div'` is converted to `'css=div'`.

### Chaining selectors

Selectors defined as `engine=body` or in short-form can be combined with the `>>` token, e.g. `selector1 >> selector2 >> selectors3`. When selectors are chained, next one is queried relative to the previous one's result.

For example,

```
css=article >> css=.bar > .baz >> css=span[attr=value]
```

If a selector needs to include `>>` in the body, it should be escaped inside a string to not be confused with chaining separator, e.g. `text="some >> text"`.

### Intermediate matches

By default, chained selectors resolve to an element queried by the last selector. A selector can be prefixed with `*` to capture elements that are queried by an intermediate selector.

For example, `css=article >> text=Hello` captures the element with the text `Hello`, and `*css=article >> text=Hello` (note the `*`) captures the `article` element that contains some element with the text `Hello`.

## Best practices

The choice of selectors determines the resiliency of automation scripts. To reduce the maintenance burden, we recommend prioritizing user-facing attributes and explicit contracts.

### Prioritize user-facing attributes

Attributes like text content, input placeholder, accessibility roles and labels are user-facing attributes that change rarely. These attributes are not impacted by DOM structure changes.

The following examples use the built-in [text] and [css] selector engines.

### Define explicit contract

When user-facing attributes change frequently, it is recommended to use explicit test ids, like `data-test-id`. These `data-*` attributes are supported by the [css] and [id selectors][id].

```html
<button data-test-id="directions">Itinéraire</button>
```

### Avoid selectors tied to implementation

[xpath] and [css] can be tied to the DOM structure or implementation. These selectors can break when the DOM structure changes.

## CSS selector engine

`css` is a default engine - any malformed selector not starting with `//` nor starting and ending with a quote is assumed to be a css selector. For example, Playwright converts `'span > button'` to `'css=span > button'`.

Playwright augments standard CSS selectors in two ways, see below for more details:
* `css` engine pierces open shadow DOM by default.
* Playwright adds a few custom pseudo-classes like `:visible`.

### Shadow piercing

`css:light` engine is equivalent to [`Document.querySelector`](https://developer.mozilla.org/en/docs/Web/API/Document/querySelector) and behaves according to the CSS spec. However, it does not pierce shadow roots, which may be inconvenient when working with [Shadow DOM and Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM). For that reason, `css` engine pierces shadow roots. More specifically, any [Descendant combinator](https://developer.mozilla.org/en-US/docs/Web/CSS/Descendant_combinator) or [Child combinator](https://developer.mozilla.org/en-US/docs/Web/CSS/Child_combinator) pierces an arbitrary number of open shadow roots, including the implicit descendant combinator at the start of the selector.

`css` engine first searches for elements in the light dom in the iteration order, and then recursively inside open shadow roots in the iteration order. It does not search inside closed shadow roots or iframes.

```html
<article>
  <div>In the light dom</div>
  <div slot='myslot'>In the light dom, but goes into the shadow slot</div>
  <open mode shadow root>
    <div class='in-the-shadow'>
      <span class='content'>
        In the shadow dom
        <open mode shadow root>
          <li id='target'>Deep in the shadow</li>
        </open mode shadow root>
      </span>
    </div>
    <slot name='myslot'></slot>
  </open mode shadow root>
</article>
```

Note that `<open mode shadow root>` is not an html element, but rather a shadow root created with `element.attachShadow({mode: 'open'})`.
- Both `"css=article div"` and `"css:light=article div"` match the first `<div>In the light dom</div>`.
- Both `"css=article > div"` and `"css:light=article > div"` match two `div` elements that are direct children of the `article`.
- `"css=article .in-the-shadow"` matches the `<div class='in-the-shadow'>`, piercing the shadow root, while `"css:light=article .in-the-shadow"` does not match anything.
- `"css:light=article div > span"` does not match anything, because both light-dom `div` elements do not contain a `span`.
- `"css=article div > span"` matches the `<span class='content'>`, piercing the shadow root.
- `"css=article > .in-the-shadow"` does not match anything, because `<div class='in-the-shadow'>` is not a direct child of `article`
- `"css:light=article > .in-the-shadow"` does not match anything.
- `"css=article li#target"` matches the `<li id='target'>Deep in the shadow</li>`, piercing two shadow roots.

### CSS extension: visible

The `:visible` pseudo-class matches elements that are visible as defined in the [actionability](./actionability.md#visible) guide. For example, `input` matches all the inputs on the page, while `input:visible` matches only visible inputs. This is useful to distinguish elements that are very similar but differ in visibility, however it's usually better to follow [best practices](#best-practices) and find another way to select the element.

Consider a page with two buttons, first invisible and second visible.

```html
<button style='display: none'>Invisible</button>
<button>Visible</button>
```

* This will find the first button, because it is the first one in DOM order. Then it will wait for the button to become visible before clicking, or timeout while waiting:
* This will find a second button, because it is visible, and then click it.

Use `:visible` with caution, because it has two major drawbacks:
* When elements change their visibility dynamically, `:visible` will give upredictable results based on the timing.
* `:visible` forces a layout and may lead to querying being slow, especially when used with `page.waitForSelector(selector[, options])` method.

### CSS extension: text

The `:text` pseudo-class matches elements that have a text node child with specific text. It is similar to the [text] engine. There are a few variations that support different arguments:
* `:text("substring")` - Matches when element's text contains "substring" somewhere. Matching is case-insensitive. Matching also normalizes whitespace, for example it turns multiple spaces into one, trusn line breaks into spaces and ignores leading and trailing whitespace.
* `:text-is("string")` - Matches when element's text equals the "string". Matching is case-insensitive and normalizes whitespace.
* `button:text("Sign in")` - Text selector may be combined with regular CSS.
* `:text-matches("[+-]?\\d+")` - Matches text against a regular expression. Note that special characters like back-slash `\`, quotes `"`, square brackets `[]` and more should be escaped. Learn more about [regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp).
* `:text-matches("value", "i")` - Matches text against a regular expression with specified flags.

### CSS extension: has

The `:has()` pseudo-class is an [experimental CSS pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:has) that is supported by Playwright.

### CSS extension: is

The `:is()` pseudo-class is an [experimental CSS pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:is) that is supported by Playwright.

### CSS extension: light

`css` engine [pierces shadow](#shadow-piercing) by default. It is possible to disable this behavior by wrapping a selector in `:light` pseudo-class: `:light(section > button.class)` matches in light DOM only.

### CSS extension: position

Playwright provides position selectors based on the page layout. These can be combined with regular CSS for better results, for example `input:right-of(:text("Password"))` matches an input field that is to the right of text "Password".

Note that position selectors depend on the page layout and may produce unexpected results. For example, a different element could be matched when layout changes by one pixel.

Position selectors use [bounding client rect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) to compute distance and relative position of the elements.
* `:right-of(inner > selector)` - Matches elements that are to the right of any element matching the inner selector.
* `:left-of(inner > selector)` - Matches elements that are to the left of any element matching the inner selector.
* `:above(inner > selector)` - Matches elements that are above any of the elements matching the inner selector.
* `:below(inner > selector)` - Matches elements that are below any of the elements matching the inner selector.
* `:near(inner > selector)` - Matches elements that are near (within 50 CSS pixels) any of the elements matching the inner selector.

## Xpath selector engine

XPath engine is equivalent to [`Document.evaluate`](https://developer.mozilla.org/en/docs/Web/API/Document/evaluate). Example: `xpath=//html/body`.

Malformed selector starting with `//` or `..` is assumed to be an xpath selector. For example, Playwright converts `'//html/body'` to `'xpath=//html/body'`.

Note that `xpath` does not pierce shadow roots.

## Text selector engine

Text engine finds an element that contains a text node with the passed text. For example, `page.click('text=Login')` clicks on a login button, and `page.waitForSelector('"lazy loaded text")` waits for the `"lazy loaded text"` to appear in the page.
- By default, the match is case-insensitive, ignores leading/trailing whitespace and searches for a substring. This means `text= Login` matches `<button>Button loGIN (click me)</button>`.
- Text body can be escaped with single or double quotes for precise matching, insisting on exact match, including specified whitespace and case. This means `text="Login "` will only match `<button>Login </button>` with exactly one space after "Login". Quoted text follows the usual escaping rules, e.g. use `\"` to escape double quote in a double-quoted string: `text="foo\"bar"`.
- Text body can also be a JavaScript-like regex wrapped in `/` symbols. This means `text=/^\\s*Login$/i` will match `<button> loGIN</button>` with any number of spaces before "Login" and no spaces after.
- Input elements of the type `button` and `submit` are rendered with their value as text, and text engine finds them. For example, `text=Login` matches `<input type=button value="Login">`.

Malformed selector starting and ending with a quote (either `"` or `'`) is assumed to be a text selector. For example, Playwright converts `page.click('"Login"')` to `page.click('text="Login"')`.

`text` engine open pierces shadow roots similarly to `css`, while `text:light` does not. Text engine first searches for elements in the light dom in the iteration order, and then recursively inside open shadow roots in the iteration order. It does not search inside closed shadow roots or iframes.

### id, data-testid, data-test-id, data-test selector engines

Attribute engines are selecting based on the corresponding attribute value. For example: `data-test-id=foo` is equivalent to `css=[data-test-id="foo"]`, and `id:light=foo` is equivalent to `css:light=[id="foo"]`.

[css]: #css-selector-engine
[text]: #text-selector-engine
[xpath]: #xpath-selector-engine
[id]: #id-data-testid-data-test-id-data-test-selector-engines

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