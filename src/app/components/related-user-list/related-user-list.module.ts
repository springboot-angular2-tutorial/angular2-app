import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {SharedModule} from "../../shared";
import {RelatedUserListComponent} from "./related-user-list.component";

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
