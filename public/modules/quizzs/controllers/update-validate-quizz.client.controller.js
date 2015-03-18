'use strict';

angular.module('quizzs').controller('UpdateValidateQuizzController', ['$scope','quizzService',
	function($scope, quizzService) {
		
		//recuperation des informations
		$scope.leQuizz.$promise.then(function(data) {
			$scope.quizz = data;
		});
	}
]);