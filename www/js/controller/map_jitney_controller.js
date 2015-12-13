/*
=========================================
	MAP CONTROLLER
=========================================
*/

(function() {
	this.app.controller('MapJitneyController', ['$scope', '$cordovaGeolocation', '$log', '$http', '$state', '$timeout', '$ionicPopup', 'Jitney', 'Position', 'Car', 'LocalStorageSingletonServices', 'Passenger', 'passengers','jitney', 'uiGmapGoogleMapApi', 'DistanceCalculatorService',
		function($scope, $cordovaGeolocation, $log, $http, $state, $timeout, $ionicPopup, Jitney, Position, Car, LocalStorageSingletonServices, Passenger, passengers, jitney, uiGmapGoogleMapApi, DistanceCalculatorService){
	/*
	=========================================
		SCOPE DEFINITION
	=========================================
	*/	
			var buttonAddPassenger = document.getElementById('btn-add-passenger');
			var buttonRemovePassenger = document.getElementById('btn-remove-passenger');
			buttonAddPassenger.setAttribute('disabled', 'disabled');
			buttonRemovePassenger.setAttribute('disabled', 'disabled');

			$scope.passengers = passengers;
			$scope.refreshMap = true;

			$scope.car = {
				jitney_id: 0,
				passengers: []
			};
			
			$scope.map = {
				center: {
					latitude: -33.436751,
					longitude: -70.6452024
				},
				zoom: 10,
			};
			angular.forEach(jitney, function(value, index) {
				if (value.id !== undefined) {
					$scope.jitney = value;
				};
			});
			$scope.jitney.icon = '../../../img/jitney-icon-24.png';
			// GET ALL PASSENGERS
			// TO-DO FILTER PASSENGER AROUND 3 KM.
			setInterval(function() {
				Passenger.getPassengers().then(function(passengers) {
					angular.forEach(passengers, function(value, index) {
						if (value.positions !== null) {
							$scope.passengers[index] = {
								id: index,
								latitude: value.positions.latitude,
								longitude: value.positions.longitude,
								icon: '../../../img/passenger-icon-24.png'
							};

						};
					});
				});
				document.querySelector('.angular-google-map-container').children[0].children[5].style.display = 'none';
			}, 5000);

			/* GET GEOLOCATION AND LAT AND LON TO SCOPE  */
			var posOptions = {timeout: 10000, enableHighAccuracy: false};

			setInterval(function() {
				$cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
		      $scope.jitney.coords = {
						latitude: position.coords.latitude,
						longitude: position.coords.longitude
					};
					$scope.jitney.icon = '../../../img/jitney-icon-24.png';
				});
		  }, 3000);
			
			$cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
				$scope.map = {
					center: {
						latitude: position.coords.latitude,
						longitude: position.coords.longitude
					},
					zoom: 15, // radius of 3 km
					scrollwheel: false,
					disableDoubleClickZoom: true
				};
				// GET CURRENT JITNEY AND ALL PASSENGERS
				Jitney.getJitney($scope.jitney.id).then(function(jitney) {
					angular.forEach(jitney, function(value, index) {
						if (value.id !== undefined) {
							$scope.jitney = value;
						};
					});

					// VALIDATES MAP TYPE
					$scope.checkMapType($scope.jitney.automatic_map);

					setInterval(function() {
						var jitneyPosition = {
							userId: $scope.jitney.user_id,
							latitude: position.coords.latitude.toFixed(7),
							longitude: position.coords.longitude.toFixed(7),
							perimeter: 0
						};

						// IT'S CREATE A NEW JITNEY POSITION.
						Position.create(jitneyPosition).then(function(position) { });
						$scope.jitney.coords = {
							latitude: position.coords.latitude,
							longitude: position.coords.longitude
						};
						$scope.jitney.icon = '../../../img/jitney-icon-24.png';

					}, 5000);

					Car.getCar($scope.jitney.cars[0].id).then(function(car) {
						$scope.car = car;
						if ($scope.car.passengers < 1) {
							buttonRemovePassenger.setAttribute('disabled', 'disabled');
							buttonAddPassenger.removeAttribute('disabled');
						}else if($scope.car.passengers === 4) {
							buttonAddPassenger.setAttribute('disabled', 'disabled');
							buttonRemovePassenger.removeAttribute('disabled');
						}else {
							buttonRemovePassenger.removeAttribute('disabled');
							buttonAddPassenger.removeAttribute('disabled');
						};
					});
				});
			});
		  
			$scope.addPassenger = function(){
				if ($scope.car.passengers === 4) {
					buttonAddPassenger.setAttribute('disabled', 'disabled');
					buttonRemovePassenger.removeAttribute('disabled');
				}else{
					$scope.car.passengers++;
					if ($scope.car.passengers <= 4) {
						Car.updateCarPassengers($scope.car).then(function(car) {
							$scope.car = car;
							if ($scope.car.passengers < 1) {
								buttonRemovePassenger.setAttribute('disabled', 'disabled');
								buttonAddPassenger.removeAttribute('disabled');
							}else if($scope.car.passengers === 4) {
								buttonAddPassenger.setAttribute('disabled', 'disabled');
								buttonRemovePassenger.removeAttribute('disabled');
							}else {
								buttonRemovePassenger.removeAttribute('disabled');
								buttonAddPassenger.removeAttribute('disabled');
							};
						});
					}else{
						alert('no puedes ingresar mas pasajeros.');
					};
				};
			};

			$scope.removePassenger = function(){
				if ($scope.car.passengers < 1 ) {
					buttonRemovePassenger.setAttribute('disabled', 'disabled');
				}else{
					$scope.car.passengers--;
				};

				if ($scope.car.passengers <= 4) {
					buttonAddPassenger.removeAttribute('disabled');
				};
				Car.updateCarPassengers($scope.car).then(function(car) {
					$scope.car = car;
					if ($scope.car.passengers < 1) {
						buttonRemovePassenger.setAttribute('disabled', 'disabled');
						buttonAddPassenger.removeAttribute('disabled');
					}else if($scope.car.passengers === 4) {
						buttonAddPassenger.setAttribute('disabled', 'disabled');
						buttonRemovePassenger.removeAttribute('disabled');
					}else {
						buttonRemovePassenger.removeAttribute('disabled');
						buttonAddPassenger.removeAttribute('disabled');
					};
				});
			};

			// SEARCH PASSENGERS METHOD. FIND NEARBY PASSENGER AND GIVE FOCUS
			// TO-DO ADD FX FOR ACTIVATE SEARCH.
			// TO-DO ADD JITNEY TO MAP OF PASSENGERS.
			$scope.events = {
		    click: function (marker, eventName, args) {
		    	debugger;
		    }
		  };

		  $scope.callAlert = function(type, message) {
			  var alert = $ionicPopup.alert({
					title: type,
					template: message
				});

				alert.then(function() {
					
				});
		  };
			$scope.searchPassengers = function() {
				uiGmapGoogleMapApi.then(function(maps) {
					var count = $scope.passengers.length;
					$log.info('passengers quantity ', count);

					angular.forEach($scope.passengers, function(value, index) {
						var jitneyObject = {
							lat: $scope.jitney.coords.latitude,
							lng: $scope.jitney.coords.longitude
						};
						var passengerObject = {
							lat: 0,
							lng: 0
						};
						passengerObject.lat = value.latitude;
						passengerObject.lng = value.longitude;
						//  IT CENTER MAP ON PASSENGER POSITION, PASSENGER POSITION SHOULD BE BETWEEN 1000 AND 300 KM  
						if (DistanceCalculatorService.getDistance(jitneyObject, passengerObject) >= 0 && 
							  DistanceCalculatorService.getDistance(jitneyObject, passengerObject) <= 3000) {
							$scope.map = {
								center: {
									latitude: passengerObject.lat,
									longitude: passengerObject.lng
								},
								zoom: 15
							};
							$scope.callAlert('Alerta', 'Se ha encontrado un pasajero a: ' + DistanceCalculatorService.getDistance(jitneyObject, passengerObject) + ' metros');
						} else {
							if (count === (index + 1)) {
								$scope.callAlert('Busqueda finalizada', 'La busqueda a finalizado, actualmente no hay pasajeros cercanos a 3 km.');
							};
						};
					});
					return $scope.callAlert('Busqueda finalizada', 'La busqueda a finalizado, actualmente hay ' + $scope.passengers.length + ' activos');
				});
			};

			$scope.goToConfigurations = function(){
				$state.go('jitneyConfiguration');
			};

			$scope.checkMapType = function(mapType) {
				var date = new Date();
				if (mapType) {
					if (date.getHours() > 6 && date.getHours() < 19) {
						$scope.options = { 
							'mapTypeControl': false,
							'streetViewControl': false,
							'draggable': false,
							'styles': [{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7dcdcd"}]}]
						};
					} else {
						$scope.options = { 
							'mapTypeControl': false,
							'streetViewControl': false,
							'draggable': false,
							'styles': [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}]
						};
					};
				}else {
					$scope.options = { 
						'mapTypeControl': false,
						'streetViewControl': false,
						'draggable': false,
						'styles': [{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7dcdcd"}]}]
					};
				};
			};
			
			// VALIDATES MAP TYPE
			$scope.checkMapType($scope.jitney.automatic_map);

		}]);

}).call(this);
