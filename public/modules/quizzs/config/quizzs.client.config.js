'use strict';

// Configuring the Quizzs module
angular.module('quizzs').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Quizzs', 'quizzs', 'dropdown', '/quizzs(/create)?');
		Menus.addSubMenuItem('topbar', 'quizzs', 'Liste des quizzs', 'quizzs');
		Menus.addSubMenuItem('topbar', 'quizzs', 'Nouveau quizz', 'quizzs/create');
	}
]);