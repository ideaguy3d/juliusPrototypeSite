'use strict';

//Setting up route
angular.module('ps-framework').config(['$stateProvider',
    function ($stateProvider) {
        // Ps framework state routing
        $stateProvider.
            state('psframework', {
                url: '/psframework',
                templateUrl: 'modules/ps-framework/views/frameworkindex.client.view.html'
            }).
            state('jframework', {
                url: '/jframework',
                templateUrl: 'modules/ps-framework/views/dirTemp-psFramework.html'
            }
        );


        //this is all custom code I did from following along the pluralsight course !! This
        //is how we handle our gridster widget routing to the correct custom directives templates
        var routes = [
            {
                name: 'dashboard',
                config: {
                    url:'/dashboard',
                    template: '<wwa-dashboard></wwa-dashboard>'
                }
            },
            {
                name: 'locations',
                config: {
                    url: '/locations',
                    template: '<wwa-location></wwa-location>'
                }
            },
            {
                name: 'guides',
                config: {
                    url: '/guides',
                    template: '<wwa-guides></wwa-guides>'
                }
            }
        ];
        routes.forEach(function (route) {
            $stateProvider.state(route.name, route.config);
        });

    }
]);
