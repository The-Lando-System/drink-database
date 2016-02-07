(function() { 'use strict';

angular.module('myApp').controller('userController', userController);

userController.$inject = ['$location','$stateParams','jwtHelper','AuthService','UserFactory'];

function userController($location,$stateParams,jwtHelper,AuthService,UserFactory) {

	var vm = this;
	vm.editedUser = {};
	vm.getUser = getUser;
	vm.updateUser = updateUser;
	vm.createUser = createUser;

	var userId = $stateParams.userId || false;

	function getUser() {
		UserFactory.get(vm.userSession.token)
		.success(function(users){
			for (var i=0;i<users.length;i++){
				if (users[i]._id === userId){
					vm.editedUser = users[i];
				}
			}
		})
		.error(function(data){
			console.log('Error: ' + data);
		});
	};

	function updateUser(){
		UserFactory.edit(vm.userSession.token,vm.editedUser._id,vm.editedUser)
		.success(function(data){
			alert(data.message);
		})
		.error(function(data){
			console.log('Error: ' + data);
		});
	};

	function createUser(){
		UserFactory.create(vm.userSession.token,vm.editedUser)
		.success(function(data){
			alert(data.message);
			$location.path('user-management');
		})
		.error(function(data){
			console.log('Error: ' + data);
		});
	};

	angular.element(document).ready(function () {
		vm.userSession = AuthService.startUserSession();
		if (vm.userSession.user) {
			getUser();
		} else {
			$location.path('login');
		}
		vm.isCreate = userId ? false : true;
	});
};

})();