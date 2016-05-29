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

    /**
     * Utilizes the Item resource to update the current item's details.
     */
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

      item.$promise.then(updateItemSuccess)
      .catch();

    }

    /**
     * Checks whether an image has been attached to the form and
     * utilizes the Item resource to attempt to upload the image
     */
    function updateItemSuccess(){
      if (vm.itemFile) { // TODO check image size
        var itemImage = Item.itemImage.update({
          jwt_token: Model.getJwtString(),
          name: Model.currentItem.name,
          image: vm.itemFile
        });

        itemImage.$promise.then(uploadImageSuccess());

      } else {
        uploadImageSuccess();
      }
    }

    /**
     * Updates items and redirects user to homepage
     */
    function uploadImageSuccess(){
      Model.refreshItems();
      $location.path('/');
    }

    /**
     * Utilizes the Item resource to remove the current item.
     */
    function deleteItem() {
      if (!vm.delete) {
        vm.delete = true;
        return;
      }
      var item = Item.itemDetails.remove({
        jwt_token: Model.getJwtString(),
        name: itemName
      });

      item.$promise.then(itemDeleteSuccess);
    }

    /**
     * Utilizes the Item resource to remove the current item's image
     * and replace it with the default image.
     */
    function deleteImage(){
      if (!vm.imageDelete) {
        vm.imageDelete = true;
        return;
      }
      var image = Item.itemImage.remove({
        jwt_token: Model.getJwtString(),
        name: itemName
      });

      image.$promise.then(itemDeleteSuccess);
    }

    /**
     * Resets the current items and redirects to the homepage
     */
    function itemDeleteSuccess(){
      Model.resetCurrentItem();
      Model.resetItems();
      $location.path('/');
    }

  }

})();