'use strict';
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var path = process.cwd();
var PlacesHandler = require(path + '/app/controllers/placesHandler.server.js');

module.exports = function (app, passport) {
	var placesHandler=new PlacesHandler();

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});
	app.route('/api/places')
		.post(jsonParser, placesHandler.searchPlaces)
		.get(placesHandler.getLastSearch)
	app.route('/api/going')
		.post(jsonParser, placesHandler.goPlace)
	app.route('/api/user')
		.get(function (req, res) {
			if (req.user){
				res.json(req.user.twitter);
			} else {
				res.json(JSON.stringify({'id':null}))
			}
		})
	app.route('/auth/twitter')
		.get(passport.authenticate('twitter'));
	app.route('/auth/twitter/callback')
		.get(passport.authenticate('twitter', { failureRedirect: '/'}), function (req,res) {
			res.redirect('/');
		});
};
