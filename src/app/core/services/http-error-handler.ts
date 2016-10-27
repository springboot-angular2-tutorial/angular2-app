import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import * as toastr from "toastr";
import {AuthService} from "./auth.service";

@Injectable()
export class HttpErrorHandler {

  constructor(private router:Router,
              private authService:AuthService) {
  }

  handle(error:any) {
    if (error.status === 401) {
      toastr.error('Please sign in');
      this.authService.logout();
      this.router.navigate(['login']);
    }
  }

}
