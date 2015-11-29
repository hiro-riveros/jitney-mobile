/*
=========================================
	EDIT PROFILE CONTROLLER
=========================================
*/

(function() {
	this.app.controller('EditProfileController', ['$scope', '$ionicPopup', '$state', 'User', 'user',
		function($scope, $ionicPopup, $state, User, user) {
	/*
	=========================================
		SCOPE DEFINITION
	=========================================
	*/
	$scope.user = user;
	// TO-DO SEND NEW USER DATA.

	$scope.saveChanges = function() {
		var confirm = $ionicPopup.confirm({
			title: 'alerta!',
			template: '¿estas seguro de guardas los cambios?'
		});
		confirm.then(function(result) {
			if (result) {
				User.update($scope.user).then(function(user) {
					if (user !== undefined) {
						$scope.user = user;
						$scope.callAlert('excelente', 'cambios actualizados!');
					} else {
						$scope.callAlert('error', 'los cambios no han sido actualizados, favor intentar mas tarde.');
					};
				}, function(reason) {
					$scope.callAlert('error', 'los cambios no han sido actualizados, favor intentar mas tarde. \n' + JSON.stringify(reason));
				});

			} else {
				$state.go('configuration');
			};
		});
	};

	$scope.callAlert = function(type, message) {
		var alert = $ionicPopup.alert({
			title: type,
			template: message
		});

		alert.then(function() {
			if ($scope.user.actableType === 'Passenger') {
				$state.go('mapPassenger');
			} else {
				$state.go('mapJitney'); 
			};
		});
	}



	}]);
}).call(this);