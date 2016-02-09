(function() { 'use strict';

angular.module('myApp').controller('viewDrinksController', viewDrinksController);

viewDrinksController.$inject = ['AuthService','drinkFactory'];

function viewDrinksController(AuthService,drinkFactory) {
  
  var vm = this;
  
  vm.getDrinks = getDrinks;
  vm.drinks = false;
  vm.errorMessage = false;
  
  function getDrinks(){
    vm.errorMessage = false;
    drinkFactory.getDrinks(vm.userSession.token,successCallback,errorCallback);
  };
  
  function successCallback(data){
    vm.drinks = data;
  };
  
  function errorCallback(err){
    vm.errorMessage = err;
  };

  angular.element(document).ready(function () {
    vm.userSession = AuthService.startUserSession();
  });
  
};

})();