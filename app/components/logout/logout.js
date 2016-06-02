(function(){
  'use strict';

  var LogoutCtrl = function($scope, $http, $window, $state, SERVER_URL){
  $scope.user = {};
  $http({
    method: 'DELETE',
    url: SERVER_URL + '/api/sessions',
    headers:{Authorization: "Token token=" + $window.sessionStorage.accessToken
    }
  }).success(function(data){
    $window.sessionStorage.removeItem('accessToken');
    $state.go('home')
  });
}

  angular
    .module('logout', [])

    .config(['$stateProvider', function($stateProvider){
      $stateProvider
        .state('logout',{
          url: '/logout',
          views: {
            'content':{
              controller: 'LogoutCtrl'
            }
          }
        })
    }])


.controller("LogoutCtrl", [
    '$scope', 
    '$http', 
    '$window', 
    '$state', 
    'SERVER_URL',
    LogoutCtrl
    ]);

})();
