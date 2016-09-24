Error.stackTraceLimit = Infinity;

require('core-js/es6');
require('core-js/es7/reflect');

require('ts-helpers');

require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/jasmine-patch');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');
require('zone.js/dist/sync-test');

require('rxjs/Rx');

import {TestBed} from "@angular/core/testing";
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from "@angular/platform-browser-dynamic/testing";

TestBed.initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

var testContext = require.context('../src', true, /\.spec\.ts/);
function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}
var modules = requireAll(testContext);
