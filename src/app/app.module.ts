import {NgModule, ApplicationRef} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
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

    MicropostNewComponent,
    FeedComponent,
    UserStatsComponent,
    GravatarComponent,

    TimeAgoPipe,
    PluralizePipe,
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, {useHash: false})
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    ...APP_PROVIDERS
  ]
})
export class AppModule {
  constructor(appRef: ApplicationRef) {
    appRef.bootstrap(AppComponent);
  }
}

