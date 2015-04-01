'use strict';

angular.module('quizzs').controller('UpdateQuestionsController', ['$scope', '$location',
	function($scope, $location) {
		
		$scope.leQuizz.$promise.then(function(data) {
			$scope.quizz = data;
			
			//initialisation des variables de la pagination
			$scope.lastPage = true;
			$scope.currentPage = 1;
			$scope.nbQuestion = $scope.quizz.questions.length;

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
				for(var idQ in $scope.quizz.questions)
				{
					var c = false;
					if($scope.quizz.questions[idQ].label==='')
					{
						return 'La question n°'+idQ+' n\'a pas d\'énoncé';
					}
					for(var idA in $scope.quizz.questions[idQ].answers)
					{
						if($scope.quizz.questions[idQ].answers[idA].label==='')
						{
							return 'La proposition '+idA+' de la question n°'+idQ+' n\'a pas d\'énoncé';
						}
						if($scope.quizz.questions[idQ].answers[idA].isCorrect===true)
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

			$scope.updateQuestions = function(){
				if($scope.nbQuestion===0)
				{
					$scope.error='Veuillez entrer une question.';
				}
				else
				{
					$scope.error=$scope.verificationQuestions();
					if($scope.error==='')
					{
						var quizz = $scope.quizz;

						quizz.$update(function() {
							$scope.error='';
							$location.path('/quizzs/' + $scope.quizz._id + '/edit/validate');
						}, function(errorResponse) {
							$scope.error = errorResponse.data.message;
						});
					}
				}
			};

			$scope.removeQuestion = function(index){
				$scope.quizz.questions.splice(index,1);
			};

			$scope.removeAnswer = function(index){
				$scope.newQuestion.answers.splice(index,1);
			};
			$scope.removeAnswerBis = function(index){
				$scope.quizz.questions[$scope.currentPage-1].answers.splice(index,1);
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
					$scope.quizz.questions[$scope.currentPage-1].answers.push($scope.newAnswer);
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
					$scope.quizz.questions.push($scope.newQuestion);
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

			$scope.$watch('quizz.questions',function(){
				$scope.nbQuestion=$scope.quizz.questions.length;
				
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
	});
}
]);