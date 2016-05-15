(function(){
  "use strict";

  angular.module('frontend')
      .controller('LoginController', LoginController);

  LoginController.$inject = ['$location', '$window', 'Auth', 'Model'];

  function LoginController($location, $window, Auth, Model){
    var client_id = '576267855242-05a9nsof8812t15vdbj08q3fcvjlkl9d.apps.googleusercontent.com';

    // grab the current hash let's see if we have args related to OAuth
    var h = $location.hash();
    var args = parseArgs(h);

    $location.hash(''); // get that ugly stuff outta here!

    if (args['error']) { // couldn't grab an access token, received error
      $location.path(args['state']);
    }
    else if (!args['access_token']) { // haven't tried to login yet
      goauthLogin();
    }
    else {
      goauthLoginFinish(args['state'], args['access_token']);
    }

    /**
     * Parse arguments that are specified in the hash portion of url after OAuth request
     * @param hash - the URL's hash
     * @returns object containing the key-value pairs of arguments present in the passed in hash
     */
    function parseArgs(hash){
      var args = {};
      var params = hash.split('&');
      for(var i = 0, l = params.length; i < l; i++){
        var keyVal = params[i].split('=');
        args[keyVal[0]] = keyVal[1];
      }
      return args;
    }

    /**
     * Begin the OAuth login process by requesting the user's permission
     * to access their Google Account profile/email
     */
    function goauthLogin(){
      // goauth config
      var response_type = 'token';
      var redirect_uri = 'http://localhost:5050/goauth';
      var scope = 'email profile';

      var state = Model.getPrevPath(); // return the user here after login

      // redirect the user to the OAuth consent screen
      $window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?' +
          'access_type=online' +
          '&client_id=' + client_id +
          '&response_type=' + response_type +
          '&redirect_uri=' + redirect_uri +
          '&scope=' + scope +
          '&state=' + state;
    }

    function goauthLoginFinish(state, access_code){
      // gotta verify the token we received from user consent
      var verify = Auth.goauthVerify.submit({access_token: access_code});

      // once the result is returned we can proceed to register/login user
      verify.$promise.then(function(data){
        var audience = data.aud;
        if (audience != client_id) { // the token has been tampered with?
          console.log('audience mismatch');
          // todo warn the user?
          return;
        }
        // necessary info
        var email = data.email;
        var oa_id = data.sub;
        var username = data.email.split('@')[0];

        // send it to the server
        var goauth = Auth.goauth.submit({
          email: email,
          oa_id: oa_id,
          username: username
        });

        // once we have a response we can log the user in with the JWT returned
        goauth.$promise.then(function(data){
          Model.setJwtString(data.jwt_token);
          Model.updateUser();

          $location.path(state ? state : '/');
        });

      }, function(data){
        console.log(data);
      }); // todo handle this
    }

  }

})();