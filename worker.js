const cacheName = 'ZAP-v1';

const resourceToPrecache = [
    'img/0.png',
    'img/1.png',
    'img/2.png',
    'img/3.png',
    'img/4.png',
    'img/audio.png',
    'img/empresa.png',
    'img/person.svg',
    'img/settings.svg',
    'img/smiley.svg',
    'img/conv/img.jpeg',
    'chat.html',
    'configuracoes.html',
    'contatos.html',
    'js/dados/users.js',
    'js/global.js',
    'js/chat.js',
    'js/configuracoes.js',
    'js/contatos.js',
    'js/conversa.js',
    'js/editar_foto.js',
    'js/perfil.js',
    'js/wavesurfer.min.js',
    'css/global.css',
    'css/chat.css',
    'css/configuracoes.css',
    'css/contatos.css',
    'css/conversa.css',
    'css/editar_foto.css',
    'css/perfil.css',
    'icons/zap.svg',
    'icons/wide.png',
    'icons/narrow.png',
    'icons/android/android-launchericon-144-144.png',
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