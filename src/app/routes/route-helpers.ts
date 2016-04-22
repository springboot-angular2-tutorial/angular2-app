import {Router} from "angular2/router";
import {appInjector} from "app/app-injector";
import {LoginService} from "app/services";

export function activateIfSignedIn():boolean {
  const router:Router = appInjector().get(Router);
  const loginService:LoginService = appInjector().get(LoginService);
  if (!loginService.isSignedIn()) {
    router.navigate(['/Login']);
  }
  return loginService.isSignedIn();
}

export function activateIfNotSignedIn():boolean {
  const router:Router = appInjector().get(Router);
  const loginService:LoginService = appInjector().get(LoginService);
  if (loginService.isSignedIn()) {
    router.navigate(['/Home']);
  }
  return !loginService.isSignedIn();
}
