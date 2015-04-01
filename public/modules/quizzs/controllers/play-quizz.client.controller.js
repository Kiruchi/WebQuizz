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
			$scope.questions=[
			{
				idQuestion:0,
				reponses:[]
			}
			];

			for(var i in $scope.quizz.questions )
			{
				$scope.questions[i]={
					idQuestion:$scope.quizz.questions[i]._id,
					reponses:[]
				};

				for (var j in $scope.quizz.questions[i].answers) 
				{
					$scope.questions[i].reponses[j] = false ;
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

				/*var resultat = new Resultat({
					idQuizz:$scope.quizz._id,
					reponses:$scope.reponses
				});
				resultat.$save(function(response) {
					$location.path('/quizzs/resultat/' + response._id);

				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});*/
			};


		});
}
]);