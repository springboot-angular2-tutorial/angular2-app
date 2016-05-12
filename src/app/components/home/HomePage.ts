import {Component} from "@angular/core";
import {Feed, MicropostNew, UserStats} from "app/components";
import {CanActivate} from "@angular/router-deprecated";
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
