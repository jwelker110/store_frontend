(function(){
  "use strict";

  angular.module('frontend')
      .controller('LoginController', LoginController);

  LoginController.$inject = ['$location', '$window', 'Auth', 'Model'];

  function LoginController($location, $window, Auth, Model){
    var vm = this;

    var h = $location.hash();
    var params = h.split('&');
    if (params.length == 4) {
      var state = params[0].split('=')[1];
      var access_code = params[1].split('=')[1];
      $location.hash('');
      goauthLoginFinish(state, access_code);
    }

    // goauth config
    var client_id = '576267855242-05a9nsof8812t15vdbj08q3fcvjlkl9d.apps.googleusercontent.com';
    var response_type = 'token';
    var redirect_uri = 'http://localhost:5050/goauth';
    var scope = 'email profile';

    vm.Model = Model;

    vm.login = login;
    vm.register = register;
    vm.goauthLogin = goauthLogin;

    function login(){
      Model.setStorageType();

      var login = Auth.login.submit({
        username: Model.formUsername,
        password: Model.formPassword
      });

      login.$promise.then(function(data){
        Model.setJwtString(data.jwt_token);
        Model.updateUser();
        $location.path(Model.getPrevPath());
        // todo toast user login possibly?
      });
    }

    function register(){
      Model.setStorageType();

      var reg = Auth.register.submit({
        username: Model.formUsername,
        password: Model.formPassword,
        confirm: Model.formPassword,
        email: Model.formEmail
      });

      reg.$promise.then(function(data){
        Model.setJwtString(data.jwt_token);
        Model.updateUser();
        $location.path(Model.getPrevPath());
        // todo toast user confirm email possibly?
      });
    }

    function goauthLogin(){
      var state = Model.getPrevPath();

      $window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?' +
          'client_id=' + client_id +
          '&response_type=' + response_type +
          '&redirect_uri=' + redirect_uri +
          '&scope=' + scope +
          '&state=' + state;

    }

    function goauthLoginFinish(state, access_code){
      var verify = Auth.goauthVerify.submit({access_token: access_code});

      verify.$promise.then(function(data){
        var audience = data.aud;
        if (audience != client_id) {
          console.log('audience mismatch');
          // todo warn the user?
          return;
        }
        var email = data.email;
        var oa_id = data.sub;
        var username = data.email.split('@')[0];

        // send it to the server
        var goauth = Auth.goauth.submit({
          email: email,
          oa_id: oa_id,
          username: username
        });

        goauth.$promise.then(function(data){
          Model.setJwtString(data.jwt_token);
          Model.updateUser();
          if (state) {
            $location.path(state);
          }
          else {
            $location.path('/');
          }
        });

      }, function(data){
        console.log(data);
      }); // todo handle this
    }

  }

})();