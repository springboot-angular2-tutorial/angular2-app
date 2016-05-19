import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES, CanActivate} from "@angular/router-deprecated";
import {activateIfNotSignedIn} from "../../../shared/routes";

@Component({
  selector: 'mpt-top',
  styles: [require('./top.scss')],
  template: require('./top.html'),
  directives: [ROUTER_DIRECTIVES],
})
@CanActivate(() => activateIfNotSignedIn())
export class TopComponent {
}
