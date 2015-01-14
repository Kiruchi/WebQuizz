'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Quizz Schema
 */
var QuizzSchema = new Schema({
	name: {
		type: String,
		default: '',
		trim: true,
		required: 'Veuillez entrer le nom du site.'
	},
	description: {
		type: String,
		default: '',
		trim: true
	},
	type: {
		type: [{
			type: String,
			enum: ['TLMVPSP', 'Classique', 'MotsCroises']
		}],
		default: ['Classique']
	},
	difficulty: {
		type: Number,
		min: 0,
		max: 4,
		default: 3
	},
	course: {
		type: String,
		default: 'Général'
	},
	creator: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	created: {
		type: Date,
		default: Date.now
	},
	beginDate: {
		type: Date,
		default: Date.now
	},
	endDate: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Quizz', QuizzSchema);