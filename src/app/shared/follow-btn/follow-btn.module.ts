import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {FollowBtnComponent} from "./follow-btn.component";
import {FollowBtnService} from "./follow-btn.service";

@NgModule({
  imports: [CommonModule],
  declarations: [
    FollowBtnComponent,
  ],
  providers: [
    FollowBtnService,
  ],
  exports: [
    FollowBtnComponent,
  ]
})
export class FollowBtnModule {
}
