import {Component} from "@angular/core";
import {FeedComponent} from "./feed.component";
import {
  UserStatsComponent,
  MicropostNewComponent
} from "../../../shared/components";

@Component({
  selector: 'mpt-home',
  styles: [require('./home.scss')],
  template: require('./home.html'),
  directives: [MicropostNewComponent, FeedComponent, UserStatsComponent],
})
// @CanActivate(() => activateIfSignedIn())
export class HomeComponent {
}
