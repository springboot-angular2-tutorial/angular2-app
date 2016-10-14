import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {RelatedUserListComponent} from "./related-user-list.component";
import {NgModule} from "@angular/core/src/metadata/ng_module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
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
