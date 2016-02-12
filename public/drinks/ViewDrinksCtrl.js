(function() { 'use strict';

angular.module('myApp').controller('viewDrinksController', viewDrinksController);

viewDrinksController.$inject = ['AuthService','drinkFactory'];

function viewDrinksController(AuthService,drinkFactory) {
  
  var vm = this;
  
  vm.getDrinks = getDrinks;
  vm.findDrinkByName = findDrinkByName;
  vm.isEditingDrink = isEditingDrink;
  vm.beginEditDrink = beginEditDrink;
  vm.updateDrink = updateDrink;
  vm.drinkName = '';
  vm.showSearch = false;
  vm.drinks = false;
  vm.errorMessage = false;
  vm.noDrinksMessage = false;
  vm.isLoading = false;
  vm.editedDrink = { _id:'' };
  
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

  function isEditingDrink(id){
    return vm.editedDrink._id === id ? true : false;
  };

  function beginEditDrink(id){
    for (var i=0; i<vm.drinks.length; i++){
      if (vm.drinks[i]._id === id){
        vm.editedDrink = vm.drinks[i];
        return;
      }
    }
  };

  function updateDrink(){
    vm.editedDrink.addedBy = vm.userSession.user.username;
    vm.editedDrink.timeAdded = (new Date()).toString();

    console.log(vm.editedDrink);
    vm.editedDrink = { _id:'' };
  };

  angular.element(document).ready(function () {
    vm.userSession = AuthService.startUserSession();
  });
  
};

})();