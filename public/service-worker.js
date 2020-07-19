importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
	console.log(`Workbox berhasil dimuat`);
else
	console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
	{ url: '/index.html', revision: '1' },
	{ url: '/nav.html', revision: '1' },
	{ url: '/push.js', revision: '2' },
	{ url: '/manifest.json', revision: '1' },
	{ url: '/package-lock.json', revision: '1' },
	{ url: '/images/david.webp', revision: '1' },
	{ url: '/images/favicon.ico', revision: '1' },
	{ url: '/images/football.webp', revision: '1' },
	{ url: '/images/football2.webp', revision: '1' },
	{ url: '/images/gerard.webp', revision: '1' },
	{ url: '/images/icon-192x192.png', revision: '1' },
	{ url: '/images/icon-512x512.png', revision: '1' },
	{ url: '/images/league.webp', revision: '1' },
	{ url: '/images/mohamed-salah.webp', revision: '1' },
	{ url: '/images/ronaldinho.webp', revision: '1' },
	{ url: '/images/ronaldo.webp', revision: '1' },
	{ url: '/images/stadium.webp', revision: '1' },
	{ url: '/images/team.webp', revision: '1' },
	{ url: '/images/thierry.webp', revision: '1' },
	{ url: '/images/trophy.webp', revision: '1' },
	{ url: '/pages/home.html', revision: '1' },
	{ url: '/pages/saved.html', revision: '1' },
	{ url: '/pages/schedule.html', revision: '1' },
	{ url: '/pages/standing.html', revision: '1' },
	{ url: '/pages/team.html', revision: '1' },
	{ url: '/css/materialize.min.css', revision: '1' },
	{ url: '/js/materialize.min.js', revision: '1' },
	{ url: '/js/nav.js', revision: '1' },
	{ url: '/js/parallax.js', revision: '1' },
	{ url: '/js/slider.js', revision: '1' },
	{ url: '/js/main.js', revision: '1' },
	{ url: '/js/api.js', revision: '1' },
	{ url: '/js/idb.js', revision: '1' },
	{ url: '/js/db.js', revision: '1' },
], {
	ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
	new RegExp('/pages/'),
	workbox.strategies.staleWhileRevalidate({
		cacheName: 'pages'
	})
);

workbox.routing.registerRoute(
	new RegExp('\.(png|webp|svg|ico|jpg|jpeg)$'),
	workbox.strategies.staleWhileRevalidate({
		cacheName: 'images',
		Plugins: [
			new workbox.expiration.Plugin({
				maxAgeSeconds: 60 * 60 * 24 * 30,
				maxEntries: 60,
				purgeOnQuotaError: true
			})
		]
	})
);

workbox.routing.registerRoute(
	new RegExp('https://api.football-data.org/v2/'),
	workbox.strategies.staleWhileRevalidate({
		cacheName: 'APICache',
		cacheExpiration: {
			maxAgeSeconds: 60 * 30
		}
	})
);

self.addEventListener('push', function(event) {
	var body;
	if (event.data) {
		body = event.data.text();
	} else {
		body = 'Push message no payload';
	}
	var options = {
		body: body,
		icon: 'images/icon-192x192.png',
		vibrate: [100, 50, 100],
		data: {
			dateOfArrival: Date.now(),
			primaryKey: 1
		}
	};
	event.waitUntil(
		self.registration.showNotification('Push Notification', options)
	);
});