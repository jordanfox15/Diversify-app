(function(){
  'use strict';

  angular.module('diversifyApp', ['ngMaterial', 'ui.router'])
  // ROUTER
  .config(['$mdThemingProvider', '$stateProvider', '$urlRouterProvider',
    function($mdThemingProvider, $stateProvider, $urlRouterProvider){
      $urlRouterProvider.otherwise('/');
      $stateProvider
    .state('home', {
      url: '/',
      views: {
        'header': {
          templateUrl: '/templates/partials/header.html'
        },
      'content': {
        controller: '',
      templateUrl: '/templates/index.html'
      }
      }
    })
  .state('matches', {
    url: '/matches',
    views: {
      'header': {
        templateUrl: '/templates/partials/header.html'
      },
    'content': {
      templateUrl: '/templates/matches/index.html',
    controller: 'MatchesController'
    },
    }
  }
  )
    .state('messages', {
      url: '/matches/:matchId',
    views: {
      'header': {
        templateUrl: '/templates/partials/header.html'
      },
    'content': {
      controller: 'messagesController',
    templateUrl: '/templates/messages/show.html'
    }
    }
    })
  .state('login', {
    url: '/login',
  views: {
    'header': {
      templateUrl: '/templates/partials/header.html'
    },
  'content': {
    controller: 'loginController',
  templateUrl: '/templates/sessions/new.html'
  }
  }
  })
  .state('register', {
    url: '/register',
  views: {
    'header': {
      templateUrl: '/templates/partials/header.html'
    },
  'content': {
    controller: 'registerController',
  templateUrl: '/templates/users/new.html'
  }
  }
  })
  .state('profile', {
    url: '/profile',
  views: {
    'header':{
      templateUrl: '/templates/partials/header.html'
    },
  'content':{
    controller: 'profileController',
  templateUrl: '/templates/users/profile.html'
  }
  }
  })
  .state('demo', {
    url: '/demo',
  views: {
    'header':{
      templateUrl: '/templates/partials/header.html'
    },
  'content':{
    controller: 'demoController',
  templateUrl: '/templates/users/demo.html'
  }
  }
  })
  .state('interests', {
    url: '/interests',
  views: {
    'header':{
      templateUrl: '/templates/partials/header.html'
    },
  'content':{
    controller: 'interestsController',
  templateUrl: '/templates/users/interests.html'
  }
  }
  })
  .state('logout',{
    url: '/logout',
  views: {
    'content':{
      controller: 'logoutController'
    }
  }
  })
  .state('topic',{
    url: '/topic',
    views: {
      'content':{
        controller: 'topicController'
      }
    }
  })

  .state('matchInfo', {
    url: '/matches/:matchId/info',
    views: {
      'header': {
        templateUrl: '/templates/partials/header.html'
      },
    'content': {
      templateUrl: '/templates/matches/info.html',
    controller: 'matchInfoController'
    },
    }
  })
  .state('news', {
    url: '/news',
    views: {
      'header': {
        templateUrl: '/templates/partials/header.html'
      },
    'content': {
      templateUrl: '/templates/news.html',
    controller: 'newsController'
    },
    }
  })
}])

// CONTROLLERS
.controller('ListController', ['$scope', '$http', function($scope, $http){
  $http({
    method: 'GET',
  dataType: 'json',
  url: 'http://localhost:3000/v1/api/teachers.json'
  }).success(function(data){
    $scope.teachers = data;

  }).error(function(error){
    console.log(error);
  });

}])

.controller('MatchesController', ['$scope', '$http', '$window', function($scope, $http, $window){
  $scope.currentUserId = $window.sessionStorage.userId
  $http({
    method: 'GET',
  url: 'http://localhost:3000/api/matches',
  headers:{Authorization: "Token token=" + $window.sessionStorage.accessToken
  }
  }).success(function(data){
    $scope.matches = data

  }).error(function(error){
    console.log(error);
  });


}])


.controller('messagesController', ['$scope', '$http', '$stateParams', '$window', '$state', function($scope, $http, $stateParams, $window, $state){
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
      $state.reload();
    });
};
}])

.controller("loginController", ['$scope', '$http', '$window', '$state', function($scope, $http, $window, $state){
  $scope.user = {};
  $scope.processForm= function(){
    $http({
      method: 'POST',
      url: 'http://localhost:3000/api/sessions',
      data: $scope.user
    }).success(function(data){
      $window.sessionStorage.accessToken = data.token;
      $window.sessionStorage.userId = data.user.id;
      $state.go('profile')
    });
  };
}])

.controller("profileController", ['$scope', '$http', '$window', function($scope, $http, $window){
  $scope.user = {};
  $http({
    method: 'GET',
    url: 'http://localhost:3000/api/users/profile',
    headers:{Authorization: "Token token=" + $window.sessionStorage.accessToken
    }
  }).success(function(data){
    $scope.user = data
  });
}])

.controller("demoController", ['$scope', '$http', '$window', '$state', function($scope, $http, $window, $state){
  $scope.user = {};
  $http({
    method: 'GET',
    url: 'http://localhost:3000/api/users/profile',
    headers:{Authorization: "Token token=" + $window.sessionStorage.accessToken
    }
  }).success(function(data){
    $scope.user = data
  });
  $scope.processForm= function(){
    $http({
      method: 'PATCH',
      url: 'http://localhost:3000/api/users/' + $scope.user.id,
      data: $scope.user,
      headers:{Authorization: "Token token=" + $window.sessionStorage.accessToken}
    }).success(function(data){
      $state.go('profile')
    });
  };
}])

.controller("interestsController", ['$scope', '$http', '$window', '$state', function($scope, $http, $window, $state){
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
}])

.controller("logoutController", ['$scope', '$http', '$window', '$state', function($scope, $http, $window, $state){

  $scope.user = {};
  $http({
    method: 'DELETE',
    url: 'http://localhost:3000/api/sessions',
    headers:{Authorization: "Token token=" + $window.sessionStorage.accessToken
    }
  }).success(function(data){
    $window.sessionStorage.removeItem('accessToken');
    $state.go('home')
  });
}])

.controller("registerController", ['$scope', '$http', '$window', '$state', function($scope, $http, $window, $state){
  $scope.user = {};
  $scope.processForm = function(){
    $http({
      method: 'POST',
      url: 'http://localhost:3000/api/users',
      data: $scope.user
    }).success(function(data){
      $window.sessionStorage.accessToken = data.token;
      $window.sessionStorage.userId = data.user;
      $state.go('demo')
    });
  };
}])

    .controller("headerController", ['$scope','$window', '$state', function($scope, $window, $state){
      $scope.loggedOut = function(){
        return $window.sessionStorage.getItem('accessToken') === null
      }
      // Refactor later into a service - kh
    }])

    .controller("matchInfoController", ['$scope','$window', '$state', '$http', '$stateParams', function($scope, $window, $state, $http, $stateParams){
      $scope.currentUserId = $window.sessionStorage.userId
      $scope.senderInterests = []
      $scope.recipientInterests = []
      $http({
    method: 'GET',
    url: 'http://localhost:3000/api/matches/' + $stateParams.matchId ,
    headers:{Authorization: "Token token=" + $window.sessionStorage.accessToken
      }
    }).success(function(data){
      $scope.match = data
      if ($scope.match.first_user.id == $scope.currentUserId ){
      var recipientId = $scope.match.second_user.id
      $scope.recipientName = $scope.match.second_user.first_name + " " + $scope.match.second_user.last_name
      $scope.currentUserName = $scope.match.first_user.first_name + " " + $scope.match.first_user.last_name
      }
      else if ($scope.match.second_user.id == $scope.currentUserId ){
      var recipientId = $scope.match.first_user.id
      $scope.recipientName = $scope.match.first_user.first_name + " " + $scope.match.first_user.last_name
      $scope.currentUserName = $scope.match.second_user.first_name + " " + $scope.match.second_user.last_name
      }
      $http({
    method: 'GET',
    url: 'http://localhost:3000/api/users/' + recipientId + '/interests',
    headers:{Authorization: "Token token=" + $window.sessionStorage.accessToken
    }
    }).success(function(data){
      $scope.recipientInterests = data.map(function(obj) { return obj.name });
    });

    $http({
    method: 'GET',
    url: 'http://localhost:3000/api/users/' + $scope.currentUserId + '/interests',
    headers:{Authorization: "Token token=" + $window.sessionStorage.accessToken
    }
    }).success(function(data){
      $scope.senderInterests = data.map(function(obj) { return obj.name });

    });
    }).error(function(error){
      console.log(error);
    });

    $scope.$watch("senderInterests", function(newValue, oldValue){

        if (newValue.length > 0){
          $scope.commonInterests = _.intersection($scope.senderInterests, $scope.recipientInterests)
        }
    })
    $scope.$watch("recipientInterests", function(newValue, oldValue){

        if (newValue.length > 0){
          $scope.commonInterests = _.intersection($scope.senderInterests, $scope.recipientInterests)
        }
    })


    }])
.controller('AppCtrl', function($scope) {
  $scope.imagePath = 'img/washedout.png';
  });

})();
