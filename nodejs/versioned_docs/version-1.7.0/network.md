---
id: network
title: "Network"
---


Playwright provides APIs to **monitor** and **modify** network traffic, both HTTP and HTTPS.
Any requests that page does, including [XHRs](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) and
[fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) requests, can be tracked, modified and handled.

<!-- GEN:toc-top-level -->
- [HTTP Authentication](#http-authentication)
- [Handle file downloads](#handle-file-downloads)
- [Network events](#network-events)
- [Handle requests](#handle-requests)
- [Modify requests](#modify-requests)
- [Abort requests](#abort-requests)
<!-- GEN:stop -->

<br/>

## HTTP Authentication

```js
const context = await browser.newContext({
  httpCredentials: {
    username: 'bill',
    password: 'pa55w0rd',
  },
});
const page = await context.newPage();
await page.goto('https://example.com');
```

#### API reference

- [browser.newContext([options])](./api/class-browser.md#browsernewcontextoptions)

<br/>

## Handle file downloads

```js
const [ download ] = await Promise.all([
  page.waitForEvent('download'), // <-- start waiting for the download
  page.click('button#delayed-download') // <-- perform the action that directly or indirectly initiates it.
]);
const path = await download.path();
```

For every attachment downloaded by the page, [`"download"`](api/class-page.md#event-download) event is emitted. If you create a browser context with the `acceptDownloads: true`, all these attachments are going to be downloaded into a temporary folder. You can obtain the download url, file system path and payload stream using the [`Download`](https://github.com/microsoft/playwright/blob/master/docs/api/class-download.md#class-download) object from the event.

#### Variations

If you have no idea what initiates the download, you can still handle the event:

```js
page.on('download', download => download.path().then(console.log));
```

Note that handling the event forks the control flow and makes script harder to follow. Your scenario might end while you are downloading a file since your main control flow is not awaiting for this operation to resolve.

#### API reference

- [Download](https://github.com/microsoft/playwright/blob/master/docs/class-download.md)
- [page.on('download')](api/class-page.md#event-download)
- [page.waitForEvent(event)](api/class-page.md#pagewaitforeventevent-optionsorpredicate)

<br/>

## Network events

You can monitor all the requests and responses:

```js
const { chromium, webkit, firefox } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Subscribe to 'request' and 'response' events.
  page.on('request', request =>
      console.log('>>', request.method(), request.url()));
  page.on('response', response =>
      console.log('<<', response.status(), response.url()));
  await page.goto('https://example.com');

  await browser.close();
})();
```

Or wait for a network response after the button click:

```js
// Use a glob URL pattern
const [response] = await Promise.all([
  page.waitForResponse('**/api/fetch_data'),
  page.click('button#update'),
]);
```

#### Variations

```js
// Use a RegExp
const [response] = await Promise.all([
  page.waitForResponse(/\.jpeg$/),
  page.click('button#update'),
]);

// Use a predicate taking a Response object
const [response] = await Promise.all([
  page.waitForResponse(response => response.url().includes(token)),
  page.click('button#update'),
]);
```

#### API reference

- [class `Request`](./api/class-request.md#class-request)
- [class `Response`](./api/class-response.md#class-response)
- [page.on('request')](./api/class-page.md#pageonrequest)
- [page.on('response')](./api/class-page.md#pageonresponse)
- [page.waitForRequest(urlOrPredicate[, options])](./api/class-page.md#pagewaitforrequesturlorpredicate-options)
- [page.waitForResponse(urlOrPredicate[, options])](./api/class-page.md#pagewaitforresponseurlorpredicate-options)

<br/>

## Handle requests

```js
await page.route('**/api/fetch_data', route => route.fulfill({
  status: 200,
  body: testData,
}));
await page.goto('https://example.com');
```

You can mock API endpoints via handling the network quests in your Playwright script.

#### Variations

```js
// Set up route on the entire browser context.
// It will apply to popup windows and opened links.

await browserContext.route('**/api/login', route => route.fulfill({
  status: 200,
  body: 'accept',
}));
await page.goto('https://example.com');
```

#### API reference

- [browserContext.route(url, handler)](./api/class-browsercontext.md#browsercontextrouteurl-handler)
- [browserContext.unroute(url[, handler])](./api/class-browsercontext.md#browsercontextunrouteurl-handler)
- [page.route(url, handler)](./api/class-page.md#pagerouteurl-handler)
- [page.unroute(url[, handler])](./api/class-page.md#pageunrouteurl-handler)
- [Route](./api/class-route.md#class-route)

<br/>

## Modify requests

```js
// Delete header
await page.route('**/*', route => {
  const headers = route.request().headers();
  delete headers['X-Secret'];
  route.continue({headers});
});

// Continue requests as POST.
await page.route('**/*', route => route.continue({method: 'POST'}));
```

You can continue requests with modifications. Example above removes an HTTP header from the outgoing requests.

## Abort requests

```js
await page.route('**/*.{png,jpg,jpeg}', route => route.abort());

// Abort based on the request type
await page.route('**/*', route => {
  return route.request().resourceType() === 'image' ?
      route.abort() : route.continue();
});
```

#### API reference

- [page.route(url, handler)](api/class-page.md#pagerouteurl-handler)
- [browserContext.route(url, handler)](api/class-browsercontext.md#browsercontextrouteurl-handler)
- [route.abort([errorCode])](./api/class-route.md#routeaborterrorcode)

<br/>
