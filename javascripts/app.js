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
    }]);'use strict';

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
    }]);'use strict';

/* Services */
angular.module('myApp.services', []).
  value('fireBaseURL', 'https://blendsongs.firebaseio.com/').
  factory('BlendSongsDB', ['angularFire', 'fireBaseURL', function(angularFire, fireBaseURL) {
    return new Firebase(fireBaseURL);
  }]);'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]);
'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);
'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', 
  ['myApp.filters', 'myApp.directives', 'myApp.services', 'firebase', 'SongCtrl', 'SongAddCtrl']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/songs', {templateUrl: 'partials/songs.html', controller: 'SongCtrl'});
    $routeProvider.when('/songs/add', {templateUrl: 'partials/song-add.html', controller: 'SongAddCtrl'});
    $routeProvider.otherwise({redirectTo: '/songs'});
  }]);