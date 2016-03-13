(function() { 'use strict';

angular.module('drink-db')
.controller('UserDrinksController', UserDrinksController);

UserDrinksController.$inject = ['AuthService','DrinkFactory','UserDrinkFactory'];

function UserDrinksController(AuthService,DrinkFactory,UserDrinkFactory) {
  
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
  vm.searchResults = false;
  vm.userDrinks = false;
  vm.errorMessage = false;
  vm.successMessage = false;
  vm.noDrinksMessage = false;
  vm.isLoading = false;
  vm.editMode = false;
  vm.editedDrink = { _id:'' };
  vm.showAddDrink = false;
  vm.userDrink = {};

  // ====== TESTING =============
  DrinkFactory.findDrinkByName(vm.drinkName,setTestDrinks,errorCallback);
  function setTestDrinks(data){

    vm.drinkInfo = {};

    vm.drinkInfo.headers = [
      {name:'Type', attrName:'type'},
      {name:'Name', attrName:'name'}
    ];

    vm.drinkInfo.drinks = data;
  };

  vm.clickRow = clickRow;
  function clickRow(msg) {
    console.log("Row clicked")
    console.log(msg);
  };

  vm.testBeginEdit = testBeginEdit;
  function testBeginEdit(msg) {
    console.log("Begin edit")
    console.log(msg);
  };

  vm.testDelete = testDelete;
  function testDelete(msg) {
    console.log("Delete")
    console.log(msg);
  };

  vm.testUpdate = testUpdate;
  function testUpdate(msg) {
    console.log("Update")
    console.log(msg);
  };
  // ====== END TESTING =============
  
  function getMyDrinks(){
    vm.isLoading = true;
    vm.errorMessage = false;
    vm.showSearch = false;
    vm.noDrinksMessage = false;
    vm.showAddDrink = false;
    vm.userDrinks = false;
    vm.successMessage = false;
    vm.drinkName = '';
    UserDrinkFactory.getUserDrinks(vm.userSession.token,vm.userSession.user.username,setUserDrinks,errorCallback);
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
      
      vm.searchResults = {};

      vm.searchResults.headers = [
        {name:'Type', attrName:'type'},
        {name:'Name', attrName:'name'},
        {name:'Style', attrName:'style'},
        {name:'ABV', attrName:'abv'},
        {name:'Company', attrName:'company'},
        {name:'City', attrName:'city'},
        {name:'State', attrName:'state'}
      ];

      vm.searchResults.drinks = data;

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
    vm.successMessage = false;
    vm.noDrinksMessage = false;
    vm.searchResults = false;
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
    UserDrinkFactory.editUserDrink(vm.userSession.token,updatedDrink,drinkEditedCallback,errorCallback);
    vm.editedDrink = { _id:'' };
  };

  function drinkEditedCallback(data){
    vm.isLoading = false;
    vm.editMode = false;
    console.log(data);
  };

  function deleteDrink(id){
    var confirmDelete = confirm('Are you sure you want to delete?');
    if (confirmDelete){
      vm.isLoading = true;
      vm.errorMessage = false;
      vm.successMessage = false;
      var drinkToDelete = {
        drinkId: id,
        userId: vm.userSession.user.username
      };
      UserDrinkFactory.deleteUserDrink(vm.userSession.token,drinkToDelete,drinkDeletedCallback,errorCallback);
      var i;
      for (i=0; i<vm.userDrinks.length; i++){
        if (vm.userDrinks[i]._id === id){
          break;
        }
      }
      vm.userDrinks.splice(i,1);
    }
  };

  function drinkDeletedCallback(data){
    vm.isLoading = false;
    vm.editMode = false;
    console.log(data);
  };

  function addDrink(){
    vm.showSearch = false;
    vm.searchResults = false;
    vm.errorMessage = false;
    vm.noDrinksMessage = false;
    vm.isLoading = true;
    vm.editMode = false;
    vm.showAddDrink = false;
    vm.userDrinks = false;
    UserDrinkFactory.addUserDrink(vm.userSession.token,vm.userDrink,drinkSuccessfullyAdded,errorCallback);
  };

  function drinkSuccessfullyAdded(data){
    vm.successMessage = "Drink successfully created!";
    console.log(data);
    vm.isLoading = false;
    vm.userDrink = {};
  };

  function selectDrink(selectedDrink){
    vm.selectedDrink = {};
    vm.selectedDrink = selectedDrink;
    vm.userDrink.drinkId = selectedDrink._id;
    vm.userDrink.userId = vm.userSession.user.username;
    vm.showSearch = false;
    vm.searchResults = false;
    vm.errorMessage = false;
    vm.noDrinksMessage = false;
    vm.isLoading = false;
    vm.editMode = false;
    vm.showAddDrink = true;
    vm.userDrinks = false;
  };
  
};

})();