(function(){
  'use strict';

  var LoginCtrl = function($scope, $http, $window, $state){
    $scope.user = {};
    $scope.processForm= function(){
      $http({
        method: 'POST',
        url: 'http://localhost:3000/api/sessions',
        data: $scope.user
      }).success(function(data){
        $window.sessionStorage.accessToken = data.token;
        $window.sessionStorage.userId = data.user.id;
        $state.go('profile')
      });
    };
  }

  angular
    .module('login', [])

    .config(['$stateProvider', function($stateProvider){
      $stateProvider
        .state('login', {
          url: '/login',
          views: {
            'header': {
              templateUrl: '/components/partials/header.html'
            },
            'content': {
              controller: 'LoginCtrl',
              templateUrl: '/components/login/login.html'
            }
          }
        });
    }])

  .controller("LoginCtrl", [
      '$scope', 
      '$http', 
      '$window', 
      '$state', 
      LoginCtrl
  ]);

})();
