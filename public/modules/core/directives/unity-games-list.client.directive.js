'use strict';

angular.module('core').directive('unityGamesList', [
	function() {
		return {
			restrict: 'A',
			templateUrl: '/modules/core/directives/templates/unity-games.client.view.html',
		    scope: {
                event: "="
            }
        };
	}
]);
