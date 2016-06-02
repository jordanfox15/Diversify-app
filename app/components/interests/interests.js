(function(){
  'use strict';

  var InterestsCtrl = function($scope, $http, $window, $state, selected_interests, interest_list, SERVER_URL){
      $scope.selected = [];
    if (selected_interests.data.length > 0){
      $scope.selected = selected_interests.data.map(function(obj){
        return obj.id
      })
    }
    $scope.interests = interest_list.data

    $scope.toggle = function (item, list) {
      var index = list.indexOf(item.id)
      if (index == -1){
        list.push(item.id);
      } else {
        list.splice(index, 1);
      };
    };

    $scope.exists = function (item, list) {
      return list.includes(item.id);
    };

    $scope.processForm = function(){
      $scope.selected;
      $http({
        method: 'PATCH',
        url: SERVER_URL + '/api/users/profile',
        data: {user: {interest_ids: $scope.selected}},
        headers:{Authorization: "Token token=" + $window.sessionStorage.accessToken}
      }).success(function(data){
        $state.go('profile')
      });
    }
  }

  InterestsCtrl.resolve = {
    selected_interests: [
      '$window',
      '$http',
      'SERVER_URL',
      function($window, $http, SERVER_URL){  
        return  $http({
          method: 'GET',
          url: SERVER_URL + '/api/users/'+ $window.sessionStorage.userId + '/interests',
          headers:{Authorization: "Token token=" + $window.sessionStorage.accessToken
          }
        })
      }],

    interest_list: [
      '$window',
      '$http',
      'SERVER_URL',
      function($window, $http, SERVER_URL){
        return $http({
          method: 'GET',
          url: SERVER_URL + '/api/interests',
          headers:{Authorization: "Token token=" + $window.sessionStorage.accessToken
          }
        })
      }]
  }


  angular
    .module('interests', ['serverurl-constants'])

    .config(['$stateProvider', function($stateProvider){
      $stateProvider
        .state('interests', {
          url: '/interests',
          views: {
            'header':{
              templateUrl: '/components/partials/header.html'
            },
            'content':{
              controller: 'InterestsCtrl',
              templateUrl: '/components/interests/interests.html',
              resolve: InterestsCtrl.resolve
            }
          }
        })
    }])

  .controller("InterestsCtrl", [
      '$scope', 
      '$http', 
      '$window', 
      '$state', 
      'selected_interests',
      'interest_list',
      'SERVER_URL',
      InterestsCtrl
  ]);


})();
