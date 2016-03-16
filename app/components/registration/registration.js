(function(){
  'use strict';

  var RegistrationCtrl = function($scope, $http, $window, $state){
    $scope.user = {};
    $scope.processForm = function(){
      $http({
        method: 'POST',
        url: 'http://localhost:3000/api/users',
        data: $scope.user
      }).success(function(data){
        $window.sessionStorage.accessToken = data.token;
        $window.sessionStorage.userId = data.user;
        $state.go('demographics')
      });
    };
  }

  angular
    .module('registration', [])

    .config(['$stateProvider', function($stateProvider){
      $stateProvider
        .state('registration', {
          url: '/registration',
          views: {
            'header': {
              templateUrl: '/components/partials/header.html'
            },
            'content': {
              controller: 'RegistrationCtrl',
              templateUrl: '/components/registration/registration.html'
            }
          }
        })
    }])

    .controller("RegistrationCtrl", [
        '$scope', 
        '$http', 
        '$window', 
        '$state', 
        RegistrationCtrl
        ]);
})();
