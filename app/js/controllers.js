'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('SongCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.loading = true;

    $http.get('data/songs.json').success(function(data) {
      $scope.songs = data;
    }).then(function() {
      $scope.loading = false;
    });
  }]);