import {CommonModule} from "@angular/common";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {SignupComponent} from "./signup.component";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {Routes, RouterModule} from "@angular/router";

const routes: Routes = [
  {path: '', component: SignupComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
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
