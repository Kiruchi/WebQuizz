'use strict';

angular.module('quizzs').controller('TableIntelController', ['$scope',
	function($scope) {

    //remove to the real data holder
    $scope.removeItem = function removeItem(row) {
        var index = $scope.rowCollection.indexOf(row);
        if (index !== -1) {
            $scope.rowCollection.splice(index, 1);
        }
    };
}]);