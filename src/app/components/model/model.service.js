(function(){
  "use strict";

  angular.module('frontend')
      .factory('Model', Model);

  Model.$inject = ['$localStorage', '$sessionStorage', 'jwtHelper', 'Item', 'User', 'Category'];

  function Model($localStorage, $sessionStorage, jwtHelper, Item, User, Category) {
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
      rememberMe: false,

      category: null,

      itemOffset: 0,
      currentItem: null,
      currentItemMeta: null,
      items: [],
      itemsAvailable: true,

      userOffset: 0,
      users: [],
      usersAvailable: true,

      usersItemsOffset: 0,
      usersItems: [],
      usersItemsAvailable: true,
      currentUser: null,

      categories: [],

      stayLoggedIn: true,

      getNextItems: getNextItems,
      getPrevItems: getPrevItems,
      setCurrentItem: setCurrentItem,

      getNextUsers: getNextUsers,
      getPrevUsers: getPrevUsers,

      setCurrentUser: setCurrentUser,
      getNextUsersItems: getNextUsersItems,
      getPrevUsersItems: getPrevUsersItems,

      setCategory: setCategory,

      getJwtString: getJwtString,
      setJwtString: setJwtString,

      updateUser: updateUser,

    };

    // get the categories to display
    getCategories();
    // get the initial items to display
    getItems();
    // get the initial users to display
    getUsers();

    updateUser();

    return model;

    /**
     * User methods
     */
    function getNextUsers(){
      model.userOffset += model.users.length;
      getUsers();
    }

    function getPrevUsers(){
      model.userOffset -= model.users.length;
      getUsers();
    }

    function getUsers(){
      var users = User.users.get({offset: model.userOffset});

      users.$promise.then(function(data){
        model.usersAvailable = data.length > 0;
        model.users = data;
      });
    }

    /**
     * User Items methods
     */
    function getNextUsersItems(){
      model.usersItemsOffset += model.usersItems.length;
      getUsersItems();
    }

    function getPrevUsersItems(){
      if (model.usersItemsOffset == 0) {return;}
      model.usersItemsOffset -= model.usersItems.length;
      getUsersItems();
    }

    function getUsersItems(){
      var usersItems = User.usersItems.get({offset: model.usersItemsOffset, username: model.currentUser});

      usersItems.$promise.then(function(data){
        model.usersItemsAvailable = data.length > 0;
        model.usersItems = data;
      });
    }

    function setCurrentUser(username){
      model.currentUser = username;
    }

    /**
     * Category methods
     */
    function setCategory(cat){
      if (cat === model.category) {return;}
      model.itemOffset = 0;
      model.category = cat;
      getItems();
    }

    function getCategories(){
      var cat = Category.categories.get();

      cat.$promise.then(function(data){
        model.categories = data;
      });
    }

    /**
     * Item methods
     */
    function getNextItems(){
      model.itemOffset += model.items.length;
      getItems();
    }

    function getPrevItems(){
      if (model.itemOffset == 0) {return;}
      model.itemOffset -= model.items.length;
      getItems();
    }

    function getItems(){
      var items = Item.items.get({offset: model.itemOffset, category: model.category});

      items.$promise.then(function(data){
        model.itemsAvailable = data.length > 0;
        model.items = data;
        if (!model.itemsAvailable) {
          // todo toast letting user know no more avail?
        }
      });

    }

    function setCurrentItem(itemId, itemName, itemDescription){
      // set up the model with the current item if it isn't set already
      if (!model.currentItem.id || model.currentItem.id != itemId) {
        model.currentItem = {
          id: itemId,
          name: itemName,
          descriptions: itemDescription
        };
        // we don't have the meta yet
        model.currentItemMeta = null;
      }
    }

    /**
     * JWT methods
     */
    function getJwtString(){
      return storage.jwt_token_string;
    }

    function setJwtString(jwt){
      storage.jwt_token_string = jwt;
    }

    function updateUser(){
      if (!storage.jwt_token_string) {
        resetUserInfo();
        return;
      }
      var exp = jwtHelper.isTokenExpired(storage.jwt_token_string);
      if (exp) {
        resetUserInfo();
        return;
      }
      var payload = jwtHelper.decodeToken(storage.jwt_token_string);

      model.username = payload.username;
      model.confirmed = payload.confirmed;
    }

    function resetUserInfo(){
      model.username = null;
      model.confirmed = null;
      storage.jwt_token_string = null;
    }

    function setStorageType(){
      if (!model.rememberMe) {
        storage = $sessionStorage.$default({
          jwt_token_string: null
        });
      } else {
        storage = $localStorage.$default({
          jwt_token_string: null
        });
      }
    }

  }

})();