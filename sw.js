
const version = "1.0.0";
const cacheName = `marianky-${version}`;
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        `./`,
        `/index.html`,
        `/css/style.css`,
        `/icon.png`,
        `/manifest.json`,
      ])
          .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('install', function(event) {
  console.log('Service Worker installing.');
});

/*self.addEventListener('activate', function(event) {
  console.log('Service Worker activating.');
});*/

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});
