---
title: "Sessions & Dashboard"
---

# Sessions & Dashboard

The CLI keeps the browser profile in memory by default — cookies and storage state are preserved between CLI calls within a session but lost when the browser closes.

## Named sessions

Run multiple isolated browser instances:

```bash
playwright-cli open https://playwright.dev
playwright-cli -s=example open https://example.com --persistent
playwright-cli list
# Active sessions:
# -> default (https://playwright.dev)
#    example (https://example.com) [persistent]
```

Each session has its own browser instance, cookies, localStorage, navigation history, and console log.

## Environment variable

```bash
PLAYWRIGHT_CLI_SESSION=todo-app claude .
```

All `playwright-cli` commands in that agent session use the `todo-app` browser instance.

## Profile persistence

### In-memory (default)

Cookies and storage persist between commands within a session but are lost when the browser closes:

```bash
playwright-cli open https://example.com
```

### Persistent to disk

Profile is saved to disk and survives browser restarts. This is equivalent to the default persistent mode in [Playwright MCP](/mcp/configuration/user-profile).

```bash
playwright-cli open https://example.com --persistent
```

Default persistent profile locations:

| Platform | Default location |
|----------|-----------------|
| macOS | `~/Library/Caches/ms-playwright/mcp-{channel}-profile` |
| Linux | `~/.cache/ms-playwright/mcp-{channel}-profile` |
| Windows | `%LOCALAPPDATA%\ms-playwright\mcp-{channel}-profile` |

### Custom directory

```bash
playwright-cli open https://example.com --profile=./my-profile
```

## Session management

```bash
playwright-cli list                     # list all sessions
playwright-cli -s=name close            # close a specific session
playwright-cli close-all                # close all browsers
playwright-cli kill-all                 # force kill (for unresponsive browsers)
playwright-cli -s=name delete-data      # delete stored profile data
```

## Dashboard

Open a visual dashboard to observe and control all running sessions:

```bash
playwright-cli show
```

The dashboard provides:

| View | Description |
|------|-------------|
| **Session grid** | All active sessions with live screencast, name, URL, and title. Click to zoom in. |
| **Session detail** | Live viewport with tab bar, navigation controls, and full remote mouse/keyboard input. Press Escape to release. |

Use cases:
- Watch coding agents automate browsers in the background
- Take over when an agent gets stuck on a CAPTCHA or 2FA
- Close stale sessions or delete data from the UI

## Saving and restoring state

Save authenticated state for reuse across sessions:

```bash
# Login, then save state
playwright-cli state-save auth-state.json

# Later: restore state in a new session
playwright-cli state-load auth-state.json
```

## Workflow: isolated testing

```bash
# Admin session
playwright-cli -s=admin open https://app.example.com --persistent
playwright-cli -s=admin state-load admin-auth.json
playwright-cli -s=admin goto /admin/settings

# User session
playwright-cli -s=user open https://app.example.com --persistent
playwright-cli -s=user state-load user-auth.json
playwright-cli -s=user goto /dashboard

# Monitor both
playwright-cli show
```
