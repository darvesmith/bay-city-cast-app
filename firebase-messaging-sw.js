/* CAST app push notifications — service worker.
   Lives at app.baycitycast.com/firebase-messaging-sw.js (repo root, same
   origin as the app). Only handles push notifications: it shows a notification
   when a message arrives while the app is closed, and opens the app when the
   notification is tapped. It has NO fetch handler, so it cannot affect how
   the app loads.
   Config is the live Firebase project "CAST Push Notifications". */

importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyAWbAf7bBxzK3Ia-S0JWmzlYO0Cjl3v0IE',
  authDomain: 'cast-push-notifications.firebaseapp.com',
  projectId: 'cast-push-notifications',
  storageBucket: 'cast-push-notifications.firebasestorage.app',
  messagingSenderId: '792715196736',
  appId: '1:792715196736:web:14bc2511196340727162a5'
});

var messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  var n = payload.notification || {};
  var title = n.title || 'Bay City CAST';
  var options = {
    body: n.body || '',
    data: {
      url: (payload.fcmOptions && payload.fcmOptions.link) ||
        'https://app.baycitycast.com/'
    }
  };
  return self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  var url = (event.notification.data && event.notification.data.url) ||
    'https://app.baycitycast.com/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {
      for (var i = 0; i < list.length; i++) {
        if (list[i].url.indexOf('app.baycitycast.com') !== -1 && 'focus' in list[i]) {
          return list[i].focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
