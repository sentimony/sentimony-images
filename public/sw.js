// Minimal network-first service worker. Its only job is to make the app
// installable (Chrome requires a fetch handler); it deliberately does NOT
// cache, so SPA routes and freshly added images never go stale.
self.addEventListener('install', () => self.skipWaiting())

self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()))

self.addEventListener('fetch', (event) => {
  // Pass through to the network untouched. Present so the app qualifies as
  // installable; add a caching strategy here later if offline support is wanted.
  event.respondWith(fetch(event.request))
})
