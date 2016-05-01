(function(){
  "use strict";

  angular.module('frontend')
      .factory('Category', Category);

  Category.$inject = ['$resource'];

  function Category($resource) {

    return {
      categories: $resource('http://localhost:8080/api/v1/categories.json')
    };

  }

})();