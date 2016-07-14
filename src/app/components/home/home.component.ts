import {Component} from "@angular/core";
import {FeedComponent} from "./feed.component";
import {
  UserStatsComponent,
  MicropostNewComponent
} from "../../../shared/components";

@Component({
  selector: 'mpt-home',
  styleUrls: ['./home.scss'],
  templateUrl: './home.html',
  directives: [MicropostNewComponent, FeedComponent, UserStatsComponent],
})
export class HomeComponent {
}
