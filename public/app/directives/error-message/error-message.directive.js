(function() { 'use strict';

angular.module('drink-db')
.directive('errorMessage', errorMessage);

function errorMessage() {
  return {
    templateUrl: '/error-message',
    restrict: 'E'
  };
};

})();