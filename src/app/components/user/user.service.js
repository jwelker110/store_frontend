(function(){
  "use strict";

  angular.module('frontend')
      .factory('User', User);

  User.$inject = ['$resource'];

  function User($resource) {

    return {
      users: $resource('http://localhost:8080/api/v1/users.json', {offset: 0}),
      usersItems: $resource('http://localhost:8080/api/v1/users/items.json', {offset: 0, username: null})
    };

  }

})();