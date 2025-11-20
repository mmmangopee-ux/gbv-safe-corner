const CACHE_NAME = 'gbv-safe-corner-v2';
const urlsToCache = [
  '/gbv-safe-corner/',
  '/gbv-safe-corner/index.html',
  '/gbv-safe-corner/safety-plan.html',
  '/gbv-safe-corner/risk-assessment.html',
  '/gbv-safe-corner/education-hub.html',
  '/gbv-safe-corner/support.html',
  '/gbv-safe-corner/report.html',
  '/gbv-safe-corner/stories.html',
  '/gbv-safe-corner/library.html',
  '/gbv-safe-corner/community.html',
  '/gbv-safe-corner/events.html',
  '/gbv-safe-corner/about.html',
  '/gbv-safe-corner/login.html',
  '/gbv-safe-corner/admin.html',
  '/gbv-safe-corner/manifest.json',
  '/gbv-safe-corner/supabase-config.js',
  '/gbv-safe-corner/analytics.js'
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
