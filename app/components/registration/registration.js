(function(){
  'use strict';

  var RegistrationCtrl = function($scope, $http, $window, $state, Upload, SERVER_URL){
    $scope.user = {};
    var upload = function(user_data){
      Upload.upload({
        url: SERVER_URL + '/api/users',
        method: 'POST',
        data: {
          user: user_data
        }
      }).then(
        function (response) {
        var data = response.data
        $window.sessionStorage.accessToken = data.token;
        $window.sessionStorage.userId = data.user.id;
        $state.go('demographics')

        },
        function (response) {
            console.error(response); //  Will return if status code is above 200 and lower than 300, same as $http
        }
      )
    }
    $scope.processForm = function(){
      upload($scope.user)
     }
  }

  angular
    .module('registration', ['ngFileUpload', 'serverurl-constants'])

    .config(['$stateProvider', function($stateProvider){
      $stateProvider
        .state('registration', {
          url: '/registration',
          views: {
            'header': {
              templateUrl: '/components/partials/header.html'
            },
            'content': {
              controller: 'RegistrationCtrl',
              templateUrl: '/components/registration/registration.html'
            }
          }
        })
    }])

    .controller("RegistrationCtrl", [
        '$scope',
        '$http',
        '$window',
        '$state',
        'Upload',
				'SERVER_URL',
        RegistrationCtrl
        ]);
})();
