import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {PluralizePipe} from "./pipes/pluralize.pipe";
import {TimeAgoPipe} from "./pipes/time-ago.pipe";
import {GravatarComponent} from "./gravatar/gravatar.component";
import {PagerComponent} from "./pager/pager.component";
import {FollowBtnModule} from "./follow-btn/follow-btn.module";
import {FollowBtnComponent} from "./follow-btn/follow-btn.component";
import {UserStatsComponent} from "./user-stats/user-stats.component";
import {UserStatsModule} from "./user-stats/user-stats.module";

@NgModule({
  imports: [
    CommonModule,
    FollowBtnModule,
    // UserStatsModule,
  ],
  declarations: [
    GravatarComponent,
    PagerComponent,
    // UserStatsComponent,

    PluralizePipe,
    TimeAgoPipe,
  ],
  exports: [
    CommonModule,

    GravatarComponent,
    PagerComponent,
    FollowBtnComponent,
    // UserStatsComponent,

    PluralizePipe,
    TimeAgoPipe,
  ]
})
export class SharedModule {
}
