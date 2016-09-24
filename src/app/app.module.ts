import {NgModule, ApplicationRef} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {ENV_PROVIDERS} from "./environment";
import {ROUTES} from "./app.routes";
import {AppComponent} from "./app.component";
import {HeaderComponent} from "../shared/components/header/header.component";
import {APP_RESOLVER_PROVIDERS} from "../shared/routes/index";
import {HelpComponent} from "./components/help/help.component";
import {APP_SERVICE_PROVIDERS} from "../shared/services/index";
import {APP_HTTP_PROVIDERS} from "../shared/http/index";
import {LoginComponent} from "./components/login/login.component";
import {TopComponent} from "./components/top/top.component";
import {HomeComponent} from "./components/home/home.component";
import {MicropostNewComponent} from "../shared/components/micropost/micropost-new.component";
import {FeedComponent} from "./components/home/feed.component";
import {UserStatsComponent} from "../shared/components/user-stats/user-stats.component";
import {TimeAgoPipe} from "../shared/pipes/time-ago.pipe";
import {GravatarComponent} from "../shared/components/gravatar/gravatar.component";
import {PluralizePipe} from "../shared/pipes/pluralize.pipe";
import {UserShowComponent} from "./components/user/user-show.component";
import {FollowBtnComponent} from "../shared/components/follow-btn/follow-btn.component";
import {MicropostListComponent} from "../shared/components/micropost/micropost-list.component";
import {UserListComponent} from "./components/user/user-list.component";
import {PagerComponent} from "../shared/components/pager/pager.component";
import {RelatedUserListComponent} from "./components/relationship/related-user-list.component";
import {FollowingListComponent} from "./components/relationship/following-list.component";
import {FollowerListComponent} from "./components/relationship/follower-list.component";
import {SignupComponent} from "./components/signup/signup.component";
import {UserEditComponent} from "./components/user/user-edit.component";

const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  ...APP_SERVICE_PROVIDERS,
  ...APP_HTTP_PROVIDERS,
];

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    TopComponent,
    LoginComponent,
    HomeComponent,
    HelpComponent,
    HeaderComponent,
    UserShowComponent,
    UserListComponent,
    FollowingListComponent,
    FollowerListComponent,
    SignupComponent,
    UserEditComponent,

    MicropostNewComponent,
    FeedComponent,
    UserStatsComponent,
    GravatarComponent,
    FollowBtnComponent,
    MicropostListComponent,
    PagerComponent,
    RelatedUserListComponent,

    TimeAgoPipe,
    PluralizePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, {useHash: false})
  ],
  providers: [
    ENV_PROVIDERS,
    ...APP_PROVIDERS
  ]
})
export class AppModule {
  constructor(appRef: ApplicationRef) {
    appRef.bootstrap(AppComponent);
  }
}

