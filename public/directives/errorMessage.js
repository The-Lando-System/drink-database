(function() { 'use strict';

angular.module('myApp').directive('errorMessage', errorMessage);

function errorMessage() {
  return {
    templateUrl: '/error-message',
    restrict: 'E'
  };
};

})();