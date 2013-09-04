'use strict';

/* Services */
angular.module('myApp.services', []).
  value('fireBaseURL', 'https://blendsongs.firebaseio.com/').
  factory('BlendSongsDB', ['angularFire', 'fireBaseURL', function(angularFire, fireBaseURL) {
    return new Firebase(fireBaseURL);
  }]);