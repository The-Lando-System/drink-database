(function() { 'use strict';

angular.module('drink-db')
.controller('UserController', UserController);

UserController.$inject = ['$location','$stateParams','jwtHelper','AuthService','UserFactory'];

function UserController($location,$stateParams,jwtHelper,AuthService,UserFactory) {

	var vm = this;

	var userId = $stateParams.userId || false;

	vm.userSession = AuthService.startUserSession();
	vm.isCreate = userId ? false : true;
	vm.editedUser = {};
	vm.getUser = getUser;
	vm.updateUser = updateUser;
	vm.createUser = createUser;

	getUser();	

	function getUser() {
		if (!vm.isCreate){
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
		}
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
};

})();