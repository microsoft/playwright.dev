---
title: "Introduction"
---

# Playwright CLI

A command-line interface for browser automation designed for coding agents. Token-efficient commands and installable skills let agents balance browser automation with large codebases and reasoning within limited context windows.

## Example

```bash
$ playwright-cli open https://demo.playwright.dev/todomvc --headed
$ playwright-cli type "Buy groceries"
$ playwright-cli press Enter
$ playwright-cli type "Water flowers"
$ playwright-cli press Enter
$ playwright-cli check e21
$ playwright-cli screenshot
```

After each command, the CLI outputs the current page state:

```txt
### Page
- Page URL: https://demo.playwright.dev/todomvc/#/
- Page Title: React - TodoMVC
### Snapshot
[Snapshot](.playwright-cli/page-2026-02-14T19-22-42-679Z.yml)
```

The snapshot file contains the accessibility tree with element refs for the next command.

## Key Features

- **Token-efficient** — concise CLI output avoids loading large tool schemas into the model context
- **Skill-based** — agents discover capabilities through installable skills rather than verbose help text
- **Daemon architecture** — persistent browser process means no startup cost per command
- **Ref-based** — accessibility snapshots with element refs for deterministic interaction
- **Cross-browser** — Chrome, Firefox, WebKit, and Edge support
- **Sessions** — multiple isolated browser instances with separate state

## Playwright CLI vs MCP

| | **Playwright CLI** | **[MCP](/mcp/introduction)** |
|---|---------------|------|
| **Best for** | Coding agents (Claude Code, Copilot) working with large codebases | Specialized agentic loops, exploratory automation |
| **How it works** | Agent runs shell commands | LLM calls MCP tools with structured parameters |
| **Token cost** | Lower — concise CLI output, skills loaded on demand | Higher — tool schemas + snapshots in context |
| **Default mode** | Headless | Headed |
| **Setup** | `npm install -g @playwright/cli` | JSON config in MCP client |

## All Commands

### Core
```bash
open [url]                  goto <url>                  close
click <ref>                 dblclick <ref>              fill <ref> <text>
type <text>                 select <ref> <val>          check <ref>
uncheck <ref>               hover <ref>                 drag <start> <end>
upload <file>               snapshot                    screenshot [ref]
pdf                         eval <func> [ref]           resize <w> <h>
dialog-accept [prompt]      dialog-dismiss
```

### Navigation
```bash
go-back                     go-forward                  reload
```

### Keyboard & Mouse
```bash
press <key>                 keydown <key>               keyup <key>
mousemove <x> <y>           mousedown [btn]             mouseup [btn]
mousewheel <dx> <dy>
```

### Tabs
```bash
tab-list                    tab-new [url]               tab-select <idx>
tab-close [idx]
```

### Storage
```bash
state-save [file]           state-load <file>
cookie-list [--domain]      cookie-get <name>           cookie-set <name> <val>
cookie-delete <name>        cookie-clear
localstorage-list           localstorage-get <key>      localstorage-set <k> <v>
localstorage-delete <key>   localstorage-clear
sessionstorage-list         sessionstorage-get <key>    sessionstorage-set <k> <v>
sessionstorage-delete <k>   sessionstorage-clear
```

### Network
```bash
network                     route <pattern> [opts]      route-list
unroute [pattern]
```

### DevTools
```bash
console [min-level]         run-code <code>             tracing-start
tracing-stop                video-start [file]          video-chapter <title>
video-stop                  show
```

### Sessions
```bash
-s=<name> <cmd>             list                        close-all
kill-all                    delete-data
```

### Config
```bash
open --headed               open --browser=firefox      open --persistent
open --profile=<path>       open --config=file.json     attach --extension
install --skills            config-print
```
