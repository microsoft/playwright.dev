---
id: class-credentials
title: "Credentials"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import HTMLCard from '@site/src/components/HTMLCard';


`Credentials` is a virtual WebAuthn authenticator scoped to a [BrowserContext]. It lets tests register passkeys and answer `navigator.credentials.create()` / `navigator.credentials.get()` ceremonies in the page, without a real authenticator or hardware security key.

There are three common ways to use it:

**Usage: seed a known credential**

<Tabs
  groupId="python-flavor"
  defaultValue="sync"
  values={[
    {label: 'Sync', value: 'sync'},
    {label: 'Async', value: 'async'}
  ]
}>
<TabItem value="sync">

```py
context = browser.new_context()

# A passkey your backend already provisioned for a test user.
context.credentials.create(
    "example.com",
    id=known_credential_id,  # base64url
    user_handle=known_user_handle,  # base64url
    private_key=known_private_key,  # base64url PKCS#8 (DER)
    public_key=known_public_key,  # base64url SPKI (DER)
)
context.credentials.install()

page = context.new_page()
page.goto("https://example.com/login")
# The page's navigator.credentials.get() is answered with the seeded passkey.
```

</TabItem>
<TabItem value="async">

```py
context = await browser.new_context()

# A passkey your backend already provisioned for a test user.
await context.credentials.create(
    "example.com",
    id=known_credential_id,  # base64url
    user_handle=known_user_handle,  # base64url
    private_key=known_private_key,  # base64url PKCS#8 (DER)
    public_key=known_public_key,  # base64url SPKI (DER)
)
await context.credentials.install()

page = await context.new_page()
await page.goto("https://example.com/login")
# The page's navigator.credentials.get() is answered with the seeded passkey.
```

</TabItem>
</Tabs>

**Usage: capture a credential, then reuse it**

<Tabs
  groupId="python-flavor"
  defaultValue="sync"
  values={[
    {label: 'Sync', value: 'sync'},
    {label: 'Async', value: 'async'}
  ]
}>
<TabItem value="sync">

```py
# setup test: let the app register a passkey, then save it.
context = browser.new_context()
context.credentials.install()

page = context.new_page()
page.goto("https://example.com/register")
page.get_by_role("button", name="Create a passkey").click()

# Read back the passkey the page registered — it includes the private key.
[credential] = context.credentials.get(rp_id="example.com")
with open("playwright/.auth/passkey.json", "w") as f:
    json.dump(credential, f)
```

</TabItem>
<TabItem value="async">

```py
# setup test: let the app register a passkey, then save it.
context = await browser.new_context()
await context.credentials.install()

page = await context.new_page()
await page.goto("https://example.com/register")
await page.get_by_role("button", name="Create a passkey").click()

# Read back the passkey the page registered — it includes the private key.
[credential] = await context.credentials.get(rp_id="example.com")
with open("playwright/.auth/passkey.json", "w") as f:
    json.dump(credential, f)
```

</TabItem>
</Tabs>

<Tabs
  groupId="python-flavor"
  defaultValue="sync"
  values={[
    {label: 'Sync', value: 'sync'},
    {label: 'Async', value: 'async'}
  ]
}>
<TabItem value="sync">

```py
# later test: seed the captured passkey so the app starts already enrolled.
with open("playwright/.auth/passkey.json") as f:
    credential = json.load(f)
context = browser.new_context()
context.credentials.create(
    credential["rpId"],
    id=credential["id"],
    user_handle=credential["userHandle"],
    private_key=credential["privateKey"],
    public_key=credential["publicKey"],
)
context.credentials.install()

page = context.new_page()
page.goto("https://example.com/login")
# navigator.credentials.get() resolves the captured passkey — already signed in.
```

</TabItem>
<TabItem value="async">

```py
# later test: seed the captured passkey so the app starts already enrolled.
with open("playwright/.auth/passkey.json") as f:
    credential = json.load(f)
context = await browser.new_context()
await context.credentials.create(
    credential["rpId"],
    id=credential["id"],
    user_handle=credential["userHandle"],
    private_key=credential["privateKey"],
    public_key=credential["publicKey"],
)
await context.credentials.install()

page = await context.new_page()
await page.goto("https://example.com/login")
# navigator.credentials.get() resolves the captured passkey — already signed in.
```

</TabItem>
</Tabs>

**Usage: save credentials in the storage state, restore later**

See [authentication guide](../auth.mdx) for examples of using saving and resotring the storage state.

**Defaults**


---

## Methods

### create {/* #credentials-create */}

<font size="2" style={{position: "relative", top: "-20px"}}>Added in: v1.61</font><x-search>credentials.create</x-search>

Seeds a virtual WebAuthn credential and returns it.

With only [rp_id](/api/class-credentials.mdx#credentials-create-option-rp-id), generates a fresh **ECDSA P-256** keypair, credential id and user handle. The seeded credential is discoverable (resident), so the page can resolve it from both username-then-passkey and usernameless passkey flows. The returned object carries the private and public keys, so it can be persisted to disk and re-seeded in a later test.

To **import a known credential**, supply all four of [id](/api/class-credentials.mdx#credentials-create-option-id), [user_handle](/api/class-credentials.mdx#credentials-create-option-user-handle), [private_key](/api/class-credentials.mdx#credentials-create-option-private-key) and [public_key](/api/class-credentials.mdx#credentials-create-option-public-key) together.

Call [credentials.install()](/api/class-credentials.mdx#credentials-install) before navigating to a page that uses WebAuthn.

**Usage**

```python
credentials.create(rp_id)
credentials.create(rp_id, **kwargs)
```

**Arguments**
- `rp_id` [str]<a aria-hidden="true" tabIndex="-1" class="list-anchor-link" id="credentials-create-option-rp-id"/><a href="#credentials-create-option-rp-id" class="list-anchor">#</a>
  
  Relying party id (typically the site's effective domain).
- `id` [str] *(optional)*<a aria-hidden="true" tabIndex="-1" class="list-anchor-link" id="credentials-create-option-id"/><a href="#credentials-create-option-id" class="list-anchor">#</a>
  
  Base64url-encoded credential id. Auto-generated if omitted.
- `private_key` [str] *(optional)*<a aria-hidden="true" tabIndex="-1" class="list-anchor-link" id="credentials-create-option-private-key"/><a href="#credentials-create-option-private-key" class="list-anchor">#</a>
  
  Base64url-encoded PKCS#8 (DER) private key. Auto-generated if omitted.
- `public_key` [str] *(optional)*<a aria-hidden="true" tabIndex="-1" class="list-anchor-link" id="credentials-create-option-public-key"/><a href="#credentials-create-option-public-key" class="list-anchor">#</a>
  
  Base64url-encoded SPKI (DER) public key. Auto-generated if omitted.
- `user_handle` [str] *(optional)*<a aria-hidden="true" tabIndex="-1" class="list-anchor-link" id="credentials-create-option-user-handle"/><a href="#credentials-create-option-user-handle" class="list-anchor">#</a>
  
  Base64url-encoded user handle. Auto-generated if omitted.

**Returns**
- [Dict]<a aria-hidden="true" tabIndex="-1" class="list-anchor-link" id="credentials-create-return"/><a href="#credentials-create-return" class="list-anchor">#</a>
  - `id` [str]
    
    Base64url-encoded credential id.
  - `rpId` [str]
    
    Relying party id.
  - `userHandle` [str]
    
    Base64url-encoded user handle.
  - `privateKey` [str]
    
    Base64url-encoded PKCS#8 (DER) private key.
  - `publicKey` [str]
    
    Base64url-encoded SPKI (DER) public key.

---

### delete {/* #credentials-delete */}

<font size="2" style={{position: "relative", top: "-20px"}}>Added in: v1.61</font><x-search>credentials.delete</x-search>

Removes a credential from the authenticator by its id. Works for any credential currently held — both those seeded with [credentials.create()](/api/class-credentials.mdx#credentials-create) and those the page registered itself by calling `navigator.credentials.create()`.

**Usage**

```python
credentials.delete(id)
```

**Arguments**
- `id` [str]<a aria-hidden="true" tabIndex="-1" class="list-anchor-link" id="credentials-delete-option-id"/><a href="#credentials-delete-option-id" class="list-anchor">#</a>
  
  Base64url-encoded credential id.

**Returns**
- [NoneType]<a aria-hidden="true" tabIndex="-1" class="list-anchor-link" id="credentials-delete-return"/><a href="#credentials-delete-return" class="list-anchor">#</a>

---

### get {/* #credentials-get */}

<font size="2" style={{position: "relative", top: "-20px"}}>Added in: v1.61</font><x-search>credentials.get</x-search>

Returns every credential currently held by the authenticator, optionally filtered by [rp_id](/api/class-credentials.mdx#credentials-get-option-rp-id) or [id](/api/class-credentials.mdx#credentials-get-option-id). This includes both credentials seeded with [credentials.create()](/api/class-credentials.mdx#credentials-create) and credentials the page registered itself by calling `navigator.credentials.create()`.

Each returned credential includes its private and public keys, so a passkey the app just registered can be saved and re-seeded into a later test with [credentials.create()](/api/class-credentials.mdx#credentials-create) — see the second example in the class overview.

**Usage**

```python
credentials.get()
credentials.get(**kwargs)
```

**Arguments**
- `id` [str] *(optional)*<a aria-hidden="true" tabIndex="-1" class="list-anchor-link" id="credentials-get-option-id"/><a href="#credentials-get-option-id" class="list-anchor">#</a>
  
  Only return the credential with this base64url-encoded id.
- `rp_id` [str] *(optional)*<a aria-hidden="true" tabIndex="-1" class="list-anchor-link" id="credentials-get-option-rp-id"/><a href="#credentials-get-option-rp-id" class="list-anchor">#</a>
  
  Only return credentials for this relying party id.

**Returns**
- [List]\[[Dict]\]<a aria-hidden="true" tabIndex="-1" class="list-anchor-link" id="credentials-get-return"/><a href="#credentials-get-return" class="list-anchor">#</a>
  - `id` [str]
    
    
  - `rpId` [str]
    
    
  - `userHandle` [str]
    
    
  - `privateKey` [str]
    
    
  - `publicKey` [str]
    
    
---

### install {/* #credentials-install */}

<font size="2" style={{position: "relative", top: "-20px"}}>Added in: v1.61</font><x-search>credentials.install</x-search>

Installs the virtual WebAuthn authenticator into the context, overriding `navigator.credentials.create()` and `navigator.credentials.get()` in all current and future pages. Call this before the page first touches `navigator.credentials`.

Required: until [credentials.install()](/api/class-credentials.mdx#credentials-install) is called, no interception is in place and the page sees the platform's native (or absent) WebAuthn behaviour. Seeding credentials with [credentials.create()](/api/class-credentials.mdx#credentials-create) without installing populates the authenticator, but the page will never see those credentials.

**Usage**

```python
credentials.install()
```

**Returns**
- [NoneType]<a aria-hidden="true" tabIndex="-1" class="list-anchor-link" id="credentials-install-return"/><a href="#credentials-install-return" class="list-anchor">#</a>


[APIRequest]: /api/class-apirequest.mdx "APIRequest"
[APIRequestContext]: /api/class-apirequestcontext.mdx "APIRequestContext"
[APIResponse]: /api/class-apiresponse.mdx "APIResponse"
[APIResponseAssertions]: /api/class-apiresponseassertions.mdx "APIResponseAssertions"
[Browser]: /api/class-browser.mdx "Browser"
[BrowserContext]: /api/class-browsercontext.mdx "BrowserContext"
[BrowserType]: /api/class-browsertype.mdx "BrowserType"
[CDPSession]: /api/class-cdpsession.mdx "CDPSession"
[Clock]: /api/class-clock.mdx "Clock"
[ConsoleMessage]: /api/class-consolemessage.mdx "ConsoleMessage"
[Credentials]: /api/class-credentials.mdx "Credentials"
[Debugger]: /api/class-debugger.mdx "Debugger"
[Dialog]: /api/class-dialog.mdx "Dialog"
[Download]: /api/class-download.mdx "Download"
[ElementHandle]: /api/class-elementhandle.mdx "ElementHandle"
[Error]: /api/class-error.mdx "Error"
[FileChooser]: /api/class-filechooser.mdx "FileChooser"
[FormData]: /api/class-formdata.mdx "FormData"
[Frame]: /api/class-frame.mdx "Frame"
[FrameLocator]: /api/class-framelocator.mdx "FrameLocator"
[JSHandle]: /api/class-jshandle.mdx "JSHandle"
[Keyboard]: /api/class-keyboard.mdx "Keyboard"
[Locator]: /api/class-locator.mdx "Locator"
[LocatorAssertions]: /api/class-locatorassertions.mdx "LocatorAssertions"
[Mouse]: /api/class-mouse.mdx "Mouse"
[Page]: /api/class-page.mdx "Page"
[PageAssertions]: /api/class-pageassertions.mdx "PageAssertions"
[Playwright]: /api/class-playwright.mdx "Playwright"
[Request]: /api/class-request.mdx "Request"
[Response]: /api/class-response.mdx "Response"
[Route]: /api/class-route.mdx "Route"
[Screencast]: /api/class-screencast.mdx "Screencast"
[Selectors]: /api/class-selectors.mdx "Selectors"
[TimeoutError]: /api/class-timeouterror.mdx "TimeoutError"
[Touchscreen]: /api/class-touchscreen.mdx "Touchscreen"
[Tracing]: /api/class-tracing.mdx "Tracing"
[Video]: /api/class-video.mdx "Video"
[WebError]: /api/class-weberror.mdx "WebError"
[WebSocket]: /api/class-websocket.mdx "WebSocket"
[WebSocketRoute]: /api/class-websocketroute.mdx "WebSocketRoute"
[WebStorage]: /api/class-webstorage.mdx "WebStorage"
[Worker]: /api/class-worker.mdx "Worker"
[Element]: https://developer.mozilla.org/en-US/docs/Web/API/element "Element"
[EvaluationArgument]: /evaluating.mdx#evaluation-argument "EvaluationArgument"
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
[bytes]: https://docs.python.org/3/library/stdtypes.html#bytes "bytes"
[Callable]: https://docs.python.org/3/library/typing.html#typing.Callable "Callable"
[EventContextManager]: https://docs.python.org/3/reference/datamodel.html#context-managers "Event context manager"
[EventEmitter]: https://pyee.readthedocs.io/en/latest/#pyee.BaseEventEmitter "EventEmitter"
[Exception]: https://docs.python.org/3/library/exceptions.html#Exception "Exception"
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
[datetime]: https://docs.python.org/3/library/datetime.html#datetime.datetime "datetime"

[all available image tags]: https://mcr.microsoft.com/en-us/product/playwright/python/about "all available image tags"
[Microsoft Artifact Registry]: https://mcr.microsoft.com/en-us/product/playwright/python/about "Microsoft Artifact Registry"
[Dockerfile.noble]: https://github.com/microsoft/playwright-python/blob/main/utils/docker/Dockerfile.noble "Dockerfile.noble"
