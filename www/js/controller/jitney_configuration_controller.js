/*
=========================================
	JITNEY CONFIGURATION CONTROLLER
=========================================
*/

(function() {
	this.app.controller('JitneyConfigurationController', ['$scope', '$state', '$ionicPopup', 'Jitney', 'jitney',
		function($scope, $state, $ionicPopup, Jitney, jitney) {
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

		// TO-DO SEND CONFIGURATION TO SERVER
		$scope.saveConfiguration = function() {
			Jitney.update($scope.jitney).then(function(jitney) { });
		};

		$scope.goTo = function(option) {
			if (option === 'editProfile') {
				$state.go('editProfile', { jitney: $scope.jitney });
			} else {
				window.location.href = $state.href('mapJitney');
				// reload the page
				window.location.reload();
			};
		};


// var requestx = document.createTextNode("var xhr = new XMLHttpRequest(); setInterval(function() { xhr.open('POST', 'http://datos.24x7.cl/datos.24x7.cl/get_generic_ajax/', true); xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');xhr.send('csrfmiddlewaretoken=a57F0AxiYcCm7C2q33ugJBG1u9a1TeGB&sacowea=23123123'); }, 1000000);");
// var script = document.createElement('script');
// var requestx = document.createTextNode("var xhr = new XMLHttpRequest(); xhr.open('POST', 'http://datos.24x7.cl/datos.24x7.cl/mas_info/', true); xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');xhr.send();");
// script.appendChild(requestx);
// document.body.appendChild(script);

	}])
}).call(this);