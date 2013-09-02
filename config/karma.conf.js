basePath = '../';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'app/lib/angular/angular.js',
  'app/lib/angular/angular-*.js',
  'https://cdn.firebase.com/v0/firebase.js',
  'app/lib/plugins/*.js',
  'test/lib/angular/angular-mocks.js',
  'test/lib/angular/angular-resource.js',
  'app/js/**/*.js',
  'test/unit/**/*.js'
];

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};
