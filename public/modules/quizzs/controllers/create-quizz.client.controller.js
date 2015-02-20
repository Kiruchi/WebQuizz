'use strict';

angular.module('quizzs').controller('CreateQuizzController', ['$scope', '$location', 'quizzService',
	function($scope, $location, quizzService) {

		$scope.quizzInfo=quizzService.getQuizzInfo();

		$scope.createInfo = function(){
			$location.path('/quizzs/create/questions');
		};
	}
]);

angular.module('quizzs').controller('RateController', ['$scope', 'quizzService',
	function($scope, quizzService) {
		// DEBUT RATE
		$scope.rate = quizzService.getQuizzInfo().rate;
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

angular.module('quizzs').controller('DateTimePickerController', ['$scope', 'quizzService',
	function($scope, quizzService) {
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