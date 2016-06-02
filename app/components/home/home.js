(function(){
	'use strict';

var HomeCtrl = function($scope, $window){

    $scope.loggedOut = function(){
      return $window.sessionStorage.getItem('accessToken') === null
    }
};


	angular
	.module('home', [])

	.config(['$stateProvider', function($stateProvider){
		$stateProvider
			.state('home', {
				url: '/',
				views: {
					'header': {
						templateUrl: '/components/partials/header.html'
					},
					'content': {
						templateUrl: '/components/home/home.html',
            controller: 'HomeCtrl'
					}
				}
			})

	}])

  .controller("HomeCtrl", [
    '$scope',
    '$window',
    HomeCtrl
  ])


})();
