'use strict';

angular.module('ps-framework').controller('psFrameworkController',
    ['$rootScope','$timeout','$window','$scope', '$location',
    function ($rootScope,$timeout,$window,$scope,$location) {

		$scope.isMenuButtonVisible = true;
        $scope.isMenuVisible = true;
        $scope.isMenuVertical = true;

        //we are listening to the $broadcast method attached to the $rootScope
        //in the psMenu.client.controller.js file
        $scope.$on('ps-menu-item-selected-event', function (event, data) {
            $scope.routeString = data.route;
            $location.path(data.route);
            checkWidth();
            broadcastMenuState();
        });

        $scope.$on('ps-menu-orientation-changed-event', function (event, data) {
            $scope.isMenuVertical = data.isMenuVertical;
            //we add this to fix the issue with the widgets' edge going slightly off screen when resizing
            //and we have to call $timeout because while we're in this event we're already in the middle
            //of a digest cycle so we can't do another apply. Ergo it has to happen after the current cycle finishes
            $timeout(function () {
                $($window).trigger('resize');
            }, 0)
        });

        //wrap $window as a jQuery obj, the 'resize' event gets fired when a phone/tablet is
        //rotated, or when a browser window is resized. And add to the 'resize' event
        //a namespace called psFramework
        $($window).on('resize.psFramework', function () {
            //now we call $scope.$apply to let ng know that our scope val has changed since we are in jQuery
            $scope.$apply(function () {
                checkWidth();//this will set up the proper flags on our scope for the widths
                broadcastMenuState();//we'll broadcast the menu state to the menu and that should make it disappear
            });
        });

        $scope.$on('$destroy', function () {
            //that way we don't interfere with anything that might be on the resize event on the window
            $($window).off('resize.psFramework');
        });

        var checkWidth = function () {
            var width = Math.max($($window).width(), $($window).innerWidth());//innerWidth() is a jQuery func
            $scope.isMenuVisible = (width > 768); //about the width of a tablet
            $scope.isMenuButtonVisible = !$scope.isMenuVisible;
        };

        $scope.menuButtonClicked = function () {
            $scope.isMenuVisible = !$scope.isMenuVisible;

            //can't wrap this is $scope.$apply because broadcast does its' own apply
            broadcastMenuState();
            $scope.$apply();//this wil pick up any changes to $scope and make sure they become visible on screen
            //we end up commenting out this $apply in the fixing widget button
        };

        var broadcastMenuState = function() {
            $rootScope.$broadcast('ps-menu-show',
                {                           //to let any listener know whether the menu is displayed vertically or not, based upon settings in the framework
                    show: $scope.isMenuVisible,
                    isVertical: $scope.isMenuVertical,
                    //this will let the ps framework control know whether or not the menu can be shown horiz or vert
                    allowHorizontalToggle: !$scope.isMenuButtonVisible //the menu button is NOT visible.. I think
                });
        };

        $timeout(function () {
            checkWidth();
        }, 0); //call imm! after the digest cycle
    }
]);
