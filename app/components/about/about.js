(function(){
  'use strict';

  angular
  .module('about', [])

  .config(['$stateProvider', function($stateProvider){
    $stateProvider
      .state('about', {
        url: '/about',
        views: {
          'header': {
            templateUrl: '/components/partials/header.html'
          },
          'content': {
            templateUrl: '/components/about/about.html'
          }
        }
      })

  }])


})()
