import {Component} from "angular2/core";
import {Feed, MicropostNew, UserStats} from "app/components";
import {CanActivate} from "angular2/router";
import {activateIfSignedIn} from "app/routes";

@Component({
  selector: 'home-page',
  styles: [require('./home.scss')],
  template: require('./home.html'),
  directives: [MicropostNew, Feed, UserStats],
})
@CanActivate(() => activateIfSignedIn())
export class HomePage {
}
