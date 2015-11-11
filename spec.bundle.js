Error.stackTraceLimit = Infinity;
require('reflect-metadata');
require('angular2/test');
require('angular2/mock');

browser_adapter = require('angular2/src/core/dom/browser_adapter');
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
