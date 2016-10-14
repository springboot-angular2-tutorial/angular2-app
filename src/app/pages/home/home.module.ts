import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {HomeComponent} from "./home.component";
import {SharedModule} from "../../shared";
import {MicropostNewComponent, UserStatsModule} from "../../components";
import {FeedModule} from "./feed/feed.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FeedModule,
    UserStatsModule,
  ],
  declarations: [
    HomeComponent,
    MicropostNewComponent,
  ],
  exports: [
    HomeComponent,
  ]
})
export class HomeModule {
}
