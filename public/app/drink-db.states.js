(function() { 'use strict';

angular.module('drink-db')
.config(config);

function config($urlRouterProvider,$stateProvider,$locationProvider) {
  
  $locationProvider.html5Mode(true);

  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: '/app/layout/login/login.html',
    controller: 'LoginController',
    controllerAs: 'vm'
  })
  .state('home', {
    url: '/home',
    templateUrl: '/app/layout/home/home.html',
    controller: 'HomeController',
    controllerAs: 'vm'
  })
  .state('drink-admin', {
    url: '/drink-admin',
    templateUrl: '/app/layout/drink-administration/drink-administration.html',
    controller: 'DrinkAdministrationController',
    controllerAs: 'vm'
  })
  .state('drink-viewer', {
    url: '/drink-viewer',
    templateUrl: '/app/layout/drink-viewer/drink-viewer.html',
    controller: 'DrinkViewerController',
    controllerAs: 'vm'
  })
  .state('user-drinks', {
    url: '/user-drinks',
    templateUrl: '/app/layout/user-drinks/user-drinks.html',
    controller: 'UserDrinksController',
    controllerAs: 'vm'
  })
  .state('users', {
    url: '/user-management',
    templateUrl: '/app/layout/users/user-management.html',
    controller: 'UserMgmtController',
    controllerAs: 'vm'
  })
  .state('user-page', {
    url: '/user-management/:userId',
    templateUrl: '/app/layout/users/user.html',
    controller: 'UserController',
    controllerAs: 'vm'
  });

  $urlRouterProvider
  .otherwise('/login');

  $urlRouterProvider.rule(removeTrailingSlash);

  function removeTrailingSlash(injector, location){
    var path = location.path();
    var hasTrailingSlash = path[path.length-1] === '/';
    if(hasTrailingSlash) {
      var newPath = path.substr(0, path.length - 1); 
      return newPath; 
    } 
  };

};

})();