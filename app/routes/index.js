'use strict';
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var path = process.cwd();
// var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var PlacesHandler = require(path + '/app/controllers/placesHandler.server.js');

module.exports = function (app, passport) {

	// function isLoggedIn (req, res, next) {
	// 	if (req.isAuthenticated()) {
	// 		return next();
	// 	} else {
	// 		res.redirect('/login');
	// 	}
	// }

	// var clickHandler = new ClickHandler();
	var placesHandler=new PlacesHandler();

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/api/places')
		.post(jsonParser, placesHandler.searchPlaces)

	// app.route('/login')
	// 	.get(function (req, res) {
	// 		res.sendFile(path + '/public/login.html');
	// 	});
	//
	// app.route('/logout')
	// 	.get(function (req, res) {
	// 		req.logout();
	// 		res.redirect('/login');
	// 	});
	//
	// app.route('/profile')
	// 	.get(isLoggedIn, function (req, res) {
	// 		res.sendFile(path + '/public/profile.html');
	// 	});
	//
	// app.route('/api/:id')
	// 	.get(isLoggedIn, function (req, res) {
	// 		res.json(req.user.github);
	// 	});
	//
	app.route('/auth/twitter')
		.get(passport.authenticate('twitter'));

	app.route('/auth/twitter/callback')
		.get(passport.authenticate('twitter', { failureRedirect: '/'}), function (req,res) {
			res.redirect('/');
			});
};
