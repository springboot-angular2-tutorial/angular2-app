import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {PluralizePipe} from "./pipes/pluralize.pipe";
import {TimeAgoPipe} from "./pipes/time-ago.pipe";
import {GravatarComponent} from "./gravatar/gravatar.component";
import {PagerComponent} from "./pager/pager.component";

@NgModule({
  imports: [CommonModule],
  declarations: [
    GravatarComponent,
    PagerComponent,

    PluralizePipe,
    TimeAgoPipe,
  ],
  exports: [
    CommonModule,

    GravatarComponent,
    PagerComponent,

    PluralizePipe,
    TimeAgoPipe,
  ]
})
export class SharedModule {
}
