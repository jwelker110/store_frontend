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
    vm.prevItems = prevItems;
    vm.nextItems = nextItems;

    function viewItem(itemName) {
      $location.url('/items/' + itemName);
    }

    function prevItems(){
      vm.Model.getPrevItems();
    }

    function nextItems(){
      vm.Model.getNextItems();
    }

  }

})();