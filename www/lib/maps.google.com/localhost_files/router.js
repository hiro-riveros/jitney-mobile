(function(){
  this.app.config(function($stateProvider, $urlRouterProvider){
    $stateProvider

    .state('welcome', {
      url        : '/welcome',
      templateUrl: 'templates/welcome.html',
      controller : 'welcomeController',
      params     : {
        isRedirect: false
      }
    })
    // .state('form', {
    //   url: '/form:positions',
    //   templateUrl: 'templates/form.html',
    //   controller: 'FormController',
    //   resolve: {
    //     positions: ['$stateParams', function($stateParams) {
    //       return $stateParams.positions;
    //     }]
    //   }
    // })


    $urlRouterProvider.otherwise('/welcome');
  })


}).call(this);
