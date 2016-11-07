import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {SharedModule} from "../../shared";
import {ToastService} from "./toast.service";
import {ToastComponent} from "./toast.component";

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
