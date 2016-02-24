Error.stackTraceLimit = Infinity;

require('es6-promise');
require('es6-shim');
require('es7-reflect-metadata/dist/browser');
require('zone.js/dist/zone-microtask.js');
require('zone.js/dist/long-stack-trace-zone.js');
require('zone.js/dist/jasmine-patch.js');

var testing = require('angular2/testing');
var browser = require('angular2/platform/testing/browser');
testing.setBaseTestProviders(
  browser.TEST_BROWSER_PLATFORM_PROVIDERS,
  browser.TEST_BROWSER_APPLICATION_PROVIDERS);

var ctx = require.context('./src', true, /\.spec\.ts/);

ctx.keys().forEach(function (path) {
  var module = ctx(path);
  if (module.hasOwnProperty('main')) {
    module.main();
  } else {
    throw new Error('Module ' + path + ' does not implement main() method.');
  }
});
