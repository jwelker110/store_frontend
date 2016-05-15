(function(){
  "use strict";

  angular
      .module('frontend')
      .controller('BrowseController', BrowseController);

  BrowseController.$inject = ['$stateParams', '$location', 'Model', 'Item'];

  function BrowseController($stateParams, $location, Model){
    var vm = this;

    vm.category = $stateParams.categoryName;
    setCategory(vm.category ? vm.category : null);

    vm.Model = Model;

    vm.viewItem = viewItem;
    vm.prevItems = prevItems;
    vm.nextItems = nextItems;

    function viewItem(itemName) {
      $location.url('/items/' + itemName);
    }

    function setCategory(categoryName) {
      Model.setCategory(categoryName);
    }

    function prevItems(){
      Model.getPrevItems();
    }

    function nextItems(){
      Model.getNextItems();
    }

  }

})();