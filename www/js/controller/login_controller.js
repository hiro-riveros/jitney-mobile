/*
=========================================
	LOGIN CONTROLLER
=========================================
*/

(function() {
	this.app.controller('LoginController', ['$scope', '$state', '$log', '$ionicPopup', 'User', 'LocalStorageSingletonServices', 'EmailValidatorServices',
		function($scope, $state, $log, $ionicPopup, User, LocalStorageSingletonServices, EmailValidatorServices) {
	/*
	=========================================
		SCOPE DEFINITION
	=========================================
	*/
			$scope.user = {};
			LocalStorageSingletonServices.deleteCurrentUser();
			$scope.signUp = function() {
				if (EmailValidatorServices.validate($scope.user.email)) {
					if ($scope.user.email === undefined || $scope.user.email === '') {
						$scope.callAlertMessage('Error!', 'Debes ingresar un email', 'email');

					} else if ($scope.user.password === undefined || $scope.user.password === '') {
						$scope.callAlertMessage('Error!', 'Debes ingresar un password', 'password');
				
					} else if ($scope.user.passwordConfirmation === undefined || $scope.user.passwordConfirmation === '') {
						$scope.callAlertMessage('Error!', 'Debes ingresar la confirmacion de tu contrasela', 'passwordConfirmation');	

					} else if ($scope.user.password === $scope.user.passwordConfirmation) {
						User.create($scope.user).then(function(user) {
							$state.go('editProfile');
						}, function(reason) {
							$scope.callAlertMessage('Error!', 'No hemos podido generar tu cuenta intentalo mas tarde.', 'auth');
						});	
					} else {
						$scope.callAlertMessage('Error!', 'Las contraseñas no son iguales', 'passwords');	
					};
				} else {
					$scope.callAlertMessage('Error!', 'Tu email no tiene un formato valido.', 'email-formar');
				};
			};

			$scope.login = function () {

				if ($scope.user.email === undefined || $scope.user.email === '') {
					$scope.callAlertMessage('Error!', 'Debes ingresar un email', 'email');

				} else if (!EmailValidatorServices.validate($scope.user.email)) {
					$scope.callAlertMessage('Error!', 'Tu email no tiene un formato valido.', 'email-formar');
					
				} else if ($scope.user.password === undefined || $scope.user.password === '') {
					$scope.callAlertMessage('Error!', 'Debes ingresar un password', 'password');
				
				}	else {
					User.login($scope.user).then(function(user) {
						$scope.user = user;
						$scope.callAlertAuth('Excelente!', 'Bienvenido ' + user.name);
					}, function(reason) {
						$scope.callAlertAuth('Error!', 'Lo sentimos, hemos tenido problemas, favor intenta más tarde');
					});
				};
			};

			$scope.callAlertAuth = function(title, message) {
				var alert = $ionicPopup.alert({
					title: title,
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
					};
				});
			};

			$scope.activeteSignup = function() {
				$scope.user = {};
				document.getElementById('login-content').classList.add('hidden');
				document.getElementById('signup-content').classList.remove('hidden');
			};

			$scope.activeteLogin = function() {
				$scope.user = {};
				document.getElementById('login-content').classList.remove('hidden');
				document.getElementById('signup-content').classList.add('hidden');
			};

	}]);
}).call(this);