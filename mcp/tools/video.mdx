---
title: "Video Recording"
---

# Video Recording

Record browser sessions as WebM videos with chapter markers. Requires the **devtools** [capability](../capabilities.mdx).

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

## browser_start_video

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filename` | string | no | Custom filename |
| `width` | number | no | Video width in pixels |
| `height` | number | no | Video height in pixels |

## browser_stop_video

```txt
→ browser_stop_video
  Video saved to: /output/login-flow.webm
```

## browser_video_chapter

Add chapter markers for structured recordings.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `title` | string | yes | Chapter title |
| `description` | string | no | Chapter description |
| `duration` | number | no | Display duration in ms |

## Workflow: recording a bug reproduction

```txt
→ browser_start_video { filename: "cart-bug-repro.webm" }

→ browser_video_chapter { title: "Setup: add items to cart" }
→ browser_navigate { url: "https://store.example.com" }
→ browser_click { ref: "e8" }     // Add item 1
→ browser_click { ref: "e12" }    // Add item 2
→ browser_click { ref: "e20" }    // Go to cart

→ browser_video_chapter {
    title: "Verify items in cart",
    description: "Both items should be visible"
  }
→ browser_snapshot
  - list "Cart items":
    - listitem: "Headphones - $49.99"
    - listitem: "Cable - $9.99"

→ browser_video_chapter {
    title: "Bug: refresh clears cart",
    description: "Cart should persist but items disappear"
  }
→ browser_reload
→ browser_snapshot
  - heading "Your cart is empty" [level=1]
→ browser_take_screenshot

→ browser_stop_video
  // Attach cart-bug-repro.webm to the bug report
```

## Automatic recording

Record all sessions automatically using the environment variable:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest", "--caps=devtools"],
      "env": { "PLAYWRIGHT_MCP_SAVE_VIDEO": "800x600" }
    }
  }
}
```

Or via the [config file](../configuration/options.mdx):

```json
{
  "saveVideo": { "width": 800, "height": 600 }
}
```

## Use cases

| Scenario | Approach |
|----------|----------|
| Bug reproduction | Record steps, attach to issue |
| Test documentation | Record with chapter markers |
| Agent monitoring | Record agent sessions for review |
| Demo creation | Record polished walkthrough |
