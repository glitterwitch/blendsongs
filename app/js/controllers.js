'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('SongCtrl', ['$scope', 'angularFire', 'fireBaseURL', function($scope, $songRetriever, $fireBaseURL) {
    $scope.loading = true;
    $scope.orderProp = 'year';
    $scope.reverse = false;

    var firebase = new Firebase($fireBaseURL);

    $scope.songs = $songRetriever(firebase, $scope, 'songs').then(function() {
      $scope.loading = false;
    });

    // Click handler to allow sorting by column. 
    // Accepts a field name to sort by.
    $scope.orderSongs = function(field) {
      if (!$scope.songs || !field) {
        return;
      }

      // If we are sorting on the same property again, just do a reverse sort.
      if ($scope.orderProp === field) {
        if (!$scope.reverse) {
          return $scope.reverse = true;
        }

        return $scope.reverse = false;
      }

      // Otherwise, set the new order property & sort normally.
      $scope.orderProp = field;
      return $scope.reverse = false;
    }

  }]).
  controller('SongAddCtrl', ['$scope', 'angularFire', 'fireBaseURL', function($scope, $songRetriever, $fireBaseURL) {
    var firebase = new Firebase($fireBaseURL);
    $scope.songs = $songRetriever(firebase, $scope, 'songs');

    $scope.addSong = function(data) {
      $scope.songs.push(data);
    }
  }]);