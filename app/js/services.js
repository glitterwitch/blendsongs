'use strict';

/* Services */
angular.module('myApp.services', []);

angular.module('songListServices', ['ngResource']).
    factory('SongList', function($resource) {
      return $resource('data/songs.json', {}, {
        query: {method:'GET', cache: true, isArray:true}
    });
});