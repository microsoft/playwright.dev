---
id: multi-pages
title: "Multi-page scenarios"
---

Playwright can automate scenarios that span multiple browser contexts or multiple tabs in a browser window.

- [Multiple contexts](#multiple-contexts)
- [Multiple pages](#multiple-pages)
- [Handling new pages](#handling-new-pages)
- [Handling popups](#handling-popups)

## Multiple contexts

[Browser contexts](./core-concepts.md#browser-contexts) are isolated environments on a single browser instance. Playwright can create multiple browser contexts within a single scenario. This is useful when you want to test for multi-user functionality, like chat.

```py
# async

import asyncio
from playwright.async_api import async_playwright

async def run(playwright):
    # create a chromium browser instance
    chromium = playwright.chromium
    browser = await chromium.launch()

    # create two isolated browser contexts
    user_context = await browser.new_context()
    admin_context = await browser.new_context()

    # load user and admin cookies
    await user_context.add_cookies(user_cookies)
    await admin_context.add_cookies(admin_cookies)

async def main():
    async with async_playwright() as playwright:
        await run(playwright)
asyncio.run(main())
```

```py
# sync

from playwright.sync_api import sync_playwright

def run(playwright):
    # create a chromium browser instance
    chromium = playwright.chromium
    browser = chromium.launch()

    # create two isolated browser contexts
    user_context = browser.new_context()
    admin_context = browser.new_context()

    # load user and admin cookies
    user_context.add_cookies(user_cookies)
    admin_context.add_cookies(admin_cookies)

with sync_playwright() as playwright:
    run(playwright)
```

#### API reference
- [BrowserContext]
- [browser.new_context(**options)](./api/class-browser.md#browsernew_contextoptions)
- [browser_context.add_cookies(cookies)](./api/class-browsercontext.md#browser_contextadd_cookiescookies)

## Multiple pages

Each browser context can host multiple pages (tabs).
* Each page behaves like a focused, active page. Bringing the page to front is not required.
* Pages inside a context respect context-level emulation, like viewport sizes, custom network routes or browser locale.

```py
# async

# create two pages
page_one = await context.new_page()
page_two = await context.new_page()

# get pages of a brower context
all_pages = context.pages()
```

```py
# sync

# create two pages
page_one = context.new_page()
page_two = context.new_page()

# get pages of a brower context
all_pages = context.pages()
```

#### API reference
- [Page]
- [browser_context.new_page()](./api/class-browsercontext.md#browser_contextnew_page)
- [browser_context.pages](./api/class-browsercontext.md#browser_contextpages)

## Handling new pages

The `page` event on browser contexts can be used to get new pages that are created in the context. This can be used to handle new pages opened by `target="_blank"` links.

```py
# async

# Get page after a specific action (e.g. clicking a link)
async with context.expect_page() as new_page_info:
    await page.click('a[target="_blank"]') # Opens a new tab
new_page = await new_page_info.value

await new_page.wait_for_load_state()
print(await new_page.title())
```

```py
# sync

# Get page after a specific action (e.g. clicking a link)
with context.expect_page() as new_page_info:
    page.click('a[target="_blank"]') # Opens a new tab
new_page = new_page_info.value

new_page.wait_for_load_state()
print(new_page.title())
```

If the action that triggers the new page is unknown, the following pattern can be used.

```py
# async

# Get all new pages (including popups) in the context
async def handle_page(page):
    await page.wait_for_load_state()
    print(await page.title())

context.on("page", handle_page)
```

```py
# sync

# Get all new pages (including popups) in the context
def handle_page(page):
    page.wait_for_load_state()
    print(page.title())

context.on("page", handle_page)
```

#### API reference
- [browser_context.on("page")](./api/class-browsercontext.md#browser_contextonpage)

## Handling popups

If the page opens a pop-up, you can get a reference to it by listening to the `popup` event on the page.

This event is emitted in addition to the `browserContext.on('page')` event, but only for popups relevant to this page.

```py
# async

# Get popup after a specific action (e.g., click)
async with page.expect_popup() as popup_info:
    await page.click("#open")
popup = await popup_info.value

await popup.wait_for_load_state()
print(await popup.title())
```

```py
# sync

# Get popup after a specific action (e.g., click)
with page.expect_popup() as popup_info:
    page.click("#open")
popup = popup_info.value

popup.wait_for_load_state()
print(popup.title())
```

If the action that triggers the popup is unknown, the following pattern can be used.

```py
# async

# Get all popups when they open
async def handle_popup(popup):
    await popup.wait_for_load_state()
    print(await popup.title())

page.on("popup", handle_popup)
```

```py
# sync

# Get all popups when they open
def handle_popup(popup):
    popup.wait_for_load_state()
    print(popup.title())

page.on("popup", handle_popup)
```

#### API reference
- [page.on("popup")](./api/class-page.md#pageonpopup)

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