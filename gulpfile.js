var gulp = require('gulp');
var mocha = require('./index');

gulp.task('test:chaining', function () {
	return gulp.src('test/chaining.js', {read: false})
		.pipe(mocha({
			reporter: 'dot',
			useChaining: true
		}));
});

gulp.task('test:promises', function () {
	return gulp.src('test/promises.js', {read: false})
		.pipe(mocha({
			reporter: 'dot',
			usePromises: true
		}));
});

gulp.task('test:sanity', function () {
	return gulp.src('test/sanity.js', {read: false})
		.pipe(mocha({
			reporter: 'nyan'
		}));
});

gulp.task('default', ['test:sanity', 'test:promises', 'test:chaining']);
