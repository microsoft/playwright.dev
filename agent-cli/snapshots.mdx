---
title: "Snapshots"
---

# Snapshots

After each command, `playwright-cli` outputs a snapshot of the current browser state — an accessibility tree with element refs for interaction.

## Automatic snapshots

Every command returns page info and a link to the snapshot file:

```txt
### Page
- Page URL: https://demo.playwright.dev/todomvc/#/
- Page Title: React - TodoMVC
### Snapshot
[Snapshot](.playwright-cli/page-2026-02-14T19-22-42-679Z.yml)
```

The snapshot file contains the accessibility tree:

```yaml
- heading "todos" [level=1]
- textbox "What needs to be done?" [ref=e5]
- listitem:
  - checkbox "Toggle Todo" [ref=e10]
  - text: "Buy groceries"
- listitem:
  - checkbox "Toggle Todo" [ref=e14]
  - text: "Water flowers"
- contentinfo:
  - text: "2 items left"
  - link "All" [ref=e20]
  - link "Active" [ref=e21]
  - link "Completed" [ref=e22]
```

## Element refs

Each interactive element gets a unique ref (e.g., `e5`, `e10`). Refs are **stable within a single snapshot** but invalidated when the page changes — always re-snapshot after navigation.

| Property | Detail |
|----------|--------|
| Format | `e` followed by a number (e.g., `e1`, `e15`, `e203`) |
| Scope | Unique within a single snapshot |
| Lifetime | Valid until the next page change |
| Assignment | Only interactive elements get refs (buttons, links, inputs, etc.) |

## On-demand snapshots

```bash
playwright-cli snapshot                    # full page, timestamped filename
playwright-cli snapshot --filename=after.yaml  # custom filename
playwright-cli snapshot "#main"            # scope to CSS selector
playwright-cli snapshot e34                # scope to element ref
playwright-cli snapshot --depth=4          # limit tree depth
```

## Using refs

```bash
playwright-cli click e10                   # check the checkbox
playwright-cli fill e5 "Walk the dog"      # type into textbox
playwright-cli hover e20                   # hover over "All" link
```

## Using selectors

CSS selectors and Playwright locators work as alternatives to refs:

```bash
# CSS selectors
playwright-cli click "#main > button.submit"
playwright-cli click "[data-testid='submit']"

# Playwright locators
playwright-cli click "getByRole('button', { name: 'Submit' })"
playwright-cli click "getByTestId('submit-button')"
playwright-cli click "getByText('Login')"
```

## Raw output

Use `--raw` to strip page info and return only command output:

```bash
playwright-cli snapshot --raw | grep "button"
```

## Best practices

1. **Use refs, not selectors** — refs from snapshots are more reliable than CSS selectors because they point to the exact element the agent just saw
2. **Re-snapshot after navigation** — refs are invalidated when the page changes
3. **Limit depth** — use `--depth` on complex pages to reduce output size
4. **Scope to elements** — snapshot a specific section instead of the whole page
5. **Name snapshot files** — use `--filename` when the snapshot is part of a workflow result
6. **Check for dialogs** — if a command reports a dialog is open, handle it before proceeding with other actions
