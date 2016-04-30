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
    vm.logout = logout;

    function isHidden(newVal){
      return newVal ? hidden = newVal : hidden;
    }

    function toggleHidden(){
      hidden = !hidden;
    }

    function logout(){
      // todo implement
    }


  }

})();