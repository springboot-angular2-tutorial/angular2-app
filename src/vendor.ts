import "es6-shim";
import "es6-promise";
import "rxjs";

if ('production' === process.env.ENV) {
  require('zone.js/dist/zone-microtask.min');
} else {
  require('es7-reflect-metadata/dist/browser');
  Error['stackTraceLimit'] = Infinity;
  require('zone.js/dist/zone-microtask');
  require('zone.js/dist/long-stack-trace-zone');
}

require("expose?$!expose?jQuery!jquery");
require("!style!css!toastr/build/toastr.css");
require("bootstrap-webpack");

