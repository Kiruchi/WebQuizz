'use strict';

angular.module('quizzs').factory('quizzService', ['Quizzs',
	function(Quizzs) {
		// Quizzservice service logic
		var service = {
			quizz : new Quizzs({
				'infos': {
					rate : 3,
					endDate : null
				},
				'questions': []
			}),

			getQuizzInfo : function(){
				return service.quizz.infos;
			},

			getQuizzQuestions : function(){
				return service.quizz.questions;
			},

			getQuizz : function(){
				return service.quizz;
			}

		};

		// Public API
		return service;
	}
	]);