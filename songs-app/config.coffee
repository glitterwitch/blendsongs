exports.config =
  # See http://brunch.readthedocs.org/en/latest/config.html for documentation.
  modules:
    wrapper: false
    definition: false

  files:
    javascripts:
      joinTo:
        'javascripts/app.js': /^app/
        'javascripts/vendor.js': /^vendor/
        'test/javascripts/test.js': /^test(\/|\\)(?!vendor)/
        'test/javascripts/test-vendor.js': /^test(\/|\\)(?=vendor)/
      order:
        before: [
          'vendor/angular/angular.js',
          'vendor/angular/angular-resource.js',
          'vendor/plugins/angularFire.js',
          'app/js/controllers/SongCtrl.js',
          'app/js/controllers/SongAddCtrl.js',
          'app/js/services.js',
          'app/js/filters.js',
          'app/js/directives.js',
          'app/js/app.js',
        ]

    stylesheets:
      joinTo:
        'stylesheets/app.css': /^(app|vendor)/
        'test/stylesheets/test.css': /^test/
      order:
        before: []
        after: []

    templates:
      joinTo: 'javascripts/app.js'
