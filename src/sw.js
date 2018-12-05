importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');
workbox.setConfig({ debug: false });
//workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

//workbox.navigationPreload.enable();

workbox.routing.registerRoute(
  new RegExp("(.*)trimblesandvika.azureedge.net/trimbim/(.*)"),
  workbox.strategies.cacheFirst({ cacheName: 'files', ignoreSearch: true }),
  'GET'
);

workbox.routing.registerRoute(
  new RegExp("(.*)models/(.*)"),
  workbox.strategies.networkFirst({cacheName: 'models', ignoreSearch: true})
);

workbox.routing.registerRoute(
  new RegExp("(.*)/api/(.*)"),
  workbox.strategies.networkFirst({ cacheName: 'eaapi', ignoreSearch: true })
);

workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  workbox.strategies.staleWhileRevalidate(),
);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 500,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
      })
    ]
  }),
); 

workbox.routing.registerRoute(
  new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30
      }),
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      })
    ]
  })
);