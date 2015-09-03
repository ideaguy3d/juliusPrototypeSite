'use strict';

angular.module('ps-framework').controller('wwaSelectEmployeeController',
    ['$scope', 'dataService',
        function($scope, dataService) {
            $scope.isLoaded = false;
            //invoke data service
            dataService.getEmployees().then(function (data) {
                $scope.locations = data;
                $scope.isLoaded= true;
                for(var i=0; i < data.length; i++){
                    if(data[i].id == $scope.item.widgetSettings.id)
                        $scope.selectedLocation = data[i];
                }
            });
            console.log("Employee Just called dataService");
            $scope.saveSettings = function () {
                $scope.item.widgetSettings.id = $scope.selectedLocation.id;
                $scope.$parent.selectedLocation = $scope.selectedLocation;
                $scope.$close();//$close is provided by ui.bootstrap modal service
            }
        }
    ]);
