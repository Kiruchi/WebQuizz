'use strict';

angular.module('quizzs').controller('PlayQuizzController', ['$scope', '$stateParams', '$location', 'Authentication', 'Quizzs', 'Resultats', 'quizzService',
	function($scope, $stateParams, $location, Authentication, Quizzs, Resultats, quizzService) {
		$scope.authentication = Authentication;

		$scope.leQuizz.$promise.then(function(data) 
		{
			$scope.quizz = data;
			$scope.fin = false;
			$scope.debut = true;

			$scope.actualQuestion = 0;
			$scope.questions=[
			{
				question:0,
				reponse:[]
			}
			];

			for(var i in $scope.quizz.questions )
			{
				$scope.questions[i]={
					question:$scope.quizz.questions[i]._id,
					reponse:[]
				};

				for (var j in $scope.quizz.questions[i].answers) 
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
					
					$scope.fin = false;
					$scope.actualQuestion ++;
				}

				if ($scope.actualQuestion+1 === $scope.quizz.questions.length) 
				{
					$scope.fin = true;
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

			$scope.terminerQuizz =function() {

				var reponseCorrect =0;
				for (var i in $scope.quizz.questions) 
				{
					var correct=true;

					for(var j in $scope.quizz.questions[i].answers)
					{
						if($scope.quizz.questions[i].answers[j].isCorrect !== $scope.questions[i].reponse[j])
						{
							correct = false;
						}
					}

					if(correct)
					{
						reponseCorrect++;
					}
				}
				var ratio = (reponseCorrect/$scope.questions.length)*100;
				console.log(ratio);

				var resultat = new Resultats({
					quizz:$scope.quizz._id,
					pourcentage:ratio,
					reponses:$scope.questions
				});
				resultat.$save(function(response) {
					$location.path('/resultats/' + response._id);

				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});
			};


		});
}
]);