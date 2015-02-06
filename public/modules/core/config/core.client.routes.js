'use strict';

// Setting up route
var app = angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
]);

app.directive('particles', function() {
	return {
		restrict: 'A',
		link: function($scope, $elem, attrs) {
			$elem.particleground({
			    dotColor: '#5cbdaa',
			    lineColor: '#5cbdaa',
			    parallaxMultiplier: 5,
			    maxSpeedX: 0.1,
			    maxSpeedy: 0.1,
			    density: 10000,
			    proximity: 100
			});
		}
	};
});