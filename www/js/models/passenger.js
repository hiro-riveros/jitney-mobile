'use strict';

/**
* @name: Passenger
* @description: contains a set of passenger
* @attributes:
*
* | Name              | Type           |
* |-------------------|----------------|
* | @id               | int            |
* | @firstName        | string         |
* | @lastName         | string         |
* | @email            | string         |
* | @nickname         | string         |
*
*/

(function() {
	this.app.factory('Passenger', function($http, $q, ENV) {
		return {

			getPassengers: function() {
				var defer = $q.defer();
				$http({
				  method: 'GET',
				  url: ENV.API_URL + 'passengers'
				}).then(function(passengers) {
					if (passengers !== undefined) {
							defer.resolve(passengers);
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
			updatePassengerPosition: function (Position) {
				var defer = $q.defer();
				$http({
				  method: 'PUT',
				  url: ENV.API_URL + 'passengers',
				  params: {
				  	user_id: Position.userId,
				  	latitude: Position.latitude,
				  	longitude: Position.longitude
				  }
				}).then(function(passenger) {
					if (passenger !== undefined) {
							defer.resolve(passenger);
					} else {
						return {
							error: 'error al intentar actualizar tu posición'
						};
					};
				}, function(reason) {
					defer.reject(reason.data);
				});
				return defer.promise;
			},
			deletePassengerPosition: function (passenger) {
				var defer = $q.defer();
				$http({
				  method: 'DELETE',
				  url: ENV.API_URL + 'passengers',
				  params: {
				  	user_id: passenger.userId,
				  }
				}).then(function(passenger) {
					if (passenger !== undefined) {
							defer.resolve(passenger);
					} else {
						return {
							error: 'error al intentar actualizar tu posición'
						};
					};
				}, function(reason) {
					defer.reject(reason.data);
				});
				return defer.promise;
			}

		}
  });
}).call(this);
