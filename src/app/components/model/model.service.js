(function(){
  "use strict";

  angular.module('frontend')
      .factory('Model', Model);

  Model.$inject = ['$localStorage', '$sessionStorage', 'jwtHelper'];

  function Model($localStorage, $sessionStorage, jwtHelper) {
    var storage = $localStorage.$default({
      jwt_token_string: null
    });

    return {
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
      items: [],

      stayLoggedIn: true,

      getJwtString: getJwtString,
      setJwtString: setJwtString,
      updateUser: updateUser,
      rememberMe: rememberMe
    };


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