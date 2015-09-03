'use strict';

angular.module('ps-framework').directive('psUserProfileSmall', [
	function() {
		return {
			templateUrl: '/modules/ps-framework/views/psUserProfileSmallTemplate.html',
			restrict: 'E'
		};
	}
]);
