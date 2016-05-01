(function(){
  "use strict";

  angular
      .module('frontend')
      .controller('HomeController', HomeController);

  HomeController.$inject = ['$location', 'Model', 'Item'];

  function HomeController($location, Model, Item){
    var vm = this;
    var offset = 0;

    vm.Model = Model;
    offset = vm.Model.items.length;

    vm.viewItem = viewItem;
    vm.retrieveItems = retrieveItems;

    // get the initial items to display
    retrieveItems();

    function viewItem(itemId, itemName) {
      $location.url('/items/' + itemName + '/' + itemId);
    }

    function retrieveItems(){
      // expecting to retrieve an array of items here
      vm.Model.items = Item.get({offset: offset});
    }

  }


})();
