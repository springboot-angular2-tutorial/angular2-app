import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {Routes, RouterModule} from "@angular/router";
import {SharedModule} from "../../shared";
import {UserStatsModule, MicropostListModule} from "../../components";
import {UserShowComponent} from "./user-show.component";

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
