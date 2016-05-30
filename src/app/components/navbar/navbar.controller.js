(function(){
  "use strict";

  angular.module('frontend')
      .controller('NavbarController', NavbarController);

  NavbarController.$inject = ['$location', 'Model'];

  function NavbarController($location, Model){
    var vm = this;
    var hidden = true;

    vm.Model = Model;
    vm.appName = "Store App";
    vm.navItems = [
      {
        sref: 'browse',
        name: 'Browse',
        show: true
      }
    ];

    vm.isHidden = isHidden;
    vm.toggleHidden = toggleHidden;

    vm.login = login;
    vm.logout = logout;

    /**
     * Sets the prevPath so we know where to go after logging in,
     * and sets the location to the path associated with user login.
     */
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

    /**
     * Getter for the variable associated with the navbar collapse
     * @returns {boolean}
     */
    function isHidden(val){
      return val ? hidden = val : hidden;
    }

    /**
     * Toggles the var associated with the navbar collapse
     */
    function toggleHidden(){
      hidden = !hidden;
    }

  }

})();