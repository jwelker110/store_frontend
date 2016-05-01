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

    function viewItem(itemId, itemName, itemDescription) {
      vm.Model.setCurrentItem(itemId, itemName, itemDescription);
      $location.url('/items/' + itemName + '/' + itemId);
    }

  }


})();
