// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngStorage', 'ngCordova', 'auth', 'azure', 'Util', 'W8', 'Stripe', 'SignalR','Shared', 'Message', 'Global', 'directivas', 'ionic-timepicker', 'ionic-datepicker'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {  
  //$httpProvider.defaults.withCredentials = true;
  $httpProvider.interceptors.push('authInterceptorService');

  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html"
      }
    }
  })
    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent': {
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: "/playlists/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  })

  .state('main', {
      url: '/main',
      templateUrl: 'js/main/view/main.html',
      data: {
        requireLogin: true
      },
      controller: 'MainCtrl'
  })

  .state('nuevaCita', {
      url: '/nuevaCita',
      templateUrl: 'js/citas/view/nuevaCita.html',
      data: {
        requireLogin: true
      },
      controller: 'nuevaCitaCtrl'
  })

  .state('login', {
      url: '/login',
      templateUrl: 'js/login/views/login.html',
      controller: 'LoginCtrl'
  })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
})

.run(function ($rootScope, $state) {
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, from, form2) {
   
      if(angular.isDefined(toState.data)){
        var requireLogin = toState.data.requireLogin;        
      }

      if (requireLogin && typeof $rootScope.profileData === 'undefined') {
        event.preventDefault();
        $state.go('login');
      }
  })
})
