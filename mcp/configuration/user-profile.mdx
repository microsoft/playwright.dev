---
title: "Profile & State"
---

# Profile & State

Playwright MCP manages browser state through profiles. By default, login state and cookies persist between sessions automatically.

## Profile modes

### Persistent (default)

Login state, cookies, and localStorage are preserved between sessions. Each project gets a separate profile automatically based on the workspace.

| Platform | Default location |
|----------|-----------------|
| macOS | `~/Library/Caches/ms-playwright/mcp-{channel}-profile` |
| Linux | `~/.cache/ms-playwright/mcp-{channel}-profile` |
| Windows | `%LOCALAPPDATA%\ms-playwright\mcp-{channel}-profile` |

Override the profile location:

```json
["@playwright/mcp@latest", "--user-data-dir=/path/to/profile"]
```

:::note
The CLI uses **in-memory** state by default (cookies persist between commands but are lost when the browser closes). Use `--persistent` to enable disk persistence. See [Sessions & Dashboard](/agent-cli/sessions) for CLI-specific session management.
:::

### Isolated

Each session starts fresh with no saved state. Pass `--isolated` to enable:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest", "--isolated"]
    }
  }
}
```

Load initial state into an isolated session with `--storage-state`:

```json
["@playwright/mcp@latest", "--isolated", "--storage-state=./auth-state.json"]
```

### Browser extension

Connect to your existing browser tabs instead of launching a new browser. See [Browser Extension](./browser-extension.mdx).

## Saving and restoring state

Save authenticated state for reuse across sessions:

```txt
// Login, then save
→ browser_storage_state
  State saved to: auth-state.json

// Later: restore
→ browser_set_storage_state { path: "./auth-state.json" }
```

Or load state automatically on server startup with `--storage-state`. See [Storage & Authentication](../tools/storage.mdx) for the full workflow.
