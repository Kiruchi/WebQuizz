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
		$scope.leQuizz.$promise.then(function(data) {
			$scope.quizz = data;

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
		});
	}
	]);