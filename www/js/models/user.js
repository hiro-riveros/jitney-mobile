'use strict';

/**
* @name: User
* @description: contains a set of user
* @attributes:
*
* | Name              | Type           |
* |-------------------|----------------|
* | @id               | int            |
* | @firstName        | string         |
* | @lastName         | string         |
* | @age              | int            |

*
*/

(function() {
	this.app.factory('User', ['$http', '$q', 'LocalStorageSingletonServices', 'ENV', function($http, $q, LocalStorageSingletonServices, ENV) {
		var currentUser;

		if(LocalStorageSingletonServices.getCurrentUser() != undefined){
			currentUser = LocalStorageSingletonServices.getCurrentUser();
		};
		
		return {
			isLoggedIn: function() {
         return !_.isEmpty(currentUser);
     	},
			create: function(User) {
				var defer = $q.defer();
				$http({
		    	url: ENV.API_URL + 'users',
		    	method: 'POST',
		    	params: { 
						email: User.email, 
						password: User.password, 
						password_confirmation: User.passwordConfirmation
					}
				}).then(function(User) {
					if (User.data !== undefined && User.data !== '') {
							var currentUser = {
								id: User.data.id,
								userId: User.data.user_id,
								email: User.data.email,
						  	password: User.data.password,
						  	actableType: User.data.actable_type,
						  	authenticationToken: User.data.authentication_token
							};
							LocalStorageSingletonServices.setCurrentUser(currentUser);
							defer.resolve(currentUser);
					};
				}, function(reason) {
					defer.reject(reason.data);
				});
				return defer.promise;
			},
			update: function(User) {
				var defer = $q.defer();
				$http({
				  method: 'PUT',
				  url: ENV.API_URL + 'users/' + User.userId,
				  params:{
				  	id: User.userId,
				  	name: User.name,
				  	last_name: User.lastName,
				  	email: User.email,
				  	password: User.password,
				  	password_confirmation: User.passwordConfirmation,
				  	actable_type: LocalStorageSingletonServices.getCurrentUser().actableType
				  }
				}).then(function(User) {
					if (User.data !== undefined && User.data !== '') {
							var currentUser = {
								id: User.data.specific_id,
								userId: User.data.id,
								email: User.data.email,
								name: User.data.name,
								lastName: User.data.last_name,
						  	password: User.data.password,
						  	passwordConfirmation: User.data.password_confirmation,
						  	authenticationToken: User.data.authentication_token,
						  	actableType: User.data.actable_type
							};
							LocalStorageSingletonServices.setCurrentUser(currentUser);
							defer.resolve(currentUser);
					};
				 }, function(reason) {
				  	defer.reject(reason.data);
				});
				return defer.promise;
			},
			login: function(User) {
				LocalStorageSingletonServices.deleteCurrentUser();
				var defer = $q.defer();
				$http({
				  method: 'POST',
				  url: ENV.API_URL + 'login',
				  params: {
				  	email: User.email,
				  	password: User.password
				  }
				}).then(function(User) {
					if (User.data !== undefined && User.data !== '' && User.data.id !== undefined) {
						var currentUser = {
							id: User.data.specific_id,
							userId: User.data.id,
							email: User.data.email,
							name: User.data.name,
							lastName: User.data.last_name,
							actableType: User.data.actable_type,
							authenticationToken: User.data.authentication_token
						};
						LocalStorageSingletonServices.setCurrentUser(currentUser);
						defer.resolve(currentUser);
					};
				}, function(reason) {
					defer.reject(reason.data);
				});
				return defer.promise;
			},
			logout: function(authenticationToken) {
				return LocalStorageSingletonServices.deleteCurrentUser();
			}
		}
  }]);
}).call(this);
