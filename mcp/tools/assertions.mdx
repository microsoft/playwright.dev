---
title: "Testing & Assertions"
---

# Testing & Assertions

Verify page state and generate Playwright test code. Requires the **testing** [capability](../capabilities.mdx).

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest", "--caps=testing"]
    }
  }
}
```

## Verify elements

### browser_verify_element_visible

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `role` | string | yes | ARIA role (`button`, `heading`, `link`, `textbox`, etc.) |
| `name` | string | yes | Accessible name |

```txt
→ browser_verify_element_visible { role: "heading", name: "Dashboard" }
  ✓ Element visible: heading "Dashboard"

→ browser_verify_element_visible { role: "button", name: "Submit" }
  ✗ Element not visible: button "Submit"
```

### browser_verify_text_visible

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | string | yes | Text to look for |

```txt
→ browser_verify_text_visible { text: "3 items left" }
  ✓ Text visible: "3 items left"
```

### browser_verify_list_visible

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `label` | string | yes | Accessible name of the list |
| `items` | string[] | yes | Expected list items |

```txt
→ browser_verify_list_visible {
    label: "Todo list",
    items: ["Buy groceries", "Walk the dog", "Read a book"]
  }
  ✓ List "Todo list" visible with 3 matching items
```

### browser_verify_value

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `ref` | string | yes | Element reference |
| `value` | string | yes | Expected value |

```txt
→ browser_verify_value { ref: "e3", value: "alice@example.com" }
  ✓ Value matches: "alice@example.com"
```

## Generate test code

### browser_generate_locator

Generate a Playwright locator for an element, useful when converting exploratory automation into test files.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `ref` | string | yes | Element reference |

```txt
→ browser_generate_locator { ref: "e15" }
  page.getByRole('button', { name: 'Submit' })

→ browser_generate_locator { ref: "e3" }
  page.getByLabel('Email')
```

## Workflow: exploratory testing to test code

```txt
→ browser_navigate { url: "https://demo.playwright.dev/todomvc" }
→ browser_type { ref: "e5", text: "Buy groceries", submit: true }
  // Generated: await page.getByPlaceholder('What needs to be done?').fill('Buy groceries');
  // Generated: await page.getByPlaceholder('What needs to be done?').press('Enter');

→ browser_verify_text_visible { text: "Buy groceries" }
  // Generated: await expect(page.getByText('Buy groceries')).toBeVisible();

→ browser_click { ref: "e10" }
  // Generated: await page.getByRole('checkbox', { name: 'Toggle Todo' }).click();

→ browser_verify_text_visible { text: "0 items left" }
  // Generated: await expect(page.getByText('0 items left')).toBeVisible();
```

The generated code can be assembled into a Playwright test:

```typescript
test('add and complete todo', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
  await page.getByPlaceholder('What needs to be done?').fill('Buy groceries');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  await expect(page.getByText('Buy groceries')).toBeVisible();
  await page.getByRole('checkbox', { name: 'Toggle Todo' }).click();
  await expect(page.getByText('0 items left')).toBeVisible();
});
```

## Workflow: testing form validation

```txt
→ browser_navigate { url: "https://app.example.com/register" }
→ browser_click { ref: "e9" }   // Submit empty form
→ browser_verify_text_visible { text: "Email is required" }
  ✓ Text visible

→ browser_type { ref: "e3", text: "not-an-email" }
→ browser_click { ref: "e9" }
→ browser_verify_text_visible { text: "Please enter a valid email" }
  ✓ Text visible

→ browser_type { ref: "e3", text: "alice@example.com" }
→ browser_type { ref: "e5", text: "password123" }
→ browser_type { ref: "e7", text: "password456" }
→ browser_click { ref: "e9" }
→ browser_verify_text_visible { text: "Passwords do not match" }
  ✓ Text visible
```
