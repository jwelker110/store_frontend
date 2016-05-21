(function(){
  "use strict";

  angular.module('frontend')
      .factory('Item', Item);

  Item.$inject = ['$resource'];

  function Item($resource){

    return {
      items: $resource('http://localhost:8080/api/v1/items.json', {offset: 0, category: null},
          {
            create: {
              method: 'POST',
              params: {
                jwt_token: null,
                name: null,
                description: null,
                price: null,
                sale_price: null,
                image_url: null,
                stock: null
              }
            }
          }),
      itemDetails: $resource('http://localhost:8080/api/v1/items/details.json', {name: null},
          {
            update: {
              method: 'PUT',
              params: {
                jwt_token: null,
                id: null,
                name: null,
                description: null,
                price: null,
                sale_price: null,
                image_url: null,
                stock: null
              }
            },
            remove: {
              method: 'POST',
              params: {
                jwt_token: null,
                itemName: null
              }
            }
          })
    };

  }

})();