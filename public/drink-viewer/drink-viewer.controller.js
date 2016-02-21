(function() { 'use strict';

angular.module('drink-db')
.controller('DrinkViewerController', DrinkViewerController);

DrinkViewerController.$inject = ['AuthService','DrinkFactory'];

function DrinkViewerController(AuthService,DrinkFactory) {
  
  var vm = this;

  vm.hello = 'Welcome to the Drink Viewer!';
  
}

})();