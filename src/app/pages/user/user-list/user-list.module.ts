import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {UserListComponent} from "./user-list.component";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  declarations: [
    UserListComponent,
  ],
  exports: [
    UserListComponent,
  ]
})
export class UserListModule {
}
