import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES, CanActivate} from "@angular/router-deprecated";
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
