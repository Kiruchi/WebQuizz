'use strict';

angular.module('quizzs').controller('CreateQuizzController', ['$scope',
	function($scope) {

		$scope.questions=[];

		$scope.step=false;

		$scope.answers=[];

		$scope.$watch('questions',function(){
			$scope.nbQuestion=$scope.questions.length;
		},true);

		$scope.removeQuestion = function(index){
			$scope.questions.splice(index,1);
		};

		$scope.nextStep = function () {
			
			$scope.step = !$scope.step;

		};

		$scope.removeAnswer = function(index){
			$scope.answers.splice(index,1);
		};

		$scope.addAnswer = function() {
			$scope.answers.push({
				answer: $scope.newAnswer
			});
			$scope.newAnswer='';
		};

		$scope.addQuestion = function() {
			$scope.questions.push({
				title: $scope.newQuestion,
				answer: $scope.newGoodAnswer,
				propositions: $scope.answers
			});
			$scope.newQuestion='';
			$scope.newGoodAnswer='';
			$scope.answers=[];
		};


	}
]);