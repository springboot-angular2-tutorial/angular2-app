import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../../shared";
import {FeedComponent} from "./feed.component";
import {FeedService} from "./feed.service";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  providers: [
    FeedService,
  ],
  declarations: [
    FeedComponent,
  ],
  exports: [
    FeedComponent,
  ]
})
export class FeedModule {
}
