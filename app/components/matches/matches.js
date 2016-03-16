(function(){
  'use strict';

  var MatchesCtrl = function($scope, $http, $window){
    $scope.currentUserId = $window.sessionStorage.userId
      $http({
        method: 'GET',
        url: 'http://localhost:3000/api/matches',
        headers:{Authorization: "Token token=" + $window.sessionStorage.accessToken
        }
      }).success(function(data){
        $scope.matches = data

      }).error(function(error){
        console.log(error);
      });


  }

  angular
    .module('matches', [])

    .config(['$stateProvider', function($stateProvider){
      $stateProvider
        .state('matches', {
          url: '/matches',
          views: {
            'header': {
              templateUrl: '/components/partials/header.html'
            },
            'content': {
              templateUrl: '/components/matches/matches.html',
              controller: 'MatchesCtrl'
            }
          }
        });
    }])

    .controller('MatchesCtrl', [
        '$scope', 
        '$http', 
        '$window',
        MatchesCtrl
        ]);
})();

