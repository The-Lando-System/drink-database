(function() { 'use strict';

angular.module('myApp').controller('view2Controller', view2Controller);

view2Controller.$inject = ['testFactory','AuthService'];

function view2Controller(testFactory,AuthService) {
  var vm = this;
  
  vm.hello = "Hello from view 2!";
  vm.testCall = testCall;
  vm.tableData = false;
  vm.errorMessage = false;
  
  function testCall(){
    vm.errorMessage = false;
    testFactory.getGoodbye(vm.userSession.token,vm.userSession.user.username,successCallback,errorCallback);
  };
  
  function successCallback(data){
    vm.tableData = data;
  };
  
  function errorCallback(err){
    vm.errorMessage = err;
  };

  angular.element(document).ready(function () {
    vm.userSession = AuthService.startUserSession();
  });
};

})();