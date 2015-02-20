'use strict';

angular.module('quizzs').factory('quizzService', [
	function() {
		// Quizzservice service logic
		var service = {
			quizz :{
				'infos': {
					'name': 'Contreras Stevenson',
					'course': 'General',
					'rate': 3,
					'typeQuizz': 'MotsCroises',
					'description': 'Minim mollit esse ea dolore cupidatat minim commodo ut dolor velit. Ut qui aliqua laborum proident dolor. Laborum eiusmod reprehenderit sunt aliqua Lorem ullamco cupidatat eu eu ipsum. Id ullamco sint enim sunt magna mollit laborum ut eiusmod ut esse.\r\n'
				},
				'questions': [
				{
					'label': 'qui excepteur elit minim tempor ?',
					'answers': [
					{
						'label': 'ullamco sunt laborum amet est',
						'isCorrect': false
					},
					{
						'label': 'ipsum nostrud qui est excepteur',
						'isCorrect': false
					},
					{
						'label': 'adipisicing adipisicing exercitation sint fugiat',
						'isCorrect': true
					}
					]
				},
				{
					'label': 'tempor occaecat excepteur veniam et ?',
					'answers': [
					{
						'label': 'ullamco do proident fugiat do',
						'isCorrect': true
					},
					{
						'label': 'pariatur est eiusmod reprehenderit ea',
						'isCorrect': false
					},
					{
						'label': 'in culpa cupidatat fugiat dolore',
						'isCorrect': true
					}
					]
				}
				]
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