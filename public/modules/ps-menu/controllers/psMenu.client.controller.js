'use strict';

angular.module('ps-menu').controller('psMenuController', ['$rootScope', '$scope',
    function ($rootScope, $scope) {

        $scope.showMenu = true;
        $scope.openMenuScope = null;
        $scope.isVertical = true;
        $scope.allowHorizontalToggle = true;

        //now I'm a little curious as to why we have to use 'this' keyword ?!? :/
        //this controller or this instance of the controller... ?
        this.getActiveElement = function () {
            return $scope.activeElement;
        };
        this.setActiveElement = function (element) {
            //this way we can keep track of which element is active, and only 1 element can be active at a time.
            $scope.activeElement = element;
            // console.log("activeElement = "+element);
        };
        this.isVertical = function () {
            return $scope.isVertical;
        };
        this.setRoute = function (route) {
            $rootScope.$broadcast('ps-menu-item-selected-event', {route: route});
        };
        this.setOpenMenuScope = function (scope) {
            $scope.openMenuScope = scope;
        };
        $scope.toggleMenuOrientation = function () {

            if($scope.openMenuScope){
                $scope.openMenuScope.closeMenu();
            }

            $scope.isVertical = !$scope.isVertical;
            $rootScope.$broadcast('ps-menu-orientation-changed-event',
                {isMenuVertical: $scope.isVertical});
        };

        //we need to look for a click event in the entire document which is why we grab jQuery's document
        //then we're going to bind it to the click event, and we're passing the event, e, into the func
        angular.element(document).bind('click', function(e){
            if($scope.openMenuScope && !$scope.isVertical){
                //look at the target of the event, see if its' parent has .ps-selectable-item, if so we're
                //actually clicking in the pop up so return
                if($(e.target).parent().hasClass('ps-selectable-item')) return;//go ahead and propagate here

                //but if we're not clicking in the popup, then close the menu
                $scope.$apply(function () {
                    $scope.openMenuScope.closeMenu();
                });//it's very important to wrap any scope modification in $apply only when we're working in jQuery
                //we are calling jQuery's .bind() on a jQuery obj, document.

                e.preventDefault();//make sure the click doesn't get passed to the open space outside of the popup menu we clicked on
                e.stopPropagation();
            }
            //if the if fails go ahead and propagate

        });

        $scope.$on('ps-menu-show', function (event, data) {
            //the psFramework ctrl broadcasts this.
            $scope.showMenu = data.show; //.show is the name of the prop in the obj we pass in from the psFramework ctrl
            $scope.isVertical = data.isVertical;
            $scope.allowHorizontalToggle = data.allowHorizontalToggle;
        });

    }
]);
