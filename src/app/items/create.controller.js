(function(){
  "use strict";

  angular.module('frontend')
      .controller('CreateController', CreateController);

  CreateController.$inject = ['$location', 'Item', 'Model', 'Message'];

  function CreateController($location, Item, Model, Message){
    if (!Model.username) {
      Model.setPrevPath('/create');
      $location.path('/login');
    }

    var vm = this;
    var fileSizeLimit = (1024 * 1024) / 2;

    vm.Model = Model;

    vm.name = '';
    vm.description = '';
    vm.category = null;
    vm.price = 0.00;
    vm.sale_price = 0.00;
    vm.stock = 0;
    vm.itemFile = null;

    vm.createItem = createItem;

    /**
     * Utilizes the Item resource to send a new item's details to the server
     * @param form - the form containing the new item's details
     */
    function createItem(form) {
      if (form.$invalid){
        return;
      }

      var newItem = Item.items.create({
        jwt_token: Model.getJwtString(),
        name: vm.name,
        description: vm.description,
        category: vm.category,
        price: vm.price,
        sale_price: vm.sale_price,
        stock: vm.stock
      });

      // Once the resource request is complete
      newItem.$promise.then(createItemSuccess, createItemFailure);
    }

    /**
     * Handles updating the item and redirecting user when item is created.
     */
    function createItemSuccess() {
      if (!vm.itemFile) {
        Model.refreshItems();
        $location.path('/');
        return;
      }
      // check file size
      if (vm.itemFile.size > fileSizeLimit) {
        Message.addMessage('Item added. Image must be smaller than 500 KB', 'warning');
        Model.refreshItems();
        $location.path('/');
        return;
      }
      var itemImage = Item.itemImage.update({
        jwt_token: Model.getJwtString(),
        name: vm.name,
        image: vm.itemFile
      });

      itemImage.$promise.then(uploadImageSuccess, uploadImageFailure);

    }

    /**
     * Notifies user of item creation failure
     */
    function createItemFailure(){
      Message.addMessage('The item could not be created at this time.', 'danger');
    }

    /**
     * Refreshes the items and redirects user to homepage
     */
    function uploadImageSuccess(){
      Model.refreshItems();
      $location.path('/');
    }

    /**
     * Notifies user of image upload failure
     */
    function uploadImageFailure(){
      Message.addMessage('The item was created, however the image could not be uploaded.', 'danger');
      Model.refreshItems();
      $location.path('/');
    }
  }

})();