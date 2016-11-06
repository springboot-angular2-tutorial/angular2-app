import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule, PreloadAllModules} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ENV_PROVIDERS} from "./environment";
import {ROUTES} from "./app.routes";
import {AppComponent} from "./app.component";
import {CoreModule} from "./core";
import {HomeModule} from "./pages/home/home.module";
import {AuthModule} from "./pages/auth/auth.module";
import {TopModule} from "./pages/top/top.module";
import {NoContentComponent} from "./pages/no-content/no-content.component";
import {HeaderModule} from "./components/header/header.module";
import {SharedModule} from "./shared/shared.module";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
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
    SharedModule,
    HomeModule,
    AuthModule,
    TopModule,
    HeaderModule,
  ],
  providers: [
    ENV_PROVIDERS,
  ]
})
export class AppModule {
}

