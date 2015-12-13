'use strict';

(function () {
	this.app.factory('DistanceCalculatorService', function() {

	 	return {
			getDistance: function (p1, p2) { // GET DISTANCE IN METER			
				var radius = function(x) {
					return x * Math.PI / 180;
				};
				
				var earthRadius = 6378137; // EARTH’S MEAN RADIUS IN METER
				var distanceLatitude = radius(p2.lat - p1.lat);
				var distanceLongitude = radius(p2.lng - p1.lng);
				var a = Math.sin(distanceLatitude / 2) * Math.sin(distanceLatitude / 2) + Math.cos(radius(p1.lat)) * Math.cos(radius(p2.lat)) * Math.sin(distanceLongitude / 2) * Math.sin(distanceLongitude / 2);
				var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
				var distance = earthRadius * c;
				// RETURNS THE DISTANCE IN METER
				return Math.round(distance);
			}
	 	};
	})
}).call(this);
