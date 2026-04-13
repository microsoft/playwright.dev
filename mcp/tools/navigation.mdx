---
title: "Navigation"
---

# Navigation

| Tool | Description |
|------|-------------|
| `browser_navigate` | Navigate to a URL |
| `browser_navigate_back` | Go back to the previous page |
| `browser_navigate_forward` | Go forward to the next page |
| `browser_reload` | Reload the current page |
| `browser_close` | Close the current page and browser |

## browser_navigate

Navigate to a URL in the current tab.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | string | yes | URL to navigate to |

```txt
You: Go to https://demo.playwright.dev/todomvc

→ browser_navigate { url: "https://demo.playwright.dev/todomvc" }
→ Returns snapshot of the loaded page:

  - heading "todos" [level=1]
  - textbox "What needs to be done?" [ref=e5]
```

## browser_navigate_back

Go back to the previous page in the browser history.

```txt
You: Go back to the previous page.

→ browser_navigate_back
→ Returns snapshot of the previous page
```

## browser_navigate_forward

Go forward to the next page in the browser history.

```txt
You: Go forward.

→ browser_navigate_forward
```

## browser_reload

Reload the current page.

```txt
You: Reload the page.

→ browser_reload
→ Returns fresh snapshot after reload
```

## browser_close

Close the current page and browser.

```txt
→ browser_close
```

## Workflow example

```txt
You: Open the TodoMVC app, add an item, then go back to see
     if the item persists.

→ browser_navigate { url: "https://demo.playwright.dev/todomvc" }
→ browser_type { ref: "e5", text: "Buy groceries", submit: true }
→ browser_navigate { url: "https://example.com" }
→ browser_navigate_back
→ browser_snapshot

  - heading "todos" [level=1]
  - textbox "What needs to be done?" [ref=e5]
  - listitem:
    - checkbox "Toggle Todo" [ref=e10]
    - text: "Buy groceries"
```
