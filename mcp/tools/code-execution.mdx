---
title: "Code Execution"
---

# Code Execution

Run Playwright code for complex interactions beyond individual tool calls.

## browser_run_code

Execute a Playwright code snippet. The function receives a `page` object with the full [Playwright API](/docs/api/class-page).

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `code` | string | yes | Playwright code to execute |

### Verify element content

```txt
→ browser_run_code {
    code: "async (page) => { return await page.getByTestId('todo-count').textContent(); }"
  }
  "3 items left"
```

### Set geolocation

```txt
→ browser_run_code {
    code: "async (page) => { await page.context().grantPermissions(['geolocation']); await page.context().setGeolocation({ latitude: 37.7749, longitude: -122.4194 }); }"
  }
```

### Wait for specific condition

```txt
→ browser_run_code {
    code: "async (page) => { await page.waitForSelector('.loading', { state: 'hidden' }); return 'Loading complete'; }"
  }
  "Loading complete"
```

### Handle iframes

```txt
→ browser_run_code {
    code: "async (page) => { const frame = page.frameLocator('#payment-iframe'); return await frame.locator('.total').textContent(); }"
  }
  "$49.99"
```

### Clipboard operations

```txt
→ browser_run_code {
    code: "async (page) => { await page.context().grantPermissions(['clipboard-read', 'clipboard-write']); return await page.evaluate(() => navigator.clipboard.readText()); }"
  }
```

## browser_evaluate

Evaluate JavaScript directly on the page or a specific element.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `expression` | string | yes | JavaScript to evaluate |
| `ref` | string | no | Element ref to evaluate on |

```txt
→ browser_evaluate { expression: "document.title" }
  "TodoMVC - React"

→ browser_evaluate { expression: "el => el.getAttribute('data-testid')", ref: "e15" }
  "submit-button"

→ browser_evaluate { expression: "window.innerWidth + 'x' + window.innerHeight" }
  "1280x720"
```

## When to use code execution

| Scenario | Use |
|----------|-----|
| Click a button | `browser_click` |
| Fill a form field | `browser_type` or `browser_fill_form` |
| Read element text | `browser_snapshot` |
| Check computed styles | `browser_evaluate` |
| Complex multi-step logic | `browser_run_code` |
| Geolocation/permissions | `browser_run_code` |
| Custom wait conditions | `browser_run_code` |
| Iframe interactions | `browser_run_code` |
