import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {FollowingListComponent} from "./following-list.component";
import {Routes, RouterModule} from "@angular/router";
import {UserStatsModule, RelatedUserListModule} from "../../components";

const routes: Routes = [
  {path: '', component: FollowingListComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
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
