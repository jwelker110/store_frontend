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
        stock: vm.stock
      });

      newItem.$promise.then(function(data){
        if (vm.itemFile) {
          var itemImage = Item.itemImage.update({
            jwt_token: Model.getJwtString(),
            name: vm.name,
            image: vm.itemFile
          });

          itemImage.$promise.then(function(data){
            Model.refreshItems();
            $location.path('/');
          });

        } else {
          Model.refreshItems();
          $location.path('/');
        }
      });
    }
  }

})();