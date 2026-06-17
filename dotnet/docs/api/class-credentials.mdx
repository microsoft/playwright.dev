---
id: class-credentials
title: "Credentials"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import HTMLCard from '@site/src/components/HTMLCard';


`Credentials` is a virtual WebAuthn authenticator scoped to a [BrowserContext]. It lets tests register passkeys and answer `navigator.credentials.create()` / `navigator.credentials.get()` ceremonies in the page, without a real authenticator or hardware security key.

There are two common ways to use it:

**Usage: seed a known credential**

```csharp
var context = await browser.NewContextAsync();

// A passkey your backend already provisioned for a test user.
await context.Credentials.CreateAsync("example.com", new()
{
    Id = knownCredentialId, // base64url
    UserHandle = knownUserHandle, // base64url
    PrivateKey = knownPrivateKey, // base64url PKCS#8 (DER)
    PublicKey = knownPublicKey, // base64url SPKI (DER)
});
await context.Credentials.InstallAsync();

var page = await context.NewPageAsync();
await page.GotoAsync("https://example.com/login");
// The page's navigator.credentials.get() is answered with the seeded passkey.
```

**Usage: capture a passkey, then reuse it**

```csharp
// setup test: let the app register a passkey, then save it.
var context = await browser.NewContextAsync();
await context.Credentials.InstallAsync();

var page = await context.NewPageAsync();
await page.GotoAsync("https://example.com/register");
await page.GetByRole(AriaRole.Button, new() { Name = "Create a passkey" }).ClickAsync();

// Read back the passkey the page registered — it includes the private key.
var credentials = await context.Credentials.GetAsync(new() { RpId = "example.com" });
File.WriteAllText("playwright/.auth/passkey.json", JsonSerializer.Serialize(credentials[0]));
```

```csharp
// later test: seed the captured passkey so the app starts already enrolled.
var credential = JsonSerializer.Deserialize<VirtualCredential>(
    File.ReadAllText("playwright/.auth/passkey.json"));
var context = await browser.NewContextAsync();
await context.Credentials.CreateAsync(credential.RpId, new()
{
    Id = credential.Id,
    UserHandle = credential.UserHandle,
    PrivateKey = credential.PrivateKey,
    PublicKey = credential.PublicKey,
});
await context.Credentials.InstallAsync();

var page = await context.NewPageAsync();
await page.GotoAsync("https://example.com/login");
// navigator.credentials.get() resolves the captured passkey — already signed in.
```

**Defaults**


---

## Methods

### CreateAsync {/* #credentials-create */}

<font size="2" style={{position: "relative", top: "-20px"}}>Added in: v1.61</font><x-search>credentials.CreateAsync</x-search>

Seeds a virtual WebAuthn credential and returns it.

With only [rpId](/api/class-credentials.mdx#credentials-create-option-rp-id), generates a fresh **ECDSA P-256** keypair, credential id and user handle. The seeded credential is discoverable (resident), so the page can resolve it from both username-then-passkey and usernameless passkey flows. The returned object carries the private and public keys, so it can be persisted to disk and re-seeded in a later test.

To **import a known credential**, supply all four of [Id](/api/class-credentials.mdx#credentials-create-option-id), [UserHandle](/api/class-credentials.mdx#credentials-create-option-user-handle), [PrivateKey](/api/class-credentials.mdx#credentials-create-option-private-key) and [PublicKey](/api/class-credentials.mdx#credentials-create-option-public-key) together.

Call [Credentials.InstallAsync()](/api/class-credentials.mdx#credentials-install) before navigating to a page that uses WebAuthn.

**Usage**

```csharp
await Credentials.CreateAsync(rpId, options);
```

**Arguments**
- `rpId` [string]<a aria-hidden="true" tabIndex="-1" class="list-anchor-link" id="credentials-create-option-rp-id"/><a href="#credentials-create-option-rp-id" class="list-anchor">#</a>
  
  Relying party id (typically the site's effective domain).
- `options` `CredentialsCreateOptions?` *(optional)*
  - `Id` [string]? *(optional)*<a aria-hidden="true" tabIndex="-1" class="list-anchor-link" id="credentials-create-option-id"/><a href="#credentials-create-option-id" class="list-anchor">#</a>
    
    Base64url-encoded credential id. Auto-generated if omitted.
  - `PrivateKey` [string]? *(optional)*<a aria-hidden="true" tabIndex="-1" class="list-anchor-link" id="credentials-create-option-private-key"/><a href="#credentials-create-option-private-key" class="list-anchor">#</a>
    
    Base64url-encoded PKCS#8 (DER) private key. Auto-generated if omitted.
  - `PublicKey` [string]? *(optional)*<a aria-hidden="true" tabIndex="-1" class="list-anchor-link" id="credentials-create-option-public-key"/><a href="#credentials-create-option-public-key" class="list-anchor">#</a>
    
    Base64url-encoded SPKI (DER) public key. Auto-generated if omitted.
  - `UserHandle` [string]? *(optional)*<a aria-hidden="true" tabIndex="-1" class="list-anchor-link" id="credentials-create-option-user-handle"/><a href="#credentials-create-option-user-handle" class="list-anchor">#</a>
    
    Base64url-encoded user handle. Auto-generated if omitted.

**Returns**
- Create<a aria-hidden="true" tabIndex="-1" class="list-anchor-link" id="credentials-create-return"/><a href="#credentials-create-return" class="list-anchor">#</a>
  - `id` [string]
    
    Base64url-encoded credential id.
  - `rpId` [string]
    
    Relying party id.
  - `userHandle` [string]
    
    Base64url-encoded user handle.
  - `privateKey` [string]
    
    Base64url-encoded PKCS#8 (DER) private key.
  - `publicKey` [string]
    
    Base64url-encoded SPKI (DER) public key.

---

### DeleteAsync {/* #credentials-delete */}

<font size="2" style={{position: "relative", top: "-20px"}}>Added in: v1.61</font><x-search>credentials.DeleteAsync</x-search>

Removes a credential from the authenticator by its id. Works for any credential currently held — both those seeded with [Credentials.CreateAsync()](/api/class-credentials.mdx#credentials-create) and those the page registered itself by calling `navigator.credentials.create()`.

**Usage**

```csharp
await Credentials.DeleteAsync(id);
```

**Arguments**
- `id` [string]<a aria-hidden="true" tabIndex="-1" class="list-anchor-link" id="credentials-delete-option-id"/><a href="#credentials-delete-option-id" class="list-anchor">#</a>
  
  Base64url-encoded credential id.

**Returns**
- [void]<a aria-hidden="true" tabIndex="-1" class="list-anchor-link" id="credentials-delete-return"/><a href="#credentials-delete-return" class="list-anchor">#</a>

---

### GetAsync {/* #credentials-get */}

<font size="2" style={{position: "relative", top: "-20px"}}>Added in: v1.61</font><x-search>credentials.GetAsync</x-search>

Returns every credential currently held by the authenticator, optionally filtered by [RpId](/api/class-credentials.mdx#credentials-get-option-rp-id) or [Id](/api/class-credentials.mdx#credentials-get-option-id). This includes both credentials seeded with [Credentials.CreateAsync()](/api/class-credentials.mdx#credentials-create) and credentials the page registered itself by calling `navigator.credentials.create()`.

Each returned credential includes its private and public keys, so a passkey the app just registered can be saved and re-seeded into a later test with [Credentials.CreateAsync()](/api/class-credentials.mdx#credentials-create) — see the second example in the class overview.

**Usage**

```csharp
await Credentials.GetAsync(options);
```

**Arguments**
- `options` `CredentialsGetOptions?` *(optional)*
  - `Id` [string]? *(optional)*<a aria-hidden="true" tabIndex="-1" class="list-anchor-link" id="credentials-get-option-id"/><a href="#credentials-get-option-id" class="list-anchor">#</a>
    
    Only return the credential with this base64url-encoded id.
  - `RpId` [string]? *(optional)*<a aria-hidden="true" tabIndex="-1" class="list-anchor-link" id="credentials-get-option-rp-id"/><a href="#credentials-get-option-rp-id" class="list-anchor">#</a>
    
    Only return credentials for this relying party id.

**Returns**
- [IReadOnlyList]&lt;Get&gt;<a aria-hidden="true" tabIndex="-1" class="list-anchor-link" id="credentials-get-return"/><a href="#credentials-get-return" class="list-anchor">#</a>
  - `id` [string]
    
    
  - `rpId` [string]
    
    
  - `userHandle` [string]
    
    
  - `privateKey` [string]
    
    
  - `publicKey` [string]
    
    
---

### InstallAsync {/* #credentials-install */}

<font size="2" style={{position: "relative", top: "-20px"}}>Added in: v1.61</font><x-search>credentials.InstallAsync</x-search>

Installs the virtual WebAuthn authenticator into the context, overriding `navigator.credentials.create()` and `navigator.credentials.get()` in all current and future pages. Call this before the page first touches `navigator.credentials`.

Required: until [Credentials.InstallAsync()](/api/class-credentials.mdx#credentials-install) is called, no interception is in place and the page sees the platform's native (or absent) WebAuthn behaviour. Seeding credentials with [Credentials.CreateAsync()](/api/class-credentials.mdx#credentials-create) without installing populates the authenticator, but the page will never see those credentials.

**Usage**

```csharp
await Credentials.InstallAsync();
```

**Returns**
- [void]<a aria-hidden="true" tabIndex="-1" class="list-anchor-link" id="credentials-install-return"/><a href="#credentials-install-return" class="list-anchor">#</a>


[APIRequest]: /api/class-apirequest.mdx "APIRequest"
[APIRequestContext]: /api/class-apirequestcontext.mdx "APIRequestContext"
[APIResponse]: /api/class-apiresponse.mdx "APIResponse"
[APIResponseAssertions]: /api/class-apiresponseassertions.mdx "APIResponseAssertions"
[Browser]: /api/class-browser.mdx "Browser"
[BrowserContext]: /api/class-browsercontext.mdx "BrowserContext"
[BrowserType]: /api/class-browsertype.mdx "BrowserType"
[CDPSession]: /api/class-cdpsession.mdx "CDPSession"
[CDPSessionEvent]: /api/class-cdpsessionevent.mdx "CDPSessionEvent"
[Clock]: /api/class-clock.mdx "Clock"
[ConsoleMessage]: /api/class-consolemessage.mdx "ConsoleMessage"
[Credentials]: /api/class-credentials.mdx "Credentials"
[Debugger]: /api/class-debugger.mdx "Debugger"
[Dialog]: /api/class-dialog.mdx "Dialog"
[Download]: /api/class-download.mdx "Download"
[ElementHandle]: /api/class-elementhandle.mdx "ElementHandle"
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
[PlaywrightAssertions]: /api/class-playwrightassertions.mdx "PlaywrightAssertions"
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
[WebSocketFrame]: /api/class-websocketframe.mdx "WebSocketFrame"
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

[bool]: https://docs.microsoft.com/en-us/dotnet/api/system.boolean "bool"
[Date]: https://learn.microsoft.com/en-us/dotnet/api/system.datetime "DateTime"
[double]: https://docs.microsoft.com/en-us/dotnet/api/system.double "double"
[byte]: https://docs.microsoft.com/en-us/dotnet/api/system.byte "byte"
[int]: https://docs.microsoft.com/en-us/dotnet/api/system.int32 "int"
[long]: https://docs.microsoft.com/en-us/dotnet/api/system.int64 "long"
[void]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/void "void"
[string]: https://docs.microsoft.com/en-us/dotnet/api/system.string "string"
[URL]: https://nodejs.org/api/url.html "URL"
[Regex]: https://docs.microsoft.com/en-us/dotnet/api/system.text.regularexpressions.regex "Regex"

[Action]: https://docs.microsoft.com/en-us/dotnet/api/system.action-1 "Action"
[Func]: https://docs.microsoft.com/en-us/dotnet/api/system.func-2 "Func"
[IEnumerable]: https://docs.microsoft.com/en-us/dotnet/api/system.collections.ienumerable "IEnumerable"
[IReadOnlyList]: https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.ireadonlylist-1?view=net-9.0 "IReadOnlyList"
[IDictionary]: https://docs.microsoft.com/en-us/dotnet/api/system.collections.idictionary "IDictionary"
[Task]: https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.task?view=net-5.0 "Task"
[IReadOnlyDictionary]: https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.ireadonlydictionary-2 "IReadOnlyDictionary"
[JsonElement]: https://docs.microsoft.com/en-us/dotnet/api/system.text.json.jsonelement "JsonElement"

[all available image tags]: https://mcr.microsoft.com/en-us/product/playwright/dotnet/about "all available image tags"
[Microsoft Artifact Registry]: https://mcr.microsoft.com/en-us/product/playwright/dotnet/about "Microsoft Artifact Registry"
[Dockerfile.noble]: https://github.com/microsoft/playwright-dotnet/blob/main/utils/docker/Dockerfile.noble "Dockerfile.noble"
