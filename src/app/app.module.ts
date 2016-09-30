import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {ENV_PROVIDERS} from "./environment";
import {ROUTES} from "./app.routes";
import {AppComponent} from "./app.component";
import {HeaderComponent} from "./header/header.component";
import {CoreModule} from "./core/core.module";
import {HomeModule} from "./pages/home/home.module";
import {UserShowModule} from "./pages/user/user-show/user-show.module";
import {SignupModule} from "./pages/signup/signup.module";
import {LoginModule} from "./pages/login/login.module";
import {FollowerListModule} from "./pages/relationship/follower-list/follower-list.module";
import {FollowingListModule} from "./pages/relationship/following-list/following-list.module";
import {TopModule} from "./pages/top/top.module";
import {HelpModule} from "./pages/help/help.module";
import {UserEditModule} from "./pages/user/user-edit/user-edit.module";
import {UserListModule} from "./pages/user/user-list/user-list.module";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),

    CoreModule,

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
  ],
  providers: [
    ENV_PROVIDERS,
  ]
})
export class AppModule {
}

