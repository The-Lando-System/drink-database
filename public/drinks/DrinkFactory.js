(function() { 'use strict';

angular.module('myApp').factory('drinkFactory', drinkFactory);

drinkFactory.$inject = ['$http','exception'];

function drinkFactory($http, exception) {
  return {
    getDrinks:  getDrinks,
    addDrink:   addDrink,
    findDrinkByName: findDrinkByName
  };
    
  function getDrinks(token,successCallback,errorCallback){
    var header = {
      headers: { 
        'x-access-token': token 
      }
    };
    return $http.get('/drinks/', header)
    .success(function(data){
      return successCallback(data);
    })
    .error(function(error){
      var err = exception.catchSvcException(error);
      return errorCallback(err.name + err.message);
    });
  };

  function addDrink(token,drink,successCallback,errorCallback){
    var header = {
      headers: { 
        'x-access-token': token 
      }
    };
    return $http.post('/drinks/', drink, header)
    .success(function(data){
      return successCallback(data);
    })
    .error(function(error){
      var err = exception.catchSvcException(error);
      return errorCallback(err.name + err.message);
    });
  };

  function findDrinkByName(token,drinkName,successCallback,errorCallback){
    var header = {
      headers: { 
        'x-access-token': token 
      }
    };
    return $http.post('/drinks/findByName', {drinkName: drinkName}, header)
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