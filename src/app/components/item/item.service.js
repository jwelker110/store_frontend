(function(){
  "use strict";

  angular.module('frontend')
      .factory('Item', Item);

  Item.$inject = ['$resource'];

  function Item($resource){

    return {
      /**
       * This resource is used to query existing items, and create
       * new ones.
       */
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
                stock: null,
                image: null
              }
            }
          }),
      /**
       * This resource is used to query/update a specific item, as well
       * as remove it.
       */
      itemDetails: $resource('http://localhost:8080/api/v1/items/details.json', {name: null},
          {
            update: {
              method: 'PUT',
              params: {
                jwt_token: null,
                id: null,
                name: null,
                description: null,
                category: null,
                price: null,
                sale_price: null,
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
          }),
      /**
       * This resource is used to upload an image to be used with a given item,
       * or remove an existing image.
       */
      itemImage: $resource('http://localhost:8080/api/v1/items/image', {},
          {
            update: {
              method: 'PUT',
              params: {
                jwt_token: null,
                name: null,
                image: null
              },
              headers: {
                'Content-Type': undefined
              },
              // creating a form data object because we need to pass the file if given
              transformRequest: function(data){
                var fd = new FormData();
                for (var key in data) {
                  fd.append(key, data[key]);
                }
                return fd;
              }
            },
            remove: {
              method: 'PUT',
              params: {
                jwt_token: null,
                name: null
              },
              headers: {
                'Content-Type': undefined
              },
              // creating a form data object because we need to pass the file if given
              transformRequest: function(data){
                var fd = new FormData();
                for (var key in data) {
                  fd.append(key, data[key]);
                }
                return fd;
              }
            }
          })
    };

  }

})();