'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName,
    ApplicationConfiguration.applicationModuleVendorDependencies)
    .controller('appControllerJ', ['$scope', function ($scope) {
        //this is what controls the ng-switch directive in the servers' view
        $scope.state='unauthorized';
        $scope.signIn = function () {
            $scope.state = 'authorized';
        }
    }]);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(
    ['$provide', '$locationProvider',
        function ($provide, $locationProvider) {

            $locationProvider.hashPrefix('!');//boilerplate

            //this $provide.decorator was coded following along the ps ng spa framework course.
            //i'm not sure what it does though... I'll have to read the docs
            $provide.decorator("$exceptionHandler", ['$delegate', function ($delegate) {
                return function (exception, cause) {
                    $delegate(exception, cause);
                };
            }]);
        }
    ]);

//Then define the init function for starting up the application,
angular.element(document).ready(function () {
    //Fixing facebook bug with redirect
    if (window.location.hash === '#_=_') window.location.hash = '#!';

    //Then init the app
    angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});

function onGoogleReady() {
    console.log("Google just called me (: ");
    //alert("Google just called me (: ");
}





/**
 * now just in case I break something I can't fix that affects my spa framework course
 * routeProvider course, here is the orig code to copy and paste back in... or to ref
 * later...
 *
 * angular.module(ApplicationConfiguration.applicationModuleName).config(
 ['$provide', '$locationProvider', '$routeProvider',
 function ($provide, $locationProvider, $routeProvider) {

            $locationProvider.hashPrefix('!');//boilerplate

            //this $provide.decorator was coded following along the ps ng spa framework course.
            //i'm not sure what it does though... I'll have to read the docs
            $provide.decorator("$exceptionHandler", ['$delegate', function ($delegate) {
                return function (exception, cause) {
                    $delegate(exception, cause);
                };
            }]);

            //this is all custom code I did from following along the pluralsight course !! This
            //is how we handle our gridster widget routing to the correct custom directives templates
            var routes = [
                {
                    url: '/dashboard',
                    config: {
                        template: '<wwa-dashboard></wwa-dashboard>'
                    }
                },
                {
                    url: '/locations',
                    config: {
                        template: '<wwa-location></wwa-location>'
                    }
                },
                {
                    url: '/guides',
                    config: {
                        template: '<wwa-guides></wwa-guides>'
                    }
                }
            ];
            routes.forEach(function (route) {
                $routeProvider.when(route.url, route.config);
            });
        }
 ]);
 *
 * */




