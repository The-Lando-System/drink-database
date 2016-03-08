(function() { 'use strict';

angular.module('drink-db')
.controller('DrinkAdministrationController', DrinkAdministrationController);

DrinkAdministrationController.$inject = ['AuthService','DrinkFactory','$location','$anchorScroll'];

function DrinkAdministrationController(AuthService,DrinkFactory,$location,$anchorScroll) {
	var vm = this;

  vm.userSession = AuthService.startUserSession();
  vm.addDrink = addDrink;
  vm.setType = setType;
  vm.getDrinks = getDrinks;
  vm.findDrinkByName = findDrinkByName;
  vm.isEditingDrink = isEditingDrink;
  vm.beginEditDrink = beginEditDrink;
  vm.updateDrink = updateDrink;
  vm.deleteDrink = deleteDrink;
  vm.drinkName = '';
  vm.drink = { type: 'Beer' };
  vm.drinks = false;
  vm.showSearch = false;
  vm.errorMessage = false;
  vm.successMessage = false;
  vm.noDrinksMessage = false;
  vm.isLoading = false;
  vm.editMode = false;
  vm.showAddDrinkForm = false;
  vm.editedDrink = { _id:'' };

  function addDrink(){
    vm.drink.addedBy = vm.userSession.user.username;
    vm.drink.timeAdded = (new Date()).toString();
    vm.isLoading = true;
    DrinkFactory.addDrink(vm.userSession.token,vm.drink,drinkAddSuccess,errorCallback);
    vm.drink = {};
    vm.drink.type = "Beer";
  };

  function drinkAddSuccess(data){
    vm.successMessage = "Drink successfully created!";
    console.log(data);
    $location.hash('top');
    $anchorScroll();
    vm.isLoading = false;
  };
  
  function errorCallback(err){
    vm.errorMessage = err;
  };

  function setType(type){
    vm.drink.type = type;
  };
  
  function getDrinks(){
    vm.isLoading = true;
    vm.errorMessage = false;
    vm.successMessage = false;
    vm.showSearch = false;
    vm.noDrinksMessage = false;
    vm.showAddDrinkForm = false;
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
    vm.showAddDrinkForm = false;
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