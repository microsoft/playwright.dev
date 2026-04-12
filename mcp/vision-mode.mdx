---
title: "Vision Mode"
---

# Vision Mode

By default, Playwright MCP uses accessibility snapshots for all interactions. Vision mode adds coordinate-based tools that work with screenshots, enabling interaction with elements not exposed in the accessibility tree.

## Enabling vision mode

Add the `vision` capability:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest", "--caps=vision"]
    }
  }
}
```

## Additional tools

With vision mode, these coordinate-based tools become available:

| Tool | Description |
|------|-------------|
| `browser_mouse_move_xy` | Move mouse to x,y coordinates |
| `browser_mouse_click_xy` | Click at x,y (supports button, double-click, delay) |
| `browser_mouse_drag_xy` | Drag from start to end coordinates |
| `browser_mouse_down` | Press mouse button |
| `browser_mouse_up` | Release mouse button |
| `browser_mouse_wheel` | Scroll with mouse wheel |

## Workflow: interacting with a canvas app

```txt
You: Draw a rectangle on the canvas.

→ browser_take_screenshot
  // LLM sees the canvas and identifies coordinates

→ browser_mouse_click_xy { x: 100, y: 150 }
→ browser_mouse_drag_xy { startX: 100, startY: 150, endX: 300, endY: 250 }
→ browser_take_screenshot
  // LLM verifies the rectangle was drawn
```

## Workflow: clicking an icon without accessible name

```txt
→ browser_snapshot
  // The gear icon has no accessible name in the snapshot

→ browser_take_screenshot
  // LLM sees the gear icon at approximately (850, 45)

→ browser_mouse_click_xy { x: 850, y: 45 }
→ browser_snapshot
  // Settings panel is now open with proper accessibility
  - heading "Settings" [level=2]
  - textbox "Display name" [ref=e12]
```

## When to use vision mode

| Scenario | Approach |
|----------|----------|
| Standard web pages | Use refs from snapshots (default) |
| Canvas / WebGL apps | Vision mode with screenshots |
| Map interactions | Vision mode for pan/zoom |
| Image editors | Vision mode for drawing |
| Charts / graphs | Vision mode to click data points |
| Custom widgets without ARIA | Vision mode as fallback |

For most web applications, **the default snapshot-based approach is more reliable and token-efficient**. Use vision mode only when the accessibility tree doesn't cover your use case.

## Combining capabilities

Enable multiple capabilities:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest", "--caps=vision,pdf,devtools"]
    }
  }
}
```

Or in the config file:

```json
{
  "capabilities": ["core", "vision", "pdf", "devtools"]
}
```
