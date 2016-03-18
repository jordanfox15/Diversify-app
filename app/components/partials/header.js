(function(){
  'use strict';

  var HeaderCtrl = function($scope, $window, $state, $mdSidenav){
    $scope.openLeftMenu = function() {
      $mdSidenav('left').toggle();
    };
    $scope.loggedOut = function(){
      return $window.sessionStorage.getItem('accessToken') === null
    }
    // Refactor later into a service - kh
  }

  angular
    .module('header', ['ngMaterial'])

    .controller("HeaderCtrl", [
        '$scope',
        '$window', 
        '$state', 
        '$mdSidenav',
        HeaderCtrl
    ]);
})();
