---
id: network
title: "Network"
---

Playwright provides APIs to **monitor** and **modify** network traffic, both HTTP and HTTPS. Any requests that page does, including [XHRs](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) and [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) requests, can be tracked, modified and handled.

- [HTTP Authentication](#http-authentication)
- [Handle file downloads](#handle-file-downloads)
- [Network events](#network-events)
- [Handle requests](#handle-requests)
- [Modify requests](#modify-requests)
- [Abort requests](#abort-requests)

<br/>

## HTTP Authentication

```py
# async

context = await browser.new_context(
    http_credentials={"username": "bill", "password": "pa55w0rd"}
)
page = await context.new_page()
await page.goto("https://example.com")
```

```py
# sync

context = browser.new_context(
    http_credentials={"username": "bill", "password": "pa55w0rd"}
)
page = context.new_page()
page.goto("https://example.com")
```

#### API reference
- [browser.new_context(**options)](./api/class-browser.md#browsernew_contextoptions)

<br/>

## Handle file downloads

```py
# async

# Start waiting for the download
async with page.expect_download() as download_info:
    # Perform the action that directly or indirectly initiates it
    await page.click("button#delayed-download")
download = await download_info.value
path = await download.path()
```

```py
# sync

# Start waiting for the download
with page.expect_download() as download_info:
    # Perform the action that directly or indirectly initiates it
    page.click("button#delayed-download")
download = download_info.value
path = download.path()
```

For every attachment downloaded by the page, [page.on("download")](./api/class-page.md#pageondownload) event is emitted. If you create a browser context with the `accept_downloads` set, all these attachments are going to be downloaded into a temporary folder. You can obtain the download url, file system path and payload stream using the [Download] object from the event.

#### Variations

If you have no idea what initiates the download, you can still handle the event:

```py
# async

async def handle_download(download):
    print(await download.path())
page.on("download", handle_download)
```

```py
# sync

page.on("download", lambda download: print(download.path()))
```

Note that handling the event forks the control flow and makes script harder to follow. Your scenario might end while you are downloading a file since your main control flow is not awaiting for this operation to resolve.

#### API reference
- [Download]
- [page.on("download")](./api/class-page.md#pageondownload)
- [page.wait_for_event(event, **options)](./api/class-page.md#pagewait_for_eventevent-options)

<br/>

## Network events

You can monitor all the requests and responses:

```py
# async

import asyncio
from playwright.async_api import async_playwright

async def run(playwright):
    chromium = playwright.chromium
    browser = await chromium.launch()
    page = await browser.new_page()
    # Subscribe to "request" and "response" events.
    page.on("request", lambda request: print(">>", request.method, request.url))
    page.on("response", lambda response: print("<<", response.status, response.url))
    await page.goto("https://example.com")
    await browser.close()

async def main():
    async with async_playwright() as playwright:
        await run(playwright)
asyncio.run(main())
```

```py
# sync

from playwright.sync_api import sync_playwright

def run(playwright):
    chromium = playwright.chromium
    browser = chromium.launch()
    page = browser.new_page()
    # Subscribe to "request" and "response" events.
    page.on("request", lambda request: print(">>", request.method, request.url))
    page.on("response", lambda response: print("<<", response.status, response.url))
    page.goto("https://example.com")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
```

Or wait for a network response after the button click:

```py
# async

# Use a glob url pattern
async with page.expect_response("**/api/fetch_data") as response_info:
    await page.click("button#update")
response = await response_info.value
```

```py
# sync

# Use a glob url pattern
with page.expect_response("**/api/fetch_data") as response_info:
    page.click("button#update")
response = response_info.value
```

#### Variations

```py
# async

# Use a regular expresison
async with page.expect_response(re.compile(r"\.jpeg$")) as response_info:
    await page.click("button#update")
response = await response_info.value

# Use a predicate taking a response object
async with page.expect_response(lambda response: token in response.url) as response_info:
    await page.click("button#update")
response = await response_info.value
```

```py
# sync

# Use a regular expresison
with page.expect_response(re.compile(r"\.jpeg$")) as response_info:
    page.click("button#update")
response = response_info.value

# Use a predicate taking a response object
with page.expect_response(lambda response: token in response.url) as response_info:
    page.click("button#update")
response = response_info.value
```

#### API reference
- [Request]
- [Response]
- [page.on("request")](./api/class-page.md#pageonrequest)
- [page.on("response")](./api/class-page.md#pageonresponse)
- [page.wait_for_request(url_or_predicate, **options)](./api/class-page.md#pagewait_for_requesturl_or_predicate-options)
- [page.wait_for_response(url_or_predicate, **options)](./api/class-page.md#pagewait_for_responseurl_or_predicate-options)

<br/>

## Handle requests

```py
# async

await page.route(
    "**/api/fetch_data",
    lambda route: route.fulfill(status=200, body=test_data))
await page.goto("https://example.com")
```

```py
# sync

page.route(
    "**/api/fetch_data",
    lambda route: route.fulfill(status=200, body=test_data))
page.goto("https://example.com")
```

You can mock API endpoints via handling the network quests in your Playwright script.

#### Variations

```py
# async

# Set up route on the entire browser context.
# It will apply to popup windows and opened links.
await context.route(
    "**/api/login",
    lambda route: route.fulfill(status=200, body="accept"))
await page.goto("https://example.com")
```

```py
# sync

# Set up route on the entire browser context.
# It will apply to popup windows and opened links.
context.route(
    "**/api/login",
    lambda route: route.fulfill(status=200, body="accept"))
page.goto("https://example.com")
```

#### API reference
- [browser_context.route(url, handler)](./api/class-browsercontext.md#browser_contextrouteurl-handler)
- [browser_context.unroute(url, **options)](./api/class-browsercontext.md#browser_contextunrouteurl-options)
- [page.route(url, handler)](./api/class-page.md#pagerouteurl-handler)
- [page.unroute(url, **options)](./api/class-page.md#pageunrouteurl-options)
- [Route]

<br/>

## Modify requests

```py
# async

# Delete header
async def handle_route(route):
    headers = route.request.headers
    del headers["x-secret"]
    route.continue_(headers=headers)
await page.route("**/*", handle_route)

# Continue requests as POST.
await page.route("**/*", lambda route: route.continue_(method="POST"))
```

```py
# sync

# Delete header
def handle_route(route):
    headers = route.request.headers
    del headers["x-secret"]
    route.continue_(headers=headers)
page.route("**/*", handle_route)

# Continue requests as POST.
page.route("**/*", lambda route: route.continue_(method="POST"))
```

You can continue requests with modifications. Example above removes an HTTP header from the outgoing requests.

## Abort requests

```py
# async

await page.route("**/*.{png,jpg,jpeg}", lambda route: route.abort())

# Abort based on the request type
await page.route("**/*", lambda route: route.abort() if route.request.resource_type == "image"  else route.continue_())
```

```py
# sync

page.route("**/*.{png,jpg,jpeg}", lambda route: route.abort())

# Abort based on the request type
page.route("**/*", lambda route: route.abort() if route.request.resource_type == "image"  else route.continue_())
```

#### API reference
- [page.route(url, handler)](./api/class-page.md#pagerouteurl-handler)
- [browser_context.route(url, handler)](./api/class-browsercontext.md#browser_contextrouteurl-handler)
- [route.abort(**options)](./api/class-route.md#routeabortoptions)

<br/>

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