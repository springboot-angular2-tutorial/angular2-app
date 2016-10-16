import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {Routes, RouterModule} from "@angular/router";
import {UserStatsModule, RelatedUserListModule} from "../../components";
import {FollowingListComponent} from "./following-list.component";

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
