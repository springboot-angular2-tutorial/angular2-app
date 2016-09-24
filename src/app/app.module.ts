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

const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  ...APP_SERVICE_PROVIDERS,
  ...APP_HTTP_PROVIDERS,
];

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    LoginComponent,
    HelpComponent,
    HeaderComponent,
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

