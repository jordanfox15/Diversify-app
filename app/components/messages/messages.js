(function(){
  'use strict';

  var MessagesCtrl = function(socket, $scope, $http, $stateParams, $window, $state, SERVER_URL){
    $scope.currentUserId = $window.sessionStorage.userId
      $scope.message = {}
    $scope.topic={}
    $http({
      method: 'GET',
      url: SERVER_URL + '/api/users/profile_picture',
      headers:{Authorization: "Token token=" + $window.sessionStorage.accessToken
      }
    }).success(function(data){
      $scope.profile_pic = data
    });
    $scope.setTopic = function(){
      $http({
        method: 'PATCH',
        url: SERVER_URL + '/api/matches/'+$stateParams.matchId ,
        headers:{Authorization: "Token token=" + $window.sessionStorage.accessToken,
        data: $scope.matchId
        }
      }).success(function(data){
        $scope.topic = data.topic
      }).error(function(error){
        console.log(error);
      });
    }

      $http({
        method: 'GET',
        url: SERVER_URL + '/api/matches/' + $stateParams.matchId+ '/messages' ,
        headers:{Authorization: "Token token=" + $window.sessionStorage.accessToken
        }
      }).success(function(data){
        $scope.messages = data

      }).error(function(error){
        console.log(error);
      });

    $http({
      method: 'GET',
      url: SERVER_URL + '/api/matches/' + $stateParams.matchId ,
      headers:{Authorization: "Token token=" + $window.sessionStorage.accessToken
      }
    }).success(function(data){
      $scope.match = data
      $scope.topic = data.topic
      if ($scope.match.first_user.id == $scope.currentUserId ){
         $scope.otherSenderName = $scope.match.second_user.first_name + " " + $scope.match.second_user.last_name
      }
      else if ($scope.match.second_user.id == $scope.currentUserId ){
         $scope.otherSenderName = $scope.match.first_user.first_name + " " + $scope.match.first_user.last_name
      }

    }).error(function(error){
      console.log(error);
    });

    $scope.processForm= function(){
      if ($scope.match.first_user.id == $scope.currentUserId ){
        var recipientId = $scope.match.second_user.id
        var senderName = $scope.match.first_user.first_name + " " + $scope.match.first_user.last_name
      }
      else if ($scope.match.second_user.id == $scope.currentUserId ){
        var recipientId = $scope.match.first_user.id
        var senderName = $scope.match.second_user.first_name + " " + $scope.match.second_user.last_name
      }
      $scope.message.sender_id = $scope.currentUserId
        $scope.message.recipient_id = recipientId
        $scope.message.match_id = $scope.match.id
        $http({
          method: 'POST',
          url: SERVER_URL + '/api/matches/' + $stateParams.matchId + '/messages' ,
          data: $scope.message,
          headers:{Authorization: "Token token=" + $window.sessionStorage.accessToken}
        }).success(function(data){
          var matchId = $scope.match.id
            angular.element(document).find('md-list').append("<md-list-item md-ink-ripple='#' class='md-no-proxy md-3-line' layout='column'> <div class='md-list-item-text' layout='column'><h3>" + $scope.message.text + "</h3><h4>" + senderName + "</h4><h4>" + (new Date()).toLocaleTimeString('en-GB') + "</h4></div></md-list-item>");
          socket.emit('send message', {
            room: $stateParams.matchId,
            message: $scope.message.text
          });
            $scope.message.text = null;
        });
    };
    socket.emit('subscribe', $stateParams.matchId)
      socket.on('conversation private post', function(data) {
            angular.element(document).find('md-list').append("<md-list-item md-ink-ripple='#' class='md-no-proxy md-3-line' layout='column'> <div class='md-list-item-text' layout='column'><h3>" + data.message + "</h3><h4>" + $scope.otherSenderName + "</h4><h4>" + (new Date()).toLocaleTimeString('en-GB') + "</h4></div></md-list-item>")
      });
  };

  angular
    .module('messages', ['luegg.directives'])

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
			'SERVER_URL',
      MessagesCtrl
      ]);


})();
