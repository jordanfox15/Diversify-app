(function(){
  'use strict';

  angular
  .module('diversifyApp', [
    'ngMaterial',
    'ui.router',
    'registration',
    'profile',
    'header',
    'news',
    'messages',
    'matches',
    'matchDetails',
    'logout',
    'login',
    'interests',
    'home',
    'demographics',
    // 'angular-carousel',
    'ngFileUpload',
    'help',
    'about',
    'serverurl-constants'

    ])
  // ROUTER
  .config([
    '$urlRouterProvider', function($urlRouterProvider){
        $urlRouterProvider.otherwise('/');
    }
  ]);

})();
