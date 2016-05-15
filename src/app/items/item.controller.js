(function(){
  "use strict";

  angular
      .module('frontend')
      .controller('ItemController', ItemController);

  ItemController.$inject = ['$stateParams', 'Model'];

  function ItemController($stateParams, Model){
    var vm = this;

    vm.Model = Model;

    vm.itemId = $stateParams.itemId;
    vm.itemName = $stateParams.itemName;

    Model.setCurrentItem(vm.itemName);

  }

})();