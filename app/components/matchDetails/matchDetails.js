(function(){
  'use strict';

  var MatchDetailsCtrl = function($scope, $window, $state, $http, $stateParams, SERVER_URL){
    $scope.currentUserId = $window.sessionStorage.userId
      $scope.senderInterests = []
      $scope.recipientInterests = []

      $http({
        method: 'GET',
        url: SERVER_URL + '/api/matches/' + $stateParams.matchId ,
        headers:{Authorization: "Token token=" + $window.sessionStorage.accessToken
        }
      }).success(function(data){
        $scope.match = data[0]
          if ($scope.match.first_user.id == $scope.currentUserId ){
            var recipientId = $scope.match.second_user.id
              $scope.recipientName = $scope.match.second_user.first_name + " " + $scope.match.second_user.last_name
              $scope.currentUserName = $scope.match.first_user.first_name + " " + $scope.match.first_user.last_name
          }
          else if ($scope.match.second_user.id == $scope.currentUserId ){
            var recipientId = $scope.match.first_user.id
              $scope.recipientName = $scope.match.first_user.first_name + " " + $scope.match.first_user.last_name
              $scope.currentUserName = $scope.match.second_user.first_name + " " + $scope.match.second_user.last_name
          }
        $http({
          method: 'GET',
          url: SERVER_URL + '/api/users/' + recipientId + '/interests',
          headers:{Authorization: "Token token=" + $window.sessionStorage.accessToken
          }
        }).success(function(data){
          $scope.recipientInterests = data.map(function(obj) { return obj.name });
        });

        $http({
          method: 'GET',
          url: SERVER_URL + '/api/users/' + $scope.currentUserId + '/interests',
          headers:{Authorization: "Token token=" + $window.sessionStorage.accessToken
          }
        }).success(function(data){
          $scope.senderInterests = data.map(function(obj) { return obj.name });
        });
      }).error(function(error){
        console.log(error);
      });

    $scope.$watch("senderInterests", function(newValue, oldValue){

      if (newValue.length > 0){
        $scope.commonInterests = _.intersection($scope.senderInterests, $scope.recipientInterests)
      }
    })
    $scope.$watch("recipientInterests", function(newValue, oldValue){

      if (newValue.length > 0){
        $scope.commonInterests = _.intersection($scope.senderInterests, $scope.recipientInterests)
      }
    })

  }

  angular
    .module('matchDetails', ['serverurl-constants'])

    .config(['$stateProvider', function($stateProvider){
      $stateProvider
        .state('matchDetails', {
          url: '/matches/:matchId/info',
          views: {
            'header': {
              templateUrl: '/components/partials/header.html'
            },
            'content': {
              templateUrl: '/components/matchDetails/matchDetails.html',
              controller: 'MatchDetailsCtrl'
            },
          }
        })
    }])

  .controller("MatchDetailsCtrl", [
      '$scope',
      '$window',
      '$state',
      '$http',
      '$stateParams',
      'SERVER_URL',
      MatchDetailsCtrl
  ]);
})();
