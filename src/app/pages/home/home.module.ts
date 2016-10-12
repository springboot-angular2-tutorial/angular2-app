import {CommonModule} from "@angular/common";
import {HomeComponent} from "./home.component";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {SharedModule} from "../../shared/shared.module";
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
