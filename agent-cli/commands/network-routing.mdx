---
title: "Network & Mocking"
---

# Network & Mocking

Inspect network traffic, mock API responses, and test offline behavior.

## Inspect network requests

```bash
playwright-cli network                  # all requests since page load
playwright-cli network --filter="api"   # filter by URL pattern
playwright-cli network --static         # include images, CSS, fonts
playwright-cli network --request-body   # include request bodies
playwright-cli network --request-headers # include headers
playwright-cli network --clear          # clear the log
```

```bash
$ playwright-cli network --filter="api"
# GET  200 https://api.example.com/users        12ms  application/json
# POST 201 https://api.example.com/users/create  45ms  application/json
```

## Mock API responses

```bash
playwright-cli route <pattern> [options]
```

| Option | Description |
|--------|-------------|
| `--status=<code>` | HTTP status code |
| `--body=<text>` | Response body (text or JSON string) |
| `--content-type=<type>` | Content-Type header |
| `--header=<name:value>` | Additional response headers |
| `--remove-header=<names>` | Headers to strip from request (comma-separated) |

### Mock an API endpoint

```bash
playwright-cli route "**/api/users" \
  --body='[{"name":"Alice"},{"name":"Bob"}]' \
  --content-type=application/json
```

### Test error handling

```bash
playwright-cli route "**/api/data" --status=500
playwright-cli route "**/api/data" --status=503
```

### Block resources

```bash
playwright-cli route "**/*.jpg" --status=404
playwright-cli route "**/analytics/**" --status=204
```

### Strip authentication headers

```bash
playwright-cli route "**/*" --remove-header=cookie,authorization
```

## Manage routes

```bash
playwright-cli route-list               # list active routes
playwright-cli unroute "**/api/users"   # remove specific route
playwright-cli unroute                  # remove all routes
```

## Conditional mocking with code

For complex scenarios -- delays, conditional responses, or request body inspection -- use `run-code`:

```bash
playwright-cli run-code "async (page) => {
  await page.route('**/api/users', async route => {
    const body = route.request().postDataJSON();
    if (body.role === 'admin') {
      await route.fulfill({
        body: JSON.stringify({ permissions: ['read', 'write', 'delete'] })
      });
    } else {
      await route.fulfill({
        body: JSON.stringify({ permissions: ['read'] })
      });
    }
  });
}"
```

## Workflow: testing error handling

```bash
# 1. Mock the API to return 503
playwright-cli route "**/api/users" --status=503

# 2. Reload to trigger the error
playwright-cli reload

# 3. Verify the error page
playwright-cli snapshot
# - heading "Something went wrong" [level=1]
# - button "Retry" [ref=e5]

# 4. Screenshot the error state
playwright-cli screenshot --filename=error-state.png

# 5. Remove mock and retry
playwright-cli unroute
playwright-cli click e5
playwright-cli snapshot
# - heading "Users" [level=1]
```

## Test offline mode

```bash
playwright-cli network-state-set offline   # go offline
playwright-cli reload                     # page shows offline state
playwright-cli snapshot
# - heading "No internet connection" [level=1]

playwright-cli network-state-set online   # restore connection
playwright-cli reload                     # page loads normally
```
