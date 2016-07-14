import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import * as toastr from "toastr";
import {LoginService} from "../../../shared/services";

@Component({
  selector: 'mpt-login',
  styleUrls: ['./login.scss'],
  templateUrl: './login.html',
  directives: [ROUTER_DIRECTIVES]
})
export class LoginComponent {

  constructor(private router:Router,
              private loginService:LoginService) {
  }

  login(email, password) {
    this.loginService.login(email, password)
      .subscribe(() => {
        this.router.navigate(['/home']);
      }, this.handleError)
    ;
  }

  handleError(error) {
    switch (error.status) {
      case 401:
        toastr.error('Email or password is wrong.');
    }
  }

}
