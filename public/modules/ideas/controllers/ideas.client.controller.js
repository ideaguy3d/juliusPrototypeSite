'use strict';

// Ideas controller, worked along some ng docs in this file
angular.module('ideas').controller('IdeasController', ['$timeout', '$scope', '$stateParams', '$location', 'Authentication', 'Ideas',
	function($timeout, $scope, $stateParams, $location, Authentication, Ideas) {
		$scope.authentication = Authentication;
		$scope.julius = {name:"Omicron inc.", address:"Lathrop, ca, usa"};
        $scope.alvarado = {name:"EpsilonQ LLC", address:"San Jose, ca, usa"};
		$scope.format = 'M/d/yy h:mm:ss a';
        /*working through the "Creating directives that wrap other
        * elements" section of the ng developer guide
        * */
        $scope.name = 'tobias mayne';
        $scope.jmessage = "";
        $scope.hideDialog = function (zmessage) {
            $scope.jmessage = zmessage;
            $scope.dialogIsHidden = true;
            $timeout(function () {
                $scope.jmessage = '';
                $scope.dialogIsHidden = false;
            }, 2000); //do param1 func every 2seconds.
        };

		// Create new Idea
		$scope.create = function() {
			// Create new Idea object
			var idea = new Ideas ({
				name: this.name
			});

			// Redirect after save
			idea.$save(function(response) {
				$location.path('ideas/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Idea
		$scope.remove = function(idea) {
			if ( idea ) { 
				idea.$remove();

				for (var i in $scope.ideas) {
					if ($scope.ideas [i] === idea) {
						$scope.ideas.splice(i, 1);
					}
				}
			} else {
				$scope.idea.$remove(function() {
					$location.path('ideas');
				});
			}
		};

		// Update existing Idea
		$scope.update = function() {
			var idea = $scope.idea;

			idea.$update(function() {
				$location.path('ideas/' + idea._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Ideas
		$scope.find = function() {
			$scope.ideas = Ideas.query();
		};

		// Find existing Idea
		$scope.findOne = function() {
			$scope.idea = Ideas.get({ 
				ideaId: $stateParams.ideaId
			});
		};
	}
]);
