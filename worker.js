const cacheName = 'ZAP-v1';

const resourceToPrecache = [
    'assets/conv/perfil/0.png',
    'assets/conv/perfil/1.png',
    'assets/conv/perfil/2.png',
    'assets/conv/perfil/3.png',
    'assets/conv/perfil/4.png',
    'assets/img/audio.png',
    'assets/img/descartar.png',
    'assets/img/deslize-norte.png',
    'assets/img/deslize.png',
    'assets/img/empresa.png',
    'assets/img/lock.png',
    'assets/img/microfone.png',
    'assets/img/pause.png',
    'assets/img/pause2.png',
    'assets/img/person.svg',
    'assets/img/play.png',
    'assets/img/play2.png',
    'assets/img/settings.svg',
    'assets/img/smiley.svg',
    'assets/img/gravar.svg',
    'assets/conv/img/img.jpeg',
    'assets/conv/audio/audio1.ogg',
    'assets/conv/audio/audio2.ogg',
    'chat.html',
    'configuracoes.html',
    'contatos.html',
    'assets/conv/conversations.js',
    'assets/js/audio.js',
    'assets/js/chat.js',
    'assets/js/configuracoes.js',
    'assets/js/contatos.js',
    'assets/js/conversa.js',
    'assets/js/editar_foto.js',
    'assets/js/global.js',
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
