'use strict';
//**
// REM: all of is from the "Building a SPA framework using NG course from pluralsight
// this particular section was from the module Building a Menu Component in Ng */
angular.module('ps-menu')
    .directive('psMenu', ['$timeout',
        function ($timeout) {
            return {
                templateUrl: '/modules/ps-menu/views/psMenuTemplate.html',
                restrict: 'E',
                transclude: true,
                controller: 'psMenuController',
                scope: {},
                link: function (scope, element, attrs) {
                    var item = element.find('.ps-selectable-item:first');
                    $timeout(function () {
                        //this will be called after the current digest cycle, so
                        //imm! we are going to trigger the click event on our item
                        //which will ensure that the first item in our dashboard is selected right when it starts
                        item.trigger('click');
                    });
                }
            };
        }
    ]);

