(function(){
  'use strict';

  var MessagesCtrl = function(socket, $scope, $http, $stateParams, $window, $state){
    $scope.currentUserId = $window.sessionStorage.userId
      $scope.message = {}
    $scope.topic={}
    $scope.generateTopic=function(){
      $http({
        method: 'GET',
        url: 'http://localhost:3000/api/topics' ,
        headers:{Authorization: "Token token=" + $window.sessionStorage.accessToken
        }
      }).success(function(data){
        $scope.topic = data
      }).error(function(error){
        console.log(error);
      });
    }

    $http({
      method: 'GET',
      url: 'http://localhost:3000/api/topics' ,
      headers:{Authorization: "Token token=" + $window.sessionStorage.accessToken
      }
    }).success(function(data){
      $scope.topic = data
    }).error(function(error){
      console.log(error);
    });
    $scope.matchId = $stateParams.matchId

      $http({
        method: 'GET',
        url: 'http://localhost:3000/api/matches/' + $stateParams.matchId+ '/messages' ,
        headers:{Authorization: "Token token=" + $window.sessionStorage.accessToken
        }
      }).success(function(data){
        $scope.messages = data

      }).error(function(error){
        console.log(error);
      });

    $http({
      method: 'GET',
      url: 'http://localhost:3000/api/matches/' + $stateParams.matchId ,
      headers:{Authorization: "Token token=" + $window.sessionStorage.accessToken
      }
    }).success(function(data){
      $scope.match = data

    }).error(function(error){
      console.log(error);
    });

    $scope.processForm= function(){
      if ($scope.match.first_user.id == $scope.currentUserId ){
        var recipientId = $scope.match.second_user.id
      }
      else if ($scope.match.second_user.id == $scope.currentUserId ){
        var recipientId = $scope.match.first_user.id
      }
      $scope.message.sender_id = $scope.currentUserId
        $scope.message.recipient_id = recipientId
        $scope.message.match_id = $scope.match.id
        $http({
          method: 'POST',
          url: 'http://localhost:3000/api/matches/' + $stateParams.matchId + '/messages' ,
          data: $scope.message,
          headers:{Authorization: "Token token=" + $window.sessionStorage.accessToken}
        }).success(function(data){
          var matchId = $scope.match.id
            angular.element(document).find('md-list').append("<md-list-item md-ink-ripple='#' class='md-3-line' layout='column'> <div class='md-list-item-text' layout='column'><h3>" + $scope.message.text + "</h3></div></md-list-item>");
          socket.emit('send message', {
            room: $stateParams.matchId,
            message: $scope.message.text
          });
        });
    };
    socket.emit('subscribe', $stateParams.matchId)
      socket.on('conversation private post', function(data) {
        angular.element(document).find('md-list').append("<md-list-item md-ink-ripple='#' class='md-3-line' layout='column'> <div class='md-list-item-text' layout='column'><h3>" + data.message + "</h3></div></md-list-item>");
        console.log(data.message);
      });
  };

  angular
    .module('messages', [])

    .config(['$stateProvider', function($stateProvider) {
      $stateProvider
        .state('messages', {
          url: '/matches/:matchId',
          views: {
            'header': {
              templateUrl: '/components/partials/header.html'
            },
            'content': {
              controller: 'MessagesCtrl',
              templateUrl: '/components/messages/messages.html'
            }
          }
        });
    }])

  .controller('MessagesCtrl', [
      'socket', 
      '$scope', 
      '$http', 
      '$stateParams', 
      '$window', 
      '$state', 
      MessagesCtrl
      ]);


})();
