---
title: "Storage & Authentication"
---

# Storage & Authentication

Manage cookies, localStorage, sessionStorage, and save/restore full browser state for authentication persistence. Requires the **storage** [capability](../capabilities.mdx).

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest", "--caps=storage"]
    }
  }
}
```

## Storage state

Save and restore the full browser state (cookies + localStorage) in a single file. This is the primary way to persist authentication across sessions.

### browser_storage_state

Save current state to a JSON file.

```txt
→ browser_storage_state
  State saved to: auth-state.json
```

### browser_set_storage_state

Restore a previously saved state.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | string | yes | Path to state JSON file |

```txt
→ browser_set_storage_state { path: "./auth-state.json" }
→ browser_navigate { url: "https://app.example.com/dashboard" }
→ browser_snapshot
  // Already logged in
  - heading "Dashboard" [level=1]
```

### Workflow: save login, skip it next time

```txt
// Login once
→ browser_navigate { url: "https://app.example.com/login" }
→ browser_type { ref: "e3", text: "alice@example.com" }
→ browser_type { ref: "e5", text: "s3cret!" }
→ browser_click { ref: "e7" }
→ browser_snapshot
  - heading "Dashboard" [level=1]

// Save
→ browser_storage_state
  State saved to: auth-state.json

// Next session: restore instead of logging in
→ browser_set_storage_state { path: "./auth-state.json" }
→ browser_navigate { url: "https://app.example.com/dashboard" }
```

Or load state automatically on server startup:

```json
["@playwright/mcp@latest", "--caps=storage", "--isolated", "--storage-state=./auth-state.json"]
```

## Cookies

### browser_cookie_list

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `domain` | string | no | Filter by domain |
| `path` | string | no | Filter by path |

```txt
→ browser_cookie_list

  Name          Value       Domain            HttpOnly  Secure  Expires
  session_id    abc123      .example.com      true      true    2024-12-31
  theme         dark        .example.com      false     false   Session
  _ga           GA1.2...    .example.com      false     false   2026-01-01
```

### browser_cookie_get

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | yes | Cookie name |

### browser_cookie_set

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | yes | Cookie name |
| `value` | string | yes | Cookie value |
| `domain` | string | no | Cookie domain |
| `path` | string | no | Cookie path (default: `/`) |
| `expires` | number | no | Expiration as Unix timestamp |
| `httpOnly` | boolean | no | HTTP-only flag |
| `secure` | boolean | no | Secure flag |
| `sameSite` | string | no | `Strict`, `Lax`, or `None` |

### browser_cookie_delete / browser_cookie_clear

Delete a specific cookie by name, or clear all cookies.

### Workflow: test logout by clearing cookies

```txt
→ browser_cookie_clear
→ browser_reload
→ browser_snapshot
  - heading "Sign in" [level=1]
  - textbox "Email" [ref=e3]
```

## localStorage

### browser_localstorage_list / get / set / delete / clear

Manage localStorage key-value pairs for the current origin.

| Tool | Parameters |
|------|-----------|
| `browser_localstorage_list` | (none) |
| `browser_localstorage_get` | `key` (string) |
| `browser_localstorage_set` | `key` (string), `value` (string) |
| `browser_localstorage_delete` | `key` (string) |
| `browser_localstorage_clear` | (none) |

```txt
→ browser_localstorage_list
  Key                Value
  user_preferences   {"theme":"dark","lang":"en"}
  onboarding_done    true

→ browser_localstorage_set { key: "onboarding_done", value: "false" }
→ browser_reload
→ browser_snapshot
  // Onboarding wizard appears
  - heading "Welcome! Let's get started" [level=1]
```

## sessionStorage

Same interface as localStorage but session-scoped — data is cleared when the tab closes.

| Tool | Parameters |
|------|-----------|
| `browser_sessionstorage_list` | (none) |
| `browser_sessionstorage_get` | `key` (string) |
| `browser_sessionstorage_set` | `key` (string), `value` (string) |
| `browser_sessionstorage_delete` | `key` (string) |
| `browser_sessionstorage_clear` | (none) |
