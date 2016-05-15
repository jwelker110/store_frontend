(function(){
  "use strict";

  angular.module('frontend')
      .controller('NavbarController', NavbarController);

  NavbarController.$inject = ['$location', 'Model'];

  function NavbarController($location, Model){
    var vm = this;
    var hidden = true;

    vm.Model = Model;
    vm.navItems = Model.navItems;

    vm.hidden = isHidden;
    vm.toggleHidden = toggleHidden;

    vm.login = login;
    vm.logout = logout;

    function login(){
      Model.setPrevPath($location.path());
      $location.path('/login');
    }
    /**
     * Reset the stored information related to the currently logged
     * in user.
     */
    function logout(){
      Model.resetUserInfo();
      $location.path('/');
    }

    function isHidden(newVal){
      return newVal ? hidden = newVal : hidden;
    }

    function toggleHidden(){
      hidden = !hidden;
    }

  }

})();