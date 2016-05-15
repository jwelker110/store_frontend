(function() {
  'use strict';

  angular
    .module('frontend')
    .config(config);

  config.$inject = ['$logProvider'];

  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(true);


  }

})();
