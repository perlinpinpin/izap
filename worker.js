const cacheName = 'ZAP-v1';

const resourceToPrecache = [
    'assets/img/0.png',
    'assets/img/1.png',
    'assets/img/2.png',
    'assets/img/3.png',
    'assets/img/4.png',
    'assets/img/audio.png',
    'assets/img/empresa.png',
    'assets/img/person.svg',
    'assets/img/settings.svg',
    'assets/img/smiley.svg',
    'assets/conv/img.jpeg',
    'chat.html',
    'configuracoes.html',
    'contatos.html',
    'assets/js/dados/users.js',
    'assets/js/global.js',
    'assets/js/chat.js',
    'assets/js/configuracoes.js',
    'assets/js/contatos.js',
    'assets/js/conversa.js',
    'assets/js/editar_foto.js',
    'assets/js/perfil.js',
    'assets/js/wavesurfer.min.js',
    'assets/css/global.css',
    'assets/css/chat.css',
    'assets/css/configuracoes.css',
    'assets/css/contatos.css',
    'assets/css/conversa.css',
    'assets/css/editar_foto.css',
    'assets/css/perfil.css',
    'assets/icons/zap.svg',
    'assets/icons/wide.png',
    'assets/icons/narrow.png',
    'assets/icons/android/android-launchericon-144-144.png',
    'manifest.json',
    
];

self.addEventListener ('install', (event) => {
    event.waitUntil (caches.open (cacheName).then (
        cache => cache.addAll (resourceToPrecache)
    ));
});

self.addEventListener ('fetch', (event) => {
    async function returnCachedResource () {
        const cache = await caches.open (cacheName);
        const cachedResponse = await cache.match (event.request.url, {'ignoreSearch' : true});
        if (cachedResponse) {
            return cachedResponse;
        } 
        else {
            const fetchResponse = await fetch (event.request.url);
            cache.put (event.request.url, fetchResponse.clone ());
            return fetchResponse;
        }
      }
      event.respondWith (returnCachedResource ());
});