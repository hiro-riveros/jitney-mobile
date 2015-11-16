(function() {
	this.app.controller('SignUpController', ['$scope', 'User', function($scope, User){
		$scope.user = {};

		$scope.signUp = function() {
			if ($scope.user.email === undefined || $scope.user.email === '') {

			} else if ($scope.user.password === undefined || $scope.user.password === '') {

			} else if ($scope.user.passwordConfirmation === undefined || $scope.user.passwordConfirmation === '') {

			} else if ($scope.user.password === $scope.user.passwordConfirmation) {
				debugger;
				User.create($scope.user).then(function(user) {
					debugger;
				});	
			};


		};
	}]);
}).call(this);