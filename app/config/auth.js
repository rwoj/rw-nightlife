'use strict';
module.exports = {
	'twitterAuth': {
		'clientID': process.env.TWITTER_CONSUMER_KEY,
		'clientSecret': process.env.TWITTER_CONSUMER_SECRET,
		'callbackURL': process.env.APP_URL
	},
	'yelpAuth': {
		'clientId': process.env.YELP_ID,
		'clientSecret': process.env.YELP_SECRET
	},
	'appUrl': process.env.APP_URL
};
