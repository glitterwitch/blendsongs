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

    it('should sort by year as the default', function() {
      expect(scope.orderProp).toBe('year');
    });

    it('should not reverse the sort by default', function() {
      expect(scope.reverse).toBe(false);
    });
  });
});
