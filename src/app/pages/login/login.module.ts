import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./login.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    LoginComponent,
  ],
  exports: [
    LoginComponent,
  ]
})
export class LoginModule {
}
