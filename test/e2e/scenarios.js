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

    it('should sort the song list by year initially', function() {
      expect(element('.song:first').text()).
        toMatch(/\n        William Blake, Charles Hubert and Hastings Parry\n        Jerusalem\n        1916\n        People and places\n/);
    });

    it('should sort the song list by the artist column when clicked', function() {
      element('th.artist').click();
      expect(element('.song:first').text()).
        toMatch(/\n        !!!\n        Me and Giuliani Down By the Schoolyard \(A True Story\)\n        2003\n        Politics and protest\n/);
    });

    it('should perform a reverse sort on the song list when the column is clicked twice', function() {
      element('th.artist').click();
      element('th.artist').click();

      expect(element('.song:first').text()).
        toMatch(/\n        X-Ray Spex\n        Germ Free Adolescents\n        1978\n        Life and death\n/);
    });

  });
});
