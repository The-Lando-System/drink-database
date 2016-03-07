(function() { 'use strict';

angular.module('drink-db')
.factory('UserDrinkFactory', UserDrinkFactory);

UserDrinkFactory.$inject = ['$http'];

function UserDrinkFactory($http) {
  return {
    getUserDrinks: getUserDrinks,
    editUserDrink: editUserDrink,
    deleteUserDrink: deleteUserDrink,
    addUserDrink: addUserDrink
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