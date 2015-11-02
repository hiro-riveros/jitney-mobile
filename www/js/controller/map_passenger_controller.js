/*
=========================================
	MAP CONTROLLER
=========================================
*/

(function() {
	this.app.controller('MapController', ['$scope', '$geolocation', '$log', '$http', '$state', '$ionicPopup', 'uiGmapGoogleMapApi',
		function($scope, $geolocation, $log, $http, $state, $ionicPopup, uiGmapGoogleMapApi){
	/*
	=========================================
		SCOPE DEFINITION
	=========================================
	*/
	/* GET GEOLOCATION AND LAT AND LON TO SCOPE  */
			$scope.map = {
				center: {
					latitude: -33.436751,
					longitude: -70.6452024
				},
				zoom: 15
			};
			$scope.passengers = [];

			// TO-DO ADD LOADING FOR GET GEOLOCATION
			// TO-DO ADD MARKERS OF THE USERS MODEL
			$geolocation.getCurrentPosition().then(function(position) {
				// TO-DO REMOVE LOADING
				$scope.map = {
					center: {
						latitude: position.coords.latitude,
						longitude: position.coords.longitude
					},
					zoom: 15, // radius of 3 km
					scrollwheel: false,
					disableDoubleClickZoom: true
				};

				$scope.passengers.push({
					id: 0,
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					icon: '../../../img/passenger-icon-24.png'
				});
				var lat = -33.4136139, lon = -70.5828831;
				setInterval(function() {
					$log.info('from', $scope.passengers[1]);
					$scope.$apply(function () {
						lon -= 0.0000010;
						$scope.passengers[1] = {
							id: 1,
							latitude: lat.toFixed(7),
							longitude: lon.toFixed(7),
							icon: '../../../img/jitney-icon-24.png'
						};
						$log.info('to', $scope.passengers[1]);
        	});
				}, 10);
			});
			// $scope.events = {
		  //   click: function (marker, eventName, dataModel) {

		  //    }
		  //  };

		  // TO-DO SEND INFORMATION BY SOCKET TO UPDATE JITNEY MAP 
		  $scope.searchJitnies = function() {
		  	var confirm = $ionicPopup.confirm({
		  		title: 'buscar colectivo',
		  		template: '¿estas seguro de iniciar la busqueda?'
		  	});
		  	confirm.then(function(response) {
		  		if (response) {
		    		// TO-DO REMOVE ALERT AND SEND NOTIFICATION TO USER.
		    		$ionicPopup.alert({
		    			title: 'contacto realizado',
		    			template: 'ahora los colectivos cercanos podran verte'
		    		});
		    	} else {
		    		$ionicPopup.alert({
		    			title: 'contacto rechazado',
		    			template: 'se ha cancelado la busqueda.'
		    		});
		    	};
		    });
		  };

		  $scope.goToConfigurations = function() {
		  	$state.go('configuration');
		  };

		  /* VALIDATION TO SEPUT MAP BY HOUR OF DAY */
		  var date = new Date();
		  if (date.getHours() >= 6 && date.getHours() <= 19) {
		  	$scope.options = { 
		  		'mapTypeControl': false,
		  		'streetViewControl': false,
		  		'draggable': false,
		  		'styles': [{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7dcdcd"}]}]
		  	};
		  }else{
		  	$scope.options = { 
		  		'mapTypeControl': false,
		  		'streetViewControl': false,
		  		'draggable': false,
		  		'styles': [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}]
		  	};
		  };


		}]);
}).call(this);