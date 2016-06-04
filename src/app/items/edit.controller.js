(function(){
  "use strict";

  angular.module('frontend')
      .controller('EditController', EditController);

  EditController.$inject = ['$stateParams', '$location', 'Model', 'Item', 'Message'];

  function EditController($stateParams, $location, Model, Item, Message) {
    var vm = this;
    var itemName = $stateParams.itemName;

    vm.Model = Model;

    vm.itemFile = null;
    vm.delete = false;

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

      item.$promise.then(updateItemSuccess, updateItemFailure);

    }

    /**
     * Checks whether an image has been attached to the form and
     * utilizes the Item resource to attempt to upload the image
     */
    function updateItemSuccess(){
      if (!vm.itemFile) {
        Model.refreshItems();
        $location.path('/');
        return;
      }
      // TODO check image size
      var itemImage = Item.itemImage.update({
        jwt_token: Model.getJwtString(),
        name: Model.currentItem.name,
        image: vm.itemFile
      });

      itemImage.$promise.then(uploadImageSuccess, uploadImageFailure);

    }

    /**
     * Notifies user of failure to update item
     */
    function updateItemFailure(){
      Message.addMessage('The item could not be updated', 'danger');
    }

    /**
     * Redirects user to homepage after the item has been updated
     */
    function uploadImageSuccess(){
      Model.refreshItems();
      $location.path('/');
    }

    /**
     * Notifies user of failure to upload image
     */
    function uploadImageFailure(){
      Message.addMessage('The image could not be uploaded.', 'danger');
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

      item.$promise.then(deleteSuccess, deleteFailure);
    }

    /**
     * Utilizes the Item resource to remove the current item's image
     * and replace it with the default image.
     */
    function deleteImage(){
      var image = Item.itemImage.remove({
        jwt_token: Model.getJwtString(),
        name: itemName
      });

      image.$promise.then(deleteSuccess, deleteFailure);
    }

    /**
     * Resets the current items and redirects to the homepage
     */
    function deleteSuccess(){
      Model.resetCurrentItem();
      Model.resetItems();
      $location.path('/');
    }

    /**
     * Notifies the user of failure
     */
    function deleteFailure(){
      Message.addMessage('Could not delete at this time', 'danger');
    }

  }

})();