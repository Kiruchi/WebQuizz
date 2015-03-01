'use strict';

angular.module('quizzs').controller('TableIntelController', ['$scope', '$location',
	function($scope, $location) {
		$scope.clickEdit = false;
		$scope.displayedCollection = [].concat($scope.quizzs);

	    //remove to the real data holder
	    $scope.removeItem = function removeItem(row) {
	        var index = $scope.quizzs.indexOf(row);
	        if (index !== -1) {
	            $scope.displayedCollection.splice(index, 1);
	        }
	    };

	    $scope.itemsByPage=10;

	    $scope.editClick = function() {
		  $scope.clickEdit = true;
		};

	    $scope.showQuizz = function(quizz) {
	    	if(!$scope.clickEdit) {
	    		$location.path('quizzs/' + quizz._id);
	    	}
		};
}]);