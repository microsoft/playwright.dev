---
title: "Network & Mocking"
---

# Network & Mocking

Inspect network traffic, mock API responses, and test offline behavior. Inspecting requests is part of **core** and always available. Mocking and network state control require the **network** [capability](../capabilities.mdx).

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest", "--caps=network"]
    }
  }
}
```

## Inspect network requests

### browser_network_requests

List requests made since page load. Part of **core** — no extra capability needed.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filter` | string | no | Regexp pattern to filter URLs |
| `includeStatic` | boolean | no | Include images, CSS, fonts |
| `includeBody` | boolean | no | Include request body |
| `includeHeaders` | boolean | no | Include request headers |

```txt
→ browser_network_requests { filter: "api" }

  GET  200 https://api.example.com/me              8ms   application/json
  POST 201 https://api.example.com/users/create     45ms  application/json
  GET  200 https://api.example.com/settings         12ms  application/json
```

## Mock API responses

### browser_route

Intercept requests matching a URL pattern and return a custom response.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pattern` | string | yes | URL pattern (`**` glob supported) |
| `status` | number | no | HTTP status code |
| `body` | string | no | Response body |
| `contentType` | string | no | Content-Type header |
| `headers` | object | no | Additional response headers |
| `removeHeaders` | string[] | no | Headers to strip from request |

### Mock an API endpoint

```txt
You: Mock the /api/users endpoint to return two test users.

→ browser_route {
    pattern: "**/api/users",
    status: 200,
    body: "[{\"id\":1,\"name\":\"Alice\"},{\"id\":2,\"name\":\"Bob\"}]",
    contentType: "application/json"
  }
→ browser_reload
→ browser_snapshot
  - heading "Users" [level=1]
  - list "User list":
    - listitem: "Alice"
    - listitem: "Bob"
```

### Test error handling

```txt
You: Test what happens when the API returns a 503 error.

→ browser_route { pattern: "**/api/users", status: 503 }
→ browser_reload
→ browser_snapshot
  - heading "Something went wrong" [level=1]
  - button "Retry" [ref=e5]

→ browser_take_screenshot
```

Remove the mock and verify recovery:

```txt
→ browser_unroute
→ browser_click { ref: "e5" }
→ browser_snapshot
  - heading "Users" [level=1]
  - list "User list":
    - listitem: "Alice Johnson"
    - listitem: "Bob Smith"
```

### Block resources

```txt
→ browser_route { pattern: "**/*.jpg", status: 404 }
→ browser_route { pattern: "**/analytics/**", status: 204 }
```

### Strip authentication headers

```txt
→ browser_route { pattern: "**/api/**", removeHeaders: ["cookie", "authorization"] }
→ browser_reload
  // Page shows 401 / login prompt
```

### Conditional mocking with code

For complex scenarios — delays, conditional responses, request body inspection — use `browser_run_code`:

```txt
→ browser_run_code {
    code: "async (page) => {
      await page.route('**/api/search', async route => {
        const url = new URL(route.request().url());
        const query = url.searchParams.get('q');
        await route.fulfill({
          body: JSON.stringify(query === 'empty' ? [] : [{ title: 'Result: ' + query }])
        });
      });
    }"
  }
```

## Manage routes

### browser_route_list

```txt
→ browser_route_list

  Pattern              Status  Content-Type
  **/api/users         200     application/json
  **/*.jpg             404     -
  **/analytics/**      204     -
```

### browser_unroute

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pattern` | string | no | Pattern to remove. Omit to remove all. |

## Test offline mode

### browser_network_state_set

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `state` | string | yes | `online` or `offline` |

```txt
→ browser_network_state_set { state: "offline" }
→ browser_reload
→ browser_snapshot
  - heading "No internet connection" [level=1]

→ browser_network_state_set { state: "online" }
→ browser_reload
  // Page loads normally
```
