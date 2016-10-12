import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../shared/shared.module";
import {UserStatsModule} from "../../../user-stats/user-stats.module";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {MicropostListModule} from "../../../components";
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
