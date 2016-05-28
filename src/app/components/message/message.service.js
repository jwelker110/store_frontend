(function(){
  "use strict";

  angular.module('frontend')
      .factory('Message', Message);

  Message.$inject = [];

  function Message(){
    // this will handle the various error or status messages to be displayed to the
    // user when they perform actions
    var message = {
      messages: [],
      addMessage: addMessage,
      removeMessage: removeMessage,
      resetMessages: resetMessages
    };

    return message;

    /**
     * Add a message to the message queue and display it.
     * @param {string} msg - The message to display.
     * @param {string} type - The BS alert class to attach to the message. Defaults to 'info'.
     */
    function addMessage(msg, type){
      if (!msg)
        return;
      message.messages.push({
        id: message.messages.length,
        hidden: false,
        msg: msg,
        type: type ? type : 'info'
      });
    }

    /**
     * Remove the message associated with the given ID.
     * @param {int} id - The ID associated with the message to remove.
     */
    function removeMessage(id){
      message.messages[id].hidden = true;
    }

    /**
     * Remove all messages
     */
    function resetMessages(){
      message.messages = [];
    }

  }

})();