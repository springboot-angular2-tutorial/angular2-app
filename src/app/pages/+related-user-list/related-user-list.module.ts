import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {UserStatsModule} from "../../components/user-stats/user-stats.module";
import {SharedModule} from "../../shared/shared.module";
import {RelatedUserListComponent} from "./related-user-list.component";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UserStatsModule,
    SharedModule,
  ],
  declarations: [
    RelatedUserListComponent,
  ],
  exports: [
    RelatedUserListComponent,
  ]
})
export class RelatedUserListModule {
}
