import {Component, ViewEncapsulation} from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/finally";
import "rxjs/add/operator/do";
import "jquery";
import 'tether';
import "bootstrap/js/dist/util";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/collapse";

if ('production' === process.env.ENV) {
} else {
}

@Component({
  selector: 'mpt-vendor',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./vendor.css'],
  template: '',
})
export class VendorComponent {
}
