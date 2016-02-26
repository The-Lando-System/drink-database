(function() { 'use strict';

angular.module('drink-db')
.controller('UserMgmtController', UserMgmtController);

UserMgmtController.$inject = ['jwtHelper','AuthService','UserFactory'];

function UserMgmtController(jwtHelper,AuthService,UserFactory) {

	var vm = this;

	vm.userSession = AuthService.startUserSession();
	vm.getUsers = getUsers;
	vm.deleteUser = deleteUser;
	getUsers();

	function getUsers(){
		UserFactory.get(vm.userSession.token)
		.success(function(data){
			vm.users = data;
		})
		.error(function(data){
			console.log('Error: ' + data);
		});
	};

	function deleteUser(user){
		var confirmDelete = confirm('Are you sure you want to delete \'' + user.username + '\'?');

		if (confirmDelete){
			UserFactory.delete(vm.userSession.token,user._id)
			.success(function(data){
				console.log(data);
				getUsers();
			})
			.error(function(data){
				console.log('Error: ' + data);
			});
		}
	};

};

})();