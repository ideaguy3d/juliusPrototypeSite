'use strict';

angular.module('ps-framework').factory('dataService', ['$timeout',
	function($timeout) {

        var locations = [
            {
                id: 1000,
                name: 'Raquette River',
                temperature: 55,
                guides: 20,
                rafts: 18,
                vests: 200,
                image: 'modules/core/img/gui5.png'
            },
            {
                id: 1001,
                name: 'Black River',
                temperature: 53,
                guides: 36,
                rafts: 22,
                vests: 250,
                image: 'modules/core/img/gui6.png'
            },
            {
                id: 1002,
                name: 'Hudson River',
                temperature: 58,
                guides: 56,
                rafts: 40,
                vests: 500,
                image: 'modules/core/img/gui7.png'
            },
            {
                id: 1003,
                name: 'Hudson Gorge',
                temperature: 39,
                guides: 8,
                rafts: 10,
                vests: 40,
                image: 'modules/core/img/gui8.png'
            },
            {
                id: 1004,
                name: 'Saranac River',
                temperature: 32,
                guides: 8,
                rafts: 8,
                vests: 100,
                image: 'modules/core/img/gui1.png'
            },
            {
                id: 1005,
                name: 'Black Creek',
                temperature: 34,
                guides: 22,
                rafts: 12,
                vests: 230,
                image: 'modules/core/img/gui2.png'
            },
            {
                id: 1006,
                name: 'Batten Kill',
                temperature: 54,
                guides: 20,
                rafts: 24,
                vests: 420,
                image: 'modules/core/img/gui3.png'
            },
            {
                id: 1007,
                name: 'Ausable River',
                temperature: 38,
                guides: 12,
                rafts: 8,
                vests: 225,
                image: 'modules/core/img/gui4.png'
            }
        ];

        var employees = [
            {
                id: 5000,
                name: 'Andy Chatterton',
                location: 'Raquette River',
                image: 'modules/core/img/info2.jpg'
            },
            {
                id: 5001,
                name: 'Dr.Artist',
                location: 'Saranac River',
                image: 'modules/core/img/info6.jpg'
            },
            {
                id: 5002,
                name: 'Don Morgan',
                location: 'Black Creek',
                image: 'modules/core/img/info7.jpg'
            },
            {
                id: 5003,
                name: 'Tom Sullivan',
                location: 'Ausable River',
                image: 'modules/core/img/info8.jpg'
            },
            {
                id: 5004,
                name: 'Kathy Fletcher',
                location: 'Batten Kill',
                image: 'modules/core/img/info9.jpg'
            }
        ];

        var getLocations = function () {
            return $timeout(function () {
              return locations;
            }, 2000);
        };

        var getLocation = function (id) {
            return $timeout(function () {
                for(var i=0; i<locations.length; i++)
                    if(locations[i].id == id) return locations[i];

                return undefined;
            }, 300);
        };

        var getEmployees = function () {
            return $timeout(function () {
                return employees;
            }, 2000);
        };

        var getEmployee = function (id) {
            return $timeout(function () {
                for(var i=0; i<employees.length; i++)
                    if(employees[i].id == id) return employees[i];

                return undefined;
            }, 1000);
        };

		return {
			getLocations: getLocations,
            getLocation: getLocation,
            getEmployees: getEmployees,
            getEmployee: getEmployee
		};
	}
]);
