(function(){
  "use strict";

  angular.module('frontend')
      .factory('User', User);

  User.$inject = ['$resource'];

  function User($resource) {

    return {
      /**
       * This resource is used to retrieve a list of current users,
       * starting from the given offset.
       */
      users: $resource('/api/v1/users.json', {offset: 0}),
      /**
       * This resource is used to retrieve a list of items associated
       * with the given username, starting from the given offset.
       */
      usersItems: $resource('/api/v1/users/items.json', {offset: 0, username: null})
    };

  }

})();
