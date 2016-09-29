import {CommonModule} from "@angular/common";
import {HomeComponent} from "./home.component";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {FeedComponent} from "./feed/feed.component";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {UserStatsModule} from "../../user-stats/user-stats.module";
import {MicropostNewComponent} from "../../micropost/micropost-new/micropost-new.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    UserStatsModule,
  ],
  declarations: [
    HomeComponent,
    FeedComponent,
    MicropostNewComponent,
  ],
  exports: [
    HomeComponent,
  ]
})
export class HomeModule {
}
