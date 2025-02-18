'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "f385b6d01aa72ca4c269966b52d8884f",
"assets/AssetManifest.bin.json": "8120cb0eebb411b7287098273e302e88",
"assets/AssetManifest.json": "302236c208a35a71e36231c0a30d045b",
"assets/assets/fonts/Poppins_Bold.ttf": "08c20a487911694291bd8c5de41315ad",
"assets/assets/fonts/Poppins_Light.ttf": "fcc40ae9a542d001971e53eaed948410",
"assets/assets/fonts/Poppins_Medium.ttf": "bf59c687bc6d3a70204d3944082c5cc0",
"assets/assets/fonts/Poppins_Regular.ttf": "093ee89be9ede30383f39a899c485a82",
"assets/assets/fonts/Poppins_SemiBold.ttf": "6f1520d107205975713ba09df778f93f",
"assets/assets/images/ic_add.png": "3daebeb314d39af6c7537b1b8f112610",
"assets/assets/images/ic_chat.png": "ad6c87a2e278e2a37e9934f9fc9e06f6",
"assets/assets/images/ic_edit.png": "858e850bd20b3a7298e3cf4c61b52b9a",
"assets/assets/images/ic_event.png": "47722fc5be4a2dc08a361fbb92844471",
"assets/assets/images/ic_first.png": "3d198f7df92e601718287fa75ba63859",
"assets/assets/images/ic_fitness.png": "f712bc1e228ca1f2c60da6a78d61746d",
"assets/assets/images/ic_floating.png": "063d671ea03b6c391283fdc850492d92",
"assets/assets/images/ic_fourth.png": "e09d3c5083e06f1556776c477bcd8491",
"assets/assets/images/ic_globe.png": "6a6ae0172cd4da69949afa0a326d0bf2",
"assets/assets/images/ic_invite.png": "375706eba09fc75f44128ccaa5aa036a",
"assets/assets/images/ic_notification.png": "c27f37c0225700c994bc37648082a5c5",
"assets/assets/images/ic_nutration.png": "3eac6509e609f32edba3b6a42b450876",
"assets/assets/images/ic_profile.png": "1910d786cfa3f1641a641b3b9dcdfc1f",
"assets/assets/images/ic_second.png": "019a2334ec2775579e79f389bd5392bb",
"assets/assets/images/ic_shope.png": "b04870c335031a8811be22c190421616",
"assets/assets/images/ic_social.png": "8ec950d31027c1690a767b621b8a1756",
"assets/assets/images/ic_squads.png": "8add785c6582dddb147f97cfd770f37d",
"assets/assets/images/ic_third.png": "e7096eeadeea5b51780b2f335e1f0833",
"assets/assets/images/img_six_pac.png": "1965a2bcc526d29468aa613989278c49",
"assets/assets/images/img_six_pac_latest.png": "67e9f6c1f15ee75e8b91c6fbaddae31b",
"assets/assets/images/remove.png": "dc8a298218b01cb39958e045e14036f8",
"assets/assets/images/success_green.svg": "ce08a201fb4cda41ab035b5b0194b9c9",
"assets/assets/images/text_sixpac.png": "cebd56a57577fd63059f1fd8ca2f5050",
"assets/FontManifest.json": "7f4cdd352ef6290dae50542c6983121b",
"assets/fonts/MaterialIcons-Regular.otf": "4085b4a50923b460f0d875dc6afba377",
"assets/NOTICES": "654a92f827501bc910c078140eebac38",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "4096b5150bac93c41cbc9b45276bd90f",
"canvaskit/canvaskit.js": "eb8797020acdbdf96a12fb0405582c1b",
"canvaskit/canvaskit.wasm": "64edb91684bdb3b879812ba2e48dd487",
"canvaskit/chromium/canvaskit.js": "0ae8bbcc58155679458a0f7a00f66873",
"canvaskit/chromium/canvaskit.wasm": "f87e541501c96012c252942b6b75d1ea",
"canvaskit/skwasm.js": "87063acf45c5e1ab9565dcf06b0c18b8",
"canvaskit/skwasm.wasm": "4124c42a73efa7eb886d3400a1ed7a06",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "59a12ab9d00ae8f8096fffc417b6e84f",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "e48361ed2d554ad812a0f4af17297a6c",
"/": "e48361ed2d554ad812a0f4af17297a6c",
"main.dart.js": "655f6e93a00a67646cfb7cabe7e048b0",
"manifest.json": "bf24c84c3bf99672a631c4f84464e793",
"version.json": "15235b5108d6a877ef74fe3317a96bf7",
"_redirects": "d38a2b58df330c85e0029eecf71d7c26"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
