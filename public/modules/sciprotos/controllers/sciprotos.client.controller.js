'use strict';

// Sciprotos controller
angular.module('sciprotos').controller('SciprotosController',
    ['$state','$scope', '$stateParams', '$location', 'Authentication', 'Sciprotos',
    function ($state, $scope, $stateParams, $location, Authentication, Sciprotos) {
        $scope.authentication = Authentication;

        var vm = this;
        vm.notesCollapsed = true;
        vm.navigate = navigate;
        //vm.activate = activate;

        function navigate(){
            $state.go('leagues');
        }

        $scope.activate = function (){
            console.log("you clicked me (: ");
            console.log("current data BE "+$state.current.data.prop1);
        };


        /**
         * ------------------- boilerplate frontend crud methods -------------------
         * */

        // Create new Sciproto
        $scope.create = function () {
            // Create new Sciproto object
            var sciproto = new Sciprotos({
                name: this.name
            });

            // Redirect after save
            sciproto.$save(function (response) {
                $location.path('sciprotos/' + response._id);

                // Clear form fields
                $scope.name = '';
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Sciproto
        $scope.remove = function (sciproto) {
            if (sciproto) {
                sciproto.$remove();

                for (var i in $scope.sciprotos) {
                    if ($scope.sciprotos [i] === sciproto) {
                        $scope.sciprotos.splice(i, 1);
                    }
                }
            } else {
                $scope.sciproto.$remove(function () {
                    $location.path('sciprotos');
                });
            }
        };

        // Update existing Sciproto
        $scope.update = function () {
            var sciproto = $scope.sciproto;

            sciproto.$update(function () {
                $location.path('sciprotos/' + sciproto._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Sciprotos
        $scope.find = function () {
            $scope.sciprotos = Sciprotos.query();
        };

        // Find existing Sciproto
        $scope.findOne = function () {
            $scope.sciproto = Sciprotos.get({
                sciprotoId: $stateParams.sciprotoId
            });
        };
    }
]);