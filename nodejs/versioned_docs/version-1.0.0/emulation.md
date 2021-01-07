---
id: emulation
title: "Device and environment emulation"
---


Playwright allows overriding various parameters of the device where the browser is running:
  - viewport size, device scale factor, touch support
  - locale, timezone
  - color scheme
  - geolocation
  - etc

Most of these parameters are configured during the browser context construction, but some of them such as viewport size can be changed for individual pages.

#### Contents
- [User agent](#user-agent)
- [Viewport, color scheme](#viewport-color-scheme)
- [Devices](#devices)
- [Locale & Timezone](#locale--timezone)
- [Permissions](#permissions)
- [Geolocation](#geolocation)

<br/>

## User agent

All pages created in the context above will share the user agent specified:

```js
const context = await browser.newContext({
  userAgent: 'My user agent'
});
```

#### API reference

- [`browser.newContext([options])`](./api/class-browser.md#browsernewcontextoptions)

<br/>

## Viewport, color scheme

Create a context with custom viewport size:

```js
// Create context with given viewport
const context = await browser.newContext({
  viewport: { width: 1280, height: 1024 }
});

// Resize viewport for individual page
await page.setViewportSize(
    { 'width': 1600, 'height': 1200 });

// Emulate high-DPI
const context = await browser.newContext({
  viewport: { width: 2560, height: 1440 },
  deviceScaleFactor: 2,
});

// Create device with the dark color scheme:
const context = await browser.newContext({
  colorScheme: 'dark'
});

// Change color scheme for the page
await page.emulateMedia({ colorScheme: 'dark' });
```

#### API reference

- [`browser.newContext([options])`](api/class-browser.md#browsernewcontextoptions)
- [`page.emulateMedia([options])`](./api/class-page.md#pageemulatemediaoptions)
- [`page.setViewportSize(viewportSize)`](./api/class-page.md#pagesetviewportsizeviewportsize)

<br/>

## Devices

Playwright comes with a registry of device parameters for selected mobile devices. It can be used to simulate browser behavior on a mobile device:

```js
const { chromium, devices } =
    require('playwright');
const browser = await chromium.launch();

const pixel2 = devices['Pixel 2'];
const context = await browser.newContext({
  ...pixel2,
});
```

All pages created in the context above will share the same device parameters.

#### API reference

- [`playwright.devices`](./api/class-playwright.md#playwrightdevices)
- [`browser.newContext([options])`](api/class-browser.md#browsernewcontextoptions)

<br/>

## Locale & timezone

```js
// Emulate locale and time
const context = await browser.newContext({
  locale: 'de-DE',
  timezoneId: 'Europe/Berlin',
});
```

#### API reference

- [`browser.newContext([options])`](api/class-browser.md#browsernewcontextoptions)

<br/>

## Permissions

Allow all pages in the context to show system notifications:
```js
const context = await browser.newContext({
  permissions: ['notifications'],
});
```

Grant all pages in the existing context access to current location:
```js
await context.grantPermissions(['geolocation']);
```

Grant notifications access from a specific domain:
```js
await context.grantPermissions(['notifications'], {origin: 'https://skype.com'} );
```

Revoke all permissions:
```js
await context.clearPermissions();
```

#### API reference

- [`browser.newContext([options])`](api/class-browser.md#browsernewcontextoptions)
- [`browserContext.grantPermissions(permissions[][, options])`](./api/class-browsercontext.md#browsercontextgrantpermissionspermissions-options)
- [`browserContext.clearPermissions()`](./api/class-browsercontext.md#browsercontextclearpermissions)

<br/>

## Geolocation
Create a context with `"geolocation"` permissions granted:
```js
const context = await browser.newContext({
  geolocation: { longitude: 48.858455, latitude: 2.294474 },
  permissions: ['geolocation']
});
```
Change the location later:

```js
await context.setGeolocation({ longitude: 29.979097, latitude: 31.134256 };
```

**Note** you can only change geolocation for all pages in the context.

#### API reference

- [`browser.newContext([options])`](api/class-browser.md#browsernewcontextoptions)
- [`browserContext.setGeolocation(geolocation)`](./api/class-browser.md#browsercontextsetgeolocationgeolocation)

<br/>
