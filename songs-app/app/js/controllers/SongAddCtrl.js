'use strict';

angular.module('SongAddCtrl', []).
  controller('SongAddCtrl', ['$scope', 'BlendSongsDB', 'angularFire', 
    function($scope, $db, angularFire) {
      $scope.songs = angularFire($db, $scope, 'songs');

      $scope.formChange = function() {
        if ($scope.success) {
          $scope.success = false;
        }
      };

      $scope.addSong = function(data) {
        data.year = parseInt(data.year, 10); // Convert year to int so sorting will work properly.
        data.dateCreated = new Date().getTime(); // Add a timestamp so newly-added songs can appear at the top of the list.
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