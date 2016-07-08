import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {LoginService} from "./login.service";

@Injectable()
export class PrivatePageGuard implements CanActivate {

  constructor(private router:Router, private loginService:LoginService) {
  }

  canActivate() {
    if (!this.loginService.isSignedIn()) {
      this.router.navigate(['/login']);
    }
    return this.loginService.isSignedIn();
  }

}
