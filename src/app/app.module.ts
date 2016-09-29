import {NgModule, ApplicationRef} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {ENV_PROVIDERS} from "./environment";
import {ROUTES} from "./app.routes";
import {AppComponent} from "./app.component";
import {HeaderComponent} from "./header/header.component";
import {APP_RESOLVER_PROVIDERS} from "../shared/routes/index";
import {HelpComponent} from "./pages/help/help.component";
import {LoginComponent} from "./pages/login/login.component";
import {TopComponent} from "./top/top.component";
import {UserListComponent} from "./user/user-list/user-list.component";
import {RelatedUserListComponent} from "./relationship/shared/related-user-list.component";
import {FollowingListComponent} from "./relationship/following-list/following-list.component";
import {FollowerListComponent} from "./relationship/follower-list/follower-list.component";
import {SignupComponent} from "./signup/signup.component";
import {UserEditComponent} from "./user/user-edit/user-edit.component";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core/core.module";
import {UserStatsModule} from "./user-stats/user-stats.module";
import {HomeModule} from "./pages/home/home.module";
import {UserShowModule} from "./user/user-show/user-show.module";

const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
];

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    TopComponent,
    LoginComponent,
    HelpComponent,
    HeaderComponent,
    UserListComponent,
    FollowingListComponent,
    FollowerListComponent,
    SignupComponent,
    UserEditComponent,

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

    HomeModule,
    UserShowModule,
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

