"use strict";

$(document).ready(function() {
	app.init();
});

var app = {
	count: 1,
	interval: 0, // Holds the reference to the interval, so it can be cleared by other functions
	timer: false, // Whether timer is running or not

	init: function() {
		document.addEventListener('deviceready', app.onDeviceReady, false);
	},

	onDeviceReady: function() {
		app.startInterval();
		app.bindEvents();
	},

	// Add listeners to handle various state changes
	bindEvents: function() {
		// Handles when authentication changes
		document.addEventListener("isauthenticatedchanged", app.checkAuth, false);

		// Handles when you click on some article and then come back
		document.addEventListener("visibilitychange", app.visibilityChange, false);

		// Handles when you swipe between articles
		window.onAppear = app.onAppear;
		window.onDisappear = app.onDisappear;

		// Handles when app is sent to background and foreground (iOS only)
		document.addEventListener("pause", app.onPause, false);
		document.addEventListener("resume", app.onResume, false);

		// Handles when device goes online or offline
		document.addEventListener("offline", app.offline, false);
		document.addEventListener("online", app.online, false);
	},

	visibilityChange: function() {
		$("#container").append("<h2>visibilitychange</h2>");
		$("#container").append("<h2>" + document.visibilityState + "</h2>");

		if (document.visibilityState == "visible") {
			app.startInterval();
		}
		else {
			clearInterval(app.interval);
		}
	},

	onAppear: function() {
		$("#container").append("<h2>onAppear</h2>");
		app.startInterval();
	},
	onDisappear: function() {
		$("#container").append("<h2>onDisappear</h2>");
		clearInterval(app.interval);
	},

	onPause: function() {
		$("#container").append("<h2>onPause</h2>");
		clearInterval(app.interval);
	},
	onResume: function() {
		$("#container").append("<h2>onResume</h2>");
		app.startInterval();
	},

	checkAuth: function() {
		if (cq.mobile.user.isAuthenticated) {
			var token = cq.mobile.user.authToken;
			$("#container").append("<h2>Logged in: " + token + "</h2>");
		}
		else {
			$("#container").append("<h2>Logged out</h2>");
		}
	},

	offline: function() {
		$("#container").append("<h2>offline</h2>");
		clearInterval(app.interval);
	},

	online: function() {
		$("#container").append("<h2>online</h2>");
		app.startInterval();
	},

	startInterval: function() {
		app.interval = setInterval(app.updateCount, 1000);
	},

	updateCount: function() {
		app.count++;
		$("#count").html(app.count);
	}
};

