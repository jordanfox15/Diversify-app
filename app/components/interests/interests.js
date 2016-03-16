(function(){
  'use strict';

  var InterestsCtrl = function($scope, $http, $window, $state){
  $scope.selected = [];
  $http({
    method: 'GET',
    url: 'http://localhost:3000/api/interests',
    headers:{Authorization: "Token token=" + $window.sessionStorage.accessToken
    }
  }).success(function(data){
    $scope.interests = data
  });

  $scope.toggle = function (item, list) {
    var idx = list.indexOf(item);
    if (idx > -1) list.splice(idx, 1);
    else list.push(item);
  };

  $scope.exists = function (item, list) {
    return list.indexOf(item) > -1;
  };

  $scope.processForm = function(){
    var interest_ids = $scope.selected.map(function(myInterest){
      return myInterest.id;
    })
    $http({
      method: 'PATCH',
      url: 'http://localhost:3000/api/users/profile',
      data: {user: {interest_ids: interest_ids}},
      headers:{Authorization: "Token token=" + $window.sessionStorage.accessToken}
    }).success(function(data){
      $state.go('profile')
    });
  }
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
              templateUrl: '/components/interests/interests.html'
            }
          }
        })
    }])

    .controller("InterestsCtrl", [
    '$scope', 
    '$http', 
    '$window', 
    '$state', 
    InterestsCtrl
    ]);


})();
