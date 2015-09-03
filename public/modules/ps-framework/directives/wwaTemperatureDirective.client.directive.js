'use strict';

angular.module('ps-framework').directive('wwaTemperature',
    ['dataService',
        function (dataService) {
            return {
                restrict: 'E',
                templateUrl: '/modules/ps-framework/widgets/wwaTempature/wwaTemperatureTemplate.html',
                link: function (scope, element, attrs) {

                    scope.selectedLocation = null;//we do this so that gridster doesn't try to grab selectedLocation before it has been give data. Due to our ng-style expression
                    scope.isLoaded = false;
                    scope.hasError = false;

                    scope.loadLocation = function () {
                        dataService.getLocation(scope.item.widgetSettings.id)//this returns a promise because it doesn't happen right away ie. there is a delay. At least that's what I think.
                            .then(function (data) {
                                //success
                                scope.selectedLocation = data;
                                scope.isLoaded = true;
                                scope.hasError = false;
                                console.log(scope.isLoaded+" loaded, scope"+scope.hasError);
                            }, function (data) {
                                //error
                                scope.hasError = true;
                                console.log("in wwaTemperatureDir error callback >:(");
                            });
                    };

                    scope.loadLocation();
                }
            }
        }
    ]
);
