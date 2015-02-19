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
		required: 'Veuillez entrer le nom du quizz.'
	},
	description: {
		type: String,
		default: '',
		trim: true
	},
	typeQuizz: {
		type: [{
			type: String,
			enum: ['TLMVPSP', 'Classique', 'MotsCroises']
		}],
		default: ['Classique']
	},
	rate: {
		type: Number,
		min: 1,
		max: 5,
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
	},
	questions: [{type: Schema.ObjectId, ref: 'Question'}]
});

mongoose.model('Quizz', QuizzSchema);