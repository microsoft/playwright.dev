---
title: "Storage & Authentication"
---

# Storage & Authentication

Manage cookies, localStorage, sessionStorage, and save/restore full browser state for authentication persistence.

## Storage state (cookies + localStorage)

Save and restore the full browser state (cookies + localStorage) in a single file. This is the primary way to persist authentication across sessions.

```bash
playwright-cli state-save [filename]    # save to file (default: auto-named)
playwright-cli state-load <filename>    # restore from file
```

### Workflow: save login, skip it next time

```bash
# Login once
playwright-cli open https://app.example.com/login
playwright-cli fill e3 "user@example.com"
playwright-cli fill e5 "password123"
playwright-cli click e7

# Save authenticated state
playwright-cli state-save auth.json

# Later, skip login entirely
playwright-cli state-load auth.json
playwright-cli goto https://app.example.com/dashboard
# Already logged in!
```

## Cookies

| Command | Description |
|---------|-------------|
| `cookie-list [--domain] [--path]` | List cookies (optionally filtered by domain or path) |
| `cookie-get <name>` | Get a specific cookie |
| `cookie-set <name> <value> [options]` | Set a cookie |
| `cookie-delete <name>` | Delete a cookie |
| `cookie-clear` | Clear all cookies |

### cookie-set options

| Option | Description |
|--------|-------------|
| `--domain=<domain>` | Cookie domain |
| `--path=<path>` | Cookie path (default: `/`) |
| `--expires=<timestamp>` | Expiration as Unix timestamp |
| `--http-only` | HTTP-only flag |
| `--secure` | Secure flag |
| `--same-site=<value>` | `Strict`, `Lax`, or `None` |

```bash
$ playwright-cli cookie-list
# Name          Value       Domain            HttpOnly  Secure  Expires
# session_id    abc123      .example.com      true      true    2024-12-31
# theme         dark        .example.com      false     false   Session

$ playwright-cli cookie-list --domain=.github.com
$ playwright-cli cookie-get session_id
$ playwright-cli cookie-set theme light
$ playwright-cli cookie-set session abc123 --domain=.example.com --secure --http-only
$ playwright-cli cookie-delete session_id
$ playwright-cli cookie-clear
```

### Workflow: test logout by clearing cookies

```bash
playwright-cli cookie-clear
playwright-cli reload
playwright-cli snapshot
# - heading "Sign in" [level=1]
# - textbox "Email" [ref=e3]
```

## localStorage

| Command | Description |
|---------|-------------|
| `localstorage-list` | List all key-value pairs |
| `localstorage-get <key>` | Get a value by key |
| `localstorage-set <key> <value>` | Set a value |
| `localstorage-delete <key>` | Delete a key |
| `localstorage-clear` | Clear all |

```bash
$ playwright-cli localstorage-list
# Key                Value
# user_preferences   {"theme":"dark","lang":"en"}
# onboarding_done    true

$ playwright-cli localstorage-get user_preferences
# {"theme":"dark","lang":"en"}

$ playwright-cli localstorage-set onboarding_done "false"
$ playwright-cli reload
# Onboarding wizard appears
```

## sessionStorage

Same commands with `sessionstorage-` prefix. Data is cleared when the tab closes.

```bash
playwright-cli sessionstorage-list
playwright-cli sessionstorage-get <key>
playwright-cli sessionstorage-set <key> <value>
playwright-cli sessionstorage-delete <key>
playwright-cli sessionstorage-clear
```
