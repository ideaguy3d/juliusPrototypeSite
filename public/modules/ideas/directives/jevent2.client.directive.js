/**
 * Created by Julius Hernandez on 8/22/2015.
 */
"use strict";

angular.module('ideas').directive('jevent2Dir', ['$interval', function ($interval) {
    return {
        /*rem we can do something like this to:
        * template: <h1 style="...">Hello {{julius.name}}, from {{julius.address}}</h1>*/
        templateUrl: function (elem, attrs) {
            var jdir = '/modules/ideas/directives/templates/';
            return jdir+'dirTemp-'+attrs.type+'.html';
        },
        transclude: true
    }
}]);
