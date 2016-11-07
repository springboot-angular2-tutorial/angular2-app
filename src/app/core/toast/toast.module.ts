import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {ToastService} from "./toast.service";
import {ToastComponent} from "./toast.component";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  providers: [
    ToastService,
  ],
  declarations: [
    ToastComponent,
  ],
  exports: [
    ToastComponent,
  ]
})
export class ToastModule {
}
