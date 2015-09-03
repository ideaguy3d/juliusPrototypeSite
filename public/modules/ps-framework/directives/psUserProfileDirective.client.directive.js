'use strict';

angular.module('ps-framework').directive('psUserProfile', [
	function() {
		return {
			templateUrl: '/modules/ps-framework/views/psUserTemplateProfile.html',
			restrict: 'E'
		};
	}
]);
