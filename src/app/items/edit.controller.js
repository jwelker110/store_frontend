(function(){
  "use strict";

  angular.module('frontend')
      .controller('EditController', EditController);

  EditController.$inject = ['$stateParams', '$location', 'Model', 'Item'];

  function EditController($stateParams, $location, Model, Item) {
    var vm = this;
    var itemName = $stateParams.itemName;

    vm.Model = Model;

    vm.itemFile = null;

    Model.setCurrentItem(itemName);

    vm.updateItem = updateItem;
    vm.deleteItem = deleteItem;
    vm.deleteImage = deleteImage;


    function updateItem() {
      var item = Item.itemDetails.update({
        jwt_token: Model.getJwtString(),
        id: Model.currentItem.id,
        name: Model.currentItem.name,
        description: Model.currentItem.description,
        category: Model.currentItem.category,
        price: Model.currentItem.price,
        sale_price: Model.currentItem.sale_price,
        stock: Model.currentItem.stock
      });

      item.$promise.then(function(data){
          if (vm.itemFile) {
            var itemImage = Item.itemImage.update({
              jwt_token: Model.getJwtString(),
              name: Model.currentItem.name,
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
      })
      .catch();

    }

    function deleteItem() {
      if (!vm.delete) {
        vm.delete = true;
        return;
      }
      var item = Item.itemDetails.remove({
        jwt_token: Model.getJwtString(),
        name: itemName
      });

      item.$promise.then(function(data){
        Model.resetCurrentItem();
        Model.resetItems();
        $location.path('/');
      })
      .catch();
    }

    function deleteImage(){
      if (!vm.imageDelete) {
        vm.imageDelete = true;
        return;
      }
      var image = Item.itemImage.remove({
        jwt_token: Model.getJwtString(),
        name: itemName
      });

      image.$promise.then(function(data){
        Model.refreshItems();
        $location.path('/');
      });
    }

  }

})();