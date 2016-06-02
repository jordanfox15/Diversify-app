(function(){
  'use strict';

  var LoginCtrl = function($scope, $http, $window, $state, SERVER_URL){
    console.log(SERVER_URL)
    $scope.user = {};
    $scope.processForm= function(){
      $http({
        method: 'POST',
        url: SERVER_URL + '/api/sessions',
        data: $scope.user
      }).success(function(data){
        $window.sessionStorage.accessToken = data.token;
        $window.sessionStorage.userId = data.user.id;
        $state.go('profile')
      });
    };
  }

  angular
    .module('login', ['serverurl-constants'])

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
      'SERVER_URL',
      LoginCtrl
  ]);

})();
