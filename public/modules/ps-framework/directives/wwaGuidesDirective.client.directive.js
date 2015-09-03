'use strict';

angular.module('ps-framework').directive('wwaGuides', [
	function() {
		return {
			template: '<div><h1>Guides Directive man</h1></div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
			}
		};
	}
]);
