const CACHE_NAME = 'gbv-safe-corner-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/safety-plan.html',
  '/risk-assessment.html',
  '/education-hub.html',
  '/support.html',
  '/report.html',
  '/stories.html',
  '/library.html',
  '/community.html',
  '/events.html',
  '/about.html',
  '/login.html',
  '/admin.html',
  '/manifest.json'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
