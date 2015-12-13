/*
=========================================
	PASSENGER CONFIGURATION CONTROLLER
=========================================
*/

(function() {
	this.app.controller('PassengerConfigurationController', ['$scope', '$state', '$ionicPopup', 'Passenger', 'passenger', 'User',
		function($scope, $state, $ionicPopup, Passenger, passenger, User) {
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

		$scope.saveConfiguration = function() {
			Passenger.update($scope.passenger).then(function(passenger) {	
				console.info('update passenger' + passenger);
			});
		};

		$scope.goTo = function(option) {
			if (option === 'editProfile') {
				$state.go('editProfile', { passenger: $scope.passenger});
			} else {
				window.location.href = $state.href('mapPassenger');
				window.location.reload();
			};
		};

		$scope.logout = function() {
			User.logout($scope.passenger.autentication_token);
			$state.go('login');
		};
	}]);
}).call(this);