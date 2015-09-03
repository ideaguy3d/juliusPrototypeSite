'use strict';

//this is the core controller i.e. the landing page ctrl
angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
        $scope.jmessage = "... YO... Like omg! I'm up in the scope. whaaaa??? Lol"

        $scope.validatePassword = function (value) {
            return value === $scope.password; //'password' is only defined in our html
        };
	}//END OF our array function controller
]);
