---
title: "Capabilities"
---

# Capabilities

Capabilities control which tools the MCP server exposes to the LLM. By default, only core tools are enabled. Add capabilities to unlock additional tool groups.

## Enabling capabilities

Via CLI argument:

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

Via environment variable:

```bash
PLAYWRIGHT_MCP_CAPS=vision,pdf,devtools
```

Via config file:

```json
{
  "capabilities": ["core", "vision", "pdf", "devtools", "network", "storage", "testing"]
}
```

## Capability reference

### core (always enabled)

Basic browser automation — always available, cannot be disabled.

| Tool | Description |
|------|-------------|
| `browser_navigate` | Navigate to a URL |
| `browser_navigate_back` | Go back in history |
| `browser_snapshot` | Capture accessibility snapshot |
| `browser_click` | Click an element |
| `browser_hover` | Hover over an element |
| `browser_drag` | Drag and drop |
| `browser_select_option` | Select dropdown option |
| `browser_type` | Type text into element |
| `browser_press_key` | Press a key |
| `browser_fill_form` | Fill multiple form fields |
| `browser_take_screenshot` | Take a screenshot |
| `browser_run_code` | Execute Playwright code |
| `browser_wait_for` | Wait for text/time |
| `browser_evaluate` | Evaluate JavaScript |
| `browser_handle_dialog` | Accept/dismiss dialogs |
| `browser_file_upload` | Upload files |
| `browser_console_messages` | Get console output |
| `browser_network_requests` | List network requests |
| `browser_tabs` | Manage tabs |
| `browser_close` | Close browser |
| `browser_resize` | Resize window |

### network

Network mocking and state control.

| Tool | Description |
|------|-------------|
| `browser_route` | Mock requests matching a URL pattern |
| `browser_route_list` | List active mocked routes |
| `browser_unroute` | Remove mocked routes |
| `browser_network_state_set` | Set online/offline state |

```json
"--caps=network"
```

### storage

Cookie, localStorage, and sessionStorage management plus state persistence.

| Tool | Description |
|------|-------------|
| `browser_cookie_list/get/set/delete/clear` | Manage cookies |
| `browser_localstorage_list/get/set/delete/clear` | Manage localStorage |
| `browser_sessionstorage_list/get/set/delete/clear` | Manage sessionStorage |
| `browser_storage_state` | Save cookies + localStorage to file |
| `browser_set_storage_state` | Restore saved state |

```json
"--caps=storage"
```

### testing

Assertions and test generation tools.

| Tool | Description |
|------|-------------|
| `browser_verify_element_visible` | Assert element is visible by role and name |
| `browser_verify_text_visible` | Assert text is visible |
| `browser_verify_list_visible` | Assert list with items is visible |
| `browser_verify_value` | Assert form field value |
| `browser_generate_locator` | Generate Playwright locator for test code |

```json
"--caps=testing"
```

### vision

Coordinate-based mouse tools for screenshot-driven workflows. Requires a vision-capable LLM.

| Tool | Description |
|------|-------------|
| `browser_mouse_move_xy` | Move mouse to coordinates |
| `browser_mouse_click_xy` | Click at coordinates |
| `browser_mouse_drag_xy` | Drag between coordinates |
| `browser_mouse_down` | Press mouse button |
| `browser_mouse_up` | Release mouse button |
| `browser_mouse_wheel` | Scroll with mouse wheel |

```json
"--caps=vision"
```

See [Vision Mode](./vision-mode.mdx) for usage patterns.

### pdf

PDF generation.

| Tool | Description |
|------|-------------|
| `browser_pdf_save` | Export page as PDF |

```json
"--caps=pdf"
```

### devtools

Tracing, video recording, and test debugging.

| Tool | Description |
|------|-------------|
| `browser_start_tracing` | Start execution trace |
| `browser_stop_tracing` | Stop trace and save |
| `browser_start_video` | Start video recording |
| `browser_stop_video` | Stop video and save |
| `browser_video_chapter` | Add chapter marker |
| `browser_resume` | Resume paused execution |

```json
"--caps=devtools"
```

### config

Configuration introspection.

| Tool | Description |
|------|-------------|
| `browser_get_config` | Get resolved config |

```json
"--caps=config"
```

## Common configurations

### Minimal (default)

Only core tools — navigation, snapshots, clicking, typing, screenshots:

```json
["@playwright/mcp@latest"]
```

### Full automation

Everything enabled:

```json
["@playwright/mcp@latest", "--caps=network,storage,testing,vision,pdf,devtools"]
```

### Testing workflow

Core + testing assertions + storage for auth persistence:

```json
["@playwright/mcp@latest", "--caps=testing,storage"]
```

### Debugging workflow

Core + devtools for tracing and video:

```json
["@playwright/mcp@latest", "--caps=devtools"]
```

### Data extraction

Core + network for API inspection + storage for cookies:

```json
["@playwright/mcp@latest", "--caps=network,storage"]
```

## Why capabilities exist

Capabilities limit the number of tools exposed to the LLM. Fewer tools means:

- **Lower token cost** — the tool schema is smaller
- **Fewer hallucinated tool calls** — the LLM has fewer choices to confuse
- **Faster responses** — less context to process

Only enable what you need for your use case.
