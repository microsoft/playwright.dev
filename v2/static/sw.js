importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.precaching.precacheAndRoute([]);

// This is needed to make SPA to work offline.
// const handler = workbox.precaching.createHandlerBoundToURL('/index.html');
// const navigationRoute = new workbox.routing.NavigationRoute(handler);
// workbox.routing.registerRoute(navigationRoute);

// // Cache common github images (e.g. pptr logo).
// workbox.routing.registerRoute(/^https:\/\/user-images\.githubusercontent\.com\/.*/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
