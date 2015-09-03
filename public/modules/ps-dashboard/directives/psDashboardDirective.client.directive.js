'use strict';

angular.module('ps-dashboard').directive('psDashboard', [
    function () {
        return {
            restrict: 'E',
            templateUrl: '/modules/ps-dashboard/views/psDashboardTemplate.html',
		    link: function (scope, element, attrs) {
                scope.addNewWidget = function (widget) {
                    var newWidget = angular.copy(widget.settings);
                    scope.widgets.push(newWidget);
                }
            }
        };
    }
]);
