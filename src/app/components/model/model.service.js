(function(){
  "use strict";

  angular.module('frontend')
      .factory('Model', Model);

  Model.$inject = ['$localStorage', '$sessionStorage', '$location', 'jwtHelper', 'Auth', 'Item', 'User', 'Category'];

  function Model($localStorage, $sessionStorage, $location, jwtHelper, Auth, Item, User, Category) {
    var storage = $localStorage.$default({
      jwt_token_string: null
    });

    var prevPath = '/';

    var itemPrevLen = 0;
    var usersItemsPrevLen = 0;

    var model = {

      username: null,

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
      refreshCurrentItem: refreshCurrentItem,

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
     * Calls getUsersItems and passes in the desired offset
     * to retrieve the next page of items associated with the user.
     */
    function getNextUsersItems(){
      getUsersItems(model.usersItemsOffset + model.usersItems.length);
    }

    /**
     * Calls getUsersItems and passes in the desired offset
     * to retrieve previous pages of items associated with the user.
     */
    function getPrevUsersItems(){
      if (model.usersItemsOffset == 0) {return;}
      getUsersItems(model.usersItemsOffset - usersItemsPrevLen);
    }

    /**
     * Utilizes the User resource to retrieve items associated
     * with the currently signed-in user.
     * @param offset {int} - Offset to begin retrieval from.
     */
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

    /**
     * Set the current user for this instance of the application.
     * @param username {string} - Username to associate with this user.
     */
    function setCurrentUser(username){
      model.currentUser = username;
    }

    /**
     * Set the current category. If this is a category not currently set,
     * reset the offset and currently available items.
     * @param cat {string} - Desired category
     */
    function setCategory(cat){
      if (cat === model.category && cat) {return;}
      model.itemOffset = 0;
      model.category = cat;
      model.items = [];
      getItems(model.itemOffset);
    }

    /**
     * Retrieve the available categories using the
     * Category resource.
     */
    function getCategories(){
      var cat = Category.categories.get();

      cat.$promise.then(function(data){
        model.categories = data.categories;
      });
    }

    /**
     * Calls getItems and passes in the desired offset
     * to retrieve the next page of items.
     */
    function getNextItems(){
      getItems(model.itemOffset + model.items.length);
    }

    /**
     * Calls getItems and passes in the desired offset
     * to retrieve the previous page of items.
     */
    function getPrevItems(){
      if (model.itemOffset == 0) {return;}
      getItems(model.itemOffset - itemPrevLen);
    }

    /**
     * Utilizes the Item resource to retrieve a list of items associated
     * with the current category, if set, and using the desired offset.
     * @param offset {int} - The offset to begin retrieval from.
     */
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

    /**
     * Refreshes the current items to reflect any changes to them.
     */
    function refreshItems(){
      getItems(model.itemOffset);
    }

    /**
     * Retrieve the default items viewed when application is initialized.
     */
    function resetItems(){
      model.itemOffset = 0;
      model.items = [];
      model.itemsAvailable = true;
      resetCurrentItem();
      refreshItems();
    }

    /**
     * Set the currently viewed item on the Model.
     * @param itemName {string} - The name of the item we wish to set as the current item.
     */
    function setCurrentItem(itemName){
      // set up the model with the current item if it isn't set already
      if (model.currentItem && (!model.currentItem.name || model.currentItem.name != itemName)) {
        model.currentItem = null;
      }
      var item = Item.itemDetails.get({name: itemName});

      item.$promise.then(function(data){
        if (!data.item) {
          resetCurrentItem();
          $location.path('/');
        }
        model.currentItem = data.item;
      });
    }

    /**
     * Updates the current item to reflect any changes made by editing it.
     */
    function refreshCurrentItem(){
      if (!Model.currentItem || !Model.currentItem.name) {return;}
      Model.setCurrentItem(Model.currentItem.name);
    }

    /**
     * Removes the current item from the Model.
     */
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
     * Setter for prevPath
     * @param path {string} - The desired path
     */
    function setPrevPath(path){
      prevPath = path;
    }

    /**
     * Getter for prevPath
     * @returns {string} - The value of the previously visited path
     */
    function getPrevPath(){
      return prevPath;
    }

    /**
     * Getter for the JWT stored in local/session storage.
     */
    function getJwtString(){
      return storage.jwt_token_string;
    }

    /**
     * Setter for the JWT stored in local/session storage.
     * @param jwt {string} - The JSON Web Token
     */
    function setJwtString(jwt){
      storage.jwt_token_string = jwt;
    }

    /**
     * Refresh the values associated with the current user. If the
     * JWT token is expired, it is removed from local/session storage.
     */
    function updateUser(){
      var jwt = getJwtString();
      if (!jwt) {
        resetUserInfo();
        return;
      }
      var exp = jwtHelper.isTokenExpired(jwt);
      if (exp) {
        resetUserInfo();
        return;
      }

      var newToken = Auth.reauth.refresh({
        jwt_token: getJwtString()
      });

      newToken.$promise
          .then(function(data){
            setJwtString(data.jwt_token);

            var payload = jwtHelper.decodeToken(getJwtString());

            model.username = payload.username;
          })
          .catch(function(data){

          });

    }

    /**
     * Remove the values associated with the current user. Remove
     * the JWT token from local/session storage.
     */
    function resetUserInfo(){
      model.username = null;
      setJwtString(null);
    }

    /**
     * Set the desired storage type for storing the JWT.
     * @param rememberMe {boolean} - True for local storage, false for session storage.
     */
    function setStorageType(rememberMe){
      if (!rememberMe) {
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