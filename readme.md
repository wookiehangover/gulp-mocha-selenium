# [gulp](http://gulpjs.com)-mocha-selenium

> Run [Selenium]() tests [Mocha](http://visionmedia.github.io/mocha/) and [wd]

## Install

```bash
$ npm install --save-dev gulp-mocha-selenium
```


## Usage

```js
var gulp = require('gulp');
var mochaSelenium = require('gulp-mocha');

gulp.task('default', function () {
	return gulp.src('test.js', {read: false})
		.pipe(mochaSelenium({
			reporter: 'nyan'
		}));
});
```


## API

### mochaSelenium(options)

*Selenium Options*

#### options.browserName

Type: `String`
Default: `firefox`
Values: `firefox`, `chrome`, `safari`, `phantomjs`

The browser to use when launching selenium.

*WD options*

#### options.usePromises

Type: `Boolean`
Default: `false`

Use the [wd]() [promise remote]().

#### options.useChaining

Type: `Boolean`
Default: `false`

Use the [wd]() [chaining remote]().

*Mocha Options*

#### options.ui

Type: `String`  
Default: `bdd`  
Values: `bdd`, `tdd`, `qunit`, `exports`

The interface to use.


#### options.reporter

Type: `String`  
Default: `dot`  
Values: [reporters](https://github.com/visionmedia/mocha/tree/master/lib/reporters)

The reporter that will be used.

This option can also be used to utilize third-party reporters. For example if you `npm install mocha-lcov-reporter` you can then do use `mocha-lcov-reporter` as value.


#### options.globals

Type: `Array`

Accepted globals.


#### options.timeout

Type: `Number`  
Default: `2000`

Test-case timeout in milliseconds.


#### options.bail

Type: `Boolean`  
Default: `false`

Bail on the first test failure.


#### options.ignoreLeaks

Type: `Boolean`  
Default: `false`

Ignore global leaks.


#### options.grep

Type: `String`

Only run tests matching the given pattern which is internally compiled to a RegExp.

### CoffeeScript

For CoffeeScript support, add `require('coffee-script')` with CoffeeScript 1.6- or `require('coffee-script/register')` with CoffeeScript 1.7+.

### PhantomJS

## License

[MIT](http://opensource.org/licenses/MIT) © [Sindre Sorhus](http://sindresorhus.com)
