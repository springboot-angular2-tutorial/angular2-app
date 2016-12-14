import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {Routes, RouterModule} from "@angular/router";
import {FollowingListComponent} from "./following-list.component";
import {UserStatsModule} from "../../../components/user-stats/user-stats.module";
import {SharedModule} from "../../../shared/shared.module";

const routes: Routes = [
  {path: '', component: FollowingListComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UserStatsModule,
    SharedModule,
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
