import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {UserListComponent} from "./user-list.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../shared/shared.module";

const routes: Routes = [
  {path: '', component: UserListComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
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
