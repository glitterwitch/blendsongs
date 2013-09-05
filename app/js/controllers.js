'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('SongCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get('data/songs.json').success(function(data) {
      $scope.songs = data;
    });
  }]);