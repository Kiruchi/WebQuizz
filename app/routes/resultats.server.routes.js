'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var resultats = require('../../app/controllers/resultats.server.controller');

	// Resultats Routes
	app.route('/resultats')
		.get(resultats.list)
		.post(users.requiresLogin, resultats.create);

	app.route('/resultats/:resultatId')
		.get(resultats.read)
		.put(users.requiresLogin, resultats.hasAuthorization, resultats.update)
		.delete(users.requiresLogin, resultats.hasAuthorization, resultats.delete);

	// Finish by binding the Resultat middleware
	app.param('resultatId', resultats.resultatByID);
};
