/*
=========================================
	MAP CONTROLLER
=========================================
*/

(function() {
	this.app.controller('MapController', ['$scope', '$geolocation', '$log', '$http',
		function($scope, $geolocation, $log, $http){
	/*
	=========================================
		SCOPE DEFINITION
	=========================================
	*/
			/* GET GEOLOCATION AND LAT AND LON TO SCOPE  */
			var firstCall = 1;
			$geolocation.getCurrentPosition().then(function(position) {
				$scope.map = {
					center: {
						latitude: position.coords.latitude,
						longitude: position.coords.longitude
					},
					zoom: 15, // radius of 3 km
					scrollwheel: false,
					disableDoubleClickZoom: true
				};
				$log.info('map call Nº: ' + firstCall + ' - ' +  JSON.stringify($scope.map.center));
			});

			// setInterval(function(){
			//   $geolocation.getCurrentPosition().then(function(position) {
			//     $scope.map = {
			//       center: {
			//         latitude: position.coords.latitude,
			//         longitude: position.coords.longitude
			//       },
			//       zoom: 18
			//     };
			//     firstCall++;
			//     console.info('map call Nº: ' + firstCall + ' ' +  JSON.stringify($scope.map.center));
			//   });
			// }, 5000);




			/* VALIDATION TO SEPUT MAP BY HOUR OF DAY */
			var date = new Date();
			if (date.getHours() >= 6 && date.getHours() <= 17) {
				$scope.options = { styles: [{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7dcdcd"}]}]};
			}else{
				$scope.options = { styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}]};
			};


	}]);
}).call(this);