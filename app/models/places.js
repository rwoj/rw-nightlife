'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Place = new Schema({
	    barId: String,
      goingCount: Number
});

module.exports = mongoose.model('Place', Place);
