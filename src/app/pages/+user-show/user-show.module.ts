import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {UserShowComponent} from "./user-show.component";
import {Routes, RouterModule} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {UserStatsModule, MicropostListModule} from "../../components";

const routes: Routes = [
  {path: '', component: UserShowComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    UserStatsModule,
    MicropostListModule,
  ],
  declarations: [
    UserShowComponent,
  ],
})
export class UserShowModule {
}
