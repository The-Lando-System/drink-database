(function() { 'use strict';

angular.module('drink-db')
.factory('DrinkFactory', DrinkFactory);

DrinkFactory.$inject = ['$http'];

function DrinkFactory($http) {
  return {
    getDrinks:  getDrinks,
    getUserDrinks: getUserDrinks,
    addDrink:   addDrink,
    findDrinkByName: findDrinkByName,
    findDrinkById: findDrinkById,
    editDrink: editDrink,
    editUserDrink: editUserDrink,
    deleteDrink: deleteDrink,
    deleteUserDrink: deleteUserDrink,
    addUserDrink: addUserDrink
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

  function getUserDrinks(token,userId,successCallback,errorCallback){
    var header = {
      headers: { 
        'x-access-token': token 
      }
    };
    return $http.get('/user-drinks/' + userId, header)
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

  function editUserDrink(token,drink,successCallback,errorCallback){
    var header = {
      headers: { 
        'x-access-token': token 
      }
    };
    return $http.put('/user-drinks/' + drink.userId + '/' + drink.drinkId, drink, header)
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

  function deleteUserDrink(token,drinkToDelete,successCallback,errorCallback){
    var header = {
      headers: { 
        'x-access-token': token 
      }
    };
    return $http.delete('/user-drinks/' + drinkToDelete.userId + '/' + drinkToDelete.drinkId, header)
    .success(function(data){
      return successCallback(data);
    })
    .error(function(error){
      return errorCallback(error);
    });
  };

  function addUserDrink(token,userDrink,successCallback,errorCallback){
    var header = {
      headers: { 
        'x-access-token': token 
      }
    };
    return $http.post('/user-drinks/', userDrink, header)
    .success(function(data){
      return successCallback(data);
    })
    .error(function(error){
      return errorCallback(error);
    });
  };
};

})();  