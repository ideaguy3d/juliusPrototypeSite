'use strict';

angular.module('ps-framework').directive('psFramework', [
    function () {
        return {
            controller: 'psFrameworkController',
            restrict: 'E',
            transclude: true,
            scope: {
                title: '@',
                subtitle: '@',
                iconFile: '@'
            },
            link: function(scope, element, attrs) {

                //element.text('element.text is writing this !');
            },
            templateUrl: '/modules/ps-framework/views/psFrameworkTemplate.html'
        };
    }
]);
