'use strict';

angular.module('events').controller('EditEventController',
    ['eventData','$scope',
	function(eventData, $scope) {
		$scope.saveEvent = function (event, newEventForm) {
            if(newEventForm.$valid){
                eventData.saveEventResource(event)
                    .$promise.then(function (response) {
                        console.log("Success", response);
                    }).
                    catch(function (response) {
                        console.log("Failure", response);
                    });
            }
        }
	}
]);
