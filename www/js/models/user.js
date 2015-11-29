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
	this.app.factory('User', function($http, $q, ENV, LocalStorageSingletonServices) {
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
				var defer = $q.defer();
				$http({
				  method: 'POST',
				  url: ENV.API_URL + 'sessions/sign_in',
				  data: {
				  	email: User.email,
				  	password: User.password
				  }
				}).then(function(User) {
					debugger;
					if (User.data !== undefined && User.data !== '' && User.data.id !== undefined) {
						var currentUser = {
						 	id: User.data.id,
						 	name: User.data.name,
						 	email: User.data.email,
						 	password: User.data.password,
						 	passwordConfirmation: User.data.password_confirmation,
						 	lastName: User.data.last_name,
						 	slastName: User.data.slast_name,
						 	accountType: User.data.account_type,
						 	age: User.age
						};
						LocalStorageSingletonServices.setCurrentUser(currentUser);
						defer.resolve(currentUser);
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
		}
  });
}).call(this);
