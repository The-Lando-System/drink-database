(function() { 'use strict';

angular.module('drink-db')
.directive('drinkTable', drinkTable);

function drinkTable() {
  return {
    templateUrl: '/drink-table',
    restrict: 'E',
    scope: {
    	drinkInfo: '=data',
      editable: '@editable',
    	rowClick: '&onRowClick',
      beginEdit: '&beginEdit',
      delete: '&delete',
      update: '&update'
    }
  };
};

})();