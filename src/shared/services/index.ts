import {HttpErrorHandler} from "./http-error-handler";
import {LoginService} from "./login.service";
import {MicropostService} from "./micropost.service";
import {UserService} from "./user.service";

export * from './http-error-handler';
export * from './login.service';
export * from './micropost.service';
export * from './user.service';

export const APP_SERVICE_PROVIDERS = [
  HttpErrorHandler,
  LoginService,
  MicropostService,
  UserService,
];

export const APP_TEST_SERVICE_PROVIDERS = APP_SERVICE_PROVIDERS;

