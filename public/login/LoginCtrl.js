(function() { 'use strict';

angular.module('myApp').controller('loginController', loginController);

loginController.$inject = ['$window','$location','jwtHelper','AuthService'];

function loginController($window,$location,jwtHelper,AuthService) {
	
	var vm = this;

	vm.authFail = false;
	vm.isLoading = false;
	vm.login = login;

	function login(formIsValid){
		if (formIsValid){
			vm.isLoading = true;
			AuthService.login(vm.creds, function(data){
				if (data.success) {
					vm.userSession = AuthService.startUserSession();
					vm.isLoading = false;
				} else {
					vm.isLoading = false;
					vm.authFail = true;
					vm.errorMessage = data.message;
				}
			});
		}
	};

	angular.element(document).ready(function () {
		vm.userSession = AuthService.startUserSession();
		if (vm.userSession.user) {
			$location.path('home');
		}
	});
};

})();