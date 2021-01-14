---
id: auth
title: "Authentication"
---

Playwright can be used to automate scenarios that require authentication.

Tests written with Playwright execute in isolated clean-slate environments called [browser contexts](./core-concepts.md#browser-contexts). This isolation model improves reproducibility and prevents cascading test failures. New browser contexts can load existing authentication state. This eliminates the need to login in every context and speeds up test execution.

> Note: This guide covers cookie/token-based authentication (logging in via the app UI). For [HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication) use [browser.new_context(**options)](./api/class-browser.md#browsernew_contextoptions).

- [Automate logging in](#automate-logging-in)
- [Reuse authentication state](#reuse-authentication-state)
- [Multi-factor authentication](#multi-factor-authentication)

## Automate logging in

The Playwright API can automate interaction with a login form. See [Input guide](./input.md) for more details.

The following example automates login on GitHub. Once these steps are executed, the browser context will be authenticated.

```py
# async

page = await context.new_page()
await page.goto('https://github.com/login')

# Interact with login form
await page.click('text=Login')
await page.fill('input[name="login"]', USERNAME)
await page.fill('input[name="password"]', PASSWORD)
await page.click('text=Submit')
# Verify app is logged in
```

```py
# sync

page = context.new_page()
page.goto('https://github.com/login')

# Interact with login form
page.click('text=Login')
page.fill('input[name="login"]', USERNAME)
page.fill('input[name="password"]', PASSWORD)
page.click('text=Submit')
# Verify app is logged in
```

These steps can be executed for every browser context. However, redoing login for every test can slow down test execution. To prevent that, we will reuse existing authentication state in new browser contexts.

## Reuse authentication state

Web apps use cookie-based or token-based authentication, where authenticated state is stored as [cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) or in [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Storage). Playwright provides [browser_context.storage_state(**options)](./api/class-browsercontext.md#browser_contextstorage_stateoptions) method that can be used to retrieve storage state from authenticated contexts and then create new contexts with prepopulated state.

Cookies and local storage state can be used across different browsers. They depend on your application's authentication model: some apps might require both cookies and local storage.

The following code snippet retrieves state from an authenticated context and creates a new context with that state.

```py
# async

import json
import os
# Save storage state and store as an env variable
storage = await context.storage_state()
os.environ["STORAGE"] = json.dumps(storage)

# Create a new context with the saved storage state
storage_state = json.loads(os.environ["STORAGE"])
context = await browser.new_context(storage_state=storage_state)
```

```py
# sync

import json
import os
# Save storage state and store as an env variable
storage = context.storage_state()
os.environ["STORAGE"] = json.dumps(storage)

# Create a new context with the saved storage state
storage_state = json.loads(os.environ["STORAGE"])
context = browser.new_context(storage_state=storage_state)
```

### Session storage

Session storage ([`window.sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)) is specific to a particular domain. Playwright does not provide API to persist session storage, but the following snippet can be used to save/load session storage.

```py
# async

import os
# Get session storage and store as env variable
session_storage = await page.evaluate("() => JSON.stringify(sessionStorage)")
os.environ["SESSION_STORAGE"] = session_storage

# Set session storage in a new context
session_storage = os.environ["SESSION_STORAGE"]
await context.add_init_script(storage => {
  if (window.location.hostname == 'example.com') {
    entries = JSON.parse(storage)
    Object.keys(entries).forEach(key => {
      window.sessionStorage.setItem(key, entries[key])
    })
  }
}, session_storage)
```

```py
# sync

import os
# Get session storage and store as env variable
session_storage = page.evaluate("() => JSON.stringify(sessionStorage)")
os.environ["SESSION_STORAGE"] = session_storage

# Set session storage in a new context
session_storage = os.environ["SESSION_STORAGE"]
context.add_init_script(storage => {
  if (window.location.hostname == 'example.com') {
    entries = JSON.parse(storage)
    Object.keys(entries).forEach(key => {
      window.sessionStorage.setItem(key, entries[key])
    })
  }
}, session_storage)
```

### Lifecycle

Logging in via the UI and then reusing authentication state can be combined to implement **login once and run multiple scenarios**. The lifecycle looks like:
1. Run tests (for example, with `npm run test`).
1. Login via UI and retrieve authentication state.
   * In Jest, this can be executed in [`globalSetup`](https://jestjs.io/docs/en/configuration#globalsetup-string).
1. In each test, load authentication state in `beforeEach` or `beforeAll` step.

This approach will also **work in CI environments**, since it does not rely on any external state.

### Example

[This example script](https://github.com/microsoft/playwright/blob/master/docs/examples/authentication.js) logs in on GitHub.com with Chromium, and then reuses the logged in storage state in WebKit.

### API reference
- [browser_context.storage_state(**options)](./api/class-browsercontext.md#browser_contextstorage_stateoptions)
- [browser.new_context(**options)](./api/class-browser.md#browsernew_contextoptions)
- [page.evaluate(expression, **options)](./api/class-page.md#pageevaluateexpression-options)
- [browser_context.add_init_script(**options)](./api/class-browsercontext.md#browser_contextadd_init_scriptoptions)

## Multi-factor authentication

Accounts with multi-factor authentication (MFA) cannot be fully automated, and need manual intervention. Persistent authentication can be used to partially automate MFA scenarios.

### Persistent authentication

Web browsers use a directory on disk to store user history, cookies, IndexedDB and other local state. This disk location is called the [User data directory](https://chromium.googlesource.com/chromium/src/+/master/docs/user_data_dir.md).

Note that persistent authentication is not suited for CI environments since it relies on a disk location. User data directories are specific to browser types and cannot be shared across browser types.

User data directories can be used with the [browser_type.launch_persistent_context(user_data_dir, **options)](./api/class-browsertype.md#browser_typelaunch_persistent_contextuser_data_dir-options) API.

```py
# async

import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        user_data_dir = '/path/to/directory'
        browser = await p.chromium.launch_persistent_context(userDataDir, headless=False)
        # Execute login steps manually in the browser window

asyncio.get_event_loop().run_until_complete(main())
```

```py
# sync

from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    user_data_dir = '/path/to/directory'
    browser = p.chromium.launch_persistent_context(user_data_dir, headless=False)
    # Execute login steps manually in the browser window
```

### Lifecycle
1. Create a user data directory on disk 2. Launch a persistent context with the user data directory and login the MFA account. 3. Reuse user data directory to run automation scenarios.

### API reference
- [BrowserContext]
- [browser_type.launch_persistent_context(user_data_dir, **options)](./api/class-browsertype.md#browser_typelaunch_persistent_contextuser_data_dir-options)

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