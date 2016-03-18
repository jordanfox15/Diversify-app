(function(){
  'use strict';

  var InterestsCtrl = function($scope, $http, $window, $state, selected_interests, interest_list){
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
        url: 'http://localhost:3000/api/users/profile',
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
      function($window, $http){  
        return  $http({
          method: 'GET',
          url: 'http://localhost:3000/api/users/'+ $window.sessionStorage.userId + '/interests',
          headers:{Authorization: "Token token=" + $window.sessionStorage.accessToken
          }
        })
      }],

    interest_list: [
      '$window',
      '$http',
      function($window, $http){
        return $http({
          method: 'GET',
          url: 'http://localhost:3000/api/interests',
          headers:{Authorization: "Token token=" + $window.sessionStorage.accessToken
          }
        })
      }]
  }


  angular
    .module('interests', [])

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
      InterestsCtrl
  ]);


})();
