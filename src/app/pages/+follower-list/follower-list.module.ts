import {CommonModule} from "@angular/common";
import {FollowerListComponent} from "./follower-list.component";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {Routes, RouterModule} from "@angular/router";
import {UserStatsModule, RelatedUserListModule} from "../../components";

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
