import {CommonModule} from "@angular/common";
import {UserStatsModule} from "../../../components";
import {RelatedUserListModule} from "../shared/related-user-list.module";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {FollowingListComponent} from "./following-list.component";

@NgModule({
  imports: [
    CommonModule,
    UserStatsModule,
    RelatedUserListModule
  ],
  declarations: [
    FollowingListComponent,
  ],
  exports: [
    FollowingListComponent,
  ]
})
export class FollowingListModule {
}
