(function() { 'use strict';

angular.module('myApp').controller('viewDrinksController', viewDrinksController);

viewDrinksController.$inject = ['AuthService','drinkFactory'];

function viewDrinksController(AuthService,drinkFactory) {
  
  var vm = this;
  
  vm.getDrinks = getDrinks;
  vm.findDrinkByName = findDrinkByName;
  vm.drinkName = '';
  vm.showSearch = false;
  vm.drinks = false;
  vm.errorMessage = false;
  vm.noDrinksMessage = false;
  vm.isLoading = false;
  
  function getDrinks(){
    vm.isLoading = true;
    vm.errorMessage = false;
    vm.showSearch = false;
    vm.noDrinksMessage = false;
    vm.drinkName = '';
    if (!vm.userSession.user){
      vm.noDrinksMessage = 'You need to login to find drinks!'
      vm.isLoading = false;
    } else {
      drinkFactory.getDrinks(vm.userSession.token,setDrinks,errorCallback);
    }
  };
  
  function setDrinks(data){
    if (data.hasOwnProperty('message')){
      vm.noDrinksMessage = data.message;
    } else {
      vm.drinks = data;
    }
    vm.isLoading = false;
  };
  
  function errorCallback(err){
    vm.errorMessage = err;
    vm.isLoading = false;
  };

  function findDrinkByName(){
    vm.isLoading = true;
    vm.errorMessage = false;
    vm.noDrinksMessage = false;
    vm.drinks = false;
    if (!vm.userSession.user){
      vm.noDrinksMessage = 'You need to login to find drinks!'
      vm.isLoading = false;
    } else {
      drinkFactory.findDrinkByName(vm.userSession.token,vm.drinkName,setDrinks,errorCallback);
    }
  };

  angular.element(document).ready(function () {
    vm.userSession = AuthService.startUserSession();
  });
  
};

})();