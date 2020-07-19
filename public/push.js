var webPush = require('web-push');

const vapidKeys = {
	"publicKey": "BItsGbT7GtIR0K-8j-k1tRT-pLz1Lk3sk0fm1HoGTjMLLEN2seWp-yHYMzv6DWqeXoKZHN2zWHpZ1hDD3KW9rQo",
	"privateKey": "WOEANPUOTc13RtgfeslaUqOb9UZRoPvmqGvC7_VfvoM"
};


webPush.setVapidDetails(
	'mailto:erginakamiliaputri@gmail.com',
	vapidKeys.publicKey,
	vapidKeys.privateKey
)
var pushSubscription = {
	"endpoint": "https://fcm.googleapis.com/fcm/send/fxrjKo_ICic:APA91bFI3zERxzlx9mPA1YpL45u_B3iQgGxZTUPdgHJ5PM8zWuyEAEQixg5KPkJsoPBT3EOXwpGzkOLFAxu4mIrRdK-8CWCiMFVuXihjOjZFMCLp175G2_xRXuLotcSXrdRNCa-Ocq9Q",
	"keys": {
		"p256dh": "BAeISRcPLM6NWrcoownetV/sN9mF/0iR6ggvI2Zsu/c1BhjQwe9ibXsI5zzAxlHkspe0w7AKJG9T0VjysY44GiM=",
		"auth": "o/M1EveCqVH688nfNe6ZhQ=="
	}
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
	gcmAPIKey: '1053146949266',
	TTL: 60
};
webPush.sendNotification(
	pushSubscription,
	payload,
	options
);