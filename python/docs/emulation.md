---
id: emulation
title: "Device and environment emulation"
---

Playwright allows overriding various parameters of the device where the browser is running:
- viewport size, device scale factor, touch support
- locale, timezone
- color scheme
- geolocation

Most of these parameters are configured during the browser context construction, but some of them such as viewport size can be changed for individual pages.

- [Devices](#devices)
- [User agent](#user-agent)
- [Viewport](#viewport)
- [Locale & timezone](#locale--timezone)
- [Permissions](#permissions)
- [Geolocation](#geolocation)
- [Color scheme and media](#color-scheme-and-media)

<br/>

## Devices

Playwright comes with a registry of device parameters for selected mobile devices. It can be used to simulate browser behavior on a mobile device:

```python
# async

import asyncio
from playwright import async_playwright

async def main():
    async with async_playwright() as p:
        pixel_2 = p.devices['Pixel 2']
        browser = await p.webkit.launch(headless=False)
        context = await browser.new_context(
            **pixel_2,
        )

asyncio.get_event_loop().run_until_complete(main())
```

```python
# sync

from playwright import sync_playwright

with sync_playwright() as p:
    pixel_2 = p.devices['Pixel 2']
    browser = p.webkit.launch(headless=False)
    context = browser.new_context(
        **pixel_2,
    )
```

All pages created in the context above will share the same device parameters.

#### API reference
- [playwright.devices](./api/class-playwright.md#playwrightdevices)
- [browser.new_context(**options)](./api/class-browser.md#browsernew_contextoptions)

<br/>

## User agent

All pages created in the context above will share the user agent specified:

```python
# async

context = await browser.new_context(
  user_agent='My user agent'
)
```

```python
# sync

context = browser.new_context(
  user_agent='My user agent'
)
```

#### API reference
- [browser.new_context(**options)](./api/class-browser.md#browsernew_contextoptions)

<br/>

## Viewport

Create a context with custom viewport size:

```python
# async

# Create context with given viewport
context = await browser.new_context(
  viewport={ 'width': 1280, 'height': 1024 }
)

# Resize viewport for individual page
await page.set_viewport_size(width=1600, height=1200)

# Emulate high-DPI
context = await browser.new_context(
  viewport={ 'width': 2560, 'height': 1440 },
  device_scale_factor=2,
)
```

```python
# sync

# Create context with given viewport
context = browser.new_context(
  viewport={ 'width': 1280, 'height': 1024 }
)

# Resize viewport for individual page
page.set_viewport_size(width=1600, height=1200)

# Emulate high-DPI
context = browser.new_context(
  viewport={ 'width': 2560, 'height': 1440 },
  device_scale_factor=2,

```

#### API reference
- [browser.new_context(**options)](./api/class-browser.md#browsernew_contextoptions)
- [page.set_viewport_size(viewport_size)](./api/class-page.md#pageset_viewport_sizeviewport_size)

<br/>

## Locale & timezone

```python
# async

# Emulate locale and time
context = await browser.new_context(
  locale='de-DE',
  timezone_id='Europe/Berlin',
)
```

```python
# sync

# Emulate locale and time
context = browser.new_context(
  locale='de-DE',
  timezone_id='Europe/Berlin',
)
```

#### API reference
- [browser.new_context(**options)](./api/class-browser.md#browsernew_contextoptions)

<br/>

## Permissions

Allow all pages in the context to show system notifications:

```python
# async

context = await browser.new_context(
  permissions=['notifications'],
)
```

```python
# sync

context = browser.new_context(
  permissions=['notifications'],
)
```

Grant all pages in the existing context access to current location:

```python
# async

await context.grant_permissions(['geolocation'])
```

```python
# sync

context.grant_permissions(['geolocation'])
```

Grant notifications access from a specific domain:

```python
# async

await context.grant_permissions(['notifications'], origin='https://skype.com')
```

```python
# sync

context.grant_permissions(['notifications'], origin='https://skype.com')
```

Revoke all permissions:

```python
# async

await context.clear_permissions()
```

```python
# sync

context.clear_permissions()
```

#### API reference
- [browser.new_context(**options)](./api/class-browser.md#browsernew_contextoptions)
- [browser_context.grant_permissions(permissions, **options)](./api/class-browsercontext.md#browser_contextgrant_permissionspermissions-options)
- [browser_context.clear_permissions()](./api/class-browsercontext.md#browser_contextclear_permissions)

<br/>

## Geolocation

Create a context with `"geolocation"` permissions granted:

```python
# async

context = await browser.new_context(
  geolocation={"longitude": 48.858455, "latitude": 2.294474},
  permissions=["geolocation"]
)
```

```python
# sync

context = browser.new_context(
  geolocation={"longitude": 48.858455, "latitude": 2.294474},
  permissions=["geolocation"]
)
```

Change the location later:

```python
# async

await context.set_geolocation({"longitude": 29.979097, "latitude": 31.134256})
```

```python
# sync

context.set_geolocation({"longitude": 29.979097, "latitude": 31.134256})
```

**Note** you can only change geolocation for all pages in the context.

#### API reference
- [browser.new_context(**options)](./api/class-browser.md#browsernew_contextoptions)
- [browser_context.set_geolocation(geolocation)](./api/class-browsercontext.md#browser_contextset_geolocationgeolocation)

<br/>

## Color scheme and media

Create a context with dark or light mode. Pages created in this context will follow this color scheme preference.

```python
# async

# Create context with dark mode
context = await browser.new_context(
  color_scheme='dark' # or 'light'
)

# Create page with dark mode
page = await browser.new_page(
  color_scheme='dark' # or 'light'
)

# Change color scheme for the page
await page.emulate_media(color_scheme='dark')

# Change media for page
await page.emulate_media(media='print')
```

```python
# sync

# Create context with dark mode
context = browser.new_context(
  color_scheme='dark' # or 'light'
)

# Create page with dark mode
page = browser.new_page(
  color_scheme='dark' # or 'light'
)

# Change color scheme for the page
page.emulate_media(color_scheme='dark')

# Change media for page
page.emulate_media(media='print')
```

#### API reference
- [browser.new_context(**options)](./api/class-browser.md#browsernew_contextoptions)
- [page.emulate_media(**options)](./api/class-page.md#pageemulate_mediaoptions)

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
[pathlib.Path]: https://realpython.com/python-pathlib/ "pathlib.Path"
[str]: https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str "str"
[Union]: https://docs.python.org/3/library/typing.html#typing.Union "Union"