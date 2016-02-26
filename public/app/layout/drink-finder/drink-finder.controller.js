(function() { 'use strict';

angular.module('drink-db')
.controller('DrinkFinderController', DrinkFinderController);

DrinkFinderController.$inject = ['AuthService','DrinkFactory'];

function DrinkFinderController(AuthService,DrinkFactory) {
  
  var vm = this;
  
  vm.userSession = AuthService.startUserSession();
  vm.getDrinks = getDrinks;
  vm.findDrinkByName = findDrinkByName;
  vm.isEditingDrink = isEditingDrink;
  vm.beginEditDrink = beginEditDrink;
  vm.updateDrink = updateDrink;
  vm.deleteDrink = deleteDrink;
  vm.drinkName = '';
  vm.showSearch = false;
  vm.drinks = false;
  vm.errorMessage = false;
  vm.noDrinksMessage = false;
  vm.isLoading = false;
  vm.editMode = false;
  vm.editedDrink = { _id:'' };
  
  function getDrinks(){
    vm.isLoading = true;
    vm.errorMessage = false;
    vm.showSearch = false;
    vm.noDrinksMessage = false;
    vm.drinkName = '';
    DrinkFactory.getDrinks(setDrinks,errorCallback);
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
    DrinkFactory.findDrinkByName(vm.drinkName,setDrinks,errorCallback);
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

    DrinkFactory.editDrink(vm.userSession.token,vm.editedDrink,drinkEditedCallback,errorCallback);
    
    vm.editedDrink = { _id:'' };
  };

  function drinkEditedCallback(data){
    console.log(data);
  };

  function deleteDrink(id){
    var confirmDelete = confirm('Are you sure you want to delete?');
    if (confirmDelete){
      DrinkFactory.deleteDrink(vm.userSession.token,id,drinkEditedCallback,errorCallback);
      var i;
      for (i=0; i<vm.drinks.length; i++){
        if (vm.drinks[i]._id === id){
          break;
        }
      }
      vm.drinks.splice(i,1);
    }
    vm.editMode = false;
  };
  
};

})();