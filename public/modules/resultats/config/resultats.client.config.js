'use strict';

// Configuring the Articles module
angular.module('resultats').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Résultats', 'resultats', 'dropdown', '/resultats(/create)?');
		Menus.addSubMenuItem('topbar', 'resultats', 'Liste des résultats', 'resultats');
	}
]);