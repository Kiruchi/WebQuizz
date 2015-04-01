'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Resultat Schema
 */
var ResultatSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Resultat name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Resultat', ResultatSchema);