// Polyfills
import 'es6-shim';
import 'es6-promise';
// (these modules are what is in 'angular2/bundles/angular2-polyfills' so don't use that here)
import 'es7-reflect-metadata/dist/browser';
import 'zone.js/dist/zone-microtask';
import 'zone.js/dist/long-stack-trace-zone';

// RxJS
import 'rxjs';

import 'expose?$!expose?jQuery!jquery';
import  '!style!css!toastr/build/toastr.css';
import "bootstrap-webpack";
