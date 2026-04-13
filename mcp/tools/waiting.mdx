---
title: "Waiting"
---

# Waiting

## browser_wait_for

Wait for a condition before proceeding. Accepts one of three modes:

| Parameter | Type | Description |
|-----------|------|-------------|
| `time` | number | Seconds to wait |
| `text` | string | Text to appear on the page |
| `textGone` | string | Text to disappear from the page |

### Wait for text to appear

```txt
→ browser_wait_for { text: "Upload complete" }
  ✓ Text appeared: "Upload complete"
```

### Wait for text to disappear

```txt
→ browser_wait_for { textGone: "Loading..." }
  ✓ Text disappeared: "Loading..."
```

### Wait a fixed duration

```txt
→ browser_wait_for { time: 3 }
  ✓ Waited 3 seconds
```

## Workflow: waiting for async operations

```txt
You: Click the upload button and wait for it to finish.

→ browser_click { ref: "e9" }
→ browser_snapshot
  - progressbar "Uploading..." [ref=e12]

→ browser_wait_for { textGone: "Uploading..." }
→ browser_snapshot
  - text: "Upload complete! File saved."
  - link "View file" [ref=e15]
```

For more complex wait conditions (CSS selectors, JavaScript expressions), use [browser_run_code](./code-execution.mdx):

```txt
→ browser_run_code {
    code: "async (page) => { await page.waitForSelector('.data-loaded'); }"
  }
```
