import {
  APP_HTTP_PROVIDERS,
  APP_TEST_HTTP_PROVIDERS
} from "../shared/http/index";
import {
  APP_SERVICE_PROVIDERS,
  APP_TEST_SERVICE_PROVIDERS
} from "../shared/services/index";
import {APP_TEST_ROUTER_PROVIDERS} from "../shared/routes/index";

export * from './app.component';
export * from './app-injector';

export const APP_PROVIDERS = [
  APP_HTTP_PROVIDERS,
  APP_SERVICE_PROVIDERS,
];

export const APP_TEST_PROVIDERS = [
  APP_TEST_SERVICE_PROVIDERS,
  APP_TEST_ROUTER_PROVIDERS,
  APP_TEST_HTTP_PROVIDERS,
];
