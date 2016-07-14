import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {HeaderComponent} from "../shared/components";

@Component({
  selector: 'mpt-app',
  styleUrls: ['./app.scss'],
  templateUrl: './app.html',
  directives: [ROUTER_DIRECTIVES, HeaderComponent],
})
export class AppComponent {
}
