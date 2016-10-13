import {CommonModule} from "@angular/common";
import {UserStatsModule} from "../../../components";
import {RelatedUserListModule} from "../shared/related-user-list.module";
import {FollowerListComponent} from "./follower-list.component";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {Routes, RouterModule} from "@angular/router";

const routes: Routes = [
  {path: '', component: FollowerListComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
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
