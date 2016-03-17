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
    'ngFileUpload',
    'help',
    'about'
    ])
  // ROUTER
  .config([
    '$urlRouterProvider', function($urlRouterProvider){
        $urlRouterProvider.otherwise('/');
    }
  ]);

})();
