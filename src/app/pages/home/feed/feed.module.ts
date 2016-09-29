import {FeedComponent} from "./feed.component";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../shared/shared.module";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {FeedService} from "./feed.service";
import {RouterModule} from "@angular/router";

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
