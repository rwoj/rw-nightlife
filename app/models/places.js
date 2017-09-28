'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Place = new Schema({
  placeId: String,
	going: Number,
  users: Array
});

module.exports = mongoose.model('Place', Place);
