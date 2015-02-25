'use strict';

angular.module('quizzs').factory('quizzService', [
	function() {
		// Quizzservice service logic
		var service = {
			quizz :{
				'infos': {rate : 3},
				'questions': []
			},

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