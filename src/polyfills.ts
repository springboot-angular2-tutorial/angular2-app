import "es6-shim";
import "es6-promise";
import "es7-reflect-metadata";
import "zone.js/dist/zone-microtask";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/finally";
import "rxjs/add/operator/do";
import "rxjs/add/operator/toPromise";

if ('production' === process.env.ENV) {
} else {
  Error['stackTraceLimit'] = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}
