'use strict';

// Configuring the Articles module
angular.module('sciprotos').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Sciprotos', 'sciprotos', 'dropdown', '/sciprotos(/create)?');
		Menus.addSubMenuItem('topbar', 'sciprotos', 'List Sciprotos', 'sciprotos');
		Menus.addSubMenuItem('topbar', 'sciprotos', 'New Sciproto', 'sciprotos/create');
	}
]);