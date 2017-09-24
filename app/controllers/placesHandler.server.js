'use strict';

const yelp = require('yelp-fusion');

const clientId = 'agzxPS1vr1749MLCKZsNew';
const clientSecret = 'XYSK1jQBanrndVOIWJe3x1nOPk56NDK25wUhRzgt3eM7Dw06caAn1QPz1DpHiKV8';


var Users = require('../models/users.js');

function PlacesHandler () {

	this.searchPlaces = function (req, res) {
		const searchRequest = {
		  term:'bar',
		  location: req.body.location
		};
		yelp.accessToken(clientId, clientSecret).then(response => {
			const client = yelp.client(response.jsonBody.access_token);

			client.search(searchRequest).then(response => {
				const firstResult = response.jsonBody.businesses[0];
				const prettyJson = JSON.stringify(firstResult, null, 4);
				console.log(prettyJson);
				res.json(response.jsonBody.businesses);
			});
		}).catch(e => {
			console.log(e);
		});
}
};

module.exports = PlacesHandler;
