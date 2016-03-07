(function() { 'use strict';

angular.module('drink-db')
.factory('DrinkFactory', DrinkFactory);

DrinkFactory.$inject = ['$http'];

function DrinkFactory($http) {
  return {
    getDrinks:  getDrinks,
    addDrink:   addDrink,
    findDrinkByName: findDrinkByName,
    findDrinkById: findDrinkById,
    editDrink: editDrink,
    deleteDrink: deleteDrink
  };
    
  function getDrinks(successCallback,errorCallback){
    return $http.get('/drinks/')
    .success(function(data){
      return successCallback(data);
    })
    .error(function(error){
      return errorCallback(error);
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
      return errorCallback(error);
    });
  };

  function findDrinkByName(drinkName,successCallback,errorCallback){
    return $http.post('/drinks/findByName', {drinkName: drinkName})
    .success(function(data){
      return successCallback(data);
    })
    .error(function(error){
      return errorCallback(error);
    });
  };

  function findDrinkById(drinkId,successCallback,errorCallback){
    return $http.get('/drinks/' + drinkId)
    .success(function(data){
      return successCallback(data);
    })
    .error(function(error){
      return errorCallback(error);
    });
  };

  function editDrink(token,drink,successCallback,errorCallback){
    var header = {
      headers: { 
        'x-access-token': token 
      }
    };
    return $http.put('/drinks/' + drink._id, drink, header)
    .success(function(data){
      return successCallback(data);
    })
    .error(function(error){
      return errorCallback(error);
    });
  };

  function deleteDrink(token,id,successCallback,errorCallback){
    var header = {
      headers: { 
        'x-access-token': token 
      }
    };
    return $http.delete('/drinks/' + id, header)
    .success(function(data){
      return successCallback(data);
    })
    .error(function(error){
      return errorCallback(error);
    });
  };

};

})();  