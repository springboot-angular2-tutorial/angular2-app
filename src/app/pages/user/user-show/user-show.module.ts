import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {SharedModule} from "../../../shared/shared.module";
import {MicropostListModule, UserStatsModule} from "../../../components";
import {UserShowComponent} from "./user-show.component";

@NgModule({
  imports: [
    CommonModule,
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
