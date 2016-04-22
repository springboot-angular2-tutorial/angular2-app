import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, Router, CanActivate} from "angular2/router";
import {LoginService} from "app/services";
import {activateIfNotSignedIn} from "app/routes";

const toastr = require('toastr/toastr');

@Component({
  selector: 'login-page',
  styles: [require('./login.scss')],
  template: require('./login.html'),
  directives: [ROUTER_DIRECTIVES]
})
@CanActivate(() => activateIfNotSignedIn())
export class LoginPage {
  constructor(private router:Router,
              private loginService:LoginService) {
  }

  login(email, password) {
    this.loginService.login(email, password)
      .subscribe(() => {
        this.router.navigate(['/Home']);
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
