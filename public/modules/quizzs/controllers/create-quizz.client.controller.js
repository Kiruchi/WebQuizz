'use strict';

angular.module('quizzs').controller('CreateQuizzController', ['$scope',
	function($scope) {

		$scope.questions=[];

		$scope.step1 = true;
		$scope.step2 = false;
		$scope.step3 = false;

		$scope.lastPage = true;

		$scope.maxSize = 5;
		$scope.TotalItems = 50;
		$scope.currentPage = 1;
		$scope.items_per_page = 1;

		$scope.answers=[];

		$scope.$watch('questions',function(){
			$scope.nbQuestion=$scope.questions.length;

			if($scope.currentPage === $scope.nbQuestion+1)
			{
				$scope.lastPage=true;
			}
			else
			{
				$scope.lastPage=false;
			}

		},true);

		$scope.removeQuestion = function(index){
			$scope.questions.splice(index,1);		

		};

		$scope.nextStep = function () {
			
			if($scope.step1){
				$scope.step1=false;
				$scope.step2=true;
			}
			else{
				$scope.step2=false;
				$scope.step3=true;
			}
		};

		$scope.previewStep = function () {
			
			if($scope.step2){
				$scope.step2=false;
				$scope.step1=true;
			}
			else{
				$scope.step3=false;
				$scope.step2=true;
			}
		};

		$scope.removeAnswer = function(index){
			$scope.answers.splice(index,1);
		};

		$scope.removeAnswerEdit = function(index){
			$scope.questions[$scope.currentPage-1].propositions.splice(index,1);
		};

		$scope.addAnswer = function() {
			$scope.answers.push({
				answer: $scope.newAnswer
			});
			$scope.newAnswer='';
		};

		$scope.addQuestion = function() {
			$scope.questions.push({
				title: $scope.newQuestion,
				answer: $scope.newGoodAnswer,
				propositions: $scope.answers
			});
			$scope.newQuestion='';
			$scope.newGoodAnswer='';
			$scope.newAnswer='';
			$scope.answers=[];
			$scope.currentPage ++;
		};

		$scope.setPage = function (pageNo) {
			$scope.currentPage = pageNo;
		};

		$scope.pageChanged = function() {
	    //$log.log('Page changed to: ' + $scope.currentPage);
	    if($scope.currentPage === $scope.numPages) {
	    	$scope.lastPage=true;
	    }
	    else {
	    	$scope.lastPage=false;
	    }

	    $scope.dateTimeNow = function() {
	    	$scope.date = new Date();
	    };

	    $scope.dateTimeNow();

	    $scope.toggleMinDate = function() {
	    	$scope.minDate = $scope.minDate ? null : new Date();
	    };

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
	};
}
]);

