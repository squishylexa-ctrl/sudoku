const CACHE_NAME = 'sudoku-v1';
// Hier stehen die Dateien, die der Helfer speichern soll
const ASSETS = [
  './neo-sudoku.html',
  './manifest.json'
];

// 1. Installation: Dateien in den Schrank legen
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Service Worker: Speichere Dateien...');
      return cache.addAll(ASSETS);
    })
  );
});

// 2. Abrufen: Wenn kein Internet da ist, aus dem Schrank holen
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});