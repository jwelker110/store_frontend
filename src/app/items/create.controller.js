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
      // TODO if form invalid, don't perform request

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
      newItem.$promise.then(function(data){
        if (vm.itemFile) {  // check if an image has been selected and upload it
          var itemImage = Item.itemImage.update({
            jwt_token: Model.getJwtString(),
            name: vm.name,
            image: vm.itemFile
          });

          itemImage.$promise.then(uploadImageSuccess, uploadImageFailed);

        } else {
          createItemSuccess();
        }
      });
    }

    /**
     * Handles updating the item and redirecting user when item is created.
     */
    function createItemSuccess() {
      Model.refreshItems();
      $location.path('/');
    }

    function uploadImageSuccess(){
      createItemSuccess();
    }

    function uploadImageFailed(){
      // TODO adjust the error message received
    }
  }

})();