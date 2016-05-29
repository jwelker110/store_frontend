(function(){
  "use strict";

  angular
      .module('frontend')
      .controller('ItemController', ItemController);

  ItemController.$inject = ['$stateParams', 'Model'];

  function ItemController($stateParams, Model){
    // Not much is done here just let the user view the item
    var vm = this;
    var itemName = $stateParams.itemName;

    vm.Model = Model;

    Model.setCurrentItem(itemName);

  }

})();