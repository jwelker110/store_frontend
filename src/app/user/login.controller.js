(function(){
  "use strict";

  angular.module('frontend')
      .controller('LoginController', LoginController);

  LoginController.$inject = ['$location', '$window', 'jwtHelper', 'Auth', 'Model', 'Message'];

  function LoginController($location, $window, jwtHelper, Auth, Model, Message){
    var vm = this;

    var client_id = '818303397260-pr5aqut8j4eljmikvd6a9mam1gaohrdh.apps.googleusercontent.com';
    var h = $location.hash();  // grab the current hash let's see if we have args related to OAuth
    $location.hash('');        // clean up the hash
    var args = parseArgs(h);   // grab the args from the hash

    vm.Model = Model;

    vm.finish = false;

    vm.goauthLogin = goauthLogin;
    vm.goauthLoginFinish = goauthLoginFinish;


    if (args['error']) { // couldn't grab an access token, received error
      $location.path(args['state']);
    } else if (args['access_token']) {
      vm.finish = true;
    } else {
      goauthLogin();
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
      var redirect_uri = 'http://' + location.host + '/goauth';
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

    /**
     * Complete the OAuth login process since we have the user's access token.
     * Pass the access token to the server, where it is used to retrieve the
     * user's information and log them in.
     * @param rememberMe {boolean} - value representing the user's choice of
     * local/session storage.
     */
    function goauthLoginFinish(rememberMe){
      var goauth = Auth.goauth.submit({access_token: args['access_token']});

      goauth.$promise.then(function(data){
        Model.setStorageType(rememberMe);
        Model.setJwtString(data.jwt_token);
        // set this now so we can redirect user
        var payload = jwtHelper.decodeToken(data.jwt_token);
        Model.username = payload.username;
        Model.updateUser();
        // if the state was passed in the URL, redirect to it, else go home
        $location.path(args['state'] ? args['state'] : '/');
      }, goauthLoginFailure);
    }

    /**
     * Failure callback for Google Oauth login
     */
    function goauthLoginFailure(){
      Message.addMessage('You could not be logged in at this time', 'danger');
    }

  }

})();
