'use strict';

const yelp = require('yelp-fusion');
const yelpAuth = require('../config/auth').yelpAuth;

const Users = require('../models/users.js');
const Places = require('../models/places.js')

function PlacesHandler () {
	this.searchPlaces = function (req, res) {
		var allSearchPlaces=[];
		req.session.location=req.body.location

		const searchRequest = {
		  term:'bar',
		  location: req.body.location
		};
		yelp.accessToken(yelpAuth.clientId, yelpAuth.clientSecret).then(response => {
			const client = yelp.client(response.jsonBody.access_token);

			client.search(searchRequest).then(response => {
				// const firstResult = response.jsonBody.businesses[0];
				// const prettyJson = JSON.stringify(firstResult, null, 4);
				// console.log(prettyJson);
				Places
					.find({})
					.exec(function (err, results) {
						if (err){throw err}
						response.jsonBody.businesses.forEach(function (x) {
							//				console.log(x.id, x.name, x.image_url, x.url)
							var indGoing=results.findIndex(function (y) {return y.placeId==x.id;});
							if(indGoing>-1){
								allSearchPlaces.push({'id':x.id, 'name': x.name, 'image_url': x.image_url, 'url': x.url, 'going': results[indGoing].going})
							} else {
								allSearchPlaces.push({'id':x.id, 'name': x.name, 'image_url': x.image_url, 'url': x.url, 'going': 0})
							}
						})
						res.json(allSearchPlaces);
					})
			});
		}).catch(e => {
			console.log(e);
		})
	}
	this.getLastSearch = function (req, res) {
		res.json({'lastSearch':req.session.location})
	}
	this.goPlace=function (req, res) {
		var indexUser;
		Places
			.findOne({'placeId':req.body.placeId}, function (err, doc) {
				if(err){throw err};
				if(doc && doc.users){
					indexUser=doc.users.findIndex(function (x) {
						return x==req.body.userId
					})
					if (indexUser!==-1) {
						doc.going=doc.going-1
						doc.users.splice(indexUser,1)
						doc
							.save(function (err, newdoc) {
								if(err) throw err;
								res.json(newdoc)
							})
					} else {
						doc.going=doc.going+1
						doc.users.push(req.body.userId)
						doc
							.save(function (err, newdoc) {
								if(err) throw err;
								res.json(newdoc)
							})
					}
				} else {
					var newPlace = new Places ({
						'placeId': req.body.placeId,
						'going': 1,
						'users': [req.body.userId]
					})
					newPlace
						.save(function(err, newdoc){
							if(err) throw err;
							res.json(newdoc)
						})
				}
			})
	}
}

module.exports = PlacesHandler;
