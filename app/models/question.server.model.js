'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Question Schema
 */
var QuestionSchema = new Schema({
	label: {
		type: String,
		default: '',
		trim: true,
		required: 'Veuillez entrer l\'énoncé de la question.'
	},
	answers: [{
		label: {
			type: String,
			default: '',
			trim: true,
			required: 'Veuillez entrer une réponse.'
		},
		isCorrect: {
			type: Boolean,
			default: false,
			required: 'Veuillez dire si la réponse est correcte ou non.'
		}

	}]
});

mongoose.model('Question', QuestionSchema);