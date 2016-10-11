import {HelpComponent} from "./help.component";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {Routes, RouterModule} from "@angular/router";

const routes: Routes = [
  {path: '', component: HelpComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
    HelpComponent,
  ],
  exports: [
    HelpComponent,
  ]
})
export class HelpModule {
}
