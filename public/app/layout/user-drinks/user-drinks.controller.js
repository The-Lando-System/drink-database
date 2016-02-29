(function() { 'use strict';

angular.module('drink-db')
.controller('UserDrinksController', UserDrinksController);

UserDrinksController.$inject = ['AuthService','DrinkFactory'];

function UserDrinksController(AuthService,DrinkFactory) {
  
  var vm = this;
  
  vm.userSession = AuthService.startUserSession();
  vm.getMyDrinks = getMyDrinks;
  vm.findDrinkByName = findDrinkByName;
  vm.isEditingDrink = isEditingDrink;
  vm.beginEditDrink = beginEditDrink;
  vm.updateDrink = updateDrink;
  vm.deleteDrink = deleteDrink;
  vm.selectDrink = selectDrink;
  vm.addDrink = addDrink;
  vm.drinkName = '';
  vm.showSearch = false;
  vm.drinks = false;
  vm.userDrinks = false;
  vm.errorMessage = false;
  vm.successMessage = false;
  vm.noDrinksMessage = false;
  vm.isLoading = false;
  vm.editMode = false;
  vm.editedDrink = { _id:'' };
  vm.showAddDrink = false;
  vm.userDrink = {};
  
  function getMyDrinks(){
    vm.isLoading = true;
    vm.errorMessage = false;
    vm.showSearch = false;
    vm.noDrinksMessage = false;
    vm.showAddDrink = false;
    vm.drinkName = '';
    DrinkFactory.getUserDrinks(vm.userSession.token,vm.userSession.user.username,setUserDrinks,errorCallback);
  };

  function setUserDrinks(data){
    if (data.hasOwnProperty('message')){
      vm.noDrinksMessage = data.message;
    } else {
      vm.userDrinks = data;
    }
    vm.isLoading = false;
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

  function addDrink(){
    console.log(vm.userDrink);
    DrinkFactory.addUserDrink(vm.userSession.token,vm.userDrink,drinkSuccessfullyAdded,errorCallback);
    vm.userDrink = {};
    vm.showSearch = false;
    vm.drinks = false;
    vm.errorMessage = false;
    vm.noDrinksMessage = false;
    vm.isLoading = false;
    vm.editMode = false;
    vm.showAddDrink = false;
  };

  function drinkSuccessfullyAdded(data){
    vm.successMessage = "Drink successfully created!";
    console.log(data);
  };

  function selectDrink(selectedDrink){
    vm.selectDrink = {};
    vm.selectedDrink = selectedDrink;
    vm.userDrink.drinkId = selectedDrink._id;
    vm.userDrink.userId = vm.userSession.user.username;
    vm.showSearch = false;
    vm.drinks = false;
    vm.errorMessage = false;
    vm.noDrinksMessage = false;
    vm.isLoading = false;
    vm.editMode = false;
    vm.showAddDrink = true;
  };
  
};

})();