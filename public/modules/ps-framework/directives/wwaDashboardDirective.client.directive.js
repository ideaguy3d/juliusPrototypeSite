'use strict';

angular.module('ps-framework').directive('wwaDashboard', ['$localStorage',
    function ($localStorage) {
        return {
            template: '<ps-dashboard></ps-dashboard>',
            //templateUrl: '/modules/ps-dashboard/views/psDashboardTemplate.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {
                //remember all of this will be inherited from the psDashborad
                //directive... well actually not anymore since I'm not using that
                //directive anymore.
                scope.title = 'Test 1 Test ONE';
                scope.gridsterOpts = {
                    columns: 12,
                    margins: [20,20],
                    outerMargin: false,
                    pushing: true,
                    floating: false,
                    swapping: false
                };
                scope.widgetDefinitions = [
                    {
                        title: 'Temperature',
                        settings: {
                            sizeX: 3,//we're setting sizeX in the horiz to take up 3
                            sizeY: 3,//size Y will take up 3 in the vert
                            minSizeX: 2,
                            minSizeY: 2,//we were able to remove the row and column fields because gridster wil auto add them
                            //we're going to need to read this template and then compile it
                            template: '<wwa-temperature></wwa-temperature>',
                            widgetSettings: {
                                id: 1000,
                                templateUrl: '/modules/ps-dashboard/views/wwaSelectLocationTemplate.html',
                                controller: 'wwaSelectLocationController'
                            }
                        }
                    },
                    {
                        title: 'Inventory',
                        settings: {
                            sizeX: 5,//we're setting sizeX in the horiz to take up 3
                            sizeY: 3,//size Y will take up 3 in the vert
                            //the row and col are the upper left corner
                            row: 0,
                            col: 5,
                            //we're going to need to read this template and then compile it
                            template: '<wwa-employee></wwa-employee>',
                            widgetSettings: {
                                id: 5001,
                                templateUrl: '/modules/ps-dashboard/views/wwaSelectLocationTemplate.html',
                                controller: 'wwaSelectLocationController'
                            }
                        }
                    },
                    {
                        title: 'Employee',
                        settings: {
                            sizeX: 3,//we're setting sizeX in the horiz to take up 3
                            sizeY: 3,//size Y will take up 3 in the vert
                            minSizeX: 4,
                            minSizeY: 4,
                            //the row and col are the upper left corner
                            row: 7,
                            col: 0,
                            //we're going to need to read this template and then compile it
                            template: '<wwa-inventory></wwa-inventory>',
                            widgetSettings: {
                                id: 1002,
                                templateUrl: '/modules/ps-dashboard/views/wwaSelectEmployeeTemplate.html',
                                controller: 'wwaSelectEmployeeController'
                            }
                        }
                    }
                ];
                //all the duplicate stuff in here caused an issue, now it is just being
                //using for dynamically added our widgets to this array
                scope.widgets = $localStorage.widgets || [//if localStorage.widgets is filled take it, if not take an empty array

                ];
                //watch our widgets array and when it changed do gruntthe func
                scope.$watch('widgets', function () {
                    //this is the 3rd party service we added , store our scope.widgets
                    //into a local storage named widgets.
                    $localStorage.widgets = scope.widgets;
                }, true);//we add true as the 4rd arg because we are watching an array so this
                //watches all of its sub properties and stuff... i.e. true means it looks deeply into the array.
            }
        };
    }
]);



//old, old way of way I used. I edited the template fragment
//template: '<div gridster="gridsterOpts">\n    <!-- by using this \'gridster\' attr we\'re creating a dashboard -->\n    <ul>\n        <!-- g-i = "item" name needs to match the varName "item" in our ng-repeat, both must have the same name. In this case, "item" is both their names -->\n        <li gridster-item="item" ng-repeat="item in widgets"><!-- by using ngrepeat over our widgets, we\'re adding widgets to the dashboard -->\n            <div></div><!-- this div is where the widgets will be inserted -->\n        </li>\n    </ul>\n</div>',

