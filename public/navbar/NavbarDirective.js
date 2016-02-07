(function() { 'use strict';

angular.module('myApp').directive('navbar', navbar);

function navbar() {
  return {
    restrict: 'E',
    templateUrl: '/navbar',
    controller: 'navbarController',
    controllerAs: 'vm'
  };
};

})();