import {NgModule, ApplicationRef} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {ENV_PROVIDERS} from "./environment";
import {ROUTES} from "./app.routes";
import {AppComponent} from "./app.component";
import {HeaderComponent} from "./header/header.component";
import {APP_RESOLVER_PROVIDERS} from "../shared/routes/index";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core/core.module";
import {UserStatsModule} from "./user-stats/user-stats.module";
import {HomeModule} from "./pages/home/home.module";
import {UserShowModule} from "./user/user-show/user-show.module";
import {SignupModule} from "./pages/signup/signup.module";
import {LoginModule} from "./pages/login/login.module";
import {FollowerListModule} from "./pages/relationship/follower-list/follower-list.module";
import {FollowingListModule} from "./pages/relationship/following-list/following-list.module";
import {TopModule} from "./pages/top/top.module";
import {HelpModule} from "./pages/help/help.module";
import {UserEditModule} from "./pages/user/user-edit/user-edit.module";
import {UserListModule} from "./pages/user/user-list/user-list.module";

const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
];

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),

    CoreModule,
    SharedModule,

    HomeModule,
    SignupModule,
    LoginModule,
    TopModule,
    HelpModule,
    UserEditModule,
    UserListModule,
    UserShowModule,
    FollowerListModule,
    FollowingListModule,

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

