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
        .state('category', {
          url: '/category/:categoryName',
          templateUrl: 'app/items/browse.html',
          controller: 'BrowseController',
          controllerAs: 'browseCtrl'
        })
        .state('item', {
          url: '/items/:itemName',
          templateUrl: 'app/items/item.html',
          controller: 'ItemController',
          controllerAs: 'itemCtrl'
        })
        .state('create', {
          url: '/create',
          templateUrl: 'app/items/create.html',
          controller: 'CreateController',
          controllerAs: 'createCtrl'
        })
        .state('edit', {
          url: '/items/:itemName/edit',
          templateUrl: 'app/items/edit.html',
          controller: 'EditController',
          controllerAs: 'editCtrl'
        })
        .state('login', {
          url: '/login',
          templateUrl: 'app/user/login.html',
          controller: 'LoginController',
          controllerAs: 'loginCtrl'
        });

    $urlRouterProvider.otherwise('/');
  }

})();
