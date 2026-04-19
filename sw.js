const CACHE_NAME = 'tdc-anatomy-v45';
const urlsToCache = ['./', './index.html', './pdf-viewer.html', './manifest.json', 'https://cdn.tailwindcss.com', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css', 'https://cdn-icons-png.flaticon.com/512/3004/3004458.png', './daicuonghetk.html', './giaiphaudaday.html', './giaiphaugan.html', './giaiphaugiannao.html', './giaiphaumuihau.html', './giaiphauruotgia.html', './giaiphauruotnon.html', './giaiphauthanhquan.html', './giaiphauthucquan.html', './giaiphautim.html', './giaiphautuy.html', './giaiphauvungmieng.html', './gpdainao.html', './heco1.html', './heco2.html', './heco3.html', './henoitiet.html', './hesinhducnam.html', './hesinhducnu.html', './hetimmachvahebachhuyet.html', './hevien.html', './khiphequanphoi.html', './machmauchiduoi.html', './machmauchitren.html', './machmaudauconao.html', './machmaungucbung.html', './mat.html', './phucmac.html', './tai.html', './thankinhso.html', './thankinhtuchu.html', './thannao.html', './thantietnieu.html', './tieunao.html', './tkchiduoi.html', './tkcochitren.html', './tuysong.html', './xuongkhop1.html', './xuongkhop2.html', './xuongkhop3.html'];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.error('Cache addAll failed:', err))
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          function(response) {
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            var responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });
            return response;
          }
        ).catch(function() {
            // Ignore fetch errors
        });
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});
