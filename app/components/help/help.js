(function(){
  'use strict';

  angular
  .module('help', [])

  .config(['$stateProvider', function($stateProvider){
    $stateProvider
      .state('help', {
        url: '/help',
        views: {
          'header': {
            templateUrl: '/components/partials/header.html'
          },
          'content': {
            templateUrl: '/components/help/help.html'
          }
        }
      })

  }])


})()
