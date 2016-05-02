(function(){
  "use strict";

  angular
      .module('frontend')
      .controller('BrowseController', BrowseController);

  BrowseController.$inject = ['$location', 'Model', 'Item'];

  function BrowseController($location, Model){
    var vm = this;

    vm.Model = Model;

    vm.viewItem = viewItem;

    function viewItem(itemId, itemName, itemDescription) {
      vm.Model.setCurrentItem(itemId, itemName, itemDescription);
      $location.url('/items/' + itemName + '/' + itemId);
    }

  }

})();