(function() { 'use strict';

angular.module('drink-db')
.directive('successMessage', successMessage);

function successMessage() {
  return {
    templateUrl: '/success-message',
    restrict: 'E'
  };
};

})();