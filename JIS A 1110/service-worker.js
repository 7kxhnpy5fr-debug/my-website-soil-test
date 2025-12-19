
const CACHE_NAME = 'jisa1110-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './service-worker.js',
  './icons/icon-192.png',
  './icons/icon-512.png'
  // 必要ならCSSや外部JSをここに追加
];

// インストール時に静的アセットをキャッシュ
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

// 起動時はキャッシュ優先＋フォールバック
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});

// 古いキャッシュを削除
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => (k !== CACHE_NAME) && caches.delete(k)))
    )
  );
   self.clients.claim();
