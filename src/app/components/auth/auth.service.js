(function(){
  "use strict";

  angular.module('frontend')
      .factory('Auth', Auth);

  Auth.$inject = ['$resource'];

  function Auth($resource){

    return {
      register: $resource('http://localhost:8080/register',
          {
            first_name: null,
            last_name: null,
            email: null,
            username: null,
            password: null,
            g_recaptcha_response: null
          },
          {
            submit: {method: 'POST'}
          }),
      login: $resource('http://localhost:8080/login',
          {
            username: null,
            password: null
          },
          {
            submit: {method: 'POST'}
          }),
      confirm: $resource('http://localhost:8080/confirm',
          {
            token: null,
            jwt_token: null,
            username: null,
            confirmed: null
          },
          {
            submit: {method: 'POST'}
          }),
      reauth: $resource('http://localhost:8080/reauth',
          {
            jwt_token: null
          },
          {
            submit: {method: 'POST'}
          }),
      goauth: $resource('http://localhost:8080/goauth',
          {
            code: null
          },
          {
            submit: {method: 'POST'}
          })
    }

  }

})();