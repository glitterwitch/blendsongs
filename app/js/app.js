'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/songs', {templateUrl: 'partials/songs.html', controller: 'SongCtrl'});
    $routeProvider.otherwise({redirectTo: '/songs'});
  }]);
