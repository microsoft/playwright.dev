---
title: "Tracing"
---

# Tracing

Record execution traces that capture DOM snapshots, screenshots, network activity, and console logs at every step. Requires the **devtools** [capability](../capabilities.mdx).

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest", "--caps=devtools"]
    }
  }
}
```

## browser_start_tracing

```txt
→ browser_start_tracing
  Tracing started
```

## browser_stop_tracing

```txt
→ browser_stop_tracing
  Trace saved to: /output/trace-2024-03-15.zip
  Network log: /output/trace-2024-03-15.network
```

View traces in the [Playwright Trace Viewer](/docs/trace-viewer-intro):

```bash
npx playwright show-trace /output/trace-2024-03-15.zip
```

The trace viewer shows a timeline of every action with DOM snapshots (before and after), screenshots, network requests and responses, console messages, and timing.

## Workflow: debugging a broken checkout

```txt
You: Something fails during checkout. Record a trace.

→ browser_start_tracing
→ browser_navigate { url: "https://store.example.com/cart" }
→ browser_click { ref: "e15" }    // "Proceed to checkout"
→ browser_fill_form { fields: [
    { ref: "e30", value: "Alice Smith" },
    { ref: "e32", value: "123 Main St" },
    { ref: "e34", value: "94102" }
  ]}
→ browser_click { ref: "e40" }    // "Place order"
→ browser_snapshot
  - heading "Error" [level=1]
  - text: "Payment processing failed"

→ browser_console_messages { level: "error" }
  [error] POST /api/payment 422: {"error":"Card number required"}

→ browser_stop_tracing
  // Share trace with the team for full timeline analysis
```

## Automatic session recording

Save traces for every session automatically:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest", "--caps=devtools", "--save-session"]
    }
  }
}
```
