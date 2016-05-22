(function(){
  "use strict";

  angular.module('frontend')
      .controller('CreateController', CreateController);

  CreateController.$inject = ['$location', 'Item', 'Model'];

  function CreateController($location, Item, Model){
    var vm = this;

    vm.Model = Model;

    vm.name = null;
    vm.description = null;
    vm.category = 'Other';
    vm.price = 0.00;
    vm.sale_price = 0.00;
    vm.stock = 0;
    vm.itemFile = null;

    vm.createItem = createItem;

    function createItem(form) {
      var newItem = Item.items.create({
        jwt_token: Model.getJwtString(),
        name: vm.name,
        description: vm.description,
        category: vm.category,
        price: vm.price,
        sale_price: vm.sale_price,
        stock: vm.stock,
        image: vm.itemFile
      });

      newItem.$promise.then(function(data){
        // new item was created, let's update the UI / User
        Model.refreshItems();
        $location.path('/');
      });
    }
  }

})();