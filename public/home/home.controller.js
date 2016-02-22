(function() { 'use strict';

angular.module('drink-db')
.controller('HomeController', HomeController);

HomeController.$inject = ['AuthService','DrinkFactory','$location','$anchorScroll'];

function HomeController(AuthService,DrinkFactory,$location,$anchorScroll) {
	var vm = this;

  vm.userSession = AuthService.startUserSession();
  vm.hello = "Add a new drink!";
  vm.drink = {};
  vm.drink.type = "Beer";
  vm.successMessage = false;
  vm.logout = logout;
  vm.addDrink = addDrink;
  vm.setType = setType;


	function logout(){
		AuthService.logout();
	};

  function addDrink(){
    vm.drink.addedBy = vm.userSession.user.username;
    vm.drink.timeAdded = (new Date()).toString();
    DrinkFactory.addDrink(vm.userSession.token,vm.drink,successCallback,errorCallback);
    vm.drink = {};
    vm.drink.type = "Beer";
  };

  function successCallback(data){
    vm.successMessage = "Drink successfully created!";
    console.log(data);
    $location.hash('top');
    $anchorScroll();
  };
  
  function errorCallback(err){
    vm.errorMessage = err;
  };

  function setType(type){
    vm.drink.type = type;
  };

};

})();