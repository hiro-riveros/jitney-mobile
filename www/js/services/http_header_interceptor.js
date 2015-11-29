'use strict';

(function () {
	this.app.factory('HttpHeaderInterceptor', ['$injector', function($injector){
	 	return {
			request: function (config) {
				var user =  $injector.get('User');
				if(user.isLoggedIn()) {
					// config.headers['X-AdminUser-Email'] = AuthService.getSession().email;
					// config.headers['X-AdminUser-Token'] = AuthService.getSession().authenticationToken;
				}
				return config;
			}
	 	};
	}])
	.config(['$httpProvider', function($httpProvider) {
		$httpProvider.interceptors.push('HttpHeaderInterceptor');	
	}]);
}).call(this);
