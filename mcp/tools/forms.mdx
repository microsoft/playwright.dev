---
title: "Forms"
---

# Forms

## browser_type

Type text into an editable element (input, textarea, contenteditable).

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `ref` | string | yes | Element reference |
| `text` | string | yes | Text to type |
| `submit` | boolean | no | Press Enter after typing |
| `slowly` | boolean | no | Type one character at a time (triggers key handlers) |

```txt
→ browser_type { ref: "e5", text: "Buy groceries" }
→ browser_type { ref: "e5", text: "Buy groceries", submit: true }  // types + Enter
→ browser_type { ref: "e8", text: "search query", slowly: true }   // triggers autocomplete
```

## browser_fill_form

Fill multiple form fields at once. Supports textboxes, checkboxes, radio buttons, comboboxes, and sliders.

```txt
→ browser_snapshot
  - textbox "First name" [ref=e3]
  - textbox "Last name" [ref=e5]
  - textbox "Email" [ref=e7]
  - checkbox "Accept terms" [ref=e9]
  - combobox "Country" [ref=e11]
  - radio "Monthly plan" [ref=e13]
  - radio "Annual plan" [ref=e15]

→ browser_fill_form {
    fields: [
      { ref: "e3", value: "Alice" },
      { ref: "e5", value: "Smith" },
      { ref: "e7", value: "alice@example.com" },
      { ref: "e9", value: true },
      { ref: "e11", value: "United States" },
      { ref: "e15", value: true }
    ]
  }
```

This is more efficient than calling `browser_type` and `browser_click` for each field individually.

## browser_check / browser_uncheck

Check or uncheck a checkbox or radio button.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `ref` | string | yes | Element reference |

```txt
→ browser_check { ref: "e9" }     // check the "Accept terms" checkbox
→ browser_uncheck { ref: "e9" }   // uncheck it
```

## Workflow: completing a multi-step form

```txt
You: Fill out the registration form on this page.

→ browser_snapshot
  // Page 1: Personal info
  - textbox "Email" [ref=e3]
  - textbox "Password" [ref=e5]
  - button "Next" [ref=e7]

→ browser_type { ref: "e3", text: "alice@example.com" }
→ browser_type { ref: "e5", text: "s3cureP@ss!" }
→ browser_click { ref: "e7" }

→ browser_snapshot
  // Page 2: Profile
  - textbox "Display name" [ref=e3]
  - combobox "Timezone" [ref=e5]
  - checkbox "Subscribe to newsletter" [ref=e7]
  - button "Create account" [ref=e9]

→ browser_fill_form {
    fields: [
      { ref: "e3", value: "Alice S." },
      { ref: "e5", value: "US/Pacific" },
      { ref: "e7", value: true }
    ]
  }
→ browser_click { ref: "e9" }
```
