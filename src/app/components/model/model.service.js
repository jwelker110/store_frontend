(function(){
  "use strict";

  angular.module('frontend')
      .factory('Model', Model);

  Model.$inject = ['$localStorage', '$sessionStorage', 'jwtHelper', 'Item'];

  function Model($localStorage, $sessionStorage, jwtHelper, Item) {
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
      items: [],

      stayLoggedIn: true,

      retrieveItems: retrieveItems,
      getJwtString: getJwtString,
      setJwtString: setJwtString,
      updateUser: updateUser,
      rememberMe: rememberMe
    };

    // get the initial items to display
    model.retrieveItems();

    return model;

    function retrieveItems(){
      model.items = Item.items.get({offset: model.items.length, category: model.category});
    }

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