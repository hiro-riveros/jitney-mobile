/*
=========================================
	CONFIGURATION CONTROLLER
=========================================
*/

(function() {
	this.app.controller('ConfigurationController', ['$scope', '$state', '$ionicPopup',
		function($scope, $state, $ionicPopup) {
	/*
	=========================================
		SCOPE DEFINITION
	=========================================
	*/
		$scope.configuration = {};


		// TO-DO SEND CONFIGURATION TO SERVER
		$scope.saveConfiguration = function() {
			
		};

		$scope.goTo = function(option) {
			if (option === 'editProfile') {
				$state.go('editProfile');
			} else if (option === 'addFrequendDestiny') {
				var addFrequentDestiny = $ionicPopup.confirm({
	    		title: 'ingresa tu destino frecuente',
	    		template: '<input type="text" ng-model="configuration.frequentDestiny">',
	    		scope: $scope,
	    		buttons: [
	    			{ 
	    				text: 'cancelar' 
	    			},
	    			{ 
	    				text: 'guargar',
	    				onTap: function(evt) {
	    					if (!$scope.configuration.frequentDestiny) {
	    						$ionicPopup.alert({
	    							title: 'error',
	    							template: 'debes ingresar un destino'
	    						});
	    						evt.preventDefault();
	    					} else {
	    						// TODO SEND INFORMATION TO SERVER
	    						return $scope.configuration.frequentDestiny;
	    					};
	    				}
	    			}
	    		]
	    	});
	    	addFrequentDestiny.then(function() {
	    		// ADD NOTIFICATION TO USER
	    		$ionicPopup.alert({
	    			title: 'destino agregado',
	    			template: 'tu nuevo destino se a guardado satisfactoriamente, ahora los colectivos podran ver tu destino'
	    		});
	    	});
			} else {
				var currentUser = 'passenger'
				if (currentUser === 'jitney') {
					$state.go('mapJitney');
				} else if (currentUser === 'passenger') {
					$state.go('mapPassenger');
				};
			};
		};

	}]);
}).call(this);