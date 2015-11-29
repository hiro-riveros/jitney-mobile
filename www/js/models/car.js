'use strict';

/**
* @name: Car
* @description: contains a set of car
* @attributes:
*
* | Name              | Type           |
* |-------------------|----------------|
* | @id               | int            |
* | @jitney_id        | int            |
* | @patent           | string         |
* | @model            | string         |
* | @route            | string         |
* | @passengers       | int[]          |
*
*/

(function() {
	this.app.factory('Car', function($http, $q, ENV) {
		return {
			getCar: function(carId) {
				var defer = $q.defer();
				$http({
				  method: 'GET',
				  url: ENV.API_URL + 'cars/' + carId
				}).then(function(Car) {
					if (Car !== undefined) {
						var car = {
							id: Car.data.id,
							jitneyId: Car.data.jitney_id,
							patent: Car.data.patent,
							model: Car.data.model,
							route: Car.data.route,
							passengers: Car.data.passengers
						};
							defer.resolve(car);
					} else {
							return {
								error: 'error al intentar obtener los pasajeros'
							};
					};
				}, function(reason) {
					defer.reject(reason.data);
				});
				return defer.promise;
			},
			updateCarPassengers: function (Car) {
				var defer = $q.defer();
				$http.put(ENV.API_URL + 'cars/' + Car.id, {
					jitney_id: Car.jitneyId,
					passengers: Car.passengers
				}).then(function(Car) {
					if (Car !== undefined) {
						var car = {
							id: Car.data.id,
							jitneyId: Car.data.jitney_id,
							patent: Car.data.patent,
							model: Car.data.model,
							route: Car.data.route,
							passengers: Car.data.passengers
						};
						defer.resolve(car);
					};
				}, function (reason) {
					defer.reject(reason.data);
				});
				return defer.promise;
			}
		}
  });
}).call(this);
