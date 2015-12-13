/*
=========================================
	JITNEY CONFIGURATION CONTROLLER
=========================================
*/

(function() {
	this.app.controller('JitneyConfigurationController', ['$scope', '$state', '$ionicPopup', 'Jitney', 'jitney', 'User',
		function($scope, $state, $ionicPopup, Jitney, jitney, User) {
	/*
	=========================================
		SCOPE DEFINITION
	=========================================
	*/
		$scope.jitney = {
			automatic_map: true
		};

		angular.forEach(jitney, function(value, index) {
			if (value.id !== undefined) {
				$scope.jitney = value;
			};
		});

		$scope.saveConfiguration = function() {
			Jitney.update($scope.jitney).then(function(jitney) {
				console.info('update jitney' + jitney);
			});
		};

		$scope.goTo = function(option) {
			if (option === 'editProfile') {
				$state.go('editProfile', { jitney: $scope.jitney });
			} else {
				window.location.href = $state.href('mapJitney');
				window.location.reload();
			};
		};

		$scope.logout = function() {
			User.logout($scope.jitney.authentication_token);
			$state.go('login');
		};
	}])
}).call(this);