---
title: "Interaction"
---

# Interaction

Click, hover, drag, and select elements using refs from accessibility snapshots.

| Tool | Description |
|------|-------------|
| `browser_click` | Click an element |
| `browser_hover` | Hover over an element |
| `browser_drag` | Drag and drop between elements |
| `browser_select_option` | Select a dropdown option |
| `browser_resize` | Resize the browser window |

## Targeting elements

Every interaction tool takes a `ref` parameter that identifies the target element. Refs come from
accessibility snapshots returned by `browser_snapshot` or after navigation. Take a snapshot first,
find the element's `[ref=...]` tag, then pass that ref to the interaction tool.

```txt
→ browser_snapshot
  - button "Submit" [ref=e12]       ← ref is "e12"
  - link "Learn more" [ref=e15]     ← ref is "e15"

→ browser_click { ref: "e12" }      // clicks the Submit button
```

## browser_click

Click an element on the page.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `ref` | string | yes | Element reference from snapshot |

```txt
→ browser_click { ref: "e12" }       // clicks the Submit button
→ browser_click { ref: "e15" }       // clicks the Learn more link
```

## browser_hover

Hover over an element to trigger tooltips, dropdowns, or hover states.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `ref` | string | yes | Element reference from snapshot |

```txt
→ browser_hover { ref: "e3" }
→ browser_snapshot
  // Snapshot now shows the revealed dropdown menu
  - menuitem "Profile" [ref=e20]
  - menuitem "Settings" [ref=e21]
  - menuitem "Logout" [ref=e22]
```

## browser_drag

Drag one element and drop it onto another.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startRef` | string | yes | Element to drag |
| `endRef` | string | yes | Element to drop onto |

```txt
→ browser_drag { startRef: "e5", endRef: "e10" }
```

## browser_select_option

Select one or more options in a `<select>` dropdown.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `ref` | string | yes | The select element ref |
| `values` | string[] | yes | Values or labels to select |

```txt
→ browser_snapshot
  - combobox "Country" [ref=e7]

→ browser_select_option { ref: "e7", values: ["United States"] }
```

## browser_resize

Resize the browser window.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `width` | number | yes | Width in pixels |
| `height` | number | yes | Height in pixels |

```txt
→ browser_resize { width: 375, height: 812 }    // mobile viewport
→ browser_resize { width: 1920, height: 1080 }  // desktop
```

## Workflow: filling a form and submitting

```txt
→ browser_snapshot
  - textbox "Email" [ref=e3]
  - textbox "Password" [ref=e5]
  - combobox "Role" [ref=e7]
  - button "Sign up" [ref=e9]

→ browser_type { ref: "e3", text: "alice@example.com" }
→ browser_type { ref: "e5", text: "s3cret!" }
→ browser_select_option { ref: "e7", values: ["Admin"] }
→ browser_click { ref: "e9" }

→ browser_snapshot
  - heading "Welcome, Alice!" [level=1]
  - text: "Your account has been created."
```
