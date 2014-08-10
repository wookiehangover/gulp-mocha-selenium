var gulp = require('gulp');
var mocha = require('./index');

gulp.task('test:chaining', function () {
  return gulp.src('test/chaining.js', {read: false})
    .pipe(mocha({
      reporter: 'dot',
      timeout: 30000,
      useChaining: true
    }));
});

gulp.task('test:promises', function () {
  return gulp.src('test/promises.js', {read: false})
    .pipe(mocha({
      reporter: 'dot',
      timeout: 30000,
      usePromises: true
    }));
});

gulp.task('test:sanity', function () {
  return gulp.src('test/sanity.js', {read: false})
    .pipe(mocha({
      reporter: 'nyan',
      timeout: 30000
    }));
});

gulp.task('test:phantom', function () {
  return gulp.src('test/sanity.js', {read: false})
    .pipe(mocha({
      reporter: 'nyan',
      browserName: 'phantomjs',
      timeout: 30000
    }));
});

gulp.task('default', ['test:sanity', 'test:promises', 'test:chaining', 'test:phantom']);
