import "core-js/es6";
import "core-js/es7/reflect";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/finally";
import "rxjs/add/operator/do";
import "rxjs/add/operator/toPromise";
require('zone.js/dist/zone');
import 'ts-helpers';

if ('production' === process.env.ENV) {
} else {
  Error['stackTraceLimit'] = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}
