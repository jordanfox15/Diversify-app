(function(){
  'use strict';

  var ProfileCtrl = function($scope, $http, $window, SERVER_URL){
    $scope.user = {};
    $http({
      method: 'GET',
      url: SERVER_URL + '/api/users/profile_picture',
      headers:{Authorization: "Token token=" + $window.sessionStorage.accessToken
      }
    }).success(function(data){
      console.log(data);
      $scope.profile_pic = data
    });
    $http({
      method: 'GET',
      url: SERVER_URL + '/api/users/profile',
      headers:{Authorization: "Token token=" + $window.sessionStorage.accessToken
      }
    }).success(function(data){
      $scope.user = data
    });
  };

  angular
    .module('profile', [])

    .config(['$stateProvider', function($stateProvider){
      $stateProvider
        .state('profile', {
          url: '/profile',
          views: {
            'header':{
              templateUrl: '/components/partials/header.html'
            },
            'content':{
              controller: 'ProfileCtrl',
              templateUrl: '/components/profile/profile.html'
            }
          }
        })
    }])

  .controller("ProfileCtrl", [
      '$scope',
      '$http',
      '$window',
      'SERVER_URL',
      ProfileCtrl
      ]);

})();
