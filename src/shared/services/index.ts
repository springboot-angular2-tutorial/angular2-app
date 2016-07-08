import {HttpErrorHandler} from "./http-error-handler";
import {LoginService} from "./login.service";
import {MicropostService} from "./micropost.service";
import {UserService} from "./user.service";
import {PrivatePageGuard} from "./private-page.guard";
import {PublicPageGuard} from "./public-page.guard";

export * from './http-error-handler';
export * from './login.service';
export * from './micropost.service';
export * from './user.service';
export * from './private-page.guard';
export * from './public-page.guard';

export const APP_SERVICE_PROVIDERS = [
  HttpErrorHandler,
  LoginService,
  MicropostService,
  UserService,
  PrivatePageGuard,
  PublicPageGuard,
];

export const APP_TEST_SERVICE_PROVIDERS = APP_SERVICE_PROVIDERS;

