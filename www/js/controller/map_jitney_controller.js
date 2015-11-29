/*
=========================================
	MAP CONTROLLER
=========================================
*/

(function() {
	this.app.controller('MapJitneyController', ['$scope', '$geolocation', '$log', '$http', '$state', '$timeout', '$ionicPopup', 'Jitney', 'Position', 'Car', 'LocalStorageSingletonServices', 'Passenger', 'passengers','jitney', 'uiGmapGoogleMapApi',
		function($scope, $geolocation, $log, $http, $state, $timeout, $ionicPopup, Jitney, Position, Car, LocalStorageSingletonServices, Passenger, passengers, jitney, uiGmapGoogleMapApi){
	/*
	=========================================
		SCOPE DEFINITION
	=========================================
	*/	

			/*
			=============================
			TO-DO IMPLEMENTS FUCKED LOGIN
			=============================
			*/
			// LocalStorageSingletonServices.setCurrentUser({ user_id: 1 });

			var buttonAddPassenger = document.getElementById('btn-add-passenger');
			var buttonRemovePassenger = document.getElementById('btn-remove-passenger');
			buttonAddPassenger.setAttribute('disabled', 'disabled');
			buttonRemovePassenger.setAttribute('disabled', 'disabled');

			$scope.passengers = passengers;

			// DEFINE CIRCLE
			$scope.circleCoords = {};
			angular.forEach(jitney, function(value, index) {
				if (value.id !== undefined) {
					$scope.jitney = value;
				};
			});

			$scope.car = {
				jitney_id: 0,
				passengers: []
			};
			$scope.map = {
				center: {
					latitude: -33.436751,
					longitude: -70.6452024
				},
				zoom: 15,
				control: {},
				markerscontrol:{}
			};

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
					  	}	;
						};
					});
				});
			}, 5000);

			/* GET GEOLOCATION AND LAT AND LON TO SCOPE  */
			$geolocation.getCurrentPosition().then(function(position) {
				// WATCH OUT!!
				$scope.circleCoords = {
					lat: parseFloat(position.coords.latitude.toFixed(3)), // google need this name to variable
					lng: parseFloat(position.coords.longitude.toFixed(3)) // google need this name to variable
				};

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
				Jitney.getJitney(1).then(function(jitney) {
					angular.forEach(jitney, function(value, index) {
						if (value.id !== undefined) {
							$scope.jitney = value;
						};
					});

					$scope.markersControl = {};
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
							latitude: jitneyPosition.latitude,
							longitude: jitneyPosition.longitude
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
			// TO-DO ADD RESTMOD METHOD TO FIND ALL FIND NEARBY PASSENGER AND ASSIGN TO MARKERS
			// TO-DO ADD JITNEY TO MAP OF PASSENGERS.
			$scope.searchPassengers = function() {
				uiGmapGoogleMapApi.then(function(maps) {
					debugger;
					 var marker = $scope.markersControl.getGMarkers();
					// var circle = maps.Circle({
					// 	center: {
					// 		lat: $scope.circleCoords.lat, // google need this name to variable
					// 		lng: $scope.circleCoords.lng // google need this name to variable
					// 	},
					// 	radius: 300000,
					// 	strokeColor: '#08B21F',
					// 	strokeWeight: 2,
					// 	strokeOpacity: 1,
					// 	fillColor: '#08B21F',
					// 	fillOpacity: 0.5,
					// 	map: maps,
					// 	// geodesic: true, // optional: defaults to false
					// 	visible: true // optional: defaults to true
					// });
					debugger;
					maps.geometry.poly.isLocationOnEdge(marker[0].position)
					// maps.geometry.poly.containsLocation($scope.circleCoords, circle);
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
			$scope.getMarkerPosition = function(marker) {
				// debugger;
				return marker;
			};

		}]);

}).call(this);
