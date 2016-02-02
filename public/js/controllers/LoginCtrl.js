(function() { 'use strict';

angular.module('myApp').controller('loginController', loginController);

loginController.$inject = ['$scope','$location','jwtHelper','AuthService'];

function loginController($scope,$location,jwtHelper,AuthService) {
	$scope.authFail = false;

	$scope.login = function(formIsValid){
		if (formIsValid){
			AuthService.login($scope.creds, function(data){
				if (data.success) {
					$scope.userSession = AuthService.startUserSession();
				} else {
					$scope.authFail = true;
					$scope.errorMessage = data.message;
				}
			});
		}
	};

	angular.element(document).ready(function () {
		$scope.userSession = AuthService.startUserSession();
		if ($scope.userSession.user) {
			$location.path('home');
		}
	});
};

})();