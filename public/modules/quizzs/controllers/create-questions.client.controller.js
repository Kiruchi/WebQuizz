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
			isCorrect:false
		};

		//Variables pagination
		$scope.maxSize = 5;
		$scope.TotalItems = 50;
		$scope.currentPage = 1;
		$scope.items_per_page = 1;

		$scope.verificationQuestions = function(){
			for(var idQ in $scope.questions)
			{
				var c = false;
				if($scope.questions[idQ].label==='')
				{
					return 'La question n°'+idQ+' n\'a pas d\'énoncé';
				}
				for(var idA in $scope.questions[idQ].answers)
				{
					if($scope.questions[idQ].answers[idA].label==='')
					{
						return 'La proposition '+idA+' de la question n°'+idQ+' n\'a pas d\'énoncé';
					}
					if($scope.questions[idQ].answers[idA].isCorrect===true)
					{
						c=true;
					}
				}
				if(!c)
				{
					return 'La question n°'+idQ+' n\'a pas de reponse correct';
				}
			}
			return '';
		};

		$scope.createQuestions = function(){
			if($scope.nbQuestion===0)
			{
				$scope.error='Veuillez entrer une question.';
			}
			else
			{
				$scope.error=$scope.verificationQuestions();
				if($scope.error==='')
				{
					$location.path('/quizzs/create/validate');
				}
			}
		};

		$scope.removeQuestion = function(index){
			$scope.questions.splice(index,1);
		};

		$scope.removeAnswer = function(index){
			$scope.newQuestion.answers.splice(index,1);
		};

		$scope.removeAnswerBis = function(index){
			$scope.questions[$scope.currentPage-1].answers.splice(index,1);
		};

		$scope.addAnswer = function() {
			if(!$scope.newAnswer.label)
			{
				$scope.error='Veuillez saisir la proposition.';
			}
			else
			{
				$scope.newQuestion.answers.push($scope.newAnswer);
				$scope.newAnswer={
					label:'',
					isCorrect:false
				};
				$scope.error='';
			}
		};

		$scope.addAnswerBis = function() {
			if(!$scope.newAnswer.label)
			{
				$scope.error='Veuillez saisir la proposition.';
			}
			else
			{
				$scope.questions[$scope.currentPage-1].answers.push($scope.newAnswer);
				$scope.newAnswer={
					label:'',
					isCorrect:false
				};
				$scope.error='';
			}
		};

		$scope.addQuestion = function() {
			$scope.haveGood=false;
			for(var id in $scope.newQuestion.answers)
			{
				if($scope.newQuestion.answers[id].isCorrect)
				{
					$scope.haveGood=true;
				}
			}
			if(!$scope.newQuestion.label)
			{
				$scope.error='Veuillez saisir l\'énoncé de la question.';
			}
			else if(!$scope.haveGood)
			{
				$scope.error='Veuillez cochez une réponse correct.';
			}
			else
			{
				$scope.questions.push($scope.newQuestion);
				$scope.newQuestion={
					label:'',
					answers:[]
				};
				$scope.newAnswer={
					label:'',
					isCorrect:false
				};
				$scope.currentPage ++;
				$scope.error='';
			}
			
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