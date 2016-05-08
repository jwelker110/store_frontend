(function() {
  'use strict';

  angular
    .module('frontend')
    .config(routerConfig);

  routerConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

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
          url: '/items/:itemName',
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
        .state('login', {
          url: '/login',
          templateUrl: 'app/user/login.html',
          controller: 'LoginController',
          controllerAs: 'loginCtrl'
        })
        .state('register', {
          url: '/register',
          templateUrl: 'app/user/register.html',
          controller: 'RegisterController',
          controllerAs: 'regCtrl'
        });

    $urlRouterProvider.otherwise('/');
  }

})();
