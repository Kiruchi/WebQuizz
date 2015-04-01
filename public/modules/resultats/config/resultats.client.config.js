'use strict';

// Configuring the Articles module
angular.module('resultats').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Resultats', 'resultats', 'dropdown', '/resultats(/create)?');
		Menus.addSubMenuItem('topbar', 'resultats', 'List Resultats', 'resultats');
		Menus.addSubMenuItem('topbar', 'resultats', 'New Resultat', 'resultats/create');
	}
]);