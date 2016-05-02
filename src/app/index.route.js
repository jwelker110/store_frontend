(function() {
  'use strict';

  angular
    .module('frontend')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('browse', {
          url: '/',
          templateUrl: 'app/items/browse.html',
          controller: 'BrowseController',
          controllerAs: 'browseCtrl'
        })
        .state('about', {
          url: '/about',
          templateUrl: 'app/about/about.html'
        })
        .state('contact', {
          url: '/contact',
          templateUrl: 'app/contact/contact.html',
          controller: 'ContactController',
          controllerAs: 'contactCtrl'
        })
        .state('item', {
          url: '/items/:itemName/:itemId',
          templateUrl: 'app/items/item.html',
          controller: 'ItemController',
          controllerAs: 'itemCtrl'
        })
        .state('settings', {
          url: '/settings',
          templateUrl: 'app/user/settings.html',
          controller: 'SettingsController',
          controllerAs: 'settingsCtrl'
        })
        .state('login-register', {
          url: '/login-register',
          templateUrl: 'app/user/login-register.html',
          controller: 'LoginRegisterController',
          controllerAs: 'loginRegCtrl'
        });

    $urlRouterProvider.otherwise('/');
  }

})();
