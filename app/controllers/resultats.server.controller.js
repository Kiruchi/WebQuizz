'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Resultat = mongoose.model('Resultat'),
	_ = require('lodash');

/**
 * Create a Resultat
 */
exports.create = function(req, res) {
	var resultat = new Resultat(req.body);
	resultat.user = req.user;

	resultat.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(resultat);
		}
	});
};

/**
 * Show the current Resultat
 */
exports.read = function(req, res) {
	res.jsonp(req.resultat);
};

/**
 * Update a Resultat
 */
exports.update = function(req, res) {
	var resultat = req.resultat ;

	resultat = _.extend(resultat , req.body);

	resultat.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(resultat);
		}
	});
};

/**
 * Delete an Resultat
 */
exports.delete = function(req, res) {
	var resultat = req.resultat ;

	resultat.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(resultat);
		}
	});
};

/**
 * List of Resultats
 */
exports.list = function(req, res) { 
	Resultat.find().sort('-played').populate('user', 'displayName').populate('quizz', 'name rate').exec(function(err, resultats) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(resultats);
		}
	});
};

/**
 * Resultat middleware
 */
exports.resultatByID = function(req, res, next, id) { 
	Resultat.findById(id).populate('user', 'displayName').populate('quizz', 'name rate').exec(function(err, resultat) {
		if (err) return next(err);
		if (! resultat) return next(new Error('Failed to load Resultat ' + id));
		req.resultat = resultat ;
		next();
	});
};

/**
 * Resultat authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.resultat.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
