(function(){
  "use strict";

  angular.module('frontend')
      .factory('Model', Model);

  Model.$inject = ['$localStorage', '$sessionStorage', 'jwtHelper'];

  function Model($localStorage, $sessionStorage, jwtHelper) {
    var storage = $localStorage.$default({
      jwt_token_string: null
    });

    var model = {
      appName: "Store App",
      navItems: [
        {
          sref: 'home',
          name: 'Home'
        },
        {
          sref: 'browse',
          name: 'Browse'
        }
      ],

      username: null,
      confirmed: false,

      offset: 0,
      category: null,

      currentItem: null,
      currentItemMeta: null,
      items: [
        {
          'id': 1,
          'name': 'first item',
          'description': 'this is the first item',
          'owner_name': 'JohnDoe25'
        },
        {
          'id': 2,
          'name': 'second item',
          'description': 'this is the first item',
          'owner_name': 'JohnDoe25'
        },
        {
          'id': 1,
          'name': 'first item',
          'description': 'this is the first item',
          'owner_name': 'JohnDoe25'
        },
        {
          'id': 2,
          'name': 'second item',
          'description': 'this is the first item',
          'owner_name': 'JohnDoe25'
        },
        {
          'id': 1,
          'name': 'first item',
          'description': 'this is the first item',
          'owner_name': 'JohnDoe25'
        },
        {
          'id': 2,
          'name': 'second item',
          'description': 'this is the first item',
          'owner_name': 'JohnDoe25'
        }
      ],

      stayLoggedIn: true,

      getJwtString: getJwtString,
      setJwtString: setJwtString,
      updateUser: updateUser,
      rememberMe: rememberMe
    };

    return model;


    function getJwtString(){

    }

    function setJwtString(){

    }

    function updateUser(){

    }

    function rememberMe(){

    }

  }

})();