(function() { 'use strict';

angular.module('drink-db')
.directive('navbar', navbar);

function navbar() {
  return {
    restrict: 'E',
    templateUrl: '/navbar',
    controller: 'NavbarController',
    controllerAs: 'vm'
  };
};

})();