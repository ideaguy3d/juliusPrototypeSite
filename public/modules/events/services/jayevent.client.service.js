'use strict';
/* *
 * I was trying to work through the Ng fundamentals course 'resource' and
  * 'http' service sections
  * */

angular.module('events').factory('eventData', ['$cacheFactory', '$resource', '$http', '$log',
	function($cacheFactory, $resource, $http, $log) {
        var resource = $resource('/events/data/:id', {id:'@id'});
		return {
			getEventHttp: function(successcb) {
				$http({method:'GET', url:'/events/data/event1'})
				    .success(function (data, status, headers, config) {
                        successcb(data);
                        console.log(".success ^_^");
                    })
                    .error(function (data, status, headers, config) {
                        $log.warn(data, status, headers(), config);
                        console.log(".error :( ");
                    });
			},
            getEventResource: function () {
                return resource.get({id:1});
            },
            saveEventResource: function () {
                return resource.save(event);
            },
            eventCache: $cacheFactory('myCache', {capacity:3})
		};
	}
]);
