(function(){
  'use strict';

  angular
    .module('news', [])

    .config(['$stateProvider', function($stateProvider){
      $stateProvider
        .state('news', {
          url: '/news',
          views: {
            'header': {
              templateUrl: '/components/partials/header.html'
            },
            'content': {
              templateUrl: '/components/news/news.html'
            }
          }
        })
    }])

})();
