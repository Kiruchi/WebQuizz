'use strict';

angular.module('quizzs').controller('CreateQuestionsController', ['$scope', '$location','quizzService',
	function($scope, $location, quizzService) {

		//recuperation des donnée de la factory
		$scope.questions=quizzService.getQuizzQuestions();

		//initialisation des variables de la pagination
		$scope.lastPage=true;
		$scope.currentPage=$scope.questions.length+1;
		$scope.nbQuestion=$scope.questions.length;

		//variables question/reponse
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
			$scope.newAnswer={
				label:'',
				isTrue:false
			};
		};

		$scope.addQuestion = function() {
			$scope.questions.push($scope.newQuestion);
			$scope.newQuestion={
				label:'',
				answers:[]
			};
			$scope.newAnswer={
				label:'',
				isTrue:false
			};
			$scope.currentPage ++;
		};

		$scope.setPage = function (pageNo) {
			$scope.currentPage = pageNo;
		};

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

		$scope.setPage = function (pageNo) {
			$scope.currentPage = pageNo;
		};

		$scope.pageChanged = function() {
		    //$log.log('Page changed to: ' + $scope.currentPage);
		    if($scope.currentPage === $scope.numPages) 
		    {
		    	$scope.lastPage=true;
		    }
		    else 
		    {
		    	$scope.lastPage=false;
		    }
		};
	}
]);