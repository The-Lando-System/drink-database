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
    vm.userDrinks = false;
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
    vm.userDrinks = false;
  };
  
  function errorCallback(err){
    vm.errorMessage = err;
    vm.isLoading = false;
    vm.userDrinks = false;
  };

  function findDrinkByName(){
    vm.isLoading = true;
    vm.errorMessage = false;
    vm.noDrinksMessage = false;
    vm.drinks = false;
    vm.userDrinks = false;
    DrinkFactory.findDrinkByName(vm.drinkName,setDrinks,errorCallback);
  };

  function isEditingDrink(id){
    return vm.editedDrink._id === id ? true : false;
  };

  function beginEditDrink(id){
    for (var i=0; i<vm.userDrinks.length; i++){
      if (vm.userDrinks[i]._id === id){
        vm.editedDrink = vm.userDrinks[i];
        return;
      }
    }
  };

  function updateDrink(){
    var updatedDrink = {
      userId:     vm.userSession.user.username,
      drinkId:    vm.editedDrink._id,
      tasteNotes: vm.editedDrink.tasteNotes,
      smellNotes: vm.editedDrink.smellNotes,
      otherNotes: vm.editedDrink.otherNotes,
      rating:     vm.editedDrink.rating
    };
    DrinkFactory.editUserDrink(vm.userSession.token,updatedDrink,drinkEditedCallback,errorCallback);
    vm.editedDrink = { _id:'' };
  };

  function drinkEditedCallback(data){
    console.log(data);
  };

  function deleteDrink(id){
    var confirmDelete = confirm('Are you sure you want to delete?');
    if (confirmDelete){
      var drinkToDelete = {
        drinkId: id,
        userId: vm.userSession.user.username
      };
      DrinkFactory.deleteUserDrink(vm.userSession.token,drinkToDelete,drinkEditedCallback,errorCallback);
      console.log(drinkToDelete)
      var i;
      for (i=0; i<vm.userDrinks.length; i++){
        if (vm.userDrinks[i]._id === id){
          break;
        }
      }
      vm.userDrinks.splice(i,1);
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
    vm.userDrinks = false;
  };

  function drinkSuccessfullyAdded(data){
    vm.successMessage = "Drink successfully created!";
    console.log(data);
  };

  function selectDrink(selectedDrink){
    vm.selectedDrink = {};
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
    vm.userDrinks = false;
  };
  
};

})();