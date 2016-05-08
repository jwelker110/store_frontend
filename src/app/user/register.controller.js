(function(){
  "use strict";

  angular
      .module('frontend')
      .controller('LoginRegisterController', LoginRegisterController);

  LoginRegisterController.$inject = ['Model', 'Auth'];

  function LoginRegisterController(Model, Auth) {
    var vm = this;

    vm.Model = Model;



  }

})();