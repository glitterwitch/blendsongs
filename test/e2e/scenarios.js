'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('my app', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
  });


  it('should automatically redirect to /songs when location hash/fragment is empty', function() {
    expect(browser().location().url()).toBe("/songs");
  });


  describe('SongCtrl', function() {

    beforeEach(function() {
      browser().navigateTo('#/songs');
    });

    it('should render songs when user navigates to /songs', function() {
      expect(element('[ng-view] h1:first').text()).
        toMatch(/Top 1000 Songs/);
    });

    it('should filter the song list as the user types into the filter box', function() {
      expect(repeater('.songs .song').count()).toBe(863);

      input('query').enter('beatles');
      expect(repeater('.songs .song').count()).toBe(17);

      input('query').enter('stones');
      expect(repeater('.songs .song').count()).toBe(6);
    });

  });
});
