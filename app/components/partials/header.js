(function(){
  'use strict';

  var HeaderCtrl = function($scope, $window, $state){
      $scope.loggedOut = function(){
        return $window.sessionStorage.getItem('accessToken') === null
      }
      // Refactor later into a service - kh
    }

  angular
    .module('header', [])

    .controller("HeaderCtrl", [
        '$scope',
        '$window', 
        '$state', 
        HeaderCtrl
        ]);
})();
