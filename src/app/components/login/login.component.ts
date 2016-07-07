import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {LoginService} from "../../../shared/services";

const toastr = require('toastr/toastr');

@Component({
  selector: 'mpt-login',
  styles: [require('./login.scss')],
  template: require('./login.html'),
  directives: [ROUTER_DIRECTIVES]
})
// @CanActivate(() => activateIfNotSignedIn())
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
