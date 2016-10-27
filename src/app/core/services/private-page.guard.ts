import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable()
export class PrivatePageGuard implements CanActivate {

  constructor(private router:Router, private authService:AuthService) {
  }

  canActivate() {
    if (!this.authService.isSignedIn()) {
      this.router.navigate(['/login']);
    }
    return this.authService.isSignedIn();
  }

}
