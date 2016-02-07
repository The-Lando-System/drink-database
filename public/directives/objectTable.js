(function() { 'use strict';

angular.module('myApp').directive('objectTable', objectTable);

function objectTable() {
  return {
    templateUrl: '/object-table',
    restrict: 'E'
  };
};

})();