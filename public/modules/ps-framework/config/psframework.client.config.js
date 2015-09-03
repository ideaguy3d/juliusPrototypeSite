'use strict';

// Ps framework module config
angular.module('ps-framework').run(['Menus',
	function(Menus) {
		Menus.addMenuItem('topbar', 'Admin', 'item', '/psframework');
	}
]);
