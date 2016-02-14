(function() { 'use strict';

angular.module('myApp').directive('successMessage', successMessage);

function successMessage() {
  return {
    templateUrl: '/success-message',
    restrict: 'E'
  };
};

})();