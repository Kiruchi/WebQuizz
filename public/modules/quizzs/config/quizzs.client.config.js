'use strict';

// Configuring the Quizzs module
angular.module('quizzs').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Quizzs', 'quizzs', 'dropdown', '/quizzs(/create)?');
		Menus.addSubMenuItem('topbar', 'quizzs', 'List Quizzs', 'quizzs');
		Menus.addSubMenuItem('topbar', 'quizzs', 'New Quizz', 'quizzs/create');
	}
]);