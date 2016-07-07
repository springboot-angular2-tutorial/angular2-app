import {HTTP_PROVIDERS} from "@angular/http";
import {disableDeprecatedForms, provideForms} from "@angular/forms";
import {provideRouter} from "@angular/router";
import {routes} from "../app/app.routes";
import {APP_RESOLVER_PROVIDERS} from "../shared/routes/index";

export const APPLICATION_PROVIDERS = [
  disableDeprecatedForms(),
  provideForms(),
  ...APP_RESOLVER_PROVIDERS,
  provideRouter(routes),
  ...HTTP_PROVIDERS,
];

export const PROVIDERS = [
  ...APPLICATION_PROVIDERS
];
