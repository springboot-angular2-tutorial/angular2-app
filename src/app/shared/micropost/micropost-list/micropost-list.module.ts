import {CommonModule} from "@angular/common";
import {MicropostListComponent} from "./micropost-list.component";
import {MicropostListService} from "./micropost-list.service";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {SharedModule} from "../../shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    MicropostListComponent,
  ],
  providers: [
    MicropostListService,
  ],
  exports: [
    MicropostListComponent,
  ]
})
export class MicropostListModule {
}
