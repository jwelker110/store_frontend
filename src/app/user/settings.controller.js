(function(){
  "use strict";

  angular
      .module('frontend')
      .controller('SettingsController', SettingsController);

  SettingsController.$inject = ['Model'];

  function SettingsController(Model){
    var vm = this;

    vm.Model = Model;

    vm.updateSettings = updateSettings;

    function updateSettings(){
      // update user settings here
      // basically, going to pull all user settings and send to the server
      // if user is oauth account, they are not allowed to change their email or set a password
      // this info should be stored in the JWT

    }

  }
})();