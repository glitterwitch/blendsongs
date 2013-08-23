'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('myApp.controllers'));

  describe('SongCtrl', function() {
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('data/songs.json').
        respond([{title: 'The Look of Love'}, {title: 'The Shining'}]);

      scope = $rootScope.$new();
      ctrl = $controller('SongCtrl', {$scope: scope});
    }));

    it('should create a "songs" model with 2 songs fetched from xhr', function() {
      expect(scope.songs).toBeUndefined();
      $httpBackend.flush();

      expect(scope.songs).toEqual([{title: 'The Look of Love'}, {title: 'The Shining'}]);
      expect(scope.songs.length).toEqual(2);
    });
  });
});
