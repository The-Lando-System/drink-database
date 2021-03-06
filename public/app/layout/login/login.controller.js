(function() { 'use strict';

angular.module('drink-db')
.controller('LoginController', LoginController);

LoginController.$inject = ['$window','$location','jwtHelper','AuthService'];

function LoginController($window,$location,jwtHelper,AuthService) {
	
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