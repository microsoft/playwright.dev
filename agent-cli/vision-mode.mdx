---
title: "Vision Mode"
---

# Vision Mode

By default, you interact with page elements using refs from accessibility snapshots. For elements not exposed in the accessibility tree — canvas apps, maps, custom widgets — use coordinate-based mouse commands with screenshots as your visual reference.

## Commands

| Command | Description |
|---------|-------------|
| `mousemove <x> <y>` | Move mouse to pixel coordinates |
| `mousedown [button]` | Press mouse button (left, right, middle) |
| `mouseup [button]` | Release mouse button |
| `mousewheel <dx> <dy>` | Scroll (dx=horizontal, dy=vertical) |
| `screenshot` | Capture viewport for coordinate reference |

## Workflow: interacting with a canvas app

```bash
# Take a screenshot to see the canvas
playwright-cli screenshot --filename=canvas.png

# Agent identifies coordinates from the screenshot
# Click at position (150, 300)
playwright-cli mousemove 150 300
playwright-cli mousedown
playwright-cli mouseup

# Drag from (100, 200) to (400, 200)
playwright-cli mousemove 100 200
playwright-cli mousedown
playwright-cli mousemove 400 200
playwright-cli mouseup

# Verify the result
playwright-cli screenshot --filename=after-drag.png
```

## Workflow: clicking an icon without accessible name

```bash
# Snapshot doesn't show the gear icon
playwright-cli snapshot
# (no gear icon in output)

# Take a screenshot — agent sees gear icon at approximately (850, 45)
playwright-cli screenshot

# Click it
playwright-cli mousemove 850 45
playwright-cli mousedown
playwright-cli mouseup

# Settings panel opens with proper accessibility
playwright-cli snapshot
# - heading "Settings" [level=2]
# - textbox "Display name" [ref=e12]

# Now use refs for the rest
playwright-cli fill e12 "New Name"
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
