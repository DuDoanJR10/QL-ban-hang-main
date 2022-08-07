importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js')

workbox.precaching.precacheAndRoute([
  { url: '/index.html' },
  { url: '/' }
])

workbox.routing.registerRoute(
  new RegExp('.*.js'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'js-cache'
  })
)

workbox.routing.registerRoute(
  new RegExp('.*.png'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'png-cache'
  })
)

workbox.routing.registerRoute(
  new RegExp('.*.ico'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'ico-cache'
  })
)
