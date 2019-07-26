'use strict';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(function () {
    console.log('PWA: Service Worker Registered');
  });

  navigator.serviceWorker.ready.then(function () {
    console.log('PWA: Service Worker Ready');
  });
}
