/*
=========================================
	ROUTER CONFIGURATION
=========================================
*/

(function() {
	this.app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
		// Ionic uses AngularUI Router which uses the concept of states
		// Learn more here: https://github.com/angular-ui/ui-router
		// Set up the various states which the app can be in.
		// Each state's controller can be found in controllers.js
		$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
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
			controller: 'SignUpController'
		})

		// edit profile view
		.state('editProfile', {
			url: '/edit_profile',
			templateUrl: 'templates/edit_profile.html',
			controller: 'EditProfileController',
			resolve: {
				user: ['LocalStorageSingletonServices', function(LocalStorageSingletonServices) {
					return LocalStorageSingletonServices.getCurrentUser();
				}]
			}
		})

		// map view
		.state('mapJitney', {
			url: '/map_jitney',
			templateUrl: 'templates/map_jitney.html',
			controller: 'MapJitneyController',
			resolve: {
				passengers: ['Passenger', function(Passenger) {
					return Passenger.getPassengers();
				}],
				jitney: ['Jitney', function(Jitney) {
					return Jitney.getJitney(1);
				}]
			}
		})

		// map view
		.state('mapPassenger', {
			url: '/map_passenger',
			templateUrl: 'templates/map_passenger.html',
			controller: 'MapController',
			resolve: {
				passenger: ['Passenger', function(Passenger) {
					return Passenger.getPassenger(2);
				}],
				jitneys: ['Jitney', function(Jitney) {
					return Jitney.getJitneys();
				}]
			}
		})

		// passenger configuration view 
		.state('passengerConfiguration', {
			url: '/passenger_configuration',
			templateUrl: 'templates/passenger_configuration.html',
			controller: 'PassengerConfigurationController',
			resolve: {
				passenger: ['Passenger', function(Passenger) {
					return Passenger.getPassenger(2);
				}]
			}
		})
		
		// jitney configuration view
		.state('jitneyConfiguration', {
			url: '/jitney_configuration',
			templateUrl: 'templates/jitney_configuration.html',
			controller: 'JitneyConfigurationController',
			resolve: {
				jitney: ['Jitney', function(Jitney) {
					return Jitney.getJitney(1);
				}]
			}
		});

		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/');
	});
}).call(this);