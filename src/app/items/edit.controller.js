(function(){
  "use strict";

  angular.module('frontend')
      .controller('EditController', EditController);

  EditController.$inject = ['$stateParams', '$location', 'Model', 'Item'];

  function EditController($stateParams, $location, Model, Item) {
    if (!Model.username) {
      $location.path('/');
    }
    var vm = this;
    var itemName = $stateParams.itemName;

    vm.Model = Model;

    Model.setCurrentItem(itemName);

    vm.updateItem = updateItem;
    vm.deleteItem = deleteItem;


    function updateItem(form) {
      var item = Item.itemDetails.update({
        jwt_token: Model.getJwtString(),
        id: Model.currentItem.id,
        name: Model.currentItem.name,
        description: Model.currentItem.description,
        price: Model.currentItem.price,
        sale_price: Model.currentItem.sale_price,
        stock: Model.currentItem.stock
      });

      item.$promise.then(function(data){
        // need to update the items we have to include the new item
        Model.refreshItems();
      })
      .catch();

    }

    function deleteItem(form) {
      if (!vm.delete) {
        vm.delete = true;
        return;
      }
      var item = Item.item.delete({
        jwt_token: Model.getJwtString(),
        name: itemName
      });

      item.$promise.then(function(data){
        Model.resetCurrentItem();
      })
      .catch();
    }

  }

})();