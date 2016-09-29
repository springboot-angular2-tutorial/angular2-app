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
import {LoginComponent} from "./login/login.component";
import {TopComponent} from "./top/top.component";
import {HomeComponent} from "./home/home.component";
import {MicropostNewComponent} from "../shared/components/micropost/micropost-new.component";
import {FeedComponent} from "./home/feed/feed.component";
import {UserShowComponent} from "./user/user-show/user-show.component";
import {MicropostListComponent} from "./shared/micropost/micropost-list/micropost-list.component";
import {UserListComponent} from "./user/user-list/user-list.component";
import {RelatedUserListComponent} from "./relationship/shared/related-user-list.component";
import {FollowingListComponent} from "./relationship/following-list/following-list.component";
import {FollowerListComponent} from "./relationship/follower-list/follower-list.component";
import {SignupComponent} from "./signup/signup.component";
import {UserEditComponent} from "./user/user-edit/user-edit.component";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core/core.module";
import {UserStatsModule} from "./user-stats/user-stats.module";

const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
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
    MicropostListComponent,
    RelatedUserListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),

    CoreModule,
    SharedModule,
    UserStatsModule,
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

