Error.stackTraceLimit = Infinity;

require('core-js');
require('ts-helpers');
require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/jasmine-patch');
require('rxjs/Rx');

var testing = require('angular2/testing');
var browser = require('angular2/platform/testing/browser');

testing.setBaseTestProviders(
  browser.TEST_BROWSER_PLATFORM_PROVIDERS,
  browser.TEST_BROWSER_APPLICATION_PROVIDERS
);
Object.assign(global, testing);
var testContext = require.context('../src', true, /\.spec\.ts/);
function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}
var modules = requireAll(testContext);
