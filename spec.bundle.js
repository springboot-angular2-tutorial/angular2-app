Error.stackTraceLimit = Infinity;
require('reflect-metadata');
require('zone.js/dist/zone-microtask.js');
require('zone.js/dist/long-stack-trace-zone.js');
require('zone.js/dist/jasmine-patch.js');
require('angular2/testing');
//require('angular2/mock');

browser_adapter = require('angular2/src/platform/browser/browser_adapter');
browser_adapter.BrowserDomAdapter.makeCurrent();

var ctx = require.context('./src', true, /\.spec\.ts/);

ctx.keys().forEach(function (path) {
  var module = ctx(path);
  if (module.hasOwnProperty('main')) {
    module.main();
  } else {
    throw new Error('Module ' + path + ' does not implement main() method.');
  }
});
