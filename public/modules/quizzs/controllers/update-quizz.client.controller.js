'use strict';

angular.module('quizzs').controller('UpdateQuizzController', ['$scope', '$location', 'quizzService', '$stateParams', 'Quizzs',
	function($scope, $location, quizzService, $stateParams, Quizzs) {

		//init variables pages
		$scope.buttonEndDate = 'Ajouter une date de fin';
		$scope.haveEndDate=false;

		$scope.leQuizz.$promise.then(function(data) {
			$scope.quizz = data;
			console.log($scope.quizz.questions);

			//test si date de fin deja saisie
			if ($scope.quizz.endDate!=='' && $scope.quizz.endDate!==null) {
				$scope.haveEndDate=true;
				$scope.buttonEndDate = 'Supprimer la date de fin';
			}

			$scope.updateInfo = function(){
				
				if(!$scope.quizz.name)
				{
					$scope.error='Veuillez saisir un titre.';
				}
				else if(!$scope.quizz.typeQuizz)
				{
					$scope.error='Veuillez selectionner un type.';
				}
				else if(!$scope.quizz.course)
				{
					$scope.error='Veuillez selectionner une matière.';
				}
				else if(!$scope.quizz.endDate && $scope.haveEndDate)
				{
					$scope.error='Veuillez saisir une date de fin.';
				}else if($scope.quizz.endDate && $scope.haveEndDate && $scope.quizz.endDate <= $scope.quizz.beginDate)
				{
					$scope.error='Veuillez saisir une date de fin posterieur à la date de début.';
				}
				else
				{
					var quizz = $scope.quizz;

					quizz.$update(function() {
						$scope.error='';
						$location.path('/quizzs/' + $scope.quizz._id + '/edit/question');
					}, function(errorResponse) {
						$scope.error = errorResponse.data.message;
					});
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
					$scope.quizz.endDate=null;
					$scope.buttonEndDate = 'Ajouter une date de fin';
				}
			};

			$scope.$watch('quizz',function(){
				//test si date de fin deja saisie
				if ($scope.quizz.endDate && $scope.quizz.endDate!==null) {
					$scope.haveEndDate=true;
					$scope.buttonEndDate = 'Supprimer la date de fin';
				}
			},true);

		});
	}
]);

angular.module('quizzs').controller('RateControllerUp', ['$scope', 'quizzService',
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

angular.module('quizzs').controller('DateTimePickerControllerUp', ['$scope', 'quizzService',
	function($scope, quizzService) {
		$scope.hourStep = 1;
		$scope.minuteStep = 1;

		$scope.dateOptions = {
			startingDay: 1,
			showWeeks: false
		};
	}
]);