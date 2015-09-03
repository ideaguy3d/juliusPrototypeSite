'use strict';

//Setting up route
angular.module('sciprotos').config(['$stateProvider',
    function($stateProvider) {
        // Sciprotos state routing
        $stateProvider.
            state('listSciprotos', {
                url: '/sciprotos',
                templateUrl: 'modules/sciprotos/views/list-sciprotos.client.view.html',
                data: {
                    prop1: 'foo',
                    prop2: 'bar'
                }
            }).
            state('createSciproto', {
                url: '/sciprotos/create',
                templateUrl: 'modules/sciprotos/views/create-sciproto.client.view.html'
            }).
            state('viewSciproto', {
                url: '/sciprotos/:sciprotoId',
                templateUrl: 'modules/sciprotos/views/view-sciproto.client.view.html'
            }).
            state('editSciproto', {
                url: '/sciprotos/:sciprotoId/edit',
                templateUrl: 'modules/sciprotos/views/edit-sciproto.client.view.html'
            });
    }
]);


/**
 * boilerplate $stateProvider code:
 *
 * angular.module('sciprotos').config(['$stateProvider',
 function($stateProvider) {
		// Sciprotos state routing
		$stateProvider.
		state('listSciprotos', {
			url: '/sciprotos',
			templateUrl: 'modules/sciprotos/views/list-sciprotos.client.view.html'
		}).
		state('createSciproto', {
			url: '/sciprotos/create',
			templateUrl: 'modules/sciprotos/views/create-sciproto.client.view.html'
		}).
		state('viewSciproto', {
			url: '/sciprotos/:sciprotoId',
			templateUrl: 'modules/sciprotos/views/view-sciproto.client.view.html'
		}).
		state('editSciproto', {
			url: '/sciprotos/:sciprotoId/edit',
			templateUrl: 'modules/sciprotos/views/edit-sciproto.client.view.html'
		});
	}
 ]);
 * */