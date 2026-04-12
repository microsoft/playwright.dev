---
title: "Console & Eval"
---

# Console & Eval

## Console messages

```bash
playwright-cli console                  # all messages (info and above)
playwright-cli console error            # errors only
playwright-cli console warning          # warnings and errors
playwright-cli console debug            # everything
playwright-cli console --clear          # clear the message buffer
```

```bash
$ playwright-cli console error
# [error] Uncaught TypeError: Cannot read property 'map' of undefined
#   at app.js:42:15
# [error] Failed to fetch: GET /api/users 404
```

### Workflow: debugging a broken page

```bash
# Check the console for errors
playwright-cli console error
# [error] Failed to fetch: GET https://api.example.com/data 404
# [error] Uncaught Error: API returned 404

# Now you know the API endpoint is returning 404
# Mock the route or investigate further
playwright-cli route "**/api/data" \
  --body='{"items":[]}' --content-type=application/json
playwright-cli reload
```

## JavaScript evaluation

```bash
playwright-cli eval <expression> [ref]
```

### Page-level evaluation

```bash
$ playwright-cli eval "() => document.title"
# React - TodoMVC

$ playwright-cli eval "() => window.innerWidth + 'x' + window.innerHeight"
# 1280x720
```

### Element evaluation

```bash
$ playwright-cli eval "(el) => el.getAttribute('data-id')" e15
# item-42

$ playwright-cli eval "(el) => getComputedStyle(el).color" e5
# rgb(255, 0, 0)
```

## Running Playwright code

Execute arbitrary Playwright scripts with full API access:

```bash
playwright-cli run-code <code>
playwright-cli run-code --filename=script.js
```

### Set geolocation

```bash
playwright-cli run-code "async (page) => {
  await page.context().grantPermissions(['geolocation']);
  await page.context().setGeolocation({latitude: 37.77, longitude: -122.42});
}"
```

### Wait for specific condition

```bash
playwright-cli run-code "async (page) => {
  await page.waitForSelector('.data-loaded');
  return 'Data loaded successfully';
}"
```

### Scrape structured data

```bash
playwright-cli run-code "async (page) => {
  const items = await page.$$eval('.product', els =>
    els.map(el => ({
      name: el.querySelector('.name').textContent,
      price: el.querySelector('.price').textContent
    }))
  );
  return JSON.stringify(items, null, 2);
}"
```
