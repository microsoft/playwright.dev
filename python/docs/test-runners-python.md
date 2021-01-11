---
id: test-runners-python
title: "Test Runners"
---

You can use our [Pytest integration](https://github.com/microsoft/playwright-pytest) to write end-to-end tests in Python.

- [Usage](#usage)
- [Fixtures](#fixtures)
- [Examples](#examples)
- [Debugging](#debugging)
- [Deploy to CI](#deploy-to-ci)

## Usage

```sh
pip install pytest-playwright
```

Use the `page` fixture to write a basic test. See [more examples](#examples).

To run your tests, use pytest CLI.

```sh
# Run tests (Chromium and headless by default)
pytest

# Run tests in headful mode
pytest --headful

# Run tests in a different browser (chromium, firefox, webkit)
pytest --browser firefox

# Run tests in multiple browsers
pytest --browser chromium --browser webkit
```

If you want to add the CLI arguments automatically without specifying them, you can use the [pytest.ini](https://docs.pytest.org/en/stable/reference.html#ini-options-ref) file:

## Fixtures

This plugin configures Playwright-specific [fixtures for pytest](https://docs.pytest.org/en/latest/fixture.html). To use these fixtures, use the fixture name as an argument to the test function.

**Function scope**: These fixtures are created when requested in a test function and destroyed when the test ends.
- `context`: New [browser context](https://playwright.dev/#path=docs%2Fcore-concepts.md&q=browser-contexts) for a test.
- `page`: New [browser page](https://playwright.dev/#path=docs%2Fcore-concepts.md&q=pages-and-frames) for a test.

**Session scope**: These fixtures are created when requested in a test function and destroyed when all tests end.
- `browser`: Browser instance launched by Playwright.
- `browser_name`: Browser name as string.
- `is_chromium`, `is_webkit`, `is_firefox`: Booleans for the respective browser types.

**Customizing fixture options**: For `browser` and `context` fixtures, use the the following fixtures to define custom launch options.
- `browser_type_launch_args`: Override launch arguments for [`browserType.launch()`](https://playwright.dev/#path=docs%2Fapi.md&q=browsertypelaunchoptions). It should return a Dict.
- `browser_context_args`: Override the options for [`browser.newContext()`](https://playwright.dev/#path=docs%2Fapi.md&q=browsernewcontextoptions). It should return a Dict.

## Examples

### Configure Mypy typings for auto-completion

### Skip test by browser

### Run on a specific browser

### Configure base-url

Start Pytest with the `base-url` argument.

```sh
pytest --base-url http://localhost:8080
```

### Ignore HTTPS errors

conftest.py

### Use custom viewport size

conftest.py

### Device emulation

conftest.py

## Debugging

### Use with pdb

Use the `breakpoint()` statement in your test code to pause execution and get a [pdb](https://docs.python.org/3/library/pdb.html) REPL.

### Screenshot on test failure

You can capture screenshots for failed tests with a [pytest runtest hook](https://docs.pytest.org/en/6.1.0/reference.html?highlight=pytest_runtest_makereport#test-running-runtest-hooks). Add this to your `conftest.py` file.

Note that this snippet uses `slugify` to convert test names to file paths, which can be installed with `pip install python-slugify`.

## Deploy to CI

Use the [Playwright GitHub Action](https://github.com/microsoft/playwright-github-action) or [guides for other CI providers](https://playwright.dev/#path=docs%2Fci.md&q=) to deploy your tests to CI/CD

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