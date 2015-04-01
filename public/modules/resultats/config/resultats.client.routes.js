'use strict';

//Setting up route
angular.module('resultats').config(['$stateProvider',
	function($stateProvider) {
		// Resultats state routing
		$stateProvider.
		state('listResultats', {
			url: '/resultats',
			templateUrl: 'modules/resultats/views/list-resultats.client.view.html'
		}).
		state('createResultat', {
			url: '/resultats/create',
			templateUrl: 'modules/resultats/views/create-resultat.client.view.html'
		}).
		state('viewResultat', {
			url: '/resultats/:resultatId',
			templateUrl: 'modules/resultats/views/view-resultat.client.view.html'
		}).
		state('editResultat', {
			url: '/resultats/:resultatId/edit',
			templateUrl: 'modules/resultats/views/edit-resultat.client.view.html'
		});
	}
]);