'use strict';

angular.module('quizzs').controller('CreateQuestionsController', ['$scope', '$location','quizzService',
	function($scope, $location, quizzService) {

		$scope.questions=quizzService.getQuizzQuestions();

		$scope.lastPage=true;
		$scope.currentPage=$scope.questions.length+1;
		$scope.nbQuestion=$scope.questions.length;
		$scope.newQuestion={
			label:'',
			answers:[]
		};
		$scope.newAnswer={
			label:'',
			isTrue:false
		};

		//Variables pagination

		$scope.maxSize = 5;
		$scope.TotalItems = 50;
		$scope.currentPage = 1;
		$scope.items_per_page = 1;

		console.log($scope.lastPage);

		$scope.createQuestions = function(){
			$location.path('/quizzs/create/validate');
		};

		$scope.removeQuestion = function(index){
			$scope.questions.splice(index,1);		

		};

		$scope.removeAnswer = function(index){
			$scope.newQuestion.answers.splice(index,1);
		};

		$scope.removeAnswerEdit = function(index){
			$scope.questions[$scope.currentPage-1].answers.splice(index,1);
		};

		$scope.addAnswer = function() {
			$scope.newQuestion.answers.push($scope.newAnswer);
			$scope.newAnswer={};
		};

		$scope.addQuestion = function() {
			$scope.questions.push($scope.newQuestion);
			$scope.newQuestion=[];
			$scope.newAnswer={};
			$scope.currentPage ++;
		};

		$scope.setPage = function (pageNo) {
			$scope.currentPage = pageNo;
		};

		$scope.$watch('questions',function(){
			$scope.nbQuestion=$scope.questions.length;

			console.log($scope.currentPage);
			console.log($scope.numPages);

			if($scope.currentPage === $scope.numPages)
			{
				$scope.lastPage=true;
				console.log('bon');
			}
			else
			{
				$scope.lastPage=false;
				console.log('faux');
			}

		},true);

		$scope.setPage = function (pageNo) {
			$scope.currentPage = pageNo;
		};

		$scope.pageChanged = function() {
		    //$log.log('Page changed to: ' + $scope.currentPage);
		    console.log($scope.currentPage);
			console.log($scope.numPages);
		    if($scope.currentPage === $scope.numPages) {
		    	$scope.lastPage=true;
		    	console.log('bon');
		    }
		    else {
		    	$scope.lastPage=false;
		    	console.log('faux');
		    }
		};
	}
]);