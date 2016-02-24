import {Component, View} from "angular2/core";
import {ROUTER_DIRECTIVES, Router} from "angular2/router";
import {LoginService} from "app/services";
import {PublicPage} from "app/routes";

const toastr = require('toastr/toastr');

@Component({
  selector: 'login-page',
})
@View({
  styles: [require('./login.scss')],
  template: require('./login.html'),
  directives: [ROUTER_DIRECTIVES]
})
@PublicPage({
  whenSignedIn: (router) => router.navigate(['/Home'])
})
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
