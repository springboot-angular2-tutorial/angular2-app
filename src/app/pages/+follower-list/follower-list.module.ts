import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {Routes, RouterModule} from "@angular/router";
import {UserStatsModule, RelatedUserListModule} from "../../components";
import {FollowerListComponent} from "./follower-list.component";

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
