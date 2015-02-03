'use strict';

angular.module('quizzs').controller('QuizzsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Quizzs',
	function($scope, $stateParams, $location, Authentication, Quizzs) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var quizz = new Quizzs({
				title: this.title,
				content: this.content
			});
			quizz.$save(function(response) {
				$location.path('quizzs/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(quizz) {
			if (quizz) {
				quizz.$remove();

				for (var i in $scope.quizzs) {
					if ($scope.quizzs[i] === quizz) {
						$scope.quizzs.splice(i, 1);
					}
				}
			} else {
				$scope.quizz.$remove(function() {
					$location.path('quizzs');
				});
			}
		};

		$scope.update = function() {
			var quizz = $scope.quizz;

			quizz.$update(function() {
				$location.path('quizzs/' + quizz._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.quizzs = Quizzs.query();
		};

		$scope.findOne = function() {
			$scope.quizz = Quizzs.get({
				quizzId: $stateParams.quizzId
			});
		};
	}
]);