(function() { 'use strict';

angular.module('myApp').controller('navbarController', navbarController);

navbarController.$inject = ['AuthService','$scope'];

function navbarController(AuthService,$scope) {
  
  var vm = this;
  vm.logout = logout;

  $scope.$on('login', function(event, success) {
    if (success){
      vm.userSession = AuthService.startUserSession();
    }
  });

  function logout(){
    AuthService.logout();
    vm.userSession = AuthService.endUserSession();
  };

  angular.element(document).ready(function () {
    vm.userSession = AuthService.startUserSession();
  });
  
};

})();