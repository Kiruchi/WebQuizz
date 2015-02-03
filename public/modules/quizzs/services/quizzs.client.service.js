'use strict';

//Quizzs service used for communicating with the quizzs REST endpoints
angular.module('quizzs').factory('Quizzs', ['$resource',
	function($resource) {
		return $resource('quizzs/:quizzId', {
			quizzId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);