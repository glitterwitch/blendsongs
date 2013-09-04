'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', 
  ['myApp.filters', 'myApp.directives', 'myApp.services', 'firebase', 'SongCtrl', 'SongAddCtrl']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/songs', {templateUrl: 'partials/songs.html', controller: 'SongCtrl'});
    $routeProvider.when('/songs/add', {templateUrl: 'partials/song-add.html', controller: 'SongAddCtrl'});
    $routeProvider.otherwise({redirectTo: '/songs'});
  }]);
