'use strict';

angular.module('ps-menu').directive('psMenuGroup', [
    function () {
        return {
            restrict: 'E',
            require: '^psMenu',
            transclude: true,
            templateUrl: '/modules/ps-menu/views/psMenuGroupTemplate.html',
            scope: {label: '@', icon: '@'},
            link: function (scope, element, attrs, ctrl) {
                scope.isOpen = false;
                scope.closeMenu = function () {
                    scope.isOpen = false;
                };
                scope.clicked = function () {
                    scope.isOpen = !scope.isOpen;

                    if(element.parents('.ps-subitem-section').length === 0)
                        scope.setSubmenuPosition();

                    ctrl.setOpenMenuScope(scope);//@4:45 sec.'Controlling the Popup Menu'
                };
                scope.isVertical = function () {
                    //console.log("just invoked .isVertical() from menuItemDirective link func Yo! YO!");
                    return ctrl.isVertical() || element.parents('.ps-subitem-section').length > 0;
                };
                scope.setSubmenuPosition = function(){
                    var pos = element.offset();//.offset() give the 'left' and 'top' properties of the element
                    $('.ps-subitem-section').css({'left':pos.left+20, 'top':36});
                }
            }
        };
    }
]);
