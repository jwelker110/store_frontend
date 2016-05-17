(function(){
  "use strict";

  angular.module('frontend')
      .controller('CreateController', CreateController);

  CreateController.$inject = ['Item', 'Model'];

  function CreateController(Item, Model){
    var vm = this;

    vm.Model = Model;

    vm.name = null;
    vm.description = null;
    vm.price = 0.00;
    vm.sale_price = 0.00;
    vm.stock = 0;

    vm.createItem = createItem;

    function createItem(form) {
      var newItem = Item.items.create({
        jwt_token: Model.getJwtString(),
        name: vm.name,
        description: vm.description,
        price: vm.price,
        sale_price: vm.sale_price,
        stock: vm.stock
      });

      newItem.$promise.then(function(data){
        // new item was created, let's update the UI / User
      });
    }

  }

})();