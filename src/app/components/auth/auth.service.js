(function(){
  "use strict";

  angular.module('frontend')
      .factory('Auth', Auth);

  Auth.$inject = ['$resource'];

  function Auth($resource){

    return {
      reauth: $resource('http://localhost:8080/reauth', {},
          {
            refresh: {
              method: 'POST',
              params: {
                jwt_token: null
              }
            }
          }),
      goauthVerify: $resource('https://www.googleapis.com/oauth2/v3/tokeninfo', {},
          {
            submit: {
              method: 'GET',
              params: {
                access_token: null
              }
            }
          }),
      goauth: $resource('http://localhost:8080/goauth', {},
          {
            submit: {
              method: 'POST',
              params: {
                email: null,
                oa_id: null,
                username: null
              }
            }
          })
    }

  }

})();