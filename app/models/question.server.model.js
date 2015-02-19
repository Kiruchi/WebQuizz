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
	answers: [{type: Schema.ObjectId, ref: 'Answer'}],
	goodAnswers: [{type: Schema.ObjectId, ref: 'Answer'}]
});

mongoose.model('Question', QuestionSchema);