(function() { 'use strict';

angular.module('myApp').controller('homeController', homeController);

homeController.$inject = ['AuthService'];

function homeController(AuthService) {
	var vm = this;

  vm.hello = "Home Page";
  vm.logout = logout;

	function logout(){
		AuthService.logout();
	};
};

})();