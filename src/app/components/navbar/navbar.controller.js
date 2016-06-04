(function(){
  "use strict";

  angular.module('frontend')
      .controller('NavbarController', NavbarController);

  NavbarController.$inject = ['$location', 'Model'];

  function NavbarController($location, Model){
    var vm = this;

    vm.Model = Model;
    vm.appName = "Store App";
    vm.navItems = [
      {
        sref: 'browse',
        name: 'Browse',
        show: true
      }
    ];
    vm.hidden = true;
    vm.hiddenDropdown = true;

    vm.toggleDropdownHidden = toggleDropdownHidden;
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
     * Getter/Setter for the variable associated with the navbar collapse
     * @param val {boolean} - value indicating hidden
     * @returns {boolean}
     */
    function toggleHidden(val){
      vm.hidden = val ? val : !vm.hidden;
      if (vm.hidden) {  // we KNOW that the category dd should be hidden
        toggleDropdownHidden(true);
      }
    }

    /**
     * Getter/Setter for the variable associated with the navbar collapse
     * @param val {boolean} - value indicating dropped down
     * @returns {boolean}
     */
    function toggleDropdownHidden(val){
      vm.hiddenDropdown = val ? val : !vm.hiddenDropdown;
    }

  }

})();