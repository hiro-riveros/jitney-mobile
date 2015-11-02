/*
=========================================
	MAP CONTROLLER
=========================================
*/

(function() {
	this.app.controller('MapJitneyController', ['$scope', '$geolocation', '$log', '$http', '$state', '$ionicPopup',
		function($scope, $geolocation, $log, $http, $state, $ionicPopup){
	/*
	=========================================
		SCOPE DEFINITION
	=========================================
	*/	
			$scope.passenger = 0;
			$scope.map = {
				center: {
					latitude: -33.436751,
					longitude: -70.6452024
				},
				zoom: 15
			};
			$scope.jitnies = [];
			/* GET GEOLOCATION AND LAT AND LON TO SCOPE  */
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
				// TO-DO GET CURRENT JITNEY AND ALL NEARBY PASSENGERS
				$scope.jitnies.push({
					id: 0,
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					icon: '../../../img/jitney-icon-24.png'
				});

				$scope.jitnies.push({
					id: 1,
					latitude: -33.4136139,
					longitude: -70.5828831,
					icon: '../../../img/passenger-icon-24.png'
				});

			});

			var buttonAddPassenger = document.getElementById('btn-add-passenger');
			var buttonRemovePassenger = document.getElementById('btn-remove-passenger');
			buttonRemovePassenger.setAttribute('disabled', 'disabled');
			
			// TO-DO SEND INFORMATION BY SOCKET TO UPDATE MAP
			$scope.addPassenger = function(){
				if ($scope.passenger === 3) {
					buttonAddPassenger.setAttribute('disabled', 'disabled');
					buttonRemovePassenger.removeAttribute('disabled');
				}else{
					$scope.passenger += 1;
					buttonRemovePassenger.removeAttribute('disabled');
				};
			};
			// TO-DO SEND INFORMATION BY SOCKET TO UPDATE MAP
			$scope.removePassenger = function(){
				if ($scope.passenger <= 1 ) {
					buttonRemovePassenger.setAttribute('disabled', 'disabled');
				}else{
					$scope.passenger -= 1;
				};

				if ($scope.passenger < 4) {
					buttonAddPassenger.removeAttribute('disabled');
				};
			};

			// SEARCH PASSENGERS METHOD. FIND NEARBY PASSENGER AND GIVE FOCUS 
			// TO-DO ADD FX FOR ACTIVATE SEARCH.
			// TO-DO ADD RESTMOD METHOD TO FIND ALL FIND NEARBY PASSENGER AND ASSIGN TO MARKERS
			// TO-DO ADD JITNEY TO MAP OF PASSENGERS.
			$scope.searchPassengers = function() {

			};

			$scope.goToConfigurations = function(){
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
