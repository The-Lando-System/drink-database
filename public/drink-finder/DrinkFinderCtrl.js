(function() { 'use strict';

angular.module('myApp').controller('drinkFinderController', drinkFinderController);

drinkFinderController.$inject = ['AuthService','drinkFactory','$location'];

function drinkFinderController(AuthService,drinkFactory,$location) {
  
  var vm = this;
  
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
    drinkFactory.getDrinks(vm.userSession.token,setDrinks,errorCallback);
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
    drinkFactory.findDrinkByName(vm.userSession.token,vm.drinkName,setDrinks,errorCallback);
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

    drinkFactory.editDrink(vm.userSession.token,vm.editedDrink,drinkEditedCallback,errorCallback);
    
    vm.editedDrink = { _id:'' };
  };

  function drinkEditedCallback(data){
    console.log(data);
  };

  function deleteDrink(id){
    var confirmDelete = confirm('Are you sure you want to delete?');
    if (confirmDelete){
      drinkFactory.deleteDrink(vm.userSession.token,id,drinkEditedCallback,errorCallback);
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

  angular.element(document).ready(function () {
    vm.userSession = AuthService.startUserSession();
  });
  
};

})();