'use strict';

// Resultats controller
angular.module('resultats').controller('ResultatsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Resultats',
	function($scope, $stateParams, $location, Authentication, Resultats) {
		$scope.authentication = Authentication;

		// Create new Resultat
		$scope.create = function() {
			// Create new Resultat object
			var resultat = new Resultats ({
				name: this.name
			});

			// Redirect after save
			resultat.$save(function(response) {
				$location.path('resultats/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Resultat
		$scope.remove = function(resultat) {
			if ( resultat ) { 
				resultat.$remove();

				for (var i in $scope.resultats) {
					if ($scope.resultats [i] === resultat) {
						$scope.resultats.splice(i, 1);
					}
				}
			} else {
				$scope.resultat.$remove(function() {
					$location.path('resultats');
				});
			}
		};

		// Update existing Resultat
		$scope.update = function() {
			var resultat = $scope.resultat;

			resultat.$update(function() {
				$location.path('resultats/' + resultat._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Resultats
		$scope.find = function() {
			$scope.resultats = Resultats.query();
		};

		// Find existing Resultat
		$scope.findOne = function() {
			$scope.resultat = Resultats.get({ 
				resultatId: $stateParams.resultatId
			});
		};
	}
]);