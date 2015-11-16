'use strict';

(function () {
	this.app.service('LocalStorageSingletonServices', ['$localStorage', function($localStorage){
		var currentUser, passenger, jitney, position;
		return {
			getCurrentUser: function () {
				return currentUser = $localStorage.currentUser;
			},
			setCurrentUser: function (data) {
				$localStorage.currentUser = data;
			},
			getPassenger: function () {
				return passenger = $localStorage.passenger;
			},
			setPassenger: function (data) {
				$localStorage.passenger = data;
			},
			getJitney: function () {
				return jitney = $localStorage.jitney;
			},
			setJitney: function (data) {
				$localStorage.jitney = data;
			},
			getPosition: function () {
				return position = $localstorage.position;
			},
			setPosition: function (data) {
				$localstorage.position = data;
			}

		};
	}]);	 	
}).call(this);
