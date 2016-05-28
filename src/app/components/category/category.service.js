(function(){
  "use strict";

  angular.module('frontend')
      .factory('Category', Category);

  Category.$inject = ['$resource'];

  function Category($resource) {

    return {
      /**
       * Resource used to retrieve all the available categories
       */
      categories: $resource('http://localhost:8080/api/v1/categories.json')
    };

  }

})();