(function(){
  "use strict";

  angular.module('frontend')
      .factory('Model', Model);

  Model.$inject = ['$localStorage', '$sessionStorage', 'jwtHelper', 'Item', 'User', 'Category'];

  function Model($localStorage, $sessionStorage, jwtHelper, Item, User, Category) {
    var storage = $localStorage.$default({
      jwt_token_string: null
    });

    var prevPath = '/';

    var itemPrevLen = 0;
    var usersItemsPrevLen = 0;

    var model = {

      username: null,
      rememberMe: true,

      category: null,

      itemOffset: 0,
      currentItem: {
        id: null,
        name: null,
        owner_name: null,
        image_url: null,
        description: null,
        category: null,
        price: null,
        sale_price: null,
        stock: null
      },
      items: [],
      itemsAvailable: true,

      usersItemsOffset: 0,
      usersItems: [],
      usersItemsAvailable: true,
      currentUser: null,

      categories: [],

      getNextItems: getNextItems,
      getPrevItems: getPrevItems,
      refreshItems: refreshItems,
      resetItems: resetItems,
      setCurrentItem: setCurrentItem,
      resetCurrentItem: resetCurrentItem,

      setCurrentUser: setCurrentUser,
      getNextUsersItems: getNextUsersItems,
      getPrevUsersItems: getPrevUsersItems,

      setCategory: setCategory,

      setPrevPath: setPrevPath,
      getPrevPath: getPrevPath,

      getJwtString: getJwtString,
      setJwtString: setJwtString,

      resetUserInfo: resetUserInfo,
      updateUser: updateUser,
      setStorageType: setStorageType

    };

    // get the categories to display
    getCategories();

    updateUser();

    return model;

    /**
     * User Items methods
     */
    function getNextUsersItems(){
      getUsersItems(model.usersItemsOffset + model.usersItems.length);
    }

    function getPrevUsersItems(){
      if (model.usersItemsOffset == 0) {return;}
      getUsersItems(model.usersItemsOffset - usersItemsPrevLen);
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
        usersItemsPrevLen = model.usersItems.length > usersItemsPrevLen ? model.usersItems.length : usersItemsPrevLen;
      });
    }

    function setCurrentUser(username){
      model.currentUser = username;
    }

    /**
     * Category methods
     */
    function setCategory(cat){
      if (cat === model.category && cat) {return;}
      model.itemOffset = 0;
      model.category = cat;
      model.items = [];
      getItems(model.itemOffset);
    }

    function getCategories(){
      var cat = Category.categories.get();

      cat.$promise.then(function(data){
        model.categories = data.categories;
      });
    }

    /**
     * Item methods
     */
    function getNextItems(){
      getItems(model.itemOffset + model.items.length);
    }

    function getPrevItems(){
      if (model.itemOffset == 0) {return;}
      getItems(model.itemOffset - itemPrevLen);
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
        itemPrevLen = model.items.length > itemPrevLen ? model.items.length : itemPrevLen;
      });

    }

    function refreshItems(){
      getItems(model.itemOffset);
    }

    function resetItems(){
      model.itemOffset = 0;
      model.items = [];
      model.itemsAvailable = true;
      resetCurrentItem();
      refreshItems();
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

    function resetCurrentItem(){
      model.currentItem = {
        id: null,
        name: null,
        owner_name: null,
        image_url: null,
        description: null,
        category: null,
        price: null,
        sale_price: null,
        stock: null
      }
    }

    /**
     * URL set/get
     */
    function setPrevPath(path){
      prevPath = path;
    }

    function getPrevPath(){
      return prevPath;
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
    }

    function resetUserInfo(){
      model.username = null;
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