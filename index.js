'use strict';
var domain = require('domain');
var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');
var Mocha = require('mocha');
var seleniumLauncher = require('selenium-launcher');
var wd = require('wd');

module.exports = function (options) {

  var remote = 'remote';
  if (options.usePromises) {
    remote = 'promiseRemote';
  } else if (options.useChaining) {
    remote = 'promiseChainRemote';
  }

  var mocha = new Mocha(options);
  var cache = {};

  for (var key in require.cache) {
    cache[key] = true;
  }

  function clearCache() {
    for (var key in require.cache) {
      if (!cache[key]) {
        delete require.cache[key];
      }
    }
  }

  function prepareTests(cb) {
    var stream = this;
    if (options.host && options.port) {
      var selenium = {
        host: options.host,
        port: options.port,
        username: options.username,
        accesskey: options.accesskey
      };
      runTests(selenium, stream, cb);
    } else {

      if (options.browserName === 'phantomjs' && !options.useSystemPhantom) {
        // add npm-supplied phantomjs bin dir to PATH, so selenium can launch it
        process.env.PATH = path.dirname(require('phantomjs').path) + ':' + process.env.PATH;
      }
      seleniumLauncher({ chrome: options.browserName === 'chrome' }, function(err, selenium) {
        if (err) {
          selenium.exit();
          stream.emit('error', new gutil.PluginError('gulp-mocha-selenium', err));
          cb();
          return;
        }
        runTests(selenium, stream, cb);
      });
    }
  }

  function runTests(selenium, stream, cb) {
    var remote = 'remote';
    if (options.usePromises) {
      remote = 'promiseRemote';
    } else if (options.useChaining) {
      remote = 'promiseChainRemote';
    }

    var browser = wd[remote](
      selenium.host,
      selenium.port,
      selenium.username,
      selenium.accessKey
    );

    mocha.suite.on('pre-require', function (context, file, m) {
      this.ctx.wd = wd;
      this.ctx.browser = browser;
    });

    browser.on('status', function(info){
      gutil.log('\x1b[36m%s\x1b[0m', info);
    });

    browser.on('command', function(meth, path, data){
      if (options.verbose) {
        gutil.log(' > \x1b[33m%s\x1b[0m: %s', meth, path, data || '');
      }
    });

    browser.init(options, function(err) {
      var d = domain.create();

      function handleException(err) {
        clearCache();
        browser.quit(function() {
          if (selenium.kill) {
            selenium.kill();
          }
          stream.emit('error', new gutil.PluginError('gulp-mocha', err));
          cb();
        });
      }

      d.on('error', handleException);
      d.run(function () {
        try {
          mocha.run(function (errCount) {
            clearCache();

            if (errCount > 0) {
              stream.emit('error', new gutil.PluginError('gulp-mocha', errCount + ' ' + (errCount === 1 ? 'test' : 'tests') + ' failed.', {
                showStack: false
              }));
            }

            browser.quit(function() {
              if (selenium.kill) {
                selenium.kill();
              }
              cb();
            });
          });
        } catch (err) {
          handleException(err);
        }
      });

    });
  }

  return through.obj(function (file, enc, cb) {
    mocha.addFile(file.path);
    this.push(file);
    cb();
  }, prepareTests);
};
