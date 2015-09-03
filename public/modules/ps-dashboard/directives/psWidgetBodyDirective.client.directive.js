'use strict';

angular.module('ps-dashboard').directive('psWidgetBody',
    ['$compile', '$modal',
    function ($compile, $modal) {
        return {
            templateUrl: '/modules/ps-dashboard/views/psWidgetBodyTemplate.html',
            restrict: 'E',
            link: function (scope, element, attrs) {
                //now rem.this is inheriting its' scope from psDashboardDirective
                //which is inheriting its' scope from wwaDashboardDirective and the .item
                //is the item in the ng-repeat from the psDashboardTemplate... hmm, so we can
                //grab .item in a ng-repeat if a custom directive is embedded in it.
                var newElement = angular.element(scope.item.template);//this .template is the string that we'll need to compile
                //but before we can compile it we'll need to make an element out of it i.e. we can't compile a string we have to compile an element
                //so passing in a string to angular.element(str) will make it an element if its' valid html.
                element.append(newElement);//rem.this element is already wrapped.
                $compile(newElement)(scope);//so rem.the new element we are compiling is <wwa-temperature></wwa-temperature>
                console.log("element="+element.name);
                
                scope.close = function () {
                    scope.widgets.splice(scope.widgets.indexOf(scope.item), 1);
                };

                scope.settings = function () {
                    var options = {
                        templateUrl: scope.item.widgetSettings.templateUrl,
                        controller: scope.item.widgetSettings.controller,
                        scope:scope
                    };
                    $modal.open(options);
                };

                /**
                 * this function is used by
                 * ng-click in the template so that icon
                 *  clicks aren't intercepted by widgets
                 * */
                scope.iconClicked = function () {
                    //we're going to leave the body of this function empty because the
                    //purpose of this function is to bypass the widgets handling of the
                    //touches/clicks and the way we do that is by letting ng take control
                }
            }
        };
    }
]);
