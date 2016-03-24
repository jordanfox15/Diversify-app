(function(){
  'use strict';

  var MatchesCtrl = function($scope, $http, $window, matches, SERVER_URL){
    $scope.currentUserId = $window.sessionStorage.userId

    $scope.matches= matches.data
      // console.log($scope.matches)

    // console.log($scope.currentUserId)

      // $http({
      //   method: 'GET',
      //   url: 'http://localhost:3000/api/users/profile_picture',
      //   headers:{Authorization: "Token token=" + $window.sessionStorage.accessToken
      //   }
      // }).success(function(data){
      //   // console.log(data);
      //   $scope.profile_pic = data
      // });
      // .success(function(data){
      //   $scope.matches = data

      // }).error(function(error){
      // });
      $http({
        method: 'GET',
        url: SERVER_URL + '/api/users/' + $scope.matches[0].first_user_id +'/recipient_picture',
        headers:{Authorization: "Token token=" + $window.sessionStorage.accessToken
        }
      }).success(function(data){
        console.log(data);

        $scope.recipient_pic = data
        console.log($scope.recipient_pic)
      });
  }
  MatchesCtrl.resolve= {
    matches: ['$http',
              '$window',
              function($http, $window){
              return $http({
                method: 'GET',
                url: SERVER_URL + '/api/matches',
                headers:{Authorization: "Token token=" + $window.sessionStorage.accessToken
        }
      })}]
  }
  angular
    .module('matches', ['serverurl-constants'])

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
              controller: 'MatchesCtrl',
              resolve: MatchesCtrl.resolve
            }
          }
        });
    }])

    .controller('MatchesCtrl', [
        '$scope',
        '$http',
        '$window',
        'matches',
        'SERVER_URL',
        MatchesCtrl
        ]);
})();

