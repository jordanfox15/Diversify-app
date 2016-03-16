(function(){
	'use strict';

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
						templateUrl: '/components/home/home.html'
					}
				}
			})

	}])


})()
