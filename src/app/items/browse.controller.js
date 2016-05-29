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

    /**
     * Using the item name, redirects the user to the item
     * detail view.
     * @param itemName {any} - Name of the item.
     */
    function viewItem(itemName) {
      $location.url('/items/' + itemName);
    }

    /**
     * Calling the model method to set current category
     * @param categoryName {string} - Name of the category.
     */
    function setCategory(categoryName) {
      Model.setCategory(categoryName);
    }

    /**
     * Calling the model methods to retrieve items.
     */
    function prevItems(){
      Model.getPrevItems();
    }

    function nextItems(){
      Model.getNextItems();
    }

  }

})();