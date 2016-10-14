import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {SharedModule} from "../../shared";
import {MicropostListComponent} from "./micropost-list.component";
import {MicropostListService} from "./micropost-list.service";

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
