(function() { 'use strict';

angular.module('myApp').controller('homeController', homeController);

homeController.$inject = ['$scope','$location','jwtHelper','AuthService'];

function homeController($scope,$location,jwtHelper,AuthService) {
	$scope.hello = "Home Page";
	$scope.logout = function(){
		AuthService.logout();
	};
};

})();