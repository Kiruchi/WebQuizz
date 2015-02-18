'use strict';

// Le controlleur ajoute/modifie/supprime dans le scope et redirige vers une page si necessaire
angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
	function($scope, $stateParams, $location, Authentication, Articles) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			// Creation d'un article contenant les champs du formulaire desires
			// On se sert du endpoint REST, Articles est defini dans le service articles.client.service.js
			var article = new Articles({
				title: this.title,
				content: this.content
			});
			article.$save(function(response) {
				// Redirection
				$location.path('articles/' + response._id);

				// Clean du scope pour un eventuel nouvel ajout
				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};


		// Renvoi de tous les articles
		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		// Renvoi d'un article passe en parametre
		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
		};
	}
]);