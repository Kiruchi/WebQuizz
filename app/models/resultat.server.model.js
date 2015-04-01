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
 	pourcentage: {
 		type: String,
 		default: 'undefined'
 	},
 	reponses: [{
 		question: {
 			type: Schema.ObjectId,
 			ref: 'Question'
 		},
 		reponse: [{
 			type: Boolean,
 			default: false,
 			required: 'Veuillez donner une réponse.'
 		}]
 	}],
 	played: {
 		type: Date,
 		default: Date.now
 	},
 	user: {
 		type: Schema.ObjectId,
 		ref: 'User'
 	},
 	quizz: {
 		type: Schema.ObjectId,
 		ref: 'Quizz'
 	}
 });

 mongoose.model('Resultat', ResultatSchema);