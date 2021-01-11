---
id: installation
title: "Advanced installation"
---

- [Managing browser binaries](#managing-browser-binaries)
- [Download from artifact repository](#download-from-artifact-repository)
- [Skip browser downloads](#skip-browser-downloads)
- [Download single browser binary](#download-single-browser-binary)

## Managing browser binaries

Each version of Playwright needs specific versions of browser binaries to operate. By default Playwright downloads Chromium, WebKit and Firefox browsers into the OS-specific cache folders:
- `%USERPROFILE%\AppData\Local\ms-playwright` on Windows
- `~/Library/Caches/ms-playwright` on MacOS
- `~/.cache/ms-playwright` on Linux

```sh
npm i -D playwright
```

These browsers will take few hundreds of megabytes of the disk space when installed:

```sh
du -hs ./Library/Caches/ms-playwright/*
281M  chromium-XXXXXX
187M  firefox-XXXX
180M  webkit-XXXX
```

You can override default behavior using environment variables. When installing Playwright, ask it to download browsers into a specific location:

```sh
# Linux/macOS
$ PLAYWRIGHT_BROWSERS_PATH=$HOME/pw-browsers npm i -D playwright

# Windows
$ set PLAYWRIGHT_BROWSERS_PATH=%USERPROFILE%\pw-browsers
$ npm i -D playwright
```

When running Playwright scripts, ask it to search for browsers in a shared location:

```sh
# Linux/macOS
$ PLAYWRIGHT_BROWSERS_PATH=$HOME/pw-browsers node playwright-script.js

# Windows
$ set PLAYWRIGHT_BROWSERS_PATH=%USERPROFILE%\pw-browsers
$ node playwright-script.js
```

Or you can opt into the hermetic install and place binaries under the `node_modules/` folder:

```sh
# Linux/macOS
$ PLAYWRIGHT_BROWSERS_PATH=0 npm i -D playwright

# Windows
$ set PLAYWRIGHT_BROWSERS_PATH=0
$ npm i -D playwright
```

Playwright keeps track of packages that need those browsers and will garbage collect them as you update Playwright to the newer versions.

> **NOTE** Developers can opt-in in this mode via exporting `PLAYWRIGHT_BROWSERS_PATH=$HOME/pw-browsers` in their `.bashrc`.

## Download from artifact repository

By default, Playwright downloads browsers from Microsoft and Google public CDNs.

Sometimes companies maintain an internal artifact repository to host browser binaries. In this case, Playwright can be configured to download from a custom location using the `PLAYWRIGHT_DOWNLOAD_HOST` env variable.

```sh
# Linux/macOS
$ PLAYWRIGHT_DOWNLOAD_HOST=192.168.1.78 npm i -D playwright

# Windows
$ set PLAYWRIGHT_DOWNLOAD_HOST=192.168.1.78
$ npm i -D playwright
```

It is also possible to use a per-browser download hosts using `PLAYWRIGHT_CHROMIUM_DOWNLOAD_HOST`, `PLAYWRIGHT_FIREFOX_DOWNLOAD_HOST` and `PLAYWRIGHT_WEBKIT_DOWNLOAD_HOST` env variables that take precedence over `PLAYWRIGHT_DOWNLOAD_HOST`.

```sh
# Linux/macOS
$ PLAYWRIGHT_FIREFOX_DOWNLOAD_HOST=192.168.1.1 PLAYWRIGHT_DOWNLOAD_HOST=192.168.1.78 npm i -D playwright
```

## Skip browser downloads

In certain cases, it is desired to avoid browser downloads altogether because browser binaries are managed separately.

This can be done by setting `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD` variable before installation.

```sh
# Linux/macOS
$ PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm i -D playwright

# Windows
$ set PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
$ npm i -D playwright
```

## Download single browser binary

Playwright ships three packages that bundle only a single browser:
- [`playwright-chromium`](https://www.npmjs.com/package/playwright-chromium)
- [`playwright-webkit`](https://www.npmjs.com/package/playwright-webkit)
- [`playwright-firefox`](https://www.npmjs.com/package/playwright-firefox)

> **NOTE** All configuration environment variables also apply to these packages.

Using these packages is as easy as using a regular Playwright:

Install a specific package

```sh
$ npm i -D playwright-webkit
```

Require package

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