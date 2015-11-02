/*
=========================================
	EDIT PROFILE CONTROLLER
=========================================
*/

(function() {
	this.app.controller('EditProfileController', ['$scope', '$ionicPopup', '$state',
		function($scope, $ionicPopup, $state){
	/*
	=========================================
		SCOPE DEFINITION
	=========================================
	*/

	// RESOLVE USER DATA
	$scope.user = {
		firstName: 'hirochi',
		lastName: 'riveros',
		email: 'hiro@mifutu.ro',
		nickname: 'hirosmans',
		password: '0987654321',
		passwordConfirm: '0987654321'
	};

	// TODO SEND INFORMATION TO SERVER BY $save() RESTMOD METHOD.
	$scope.saveChanges = function() {
		var confirm = $ionicPopup.confirm({
			title: 'alerta!',
			template: '¿estas seguro de guardas los cambios?'
		});
		confirm.then(function(result) {
			if (result) {
				// SEND NOTIFICATION TO USER.
				$state.go('configuration');
			} else {
				$state.go('configuration');
			};
		});
	};




	}]);
}).call(this);