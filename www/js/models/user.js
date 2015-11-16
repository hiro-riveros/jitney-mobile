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
* | @email            | string         |
* | @nickname         | string         |
*
*/

(function() {
	this.app.factory('User', function($http, $q, ENV, LocalStorageSingletonServices) {
		return {

			create: function(User) {
				var defer = $q.defer();
				$http({
				  method: 'POST',
				  url: ENV.API_URL + 'users',
				  params:{
			  		email: User.email,
				  	password: User.password,
				  	password_confirmation: User.passwordConfirmation
				  }
				}).then(function(User) {
					if (User.data !== undefined && User.data !== '') {
							var currentUser = {
								id: User.data.id,
								email: User.data.email,
						  	password: User.data.password,
						  	passwordConfirmation: User.data.password_confirmation
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
			},
			update: function(User) {
				debugger;
				$http({
				  method: 'PUT',
				  url: ENV.API_URL + '/users/update',
				  params:{
				  	id: User.id,
				  	name: User.name,
				  	email: User.email,
				  	password: User.password,
				  	password_confirmation: User.passwordConfirmation,
				  	last_name: User.lastName,
				  	slast_name: User.slastName,
				  	account_type: User.accountType,
				  	age: User.age
				  }
				}).then(function(response) {

				  }, function(reason) {

				});
			},
			login: function(User) {
				debugger;
				var defer = $q.defer();
				$http({
				  method: 'POST',
				  url: 'http://localhost:3000/users/sign_in',
				  params:{
				  	email: User.email,
				  	password: User.password
				  }
				}).then(function(User) {
					debugger;
					if (User.data !== undefined && User.data !== '') {
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
