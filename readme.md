# [gulp](http://gulpjs.com)-mocha-selenium

> Run [Selenium](http://docs.seleniumhq.org/) tests with [Mocha](http://visionmedia.github.io/mocha/)
> and [wd](https://github.com/admc/wd)

[![wercker status](https://app.wercker.com/status/0630f024f26bf2803460604597fdf77b/m "wercker status")](https://app.wercker.com/project/bykey/0630f024f26bf2803460604597fdf77b)

*Forked from [gulp-mocha](https://github.com/sindresorhus/gulp-mocha) by
[Sindre Sorhus](http://sindresorhus.com)*

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


#### options.host

Type: `String`  
Default: `null`

*Optional*

A remote Selenium host to connect to.


#### options.port

Type: `Number`  
Default: `null`

*Optional*

The port of the remote Selenium host.


#### options.username

Type: `String`  
Default: `null`

*Optional*

Username for a remote host.


#### options.accesskey

Type: `String`  
Default: `null`

*Optional*

Username for a remote host.



**WD options**

#### options.usePromises

Type: `Boolean`  
Default: `false`

Use the [wd](https://github.com/admc/wd) [promise remote]().


#### options.useChaining

Type: `Boolean`  
Default: `false`

Use the [wd](https://github.com/admc/wd) [chaining remote]().


#### options.useSystemPhantom

Type: `Boolean`  
Default: `false`

Use your current path to look for PhantomJS when running headless tests.



**Mocha Options**

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

For PhantomJs support, either use your locally installed version with the `useSystemPhantom` option or install PhantomJS via npm with `npm install --save-dev phantomjs`.

## License

[MIT](http://opensource.org/licenses/MIT)
