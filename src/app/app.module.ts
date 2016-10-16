import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule, PreloadAllModules} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ENV_PROVIDERS} from "./environment";
import {ROUTES} from "./app.routes";
import {AppComponent} from "./app.component";
import {HeaderComponent} from "./components";
import {CoreModule} from "./core";
import {HomeModule} from "./pages/home/home.module";
import {LoginModule} from "./pages/login/login.module";
import {TopModule} from "./pages/top/top.module";
import {NoContentComponent} from "./pages/no-content/no-content.component";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HeaderComponent,
    NoContentComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, {
      preloadingStrategy: PreloadAllModules
    }),
    FormsModule,
    ReactiveFormsModule,

    CoreModule,
    HomeModule,
    LoginModule,
    TopModule,
  ],
  providers: [
    ENV_PROVIDERS,
  ]
})
export class AppModule {
}

