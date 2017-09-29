'use strict';
var TwitterStrategy=require('passport-twitter').Strategy;

var User = require('../models/users');
var configAuth = require('./auth');

module.exports = function (passport) {
	passport.use(new TwitterStrategy({
	    consumerKey: configAuth.twitterAuth.clientID,
	    consumerSecret: configAuth.twitterAuth.clientSecret,
	    callbackURL: configAuth.appUrl+"auth/twitter/callback"
	  },
		function (token, tokenSecret, profile, done) {
			process.nextTick(function () {
				User.findOne({ 'twitter.id': profile.id }, function (err, user) {
					if (err) {	return done(err);		}
					if (user) {
						return done(null, user);
					} else {
						var newUser = new User();
						newUser.twitter.id = profile.id;
						newUser.twitter.username = profile.username;
						newUser.twitter.displayName = profile.displayName;
						newUser.save(function (err) {
							if (err) {
								throw err;
							}
							return done(null, newUser);
						});
					}
				});
			});
		}
	));
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});
	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});
};
