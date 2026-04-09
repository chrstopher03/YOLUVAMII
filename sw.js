const CACHE = "yoluvami-cache-v6";

const FILES = [
"/",
"index.html",
"manifest.json",
"23.jpeg"
];

self.addEventListener("install", event => {

self.skipWaiting();

event.waitUntil(
caches.open(CACHE).then(cache=>{
return cache.addAll(FILES);
})
);

});

self.addEventListener("activate", event => {

event.waitUntil(
caches.keys().then(keys=>{
return Promise.all(
keys.map(key=>{
if(key !== CACHE){
return caches.delete(key);
}
})
);
})
);

self.clients.claim();

});

self.addEventListener("fetch", event => {

event.respondWith(
caches.match(event.request)
.then(response=>{
return response || fetch(event.request);
})
);

});

/* PUSH NOTIFICATION */

self.addEventListener("push", event=>{

const data = event.data?.text() || "Nueva notificación";

event.waitUntil(

self.registration.showNotification("YOLUVAMI",{
body:data,
icon:"23.jpeg"
})

);

});

