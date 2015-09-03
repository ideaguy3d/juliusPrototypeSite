'use strict';

angular.module('ps-framework').directive('wwaInventory',
	['dataService',
		function (dataService) {
			return {
				restrict: 'E',
				templateUrl: '/modules/ps-framework/widgets/wwaInventory/wwaInventoryTemplate.html',
				link: function (scope, element, attrs) {
					dataService.getLocation(scope.item.widgetSettings.id)//this returns a promise because it doesn't happen right away ie. there is a delay. At least that's what I think.
						.then(function (data) {
							scope.selectedLocation = data;
						});
				}
			}
		}
	]
);
