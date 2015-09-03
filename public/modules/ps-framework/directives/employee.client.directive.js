'use strict';

angular.module('ps-framework').directive('wwaEmployee', ['dataService',
    function (dataService) {
        return {
            restrict: 'E',
            templateUrl: '/modules/ps-framework/widgets/wwaEmployees/wwaEmployeesTemplate.html',
            link: function (scope, element, attrs) {
				dataService.getEmployee(scope.item.widgetSettings.id)
                    .then(function (data) {
                        scope.selectedEmployee = data;
                    });
            }
        };
    }
]);
