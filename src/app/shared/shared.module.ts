import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {PluralizePipe} from "./pipes/pluralize.pipe";
import {TimeAgoPipe} from "./pipes/time-ago.pipe";

@NgModule({
  imports: [CommonModule],
  declarations: [
    PluralizePipe,
    TimeAgoPipe,
  ],
  exports: [
    CommonModule,
    PluralizePipe,
    TimeAgoPipe,
  ]
})
export class SharedModule {
}
