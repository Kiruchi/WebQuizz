'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = mongoose.SchemaTypes.ObjectId;

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
	answers: [{type: ObjectId, ref: 'Answer'}],
	goodAnswers: [{type: ObjectId, ref: 'Answer'}]
});

mongoose.model('Question', QuestionSchema);