(function(){
  "use strict";

  angular
      .module('frontend')
      .controller('ItemController', ItemController);

  ItemController.$inject = ['$stateParams'];

  function ItemController($stateParams){
    var vm = this;

    vm.itemId = $stateParams.itemId;
    vm.itemName = $stateParams.itemName;

    // make a call to the items service to retrieve the item
    vm.item = {
      'id': 1,
      'name': 'first item',
      'description': 'this is the first item',
      'owner_name': 'JohnDoe25'
    };

    vm.itemMeta = [
      {
        "id": 1,
        "item_id": vm.item.id,
        "image_url": null,
        "price": 25.50,
        "sale_price": 15.99,
        "stock": 5,
        "description": "This is the purple item's first meta description",
        "meta_key": "Color",
        "meta_value": "Purple"
      },
      {
        "id": 1,
        "item_id": vm.item.id,
        "image_url": null,
        "price": 25.50,
        "sale_price": 15.99,
        "stock": 5,
        "description": "This is the green item's first meta description",
        "meta_key": "Color",
        "meta_value": "Green"
      }
    ]

  }

})();