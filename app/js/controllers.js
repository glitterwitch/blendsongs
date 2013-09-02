'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('SongCtrl', ['$scope', 'angularFire', 'fireBaseURL', function($scope, $songRetriever, $fireBaseURL) {
    $scope.loading = true;
    $scope.orderProp = 'year';
    $scope.reverse = false;

    var fireBase = new Firebase($fireBaseURL);

    $scope.songs = $songRetriever(fireBase, $scope, 'songs').then(function() {
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

  }]);