import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {SharedModule} from "../../shared";
import {MicropostNewComponent, UserStatsModule} from "../../components";
import {HomeComponent} from "./home.component";
import {FeedModule} from "./feed/feed.module";
import {StylesDirective} from "../../shared/directives/styles.directive";

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
