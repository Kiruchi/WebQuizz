'use strict';

// Setting up route
angular.module('quizzs').config(['$stateProvider',
	function($stateProvider) {
		// Quizzs state routing
		$stateProvider.
		state('listQuizzs', {
			url: '/quizzs',
			templateUrl: 'modules/quizzs/views/list-quizzs.client.view.html'
		}).
		state('createQuizz', {
			url: '/quizzs/create',
			templateUrl: 'modules/quizzs/views/create-quizz.client.view.html'
		}).
		state('viewQuizz', {
			url: '/quizzs/:quizzId',
			templateUrl: 'modules/quizzs/views/view-quizz.client.view.html'
		}).
		state('editQuizz', {
			url: '/quizzs/:quizzId/edit',
			templateUrl: 'modules/quizzs/views/edit-quizz.client.view.html'
		});
	}
]);