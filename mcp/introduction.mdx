---
title: "Introduction"
---

# Playwright MCP

A [Model Context Protocol](https://modelcontextprotocol.io) server that provides browser automation capabilities using Playwright. Enables LLMs to interact with web pages through structured accessibility snapshots — no vision models required.

## Example

```txt
You: Navigate to https://demo.playwright.dev/todomvc and add "Buy groceries".

→ browser_navigate { url: "https://demo.playwright.dev/todomvc" }
→ browser_snapshot

  - heading "todos" [level=1]
  - textbox "What needs to be done?" [ref=e5]

→ browser_type { ref: "e5", text: "Buy groceries", submit: true }
→ browser_snapshot

  - heading "todos" [level=1]
  - textbox "What needs to be done?" [ref=e5]
  - listitem:
    - checkbox "Toggle Todo" [ref=e10]
    - text: "Buy groceries"
  - contentinfo:
    - text: "1 item left"
```

The LLM reads the accessibility snapshot, finds element refs like `e5`, and uses them to interact — clicking buttons, filling forms, checking checkboxes. No screenshots or coordinate guessing needed.

## Key Features

- **Snapshot-based** — operates on the accessibility tree, not pixels. Each interactive element gets a unique ref for deterministic interaction
- **LLM-friendly** — structured text output that LLMs parse naturally, ~200-400 tokens per snapshot vs thousands for DOM/screenshots
- **Cross-browser** — Chrome, Firefox, WebKit, and Edge support
- **Full automation** — 40+ tools covering navigation, forms, network mocking, storage, tracing, video, and more
- **Persistent sessions** — login state and cookies preserved between sessions by default
- **Works everywhere** — VS Code, Cursor, Windsurf, Claude Code, Claude Desktop, and any MCP client

## Quick Start

Add the server to your MCP client:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

The browser opens in **headed mode** by default so you can see what's happening. See [Installation](./installation.mdx) for client-specific setup.

## Playwright MCP vs Playwright CLI

| | **MCP** | **[Playwright CLI](/agent-cli/introduction)** |
|---|---------|-----------|
| **Best for** | Specialized agentic loops, exploratory automation | Coding agents (Claude Code, Copilot) working with large codebases |
| **How it works** | LLM calls MCP tools with structured parameters | Agent runs shell commands |
| **Token cost** | Higher — tool schemas + snapshots in context | Lower — concise CLI output, skills loaded on demand |
| **Default mode** | Headed | Headless |
| **Setup** | JSON config in MCP client | `npm install -g @playwright/cli` |

## Available Tools

### Core
| Tool | Description |
|------|-------------|
| `browser_navigate` | Navigate to a URL |
| `browser_navigate_back` | Go back in history |
| `browser_navigate_forward` | Go forward in history |
| `browser_reload` | Reload the page |
| `browser_snapshot` | Capture accessibility snapshot |
| `browser_click` | Click an element by ref |
| `browser_hover` | Hover over an element |
| `browser_drag` | Drag and drop between elements |
| `browser_type` | Type text into an element |
| `browser_fill_form` | Fill multiple form fields at once |
| `browser_select_option` | Select dropdown option |
| `browser_check` | Check a checkbox or radio |
| `browser_uncheck` | Uncheck a checkbox |
| `browser_press_key` | Press a key (Enter, Tab, etc.) |
| `browser_take_screenshot` | Take a PNG/JPEG screenshot |
| `browser_tabs` | List, create, close, switch tabs |
| `browser_handle_dialog` | Accept or dismiss dialogs |
| `browser_file_upload` | Upload files |
| `browser_close` | Close the browser |
| `browser_resize` | Resize the browser window |
| `browser_wait_for` | Wait for text, element, or time |

### Network & Storage
| Tool | Description |
|------|-------------|
| `browser_network_requests` | List network requests |
| `browser_route` | Mock network requests |
| `browser_route_list` | List active mocked routes |
| `browser_unroute` | Remove mocked routes |
| `browser_cookie_list/get/set/delete/clear` | Manage cookies |
| `browser_localstorage_list/get/set/delete/clear` | Manage localStorage |
| `browser_storage_state` | Save cookies + localStorage to file |
| `browser_set_storage_state` | Restore saved state |

### Testing & Debugging
| Tool | Description |
|------|-------------|
| `browser_run_code` | Execute Playwright code snippets |
| `browser_evaluate` | Evaluate JavaScript on the page |
| `browser_console_messages` | Get console output |
| `browser_generate_locator` | Generate Playwright locator for tests |
| `browser_verify_element_visible` | Assert element is visible |
| `browser_verify_text_visible` | Assert text is visible |
| `browser_start_tracing` / `browser_stop_tracing` | Record execution traces |
| `browser_start_video` / `browser_stop_video` | Record session video |
| `browser_pdf_save` | Export page as PDF |

### Vision (optional)
| Tool | Description |
|------|-------------|
| `browser_mouse_move_xy` | Move mouse to coordinates |
| `browser_mouse_down` / `browser_mouse_up` | Mouse button press/release |
| `browser_mouse_wheel` | Scroll with mouse wheel |
