'use strict';

//Resultats service used to communicate Resultats REST endpoints
angular.module('resultats').factory('Resultats', ['$resource',
	function($resource) {
		return $resource('resultats/:resultatId', { resultatId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);