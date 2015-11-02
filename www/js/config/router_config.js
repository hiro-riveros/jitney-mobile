/*
=========================================
	ROUTER CONFIGURATION
=========================================
*/

(function() {
	this.app.config(function($stateProvider, $urlRouterProvider) {

		// Ionic uses AngularUI Router which uses the concept of states
		// Learn more here: https://github.com/angular-ui/ui-router
		// Set up the various states which the app can be in.
		// Each state's controller can be found in controllers.js
		$stateProvider

		// login view
		.state('login', {
			url: '/',
			templateUrl: 'templates/login.html',
			controller: 'LoginController'
		})

		// sign in view
		.state('signup', {
			url: '/signup',
			templateUrl: 'templates/signup.html',
			controller: 'SignInController'
		})

		// edit profile view
		.state('editProfile', {
			url: '/edit_profile',
			templateUrl: 'templates/edit_profile.html',
			controller: 'EditProfileController'
		})

		// map view
		.state('mapJitney', {
			url: '/map_jitney',
			templateUrl: 'templates/map_jitney.html',
			controller: 'MapJitneyController'
		})

		// map view
		.state('mapPassenger', {
			url: '/map_passenger',
			templateUrl: 'templates/map_passenger.html',
			controller: 'MapController'
		})

		// configuration view
		.state('configuration', {
			url: '/configuration',
			templateUrl: 'templates/configuration.html',
			controller: 'ConfigurationController'
		});

		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/');
	});
}).call(this);