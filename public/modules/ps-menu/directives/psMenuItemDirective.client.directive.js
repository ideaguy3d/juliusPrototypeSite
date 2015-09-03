'use strict';

angular.module('ps-menu').directive('psMenuItem', [
    function () {
        return {
            restrict: 'E',
            require: '^psMenu',
            transclude: true,
            templateUrl: '/modules/ps-menu/views/psMenuItemTemplate.html',
            scope: {
                label: '@',
                icon: '@',
                route: '@'
            },
            link: function (scope, element, attrs, ctrl) {

                scope.isActive = function () {
                    //console.log(element === ctrl.getActiveElement());
                    return element === ctrl.getActiveElement();
                };

                scope.isVertical = function () {
                    //console.log("just invoked .isVertical() from menuItemDirective link func Yo! YO!");
                    return ctrl.isVertical() || element.parents('.ps-subitem-section').length > 0;
                };

                element.on('click', function (event) {
                    event.stopPropagation();
                    event.preventDefault();
                    //we have to use .$apply() to let ng know something is
                    //happening to our scope. Most of this was in Mod2 sec."Menu Item Selection"
                    scope.$apply(function () {//this wasn't working at first because I had passed in 'element' to this func
                        ctrl.setActiveElement(element);
                        ctrl.setRoute(scope.route);
                    })
                });
            }
        };
    }
]);
