(function(){
  "use strict";

  angular
      .module('frontend')
      .controller('HomeController', HomeController);

  HomeController.$inject = ['$location', 'Model', 'Item'];

  function HomeController($location, Model){
    var vm = this;

    vm.Model = Model;

    vm.viewItem = viewItem;
    vm.retrieveItems = retrieveItems;

    function viewItem(itemId, itemName, itemDescription) {
      // set up the model with the current item if it isn't set already
      if (!vm.Model.currentItem.id || vm.Model.currentItem.id != itemId) {
        vm.Model.currentItem = {
          id: itemId,
          name: itemName,
          descriptions: itemDescription
        };
        // we don't have the meta yet
        vm.Model.currentItemMeta = null;
      }
      $location.url('/items/' + itemName + '/' + itemId);
    }

  }


})();
