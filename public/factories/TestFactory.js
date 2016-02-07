(function() { 'use strict';

angular.module('myApp').factory('testFactory', testFactory);

testFactory.$inject = ['$http','exception'];

function testFactory($http, exception) {
  return {
        getHello: getHello,
        getGoodbye: getGoodbye
    };
    
    function getHello(token,username,successCallback,errorCallback){
      var header = {
        headers: { 
          'x-access-token': token 
        }
      };
      return $http.get('/user/hello/' + username, header)
      .success(function(data){
        return successCallback(data);
      })
      .error(function(error){
        var err = exception.catchSvcException(error);
        return errorCallback(err.name + err.message);
      });
    };
    
    function getGoodbye(token,username,successCallback,errorCallback){
      var header = {
        headers: { 
          'x-access-token': token 
        }
      };
      return $http.get('/admin/goodbye/' + username, header)
      .success(function(data){
        return successCallback(data);
      })
      .error(function(error){
        var err = exception.catchSvcException(error);
        return errorCallback(err.name + err.message);
      });
    };
};

})();