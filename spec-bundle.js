require('src/vendor');
require('rxjs');
require('zone.js/dist/jasmine-patch.js');

var testing = require('angular2/testing');
var browser = require('angular2/platform/testing/browser');
testing.setBaseTestProviders(
  browser.TEST_BROWSER_PLATFORM_PROVIDERS,
  browser.TEST_BROWSER_APPLICATION_PROVIDERS);

var testContext = require.context('./src', true, /\.spec\.ts/);
testContext.keys().forEach(testContext);
