'use strict';

angular.module('quizzs').controller('UpdateValidateQuizzController', ['$scope','quizzService',
	function($scope, quizzService) {
		
		//recuperation des informations
		$scope.quizzInfo=quizzService.getQuizzInfo();
		$scope.quizzQuestions=quizzService.getQuizzQuestions();
	}
]);