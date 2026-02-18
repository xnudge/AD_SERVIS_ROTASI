const CACHE_NAME = "ad-servis-rotasi-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./logo.png",
  "./servis.png"
];

// Kurulumda dosyaları cache'le
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Eski cache temizliği
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => (k !== CACHE_NAME ? caches.delete(k) : null)))
    )
  );
});

// Cache-first (offline açılabilsin)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
