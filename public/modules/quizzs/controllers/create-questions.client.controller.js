'use strict';

angular.module('quizzs').controller('CreateQuestionsController', ['$scope', '$location',
	function($scope, $location) {
		$scope.createQuestions = function(){
			$location.path('/quizzs/create/validate');
		};
	}
]);