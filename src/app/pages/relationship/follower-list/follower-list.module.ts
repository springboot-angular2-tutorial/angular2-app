import {CommonModule} from "@angular/common";
import {UserStatsModule} from "../../../components";
import {RelatedUserListModule} from "../shared/related-user-list.module";
import {FollowerListComponent} from "./follower-list.component";
import {NgModule} from "@angular/core/src/metadata/ng_module";

@NgModule({
  imports: [
    CommonModule,
    UserStatsModule,
    RelatedUserListModule
  ],
  declarations: [
    FollowerListComponent,
  ],
  exports: [
    FollowerListComponent,
  ]
})
export class FollowerListModule {
}
