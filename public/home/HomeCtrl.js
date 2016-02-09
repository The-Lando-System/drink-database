(function() { 'use strict';

angular.module('myApp').controller('homeController', homeController);

homeController.$inject = ['AuthService','drinkFactory'];

function homeController(AuthService,drinkFactory) {
	var vm = this;

  vm.hello = "Add a new drink!";
  vm.drink = {};
  vm.drink.type = "Choose a Type";
  vm.logout = logout;
  vm.addDrink = addDrink;
  vm.setType = setType;


	function logout(){
		AuthService.logout();
	};

  function addDrink(){
    drinkFactory.addDrink(vm.userSession.token,vm.drink,successCallback,errorCallback);
    vm.drink = {};
  };

  function successCallback(data){
    console.log(data);
  };
  
  function errorCallback(err){
    vm.errorMessage = err;
  };

  function setType(type){
    vm.drink.type = type;
  };

  angular.element(document).ready(function () {
    vm.userSession = AuthService.startUserSession();
  });

};

})();