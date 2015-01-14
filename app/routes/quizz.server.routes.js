'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	quizzs = require('../../app/controllers/quizzs.server.controller');

module.exports = function(app) {
	// Quizz Routes
	app.route('/quizzs')
		.get(quizzs.list)
		.post(users.requiresLogin, quizzs.create);

	app.route('/quizzs/:quizzId')
		.get(quizzs.read)
		.put(users.requiresLogin, quizzs.hasAuthorization, quizzs.update)
		.delete(users.requiresLogin, quizzs.hasAuthorization, quizzs.delete);

	// Finish by binding the quizz middleware
	app.param('quizzId', quizzs.quizzByID);
};