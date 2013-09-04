'use strict';

angular.module('SongCtrl', []).
  controller('SongCtrl', ['$scope', 'BlendSongsDB', 'angularFire', 
    function($scope, $db, angularFire) {
      $scope.loading = true;
      $scope.orderProp = 'dateCreated';
      $scope.reverse = true;

      angularFire($db, $scope, 'songs').then(function() {
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
    }]);