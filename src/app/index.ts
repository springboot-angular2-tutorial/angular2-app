import { disableDeprecatedForms, provideForms } from '@angular/forms';
import {
  APP_HTTP_PROVIDERS,
  APP_TEST_HTTP_PROVIDERS
} from "../shared/http/index";
import {
  APP_SERVICE_PROVIDERS,
  APP_TEST_SERVICE_PROVIDERS
} from "../shared/services/index";

export * from './app.component';

export const APP_PROVIDERS = [
  APP_HTTP_PROVIDERS,
  APP_SERVICE_PROVIDERS,
];

export const APP_TEST_PROVIDERS = [
  disableDeprecatedForms(),
  provideForms(),
  APP_TEST_SERVICE_PROVIDERS,
  APP_TEST_HTTP_PROVIDERS,
];
