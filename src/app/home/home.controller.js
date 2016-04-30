(function(){
  "use strict";

  angular
      .module('frontend')
      .controller('HomeController', HomeController);

  HomeController.$inject = ['$location', '$log'];

  function HomeController($location, $log){
    var vm = this;

    vm.viewItem = viewItem;

    vm.items = [
      {
        'id': 1,
        'name': 'first item',
        'description': 'this is the first item',
        'owner_name': 'JohnDoe25'
      },
      {
        'id': 2,
        'name': 'second item',
        'description': 'this is the first item',
        'owner_name': 'JohnDoe25'
      },
      {
        'id': 1,
        'name': 'first item',
        'description': 'this is the first item',
        'owner_name': 'JohnDoe25'
      },
      {
        'id': 2,
        'name': 'second item',
        'description': 'this is the first item',
        'owner_name': 'JohnDoe25'
      },
      {
        'id': 1,
        'name': 'first item',
        'description': 'this is the first item',
        'owner_name': 'JohnDoe25'
      },
      {
        'id': 2,
        'name': 'second item',
        'description': 'this is the first item',
        'owner_name': 'JohnDoe25'
      }];

    function viewItem(itemId, itemName) {
      $location.url('/items/' + itemName + '/' + itemId);
    }

  }


})();
