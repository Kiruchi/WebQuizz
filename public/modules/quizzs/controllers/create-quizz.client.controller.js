'use strict';

angular.module('quizzs').controller('CreateQuizzController', ['$scope', '$location', 'quizzService',
	function($scope, $location, quizzService) {

		//init variables pages
		$scope.buttonEndDate = 'Ajouter une date de fin';
		$scope.haveEndDate=false;

		//recuperation des informations de la factory
		$scope.quizzInfo=quizzService.getQuizzInfo();

		//test si date de fin deja saisie
		if ($scope.quizzInfo.endDate !== null) {
			$scope.haveEndDate=true;
			$scope.buttonEndDate = 'Supprimer la date de fin';
		}

		$scope.createInfo = function(){
			if(!$scope.quizzInfo.name)
			{
				$scope.error='Veuillez saisir un titre.';
			}
			else if(!$scope.quizzInfo.typeQuizz)
			{
				$scope.error='Veuillez sélectionner un type.';
			}
			else if(!$scope.quizzInfo.course)
			{
				$scope.error='Veuillez sélectionner une matière.';
			}
			else if(!$scope.quizzInfo.endDate && $scope.haveEndDate)
			{
				$scope.error='Veuillez saisir une date de fin.';
			}
			else
			{
				$scope.error='';
				$location.path('/quizzs/create/questions');
			}
		};

		$scope.AddEndDate = function(){
			$scope.haveEndDate =! $scope.haveEndDate;

			if ($scope.haveEndDate ) 
			{
				$scope.buttonEndDate = 'Supprimer la date de fin';
			}
			else
			{
				$scope.quizzInfo.endDate=null;
				$scope.buttonEndDate = 'Ajouter une date de fin';
			}
		};
	}
]);

angular.module('quizzs').controller('RateController', ['$scope', 'quizzService',
	function($scope, quizzService) {
		
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
	}
]);

angular.module('quizzs').controller('DateTimePickerController', ['$scope', 'quizzService',
	function($scope, quizzService) {
	    
	    $scope.dateTimeNow = function() {
			$scope.quizzInfo.beginDate = new Date();
		};
		$scope.dateTimeNow();
	    $scope.hourStep = 1;
	    $scope.minuteStep = 1;
  
	    $scope.dateOptions = {
	  	  startingDay: 1,
	  	  showWeeks: false
	    };
	}
]);