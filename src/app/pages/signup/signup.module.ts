import {CommonModule} from "@angular/common";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {SignupComponent} from "./signup.component";
import {NgModule} from "@angular/core/src/metadata/ng_module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    SignupComponent,
  ],
  exports: [
    SignupComponent,
  ]
})
export class SignupModule {
}
