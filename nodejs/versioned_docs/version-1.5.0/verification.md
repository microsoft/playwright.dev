---
id: verification
title: "Verification"
---


<!-- GEN:toc-top-level -->
- [Videos](#videos)
- [Screenshots](#screenshots)
- [Console logs](#console-logs)
- [Page errors](#page-errors)
- [Page events](#page-events)
<!-- GEN:stop -->

<br/>

## Videos

Playwright can record videos for all pages in a [browser context](core-concepts.md#browser-contexts).

```js
// With browser.newContext()
const context = await browser.newContext({ videosPath: 'videos/' });

// With browser.newPage()
const page = await browser.newPage({ videosPath: 'videos/' });

// [Optional] Specify video size; defaults to viewport size
const context = await browser.newContext({
    videosPath: 'videos/',
    videoSize: { width: 800, height: 600 }
});
```

#### API reference

- [class `BrowserContext`](./api/class-browser.md#class-browsercontext)
- [browser.newContext([options])](./api/class-browser.md#browsernewcontextoptions)
- [browser.newPage([options])](./api/class-browser.md#browsernewpageoptions)

## Screenshots

```js
// Save to file
await page.screenshot({ path: 'screenshot.png' });

// Capture full page
await page.screenshot({ path: 'screenshot.png', fullPage: true });

// Capture into buffer
const buffer = await page.screenshot();
console.log(buffer.toString('base64'));

// Capture given element
const elementHandle = await page.$('.header');
await elementHandle.screenshot({ path: 'screenshot.png' });
```

#### API reference

- [page.screenshot([options])](./api/class-page.md#pagescreenshotoptions)
- [elementHandle.screenshot([options])](./api/class-elementhandle.md#elementhandlescreenshotoptions)

<br/>

## Console logs

Console messages logged in the page can be brought into the Node.js context.

```js
// Listen for all console logs
page.on('console', msg => console.log(msg.text()))

// Listen for all console events and handle errors
page.on('console', msg => {
  if (msg.type() === 'error')
    console.log(`Error text: "${msg.text()}"`);
});

// Get the next console log
const [msg] = await Promise.all([
  page.waitForEvent('console'),
  // Issue console.log inside the page
  page.evaluate(() => {
    console.log('hello', 42, { foo: 'bar' });
  }),
]);

// Deconstruct console log arguments
await msg.args[0].jsonValue() // hello
await msg.args[1].jsonValue() // 42
```

#### API reference

- [class: ConsoleMessage](./api/class-consolemessage.md#class-consolemessage)
- [class: Page](./api/class-page.md#class-page)
- [event: 'console'](./api/class-page.md#event-console)

<br/>

## Page errors

Listen for uncaught exceptions in the page with the `pagerror` event.

```js
// Log all uncaught errors to the terminal
page.on('pageerror', exception => {
  console.log(`Uncaught exception: "${exception}"`);
});

// Navigate to a page with an exception.
await page.goto('data:text/html,<script>throw new Error("Test")</script>');
```

#### API reference

- [class: Page](api/class-page.md)
- [event: 'pageerror'](./api/class-browsercontext.md#event-pageerror)

<br/>

## Page events

#### `"requestfailed"`

```js
page.on('requestfailed', request => {
  console.log(request.url() + ' ' + request.failure().errorText);
});
```

#### `"dialog"` - handle alert, confirm, prompt

```js
page.on('dialog', dialog => {
  dialog.accept();
});
```

#### `"popup"` - handle popup windows

```js
const [popup] = await Promise.all([
  page.waitForEvent('popup'),
  page.click('#open')
]);
```

#### API reference

- [class: Page](api/class-page.md)
- [event: 'requestfailed'](./api/class-page.md#event-requestfailed)
- [event: 'dialog'](./api/class-page.md#event-dialog)
- [event: 'popup'](./api/class-page.md#event-popup)
