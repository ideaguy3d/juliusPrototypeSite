'use strict';

angular.module('core').directive('valPrac', [
	function() {
		return {
			restrict: 'A',
			templateUrl: '/modules/core/views/validate.client.view.html'
		};
	}
]);
