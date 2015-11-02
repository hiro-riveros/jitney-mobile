(function() {
	this.app.controller('SignInController', ['$scope', 'User', function($scope, User){
		$scope.user = {};

		$scope.signIn = function() {
			debugger;
			User.$create($scope.user).$then(function(data) {
				debugger;
				
			});
		};

	}]);
}).call(this);