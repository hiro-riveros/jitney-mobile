'use strict';

/**
* @name: Position
* @description: contains a set of user position
* @attributes:
*
* | Name              | Type           |
* |-------------------|----------------|
* | @id               | int            |
* | @user_id					| int 		       |
* | @latitud					| float		       |
* | @longitude				| float		       |
* | @perimeter				| json		       |
*
*/

(function() {
	this.app.factory('Position', ['$http', '$q', 'ENV', function($http, $q, ENV) {
    return {
    	getPosition: function (userId) {
				var defer = $q.defer();
				$http({
				  method: 'GET',
				  url: ENV.API_URL + 'positions',
				  params:{
				  	user_id: userId,
				  }
				}).then(function(Position) {
					if (Position.data !== undefined && Position.data !== '') {
							var position = {
								id: Position.data.id,
								userId: Position.data.user_id,
						  	latitude: Position.data.latitude,
						  	longitude: Position.data.longitude,
						  	perimeter: Position.data.perimeter
							};
							defer.resolve(position);
					} else {
						return {
							error: 'lo sentimos no hemos podido crear tu cuenta'
						};
					};
				}, function(reason) {
					defer.reject(reason.data);
				});
				return defer.promise;
    	},
    	create: function (Position) {
				var defer = $q.defer();
				$http({
		    	url: ENV.API_URL + 'positions',
		    	method: 'POST',
		    	params: { 
						user_id: Position.userId,
					  latitude: Position.latitude,
					  longitude: Position.longitude,
					  perimeter: Position.perimeter
					}
				}).then(function(position) {
					defer.resolve(position.data);
				}, function (reason) {
					defer.reject(reason.data);
				});
				return defer.promise;
    	},
    	update: function (Position) {
				var defer = $q.defer();
				$http({
				  method: 'PUT',
				  url: ENV.API_URL + 'positions',
				  params:{
				  	user_id: Position.userId,
				  	latitude: Position.latitude,
				  	longitude: Position.longitude,
				  	perimeter: Position.perimeter
				  }
				}).then(function(Position) {
					if (Position.data !== undefined && Position.data !== '') {
							var position = {
								id: Position.data.id,
								userId: Position.data.user_id,
						  	latitude: Position.data.latitude,
						  	longitude: Position.data.longitude,
						  	perimeter: Position.data.perimeter
							};
							defer.resolve(position);
					} else {
						return {
							error: 'lo sentimos no hemos podido crear tu cuenta'
						};
					};
				}, function(reason) {
					defer.reject(reason.data);
				});
				return defer.promise;
    	}
    };
  }]);
}).call(this);