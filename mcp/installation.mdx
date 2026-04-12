---
title: "Installation"
---

# Getting Started

## Prerequisites

- [Node.js](https://nodejs.org/) 20 or newer
- An MCP client: VS Code, Cursor, Windsurf, Claude Code, Claude Desktop, or similar

## Installation

Add the Playwright MCP server to your client:

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

See [Client Setup](./clients/vscode.mdx) for client-specific instructions. The browser downloads automatically on first use.

## First interaction

Ask your AI assistant:

```txt
Navigate to https://demo.playwright.dev/todomvc and add a few todo items.
```

The assistant calls MCP tools to open the browser, navigate, and interact — returning accessibility snapshots at each step:

```txt
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

## The workflow

Every MCP interaction follows this cycle:

1. **Navigate** — `browser_navigate` opens a URL
2. **Snapshot** — tools return the accessibility tree with element refs
3. **Interact** — the LLM uses refs to click, type, or fill
4. **Re-snapshot** — each action returns updated state

The browser opens in **headed mode** by default so you can watch. Pass `--headless` to run without a visible window.

## Example prompts

```txt
Go to https://example.com and take a screenshot.
```

```txt
Open https://demo.playwright.dev/todomvc, add three todos,
check off the first one, and take a screenshot.
```

```txt
Navigate to https://news.ycombinator.com and list the top 5 stories.
```

```txt
Save the current browser state to auth.json so we can skip login next time.
```

## Next steps

- [Snapshots](./snapshots.mdx) — how element refs work
- [Capabilities](./capabilities.mdx) — enable network mocking, storage, testing, and more
- [Configuration](./configuration/options.mdx) — headless mode, browser selection, profiles
