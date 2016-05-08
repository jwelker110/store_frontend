(function(){
  "use strict";

  angular.module('frontend')
      .factory('Auth', Auth);

  Auth.$inject = ['$resource'];

  function Auth($resource){

    return {
      register: $resource('http://localhost:8080/register',
          {
            submit: {
              method: 'POST',
              params: {
                first_name: null,
                last_name: null,
                email: null,
                username: null,
                password: null,
                g_recaptcha_response: null
              }
            }
          }),
      login: $resource('http://localhost:8080/login',
          {
            submit: {
              method: 'POST',
              params: {
                username: null,
                password: null
              }
            }
          }),
      confirm: $resource('http://localhost:8080/confirm',
          {
            submit: {
              method: 'POST',
              params: {
                token: null,
                jwt_token: null,
                username: null,
                confirmed: null
              }
            }
          }),
      reauth: $resource('http://localhost:8080/reauth',
          {
            submit: {
              method: 'POST',
              params: {
                jwt_token: null
              }
            }
          }),
      goauth: $resource('http://localhost:8080/goauth',
          {
            submit: {
              method: 'POST',
              params: {
                code: null
              }
            }
          })
    }

  }

})();