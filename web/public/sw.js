/*
 * Retires the legacy TT27 cache-first service worker. Existing installations
 * update to this worker, which clears the old app shell and returns control to
 * the network. The React app then unregisters this worker.
 * Release: 2026-06-13.2
 */
self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(
        names
          .filter((name) => name.startsWith('tt27-'))
          .map((name) => caches.delete(name)),
      ))
      .then(() => self.clients.claim()),
  )
})
