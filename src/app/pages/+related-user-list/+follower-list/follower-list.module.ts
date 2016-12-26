import {NgModule} from "@angular/core/src/metadata/ng_module";
import {Routes, RouterModule} from "@angular/router";
import {RelatedUserListService} from "../related-user-list.service";
import {FollowerListService} from "./follower-list.service";
import {RelatedUserListComponent} from "../related-user-list.component";
import {RelatedUserListModule} from "../related-user-list.module";

const routes: Routes = [
  {path: '', component: RelatedUserListComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    RelatedUserListModule,
  ],
  providers: [
    {
      provide: RelatedUserListService,
      useClass: FollowerListService,
    }
  ],
})
export class FollowerListModule {
}
