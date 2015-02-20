'use strict';

angular.module('quizzs').controller('ValidateQuizzController', ['$scope','quizzService',
	function($scope, quizzService) {

		$scope.quizzInfo=quizzService.getQuizzInfo();
		$scope.quizzQuestions=quizzService.getQuizzQuestions();
		
	}
]);