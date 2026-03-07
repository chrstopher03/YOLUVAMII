const CACHE = "yoluvami-cache-v1";

const archivos = [
"/",
"index.html",
"manifest.json",
"23.jpeg"
];

self.addEventListener("install", e=>{
  e.waitUntil(
    caches.open(CACHE)
    .then(cache=>cache.addAll(archivos))
  );
});

self.addEventListener("fetch", e=>{
  e.respondWith(
    caches.match(e.request)
    .then(res=> res || fetch(e.request))
  );
});