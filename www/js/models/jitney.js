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
	this.app.factory('Jitney', function($http, $q, ENV) {
		return {

			getJitneys: function() {
				var defer = $q.defer();
				$http({
				  method: 'GET',
				  url: ENV.API_URL + 'jitneys'
				}).then(function(jitneys) {
					if (jitneys.data !== undefined && jitneys.data !== '') {
							defer.resolve(jitneys);
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
			updatePassengerPosition: function (position) {
				var defer = $q.defer();
				$http({
				  method: 'PUT',
				  url: ENV.API_URL + 'jitneys',
				  params: {
				  	user_id: position.userId,
				  	latitude: position.latitude,
				  	longitude: position.longitude
				  }
				}).then(function(jitney) {
					if (jitney !== undefined && jitney.data !== '') {
							defer.resolve(jitney);
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
			deletePassengerPosition: function (jitney) {
				var defer = $q.defer();
				$http({
				  method: 'DELETE',
				  url: ENV.API_URL + 'jitneys',
				  params: {
				  	user_id: jitney.userId,
				  }
				}).then(function(jitney) {
					if (jitney.data !== undefined && jitney.data !== '') {
							defer.resolve(jitney);
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
