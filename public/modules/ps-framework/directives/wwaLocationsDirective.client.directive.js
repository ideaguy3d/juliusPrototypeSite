'use strict';

angular.module('ps-framework').directive('wwaLocation', [
	function() {
		return {
			template: '<div>And this is Locations Directive yo yo yo!!!</div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// Wwa3 directive logic
				// ...

				//element.text('this is the wwa3 directive');
			}
		};
	}
]);
