'use strict';

// Events controller "boilerplate code generates this as the only ctrl at first.
angular.module('events').controller('EventsController', ['$cookieStore','$compile','eventData', '$scope', '$stateParams', '$location', 'Authentication', 'Events',
    function ($cookieStore,$compile,eventData, $scope, $stateParams, $location, Authentication, Events) {
        $scope.authentication = Authentication;

        //Here is code I wrote!! =========== */
        $scope.sortorder = 'name';
        //eventData.getEventHttp(function (eventData) {
        //    $scope.event = eventData;
        //});

        $scope.addToCache = function (key, value) {
            eventData.eventCache.put(key, value);
        };
        $scope.readFromCache = function(key){
            return eventData.eventCache.get(key);
        };
        $scope.getCacheStats = function () {
            return 'is'+eventData.eventCache.info();
        };
        //this doesn't work :\
        $scope.appendToDivElement = function (htmlMayne) {
            return $compile(htmlMayne)($scope).appendTo(angular.element("#appendHere"));
        };
        //practicing the $cookieStore service section here (:
        $scope.event = {id:1,name:"My Cookie"};
        $scope.saveEventToCookie = function (event) {
            $cookieStore.put('event', event);
        };
        $scope.getEventFromCookie = function () {
            console.log($cookieStore.get('event'));
        };
        $scope.removeEventCookie = function () {
            $cookieStore.remove('event');
        }
        //**===============my code ends=======================*/

        // Create new Event
        $scope.create = function () {
            // Create new Event object
            var event = new Events({
                name: this.name
            });

            // Redirect after save
            event.$save(function (response) {
                $location.path('events/' + response._id);

                // Clear form fields
                $scope.name = '';
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Event
        $scope.remove = function (event) {
            if (event) {
                event.$remove();

                for (var i in $scope.events) {
                    if ($scope.events [i] === event) {
                        $scope.events.splice(i, 1);
                    }
                }
            } else {
                $scope.event.$remove(function () {
                    $location.path('events');
                });
            }
        };

        // Update existing Event
        $scope.update = function () {
            var event = $scope.event;

            event.$update(function () {
                $location.path('events/' + event._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Events
        $scope.find = function () {
            $scope.events = Events.query();
        };

        // Find existing Event
        $scope.findOne = function () {
            $scope.event = Events.get({
                eventId: $stateParams.eventId
            });
        };
    }
]);
