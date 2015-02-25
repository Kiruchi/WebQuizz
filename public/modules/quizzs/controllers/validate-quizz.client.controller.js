'use strict';

angular.module('quizzs').controller('ValidateQuizzController', ['$scope','quizzService',
	function($scope, quizzService) {
		
		//recuperation des informations
		$scope.quizzInfo=quizzService.getQuizzInfo();
		$scope.quizzQuestions=quizzService.getQuizzQuestions();
	}
]);