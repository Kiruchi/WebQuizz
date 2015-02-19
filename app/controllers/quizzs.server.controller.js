'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Quizz = mongoose.model('Quizz'),
	_ = require('lodash');

/**
 * Create a quizz
 */
exports.create = function(req, res) {
	var quizz = new Quizz(req.body);
	quizz.user = req.user;

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

	quizz = _.extend(quizz, req.body);

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
 * Delete a quizz
 */
exports.delete = function(req, res) {
	var quizz = req.quizz;

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
	Quizz.find().sort('-created').populate('user', 'displayName').exec(function(err, quizzs) {
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
	Quizz.findById(id).populate('user', 'displayName').exec(function(err, quizz) {
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
	if (req.quizz.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};