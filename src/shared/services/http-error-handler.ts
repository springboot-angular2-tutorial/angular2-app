import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import * as toastr from "toastr";
import {LoginService} from "./login.service";

toastr.options.preventDuplicates = true;

@Injectable()
export class HttpErrorHandler {

  constructor(private router:Router,
              private loginService:LoginService) {
  }

  handle(error:any) {
    if (error.status === 401) {
      toastr.error('Please sign in');
      this.loginService.logout();
      this.router.navigate(['login']);
    }
  }

}
