/*
=========================================
	LOGIN CONTROLLER
=========================================
*/

(function() {
	this.app.controller('LoginController', ['$scope', '$state', '$ionicScrollDelegate',
		function($scope, $state) {
	/*
	=========================================
		SCOPE DEFINITION
	=========================================
	*/
			$scope.login = function (state) {
				$state.go(state);
			};
	}]);
}).call(this);