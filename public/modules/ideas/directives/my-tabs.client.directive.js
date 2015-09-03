'use strict';

//route directive templates
var rTemps = '/modules/ideas/directives/templates/dirTemp-';

angular.module('ideas')
    .directive('myTabs', [function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            controller: function ($scope) {

                var panes = $scope.panes = [];

                $scope.select = function (pane) {
                    angular.forEach(panes, function (pane) {
                        /**
                        * ok, so the value of the 'panes' collection is probably going to be
                        * an obj that has a prop named 'selected'... I think...
                        * */
                        pane.selected = false;
                    });
                    pane.selected = true;
                };

                this.addPane = function (pane) {
                    if(pane.length === 0){
                        $scope.select(pane);
                    }
                    panes.push(pane);
                };
            },
            templateUrl: rTemps + 'my-tabs.html'
        };
    }])
    .directive('myPane', [function () {
        return {
            restrict: 'E',
            transclude: true,
            require: '^myTabs',
            scope: {title:'@'},
            link: function (scope, element, attrs, tabsCtrl) {
                tabsCtrl.addPane(scope);
            },
            templateUrl: rTemps + 'my-pane.html'
        }
    }]);
