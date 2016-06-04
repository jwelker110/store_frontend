(function(){
  "use strict";

  angular.module('frontend')
      .controller('MessageController', MessageController);

  MessageController.$inject = ['Message'];

  function MessageController(Message){
    var vm = this;

    vm.Message = Message;

    vm.removeMessage = removeMessage;

    function removeMessage(id){
      Message.removeMessage(id);
    }

  }

})();