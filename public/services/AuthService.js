(function() { 'use strict';

angular.module('myApp').factory('AuthService', AuthService);

AuthService.$inject = ['$http','$cookies','$location','jwtHelper','$rootScope'];

function AuthService($http,$cookies,$location,jwtHelper,$rootScope) {

	var authService = {};

	authService.startUserSession = function() {
		var token = $cookies.get('token') ? $cookies.get('token') : false;
		var user = token ? jwtHelper.decodeToken(token)._doc : false;
		var isAdmin = false;
		if (user.role){
			isAdmin = user.role === 'admin' ? true : false;
		}
		return {
			token    : token,
			user     : user,
			isAdmin  : isAdmin
		};
	};

	authService.endUserSession = function() {
		return {
			token    : false,
			user     : false,
			isAdmin  : false
		};
	};

	authService.logout = function(){
		var confirmLogout = confirm('Are you sure you want to logout?');
		if (confirmLogout){
			$cookies.remove('token');
			$location.path('login');
		}
	};

	authService.login = function(creds,callback){
		$http.post('/authenticate',creds)
		.success(function(data){
			if (data.success){
				$cookies.put('token',data.token);
				$location.path('home');
				$rootScope.$broadcast('login', true);
				return callback(data);
			} else {
				return callback(data);
			}
		})
		.error(function(data){
			console.log('Error: ' + data);
		});
	};

	return authService;

};

})();