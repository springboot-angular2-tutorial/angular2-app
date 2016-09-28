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
import {HelpComponent} from "./help/help.component";
import {APP_SERVICE_PROVIDERS} from "../shared/services/index";
import {APP_HTTP_PROVIDERS} from "../shared/http/index";
import {LoginComponent} from "./login/login.component";
import {TopComponent} from "./top/top.component";
import {HomeComponent} from "./home/home.component";
import {MicropostNewComponent} from "../shared/components/micropost/micropost-new.component";
import {FeedComponent} from "./home/feed/feed.component";
import {UserStatsComponent} from "../shared/components/user-stats/user-stats.component";
import {GravatarComponent} from "../shared/components/gravatar/gravatar.component";
import {UserShowComponent} from "./user/user-show/user-show.component";
import {FollowBtnComponent} from "../shared/components/follow-btn/follow-btn.component";
import {MicropostListComponent} from "../shared/components/micropost/micropost-list.component";
import {UserListComponent} from "./user/user-list/user-list.component";
import {PagerComponent} from "../shared/components/pager/pager.component";
import {RelatedUserListComponent} from "./relationship/shared/related-user-list.component";
import {FollowingListComponent} from "./relationship/following-list/following-list.component";
import {FollowerListComponent} from "./relationship/follower-list/follower-list.component";
import {SignupComponent} from "./signup/signup.component";
import {UserEditComponent} from "./user/user-edit/user-edit.component";
import {SharedModule} from "./shared/shared.module";

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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),

    SharedModule,
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

