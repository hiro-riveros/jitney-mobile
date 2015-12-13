/*
=========================================
	EDIT PROFILE CONTROLLER
=========================================
*/

(function() {
	this.app.controller('EditProfileController', ['$scope', '$ionicPopup', '$state', '$log', 'User', 'user', 'EmailValidatorServices',
		function($scope, $ionicPopup, $state, $log, User, user, EmailValidatorServices) {
	/*
	=========================================
		SCOPE DEFINITION
	=========================================
	*/
	$scope.user = user;
	$scope.saveChanges = function() {
		if (EmailValidatorServices.validate($scope.user.email)) {
			if ($scope.user.name === undefined || $scope.user.name === '') {
				$scope.callAlertMessage('Error!', 'Debes ingresar tu nombre', 'name');

			} else if ($scope.user.lastName === undefined || $scope.user.lastName === '') {
				$scope.callAlertMessage('Error!', 'Debes ingresar tu apellido', 'lastName');

			} else if ($scope.user.email === undefined || $scope.user.email === '') {
				$scope.callAlertMessage('Error!', 'Debes ingresar un email', 'email');

			} else if ($scope.user.password === undefined || $scope.user.password === '') {
				$scope.callAlertMessage('Error!', 'Debes ingresar un password', 'password');
		
			} else if ($scope.user.passwordConfirmation === undefined || $scope.user.passwordConfirmation === '') {
				$scope.callAlertMessage('Error!', 'Debes ingresar la confirmacion de tu contrasela', 'passwordConfirmation');	

			} else if ($scope.user.password === $scope.user.passwordConfirmation) {
				var confirm = $ionicPopup.confirm({
					title: 'Alerta!',
					template: '¿Estás seguro de guardar los cambios?'
				});
				confirm.then(function(result) {
					if (result) {
						User.update($scope.user).then(function(user) {
							if (user !== undefined) {
								$scope.user = user;
								$scope.callAlertRedirectioning('Excelente', 'Cambios actualizados!');
							} else {
								$scope.callAlertRedirectioning('Error', 'Los cambios no han sido actualizados, favor intentar más tarde.');
							};
						}, function(reason) {
							$scope.callAlertRedirectioning('Error', 'Los cambios no han sido actualizados, favor intentar más tarde. \n' + JSON.stringify(reason));
						});

					} else {
						$state.go('configuration');
					};
				});
			} else {
				$scope.callAlertMessage('Error!', 'Las contraseñas no son iguales', 'passwords');	
			};
		} else {
			$scope.callAlertMessage('Error!', 'Tu email no tiene un formato valido.', 'email-formar');
		};
	};

	$scope.callAlertRedirectioning = function(type, message) {
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
	};

	$scope.callAlertMessage = function(title, message, input) {
		var alert = $ionicPopup.alert({
			title: title,
			template: message
	  });
		
		alert.then(function() {
   	  if (input === 'email') {
				document.getElementById('email').classList.add('input-error');
				$scope.user.email = '';
			} else if (input === 'password') {
		  	document.getElementById('password').classList.add('input-error');
				$scope.user.password = '';
		  } else if (input === 'passwordConfirmation') {
				document.getElementById('passwordConfirmation').classList.add('input-error');
				$scope.user.passwordConfirmation = '';
			} else if (input === 'passwords') {
				document.getElementById('password').classList.add('input-error');
				document.getElementById('passwordConfirmation').classList.add('input-error');
				$scope.user.password = '';
				$scope.user.passwordConfirmation = '';
			} else if (input === 'auth') {
				$scope.user.email = '';
				$scope.user.password = '';
				$scope.user.passwordConfirmation = '';
			} else if (input === 'email-formar') {
				document.getElementById('email').classList.add('input-error');
				$scope.user.email = '';
			} else if (input === 'name') {
				document.getElementById('name').classList.add('input-error');
				$scope.user.name = '';
			} else if (input === 'lastName') {
				document.getElementById('last_name').classList.add('input-error');
				$scope.user.lastName = '';
			};
		});
	};



	}]);
}).call(this);