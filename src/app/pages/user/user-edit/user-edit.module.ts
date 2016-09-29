import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {UserEditComponent} from "./user-edit.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    UserEditComponent,
  ],
  exports: [
    UserEditComponent,
  ]
})
export class UserEditModule {
}
