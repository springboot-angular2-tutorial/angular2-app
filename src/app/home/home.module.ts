import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import {HomeComponent} from "./home.component";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {UserStatsModule} from "../user-stats/user-stats.module";
import {FeedComponent} from "./feed/feed.component";
import {MicropostNewComponent} from "../micropost/micropost-new/micropost-new.component";
import {RouterModule} from "@angular/router";

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
