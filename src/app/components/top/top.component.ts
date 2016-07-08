import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";

@Component({
  selector: 'mpt-top',
  styles: [require('./top.scss')],
  template: require('./top.html'),
  directives: [ROUTER_DIRECTIVES],
})
export class TopComponent {
}
