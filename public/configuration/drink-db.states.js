(function() { 'use strict';

angular.module('drink-db')
.config(config);

function config($urlRouterProvider,$stateProvider,$locationProvider) {
  
  $locationProvider.html5Mode(true);

  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: '/login/login.html',
    controller: 'LoginController',
    controllerAs: 'vm'
  })
  .state('home', {
    url: '/home',
    templateUrl: '/home/home.html',
    controller: 'HomeController',
    controllerAs: 'vm'
  })
  .state('drink-finder', {
    url: '/drink-finder',
    templateUrl: '/drink-finder/drink-finder.html',
    controller: 'DrinkFinderController',
    controllerAs: 'vm'
  })
  .state('drink-viewer', {
    url: '/drink-viewer',
    templateUrl: '/drink-viewer/drink-viewer.html',
    controller: 'DrinkViewerController',
    controllerAs: 'vm'
  })
  .state('users', {
    url: '/user-management',
    templateUrl: '/users/user-management.html',
    controller: 'UserMgmtController',
    controllerAs: 'vm'
  })
  .state('user-page', {
    url: '/user-management/:userId',
    templateUrl: '/users/user.html',
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