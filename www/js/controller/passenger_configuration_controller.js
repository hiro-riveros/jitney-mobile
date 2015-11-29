/*
=========================================
	PASSENGER CONFIGURATION CONTROLLER
=========================================
*/

(function() {
	this.app.controller('PassengerConfigurationController', ['$scope', '$state', '$ionicPopup', 'Passenger', 'passenger',
		function($scope, $state, $ionicPopup, Passenger, passenger) {
	/*
	=========================================
		SCOPE DEFINITION
	=========================================
	*/
		$scope.passenger = {
			automatic_map: true
		};
		angular.forEach(passenger, function(value, index) {
			if (value.id !== undefined) {
				$scope.passenger = value;
			};
		});

		// TO-DO SEND CONFIGURATION TO SERVER
		$scope.saveConfiguration = function() {
			Passenger.update($scope.passenger).then(function(passenger) {	});
		};

		$scope.goTo = function(option) {
			if (option === 'editProfile') {
				$state.go('editProfile', { passenger: $scope.passenger});
			} else {
				window.location.href = $state.href('mapPassenger');
				// reload the page
				window.location.reload();
			};
		};

	}]);
}).call(this);