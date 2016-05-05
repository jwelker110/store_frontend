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
          sref: 'browse',
          name: 'Browse'
        }
      ],

      username: null,
      confirmed: false,
      rememberMe: false,

      category: null,

      itemOffset: 0,
      currentItem: {
        id: null,
        name: null,
        description: null
      },
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

      updateUser: updateUser

    };

    // get the categories to display
    getCategories();
    // get the initial items to display
    getItems(0);
    // get the initial users to display
    getUsers(0);

    updateUser();

    return model;

    /**
     * User methods
     */
    function getNextUsers(){
      getUsers(model.userOffset + model.users.length);
    }

    function getPrevUsers(){
      if (model.userOffset == 0) {return;}
      getUsers(model.userOffset - model.users.length);
    }

    function getUsers(offset){
      var users = User.users.get({offset: offset});

      users.$promise.then(function(data){
        model.usersAvailable = data.users.length > 0;
        if (!model.usersAvailable) {
          // todo toast letting user know no more avail?
          return;
        }
        model.users = data.users;
      });
    }

    /**
     * User Items methods
     */
    function getNextUsersItems(){
      getUsersItems(model.usersItemsOffset + model.usersItems.length);
    }

    function getPrevUsersItems(){
      if (model.usersItemsOffset == 0) {return;}
      getUsersItems(model.usersItemsOffset - model.usersItems.length);
    }

    function getUsersItems(offset){
      var usersItems = User.usersItems.get({offset: offset, username: model.currentUser});

      usersItems.$promise.then(function(data){
        model.usersItemsAvailable = data.items.length > 0;
        if (!model.usersItemsAvailable) {
          // todo toast letting user know no more avail?
          return;
        }
        model.usersItems = data.items;
        model.usersItemsOffset = offset;
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
     * TODO THIS ALL NEEDS WORK TO ALLOW NAVIGATION FORWARD / BACKWARD THROUGH ITEMS
     */
    function getNextItems(){
      getItems(model.itemOffset + model.items.length);
    }

    function getPrevItems(){
      if (model.itemOffset == 0) {return;}
      getItems(model.itemOffset - model.items.length);
    }

    function getItems(offset){
      var items = Item.items.get({offset: offset, category: model.category});

      items.$promise.then(function(data){
        model.itemsAvailable = data.items.length > 0;
        if (!model.itemsAvailable) {
          // todo toast letting user know no more available
          return;
        }
        model.items = data.items;
        model.itemOffset = offset;
      });

    }

    function setCurrentItem(itemName){
      // set up the model with the current item if it isn't set already
      if (model.currentItem && (!model.currentItem.name || model.currentItem.name != itemName)) {
        model.currentItem = null;
      }
      var item = Item.itemDetails.get({name: itemName});

      item.$promise.then(function(data){
        model.currentItem = data.item;
      });
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