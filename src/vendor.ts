import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/finally";
import "rxjs/add/operator/do";
import "jquery";
import "bootstrap/js/dist/collapse";
import * as toastr from "toastr";

require("!style!css!./vendor.css");

toastr.options.preventDuplicates = true;

if ('production' === process.env.ENV) {
} else {
}

