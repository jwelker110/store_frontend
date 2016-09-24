(function(){
  "use strict";

  angular.module('frontend')
      .factory('Auth', Auth);

  Auth.$inject = ['$resource'];

  function Auth($resource){

    return {
      /**
       * Resource for refreshing JWT tokens
       */
      reauth: $resource('/api/reauth', {},
          {
            refresh: {
              method: 'POST',
              params: {
                jwt_token: null
              }
            }
          }),
      /**
       * Resource to login/signup the user after their OAuth token has been confirmed.
       */
      goauth: $resource('/api/goauth', {},
          {
            submit: {
              method: 'POST',
              params: {
                access_token: null
              }
            }
          })
    }

  }

})();
