---
title: "Keyboard & Mouse"
---

# Keyboard & Mouse

## Keyboard

### browser_press_key

Press a key or key combination.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | string | yes | Key to press |

**Common keys:** `Enter`, `Tab`, `Escape`, `Backspace`, `Delete`, `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`, `Home`, `End`, `PageUp`, `PageDown`

**Key combinations:** `Control+a`, `Control+c`, `Control+v`, `Shift+Tab`, `Alt+F4`

```txt
→ browser_press_key { key: "Enter" }         // submit form
→ browser_press_key { key: "Tab" }           // move to next field
→ browser_press_key { key: "Escape" }        // close modal
→ browser_press_key { key: "Control+a" }     // select all text
→ browser_press_key { key: "ArrowDown" }     // navigate dropdown
```

### browser_type

Type text into an element. See [Forms](./forms.mdx) for details.

## Mouse (Vision mode)

These tools are available when the **vision** capability is enabled (`--caps=vision`). They use pixel coordinates from screenshots rather than element refs from snapshots.

### browser_mouse_move_xy

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `x` | number | yes | X coordinate in pixels |
| `y` | number | yes | Y coordinate in pixels |

### browser_mouse_down / browser_mouse_up

Press or release the mouse button at the current position.

### browser_mouse_wheel

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `deltaX` | number | yes | Horizontal scroll (pixels) |
| `deltaY` | number | yes | Vertical scroll (pixels, positive = down) |

### browser_mouse_click_xy

Click at specific coordinates without needing to move first.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `x` | number | yes | X coordinate |
| `y` | number | yes | Y coordinate |
| `button` | string | no | `left` (default), `right`, or `middle` |
| `clickCount` | number | no | Number of clicks (2 for double-click) |
| `delay` | number | no | Delay between mousedown and mouseup (ms) |

```txt
→ browser_mouse_click_xy { x: 150, y: 300 }
→ browser_mouse_click_xy { x: 150, y: 300, clickCount: 2 }  // double-click
```

### browser_mouse_drag_xy

Drag from one position to another.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startX` | number | yes | Start X coordinate |
| `startY` | number | yes | Start Y coordinate |
| `endX` | number | yes | End X coordinate |
| `endY` | number | yes | End Y coordinate |

```txt
→ browser_mouse_drag_xy { startX: 100, startY: 200, endX: 400, endY: 200 }
```

### When to use mouse tools

| Scenario | Use |
|----------|-----|
| Clicking a button, link, or form element | `browser_click` with ref (default) |
| Canvas-based apps (drawing, maps) | Mouse tools with vision |
| Custom UI controls without accessibility | Mouse tools with vision |
| Drag interactions on pixel-precise targets | Mouse tools with vision |

For most web applications, **refs from accessibility snapshots are more reliable** than coordinates. Use mouse tools only when the accessibility tree doesn't expose the elements you need.
