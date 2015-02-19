'use strict';

angular.module('quizzs').controller('CreateQuizzController', ['$scope', '$location',
	function($scope, $location) {
		$scope.createInfo = function(){
			$location.path('/quizzs/create/questions');
		};
	}
]);

angular.module('quizzs').controller('RateController', ['$scope',
	function($scope) {
		// DEBUT RATE
		$scope.max = 5;
		$scope.isReadonly = false;

		$scope.hoveringOver = function(value) {
		$scope.overStar = value;
		$scope.percent = 100 * (value / $scope.max);
		};

		$scope.ratingStates = [
		{stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
		{stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
		{stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
		{stateOn: 'glyphicon-heart'},
		{stateOff: 'glyphicon-off'}
		];
	    // FIN RATE
	}
]);

angular.module('quizzs').controller('DateTimePickerController', ['$scope',
	function($scope) {
		// DEBUT DATETIMEPICKER
	    //$scope.maxDate = new Date('2014-06-22');
	    //$scope.toggleMinDate();
	    $scope.hourStep = 1;
	    $scope.minuteStep = 1;
  
	    $scope.dateOptions = {
	  	  startingDay: 1,
	  	  showWeeks: false
	    };
	    // FIN DATETIMEPICKER
	}
]);