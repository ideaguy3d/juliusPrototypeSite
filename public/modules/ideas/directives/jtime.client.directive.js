'use strict';
//following the ng docs Directives dev guide, the docs say that there are few special
//angular events that emit a $destroy event e.g. When a dom node that has been compiled
//with ng's compiler is destroyed... or when an ng scope has been destroyed.
angular.module('ideas').directive('myCurrentTime', ['$interval', 'dateFilter',
	function($interval, dateFilter) {

		function link(scope, element, attrs){
            var format, timeoutId;
            function updateTime(){
                element.text(dateFilter(new Date(), format));
            }

            scope.$watch(attrs.myCurrentTime, function (value) {
                format = value;
                updateTime();
            });

            element.on('$destroy', function () {
                $interval.cancel(timeoutId);
            });

            //start the UI update process, save the timeoutId for canceling
            timeoutId = $interval(function () {
                updateTime(); //this updates the DOM
            }, 1000);//do this every thousand seconds
        }
        //since no 'restrict' property option was specified it defaults to an attr
		return {
			    link: link
        }

	}
]);
