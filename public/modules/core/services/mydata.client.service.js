'use strict';

angular.module('core').factory('Mydata', ['$resource',
	function($resource) {
		// Mydata service logic
		// ...

		// Public API
		return $resource('core/:coreId', {coreId: '@coreId'},
            {update: {method: 'PUT'}} );
	}
]);
