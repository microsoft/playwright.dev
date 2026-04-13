---
title: "Dialogs"
---

# Dialogs

Handle browser dialogs (alert, confirm, prompt) that block page interaction.

## browser_handle_dialog

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accept` | boolean | yes | `true` to accept, `false` to dismiss |
| `promptText` | string | no | Text to enter for prompt dialogs |

When a dialog appears, other tools will report it in their response. Handle the dialog before continuing.

### Alert dialog

```txt
→ browser_click { ref: "e5" }
  ⚠ Dialog appeared: [alert] "Are you sure you want to delete this?"

→ browser_handle_dialog { accept: true }
```

### Confirm dialog

```txt
→ browser_click { ref: "e10" }
  ⚠ Dialog appeared: [confirm] "Are you sure you want to delete this?"

→ browser_handle_dialog { accept: true }     // click OK
→ browser_handle_dialog { accept: false }    // click Cancel
```

### Prompt dialog

```txt
→ browser_click { ref: "e8" }
  ⚠ Dialog appeared: [prompt] "Enter your name:"

→ browser_handle_dialog { accept: true, promptText: "My new name" }
```

## Workflow

When a dialog appears, other tools will report it in their response. Handle the dialog before continuing:

```txt
→ browser_click { ref: "e12" }
  ⚠ Dialog appeared: [confirm] "Discard unsaved changes?"

→ browser_handle_dialog { accept: true }

→ browser_snapshot
  // Page now shows updated state after dialog was accepted
```
