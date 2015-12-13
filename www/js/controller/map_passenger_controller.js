/*
=========================================
	MAP CONTROLLER
=========================================
*/

(function() {
	this.app.controller('MapController', ['$scope', '$cordovaGeolocation', '$log', '$http', '$state', '$timeout', '$ionicPopup', 'uiGmapGoogleMapApi', 'LocalStorageSingletonServices', 'Passenger', 'passenger', 'Position', 'Jitney', 'jitneys', 'DistanceCalculatorService',
		function($scope, $cordovaGeolocation, $log, $http, $state, $timeout, $ionicPopup, uiGmapGoogleMapApi, LocalStorageSingletonServices, Passenger, passenger, Position, Jitney, jitneys, DistanceCalculatorService){
	/*
	=========================================
		SCOPE DEFINITION
	=========================================
	*/	

			$scope.refreshMap = true;
			$scope.jitneys = jitneys;
			$scope.map = {
				center: {
					latitude: -33.436751,
					longitude: -70.6452024
				},
				zoom: 10
			};
			
			angular.forEach(passenger, function(value, index) {
				if (value.id !== undefined) {
					$scope.passenger = value;
				};
			});
			
			setInterval(function() {
				// GET ALL JITNEYS
				Jitney.getJitneys().then(function(jitneys) {
					angular.forEach(jitneys, function(value, index) {
						if (value.positions !== null) {
							if (value.users.is_active) {
								$log.info('jitney true');
								$scope.jitneys[index] = {
							  	id: index,
							  	latitude: value.positions.latitude,
							  	longitude: value.positions.longitude,
							  	icon: '../../../img/jitney-icon-24.png'
						  	};
					  	};
						};
					  
					});
				});
				document.querySelector('.angular-google-map-container').children[0].children[5].style.display = 'none';
			}, 5000);

			/* GET GEOLOCATION AND LAT AND LON TO SCOPE  */
			var posOptions = {timeout: 10000, enableHighAccuracy: false};

			setInterval(function() {
				$log.info('get position');
				$cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
		      $scope.passenger.coords = {
						latitude: position.coords.latitude,
						longitude: position.coords.longitude
					};
					$scope.passenger.icon = '../../../img/passenger-icon-24.png';
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

				Passenger.getPassenger($scope.passenger.id).then(function(passenger) {
					angular.forEach(passenger, function(value, index) {
						if (value.id !== undefined) {
							$scope.passenger = value;
						};
					});
					
				  // VALIDATES MAP TYPE
				  $scope.checkMapType($scope.passenger.automatic_map);

					setInterval(function() {
						var passengerPosition = {
							userId: $scope.passenger.user_id,
							latitude: position.coords.latitude.toFixed(7),
							longitude: position.coords.longitude.toFixed(7),
							perimeter: 0
						};

						// IT'S CREATE A NEW PASSENGER POSITION.
						Position.create(passengerPosition).then(function(position) { });

						$log.info($scope.passenger);
						$scope.passenger.coords = {
							latitude: position.coords.latitude,
							longitude: position.coords.longitude
						};
						$scope.passenger.icon = '../../../img/passenger-icon-24.png';
					}, 5000);

				});
			});
			$scope.callAlert = function(type, message) {
			  var alert = $ionicPopup.alert({
					title: type,
					template: message
				});

				alert.then(function() {	});
		  };
		  $scope.searchJitnies = function() {

				uiGmapGoogleMapApi.then(function(maps) {
					angular.forEach($scope.jitneys, function(value, index) {
						var passengerObject = {
							lat: $scope.passenger.coords.latitude,
							lng: $scope.passenger.coords.longitude
						};

						var jitneyObject = {
							lat: 0,
							lng: 0
						};
						
						jitneyObject.lat = value.latitude;
						jitneyObject.lng = value.longitude;
						//  IT CENTER MAP ON JITNEY POSITION, JITNEY POSITION SHOULD BE BETWEEN 1000 AND 300 KM
						if (DistanceCalculatorService.getDistance(passengerObject, jitneyObject) >= 1000 && 
								DistanceCalculatorService.getDistance(passengerObject, jitneyObject) <= 3000) {

							$scope.map = {
								center: {
									latitude: jitneyObject.lat,
									longitude: jitneyObject.lng
								},
								zoom: 15
							};
						} else {
							$scope.callAlert('sin colectivos!', 'no se han encontrado colectivos cercanos');
						};

					});
					
				});
		  };

		  $scope.goToConfigurations = function() {
		  	$state.go('passengerConfiguration');
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
			$scope.checkMapType($scope.passenger.automatic_map);
		  

		}]);
}).call(this);