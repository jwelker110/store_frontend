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
    }

  }
})();