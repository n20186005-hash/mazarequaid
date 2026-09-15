/* Mazar-e-Quaid Guide — PWA Service Worker */
const CACHE_VERSION = 'meq-v2026-09-15-1';
const PRECACHE = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/favicon.svg',
  '/favicon-32.png',
  '/favicon-16.png',
  '/favicon-180.png',
  '/logo.svg',
  '/images/mazar-exterior.jpg',
  '/images/mazar-city.jpg',
  '/images/mazar-detail.jpg',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_VERSION);
      await Promise.all(
        PRECACHE.map(async (url) => {
          try {
            const response = await fetch(url, { cache: 'reload' });
            if (response.ok) await cache.put(url, response);
          } catch (_error) {
            /* ignore individual failures during install */
          }
        }),
      );
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key)),
      );
      await self.clients.claim();
    })(),
  );
});

const CACHEABLE_TYPES = new Set(['text/', 'application/', 'image/', 'font/']);

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const network = await fetch(request);
          const cache = await caches.open(CACHE_VERSION);
          cache.put(request, network.clone());
          return network;
        } catch (_error) {
          const cache = await caches.open(CACHE_VERSION);
          return (await cache.match(request)) || (await cache.match('/')) || Response.error();
        }
      })(),
    );
    return;
  }

  if (CACHEABLE_TYPES.has(request.destination ? `${request.destination}/` : '') || /\.(png|jpg|jpeg|svg|webp|ico|css|js|webmanifest|woff2?)$/i.test(url.pathname)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_VERSION);
        const cached = await cache.match(request);
        if (cached) return cached;
        try {
          const response = await fetch(request);
          if (response.ok) cache.put(request, response.clone());
          return response;
        } catch (_error) {
          return cached || Response.error();
        }
      })(),
    );
  }
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});