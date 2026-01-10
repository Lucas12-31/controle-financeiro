const cacheName = 'financeiro-v2'; // Mudei para v2 para o navegador forçar a atualização
const assets = [
  './',
  './index.html',
  './style.css',
  './manifest.json',
  './icon-192.png', // Adicione o ícone de 192px
  './icon-512.png'  // Adicione o ícone de 512px
];

// Instala o service worker e armazena os arquivos no cache
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Faz o app responder mesmo sem internet
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
