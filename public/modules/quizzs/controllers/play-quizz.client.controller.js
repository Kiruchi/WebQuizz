'use strict';

angular.module('quizzs').controller('PlayQuizzController', ['$scope', '$stateParams', '$location', 'Authentication', 'Quizzs', 'quizzService',
	function($scope, $stateParams, $location, Authentication, Quizzs, quizzService) {
		$scope.authentication = Authentication;

		$scope.leQuizz.$promise.then(function(data) 
		{
			$scope.quizz = data;
			$scope.fin = false;
			$scope.debut = true;

			$scope.actualQuestion = 0;
			$scope.score = 0;
			$scope.questions=[
			{
				id_question:0,
				reponse:[],
				valider:false
			}
			];

			for(var i = 0; i < $scope.quizz.questions.length; i++ )
			{
				$scope.questions[i]={
					id_question:i,
					reponse:[],
					valider:false
				};

				for (var j = 0; j < $scope.quizz.questions[i].answers.length; j++) 
				{
					$scope.questions[i].reponse[j] = false ;
				}
			}

			//gestion des évenements de la page

			window.onbeforeunload = function (event) {
				event.returnValue = 'ATTENTION !!!! Vous allez perdre les réponses de ce quizz si vous ne les validez pas';
			};


			$scope.$on('$locationChangeStart', function(event, next, current) {
				if(!confirm('ATTENTION !!!! Vous allez perdre les réponses de ce quiz si vous ne les validez pas \n\n Voulez-vous vraiment quitter cette page ?')) {
					event.preventDefault();
				}
			});

			$scope.nextQuestion = function() {

				$scope.debut = false;

				if ($scope.actualQuestion+1 < $scope.quizz.questions.length) 
				{
					var correct = true;
					for(var i=0 ; i < $scope.quizz.questions[$scope.actualQuestion].answers.length; i++)
					{			
						if ($scope.quizz.questions[$scope.actualQuestion].answers[i].isCorrect !== $scope.questions[$scope.actualQuestion].reponse[i]) 
						{
							correct = false;
							$scope.questions[$scope.actualQuestion].valider = false;
						}
					}

					if (!$scope.questions[$scope.actualQuestion].valider) 
					{
						if (correct) 
						{
							$scope.questions[$scope.actualQuestion].valider = true;
						}
					}
					$scope.fin = false;
					$scope.actualQuestion ++;
				}

				if ($scope.actualQuestion+1 === $scope.quizz.questions.length) 
				{
					$scope.fin =true;
				}
			};

			$scope.previousQuestion = function() {

				$scope.fin = false;

				if ($scope.actualQuestion !== 0) 
				{
					$scope.actualQuestion --;
				}
				
				if($scope.actualQuestion === 0)
				{
					$scope.debut = true;
				}
			};
		});
}
]);