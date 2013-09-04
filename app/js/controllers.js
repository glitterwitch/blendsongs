'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('SongCtrl', ['$scope', 'angularFire', 'fireBaseURL', '$location', function($scope, $songRetriever, $fireBaseURL, $location) {
    $scope.loading = true;
    $scope.orderProp = 'dateCreated';
    $scope.reverse = true;

    var firebase = new Firebase($fireBaseURL);

    $songRetriever(firebase, $scope, 'songs').then(function() {
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

    $scope.routeToSong = function(index) {
      $location.path("/songs/" + index);
    }

  }]).
  controller('SongAddCtrl', ['$scope', 'angularFire', 'fireBaseURL', function($scope, $songRetriever, $fireBaseURL) {
    var firebase = new Firebase($fireBaseURL);
    $scope.songs = $songRetriever(firebase, $scope, 'songs');

    $scope.formChange = function() {
      if ($scope.success) {
        $scope.success = false;
      }
    };

    $scope.addSong = function(data) {
      data.year = parseInt(data.year, 10); // Convert year to int so sorting will work properly.
      data.dateCreated = new Date().getTime(); // Add a timestamp
      $scope.songs.push(data);

      // Reset the form
      $scope.song = angular.copy({
        title: null,
        artist: null,
        year: null,
        theme: null
      });

      $scope.success = true;
    };
  }]);