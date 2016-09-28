import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {PluralizePipe} from "./pipes/pluralize.pipe";
import {TimeAgoPipe} from "./pipes/time-ago.pipe";
import {GravatarComponent} from "./gravatar/gravatar.component";

@NgModule({
  imports: [CommonModule],
  declarations: [
    GravatarComponent,
    PluralizePipe,
    TimeAgoPipe,
  ],
  exports: [
    CommonModule,
    GravatarComponent,
    PluralizePipe,
    TimeAgoPipe,
  ]
})
export class SharedModule {
}
