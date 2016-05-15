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
        .state('login', {
          url: '/login',
          templateUrl: 'app/user/login.html',
          controller: 'LoginController'
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
        });

    $urlRouterProvider.otherwise('/');
  }

})();
