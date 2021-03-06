'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Quizz = mongoose.model('Quizz'),
	Question = mongoose.model('Question'),
	_ = require('lodash');

/**
 * Create a quizz
 */
exports.create = function(req, res) {
	var quizz = new Quizz(req.body.infos);

	for (var j = 0; j < req.body.questions.length; j++) {
		var laQuestion = new Question(req.body.questions[j]);
		quizz.questions.push(laQuestion);
		laQuestion.save();
	}

	quizz.creator = req.user;

	quizz.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(quizz);
		}
	});
};

/**
 * Show the current quizz
 */
exports.read = function(req, res) {
	res.json(req.quizz);
};

/**
 * Update a quizz
 */
exports.update = function(req, res) {
	var quizz = req.quizz;
	
	var monQuizz = _.extend({}, req.body);

	quizz = _.extend(quizz, req.body);
	
	// Récupération du quizz actuel et suppression des questions
	Quizz.findById(quizz._id).populate('questions').exec(function(err, leQuizz) {
		// Début suppression des questions
		for (var i = leQuizz.questions.length - 1; i >= 0; i--) {
			leQuizz.questions[i].remove();
		}
		// Fin suppression des questions

		// Clean des id questions
		quizz.questions = [];
		// Fin clean des id questions

		// Ajout des nouvelles questions
		for (var j = 0; j < monQuizz.questions.length; j++) {
			var maQ = new Question(monQuizz.questions[j]);
			quizz.questions.push(maQ);
			console.log('Dans la boucle');
			console.log(quizz.questions);
			maQ.save(console.log);
		}
		// Fin d'ajout des nouvelles questions
		
		quizz.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.json(quizz);
			}
		});
	});
};

/**
 * Delete a quizz
 */
exports.delete = function(req, res) {
	var quizz = req.quizz;
	for (var i = quizz.questions.length - 1; i >= 0; i--) {
		quizz.questions[i].remove();
	}
	quizz.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(quizz);
		}
	});
};

/**
 * List of Quizzs
 */
exports.list = function(req, res) {
	Quizz.find().sort('-created').populate('creator', 'displayName').exec(function(err, quizzs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(quizzs);
		}
	});
};

/**
 * Quizz middleware
 */
exports.quizzByID = function(req, res, next, id) {
	Quizz.findById(id).populate('creator', 'displayName').populate('questions').exec(function(err, quizz) {
		if (err) return next(err);
		if (!quizz) return next(new Error('Failed to load quizz ' + id));
		req.quizz = quizz;
		next();
	});
};

/**
 * Quizz authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.quizz.creator.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};