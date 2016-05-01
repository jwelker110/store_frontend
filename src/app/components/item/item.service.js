(function(){
  "use strict";

  angular.module('frontend')
      .factory('Item', Item);

  Item.$inject = ['$resource'];

  function Item($resource){

    return {
      items: $resource('http://localhost:8080/api/v1/items.json', {offset: 0, category: null})
    };

  }

})();