'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Answer Schema
 */
var AnswerSchema = new Schema({
	label: {
		type: String,
		default: '',
		trim: true,
		required: 'Veuillez entrer l\'énoncé de la question.'
	}
});

mongoose.model('Answer', AnswerSchema);