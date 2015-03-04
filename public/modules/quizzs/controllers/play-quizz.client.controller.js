'use strict';

angular.module('quizzs').controller('PlayQuizzController', ['$scope', '$stateParams', '$location', 'Authentication', 'Quizzs', 'quizzService',
	function($scope, $stateParams, $location, Authentication, Quizzs, quizzService) {
		$scope.authentication = Authentication;

		$scope.actualQuestion = 1;
		$scope.score = 0;
		$scope.questions=[
			{
				id_question:0,
				reponse:[]
			}
		];

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
			$scope.quizz = quizzService.getQuizz();
			var quizz = $scope.quizz;

			quizz.$update(function() {
				$location.path('quizzs/' + quizz._id);

				// Clean du scope pour un eventuel nouvel ajout
				$scope.quizz.infos = {
					rate : 3,
					endDate : null
				};

				$scope.quizz.questions =[];

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
			console.log($scope.quizz);
		};

		$scope.nextQuestion = function(quizz) {
			

			/*if ($scope.reponse = $scope.quizz.Question[$scope.actualQuestion]) {}
				$scope.reponse = */
				
	    	if ($scope.actualQuestion < $scope.quizz.questions.length) 
	    	{
	    		$scope.actualQuestion ++;
	    	}
		};

		$scope.previousQuestion = function(quizz) {
			

			/*if ($scope.reponse = $scope.quizz.Question[$scope.actualQuestion]) {}
				$scope.reponse = */
				
	    	if ($scope.actualQuestion !== 1) 
	    	{
	    		$scope.actualQuestion --;
	    	}
		};

		
	}
	]);