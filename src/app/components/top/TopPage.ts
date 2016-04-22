import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, CanActivate} from "angular2/router";
import {activateIfNotSignedIn} from "app/routes";

@Component({
  selector: 'top-page',
  styles: [require('./top.scss')],
  template: require('./top.html'),
  directives: [ROUTER_DIRECTIVES],
})
@CanActivate(() => activateIfNotSignedIn())
export class TopPage {
}
