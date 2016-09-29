import {TopComponent} from "./top.component";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    TopComponent,
  ],
  exports: [
    TopComponent,
  ]
})
export class TopModule {
}
