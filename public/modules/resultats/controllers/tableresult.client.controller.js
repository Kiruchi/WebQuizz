'use strict';

angular.module('resultats').controller('TableresultController', ['$scope', '$location',
	function($scope, $location) {
		
		$scope.displayedCollection = [].concat($scope.resultats);

	    //remove to the real data holder
	    $scope.removeItem = function removeItem(row) {
	        var index = $scope.resultats.indexOf(row);
	        if (index !== -1) {
	            $scope.displayedCollection.splice(index, 1);
	        }
	    };

	    $scope.showResult = function(resultat) {
	    	$location.path('resultats/' + resultat._id);
		};

	    $scope.itemsByPage=10;
}]);