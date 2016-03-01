import "es6-shim";
import "es6-promise";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/finally";
import "rxjs/add/operator/do";
import "rxjs/add/operator/toPromise";

if ('production' === process.env.ENV) {
  require('zone.js/dist/zone-microtask.min');
} else {
  require('es7-reflect-metadata/dist/browser');
  Error['stackTraceLimit'] = Infinity;
  require('zone.js/dist/zone-microtask');
  require('zone.js/dist/long-stack-trace-zone');
}
