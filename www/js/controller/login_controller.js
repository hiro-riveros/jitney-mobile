/*
=========================================
	LOGIN CONTROLLER
=========================================
*/

(function() {
	this.app.controller('LoginController', ['$scope', '$state', 'User', 'LocalStorageSingletonServices',
		function($scope, $state, User, LocalStorageSingletonServices) {
	/*
	=========================================
		SCOPE DEFINITION
	=========================================
	*/
			$scope.user = {};
			LocalStorageSingletonServices.deleteCurrentUser();
			$scope.signUp = function() {
				if ($scope.user.email === undefined || $scope.user.email === '') {
					document.getElementById('email').classList.add('input-error');
				} else if ($scope.user.password === undefined || $scope.user.password === '') {
					document.getElementById('password').classList.add('input-error');
				} else if ($scope.user.passwordConfirmation === undefined || $scope.user.passwordConfirmation === '') {
					document.getElementById('password').classList.add('input-error');
					document.getElementById('passwordConfirmation').classList.add('input-error');
				} else if ($scope.user.password === $scope.user.passwordConfirmation) {
					User.create($scope.user).then(function(user) {
						debugger;
						$state.go('editProfile');
					}, function(reason) {
						if (reason.errors.email !== undefined) {
							document.getElementById('email').classList.add('input-error');
							$scope.user.email = '';
						} else if (reason.errors.password !== undefined) {
							document.getElementById('password').classList.add('input-error');
							$scope.user.password = '';
						} else if (reason.errors.password_confirmation !== undefined) {
							document.getElementById('passwordConfirmation').classList.add('input-error');
							$scope.user.passwordConfirmation = '';
						};
					});	
				};
			};

			$scope.login = function () {
				// REMOVE FIRST IF 
				if (LocalStorageSingletonServices.getCurrentUser() !== undefined) {
					$state.go('mapPassenger');
				}else {
					if ($scope.user.email === undefined || $scope.user.email === '') {
						alert('debes ingresar un email');
					}else if ($scope.user.password === undefined || $scope.user.password === '') {
						alert('debes ingresar un password');
					}	else {
						User.login($scope.user).then(function(user) {
							debugger;
							if (user !== undefined) {
								$state.go('mapPassenger');	
							};					
						}, function(reason) {
							debugger;
							alert('error');
						});
					};
				};
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