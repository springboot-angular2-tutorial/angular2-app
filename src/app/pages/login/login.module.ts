import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {RouterModule} from "@angular/router";
import {AuthComponent} from "./login.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    AuthComponent,
  ],
  exports: [
    AuthComponent,
  ]
})
export class AuthModule {
}
