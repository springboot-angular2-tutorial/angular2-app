import {Component, View} from 'angular2/core';
import {
  CORE_DIRECTIVES,
  FORM_DIRECTIVES,
  Control,
  ControlGroup,
  Validators,
} from 'angular2/common';
import {Router} from 'angular2/router';

import {Validators as AppValidators} from 'app/forms'
import {UserService, LoginService} from 'app/services';
import {PublicPage} from 'app/routes';

const toastr = require('toastr');

@Component({
  selector: 'signup-page',
})
@View({
  styles: [require('./signup.scss')],
  template: require('./signup.html'),
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
})
@PublicPage({
  whenSignedIn: (router) => router.navigate(['/Home'])
})
export class SignupPage {

  myForm:ControlGroup;
  name:Control;
  email:Control;
  password:Control;
  passwordConfirmation:Control;

  constructor(private router:Router,
              private userService:UserService,
              private loginService:LoginService) {
    this.initForm();
  }

  private initForm() {
    this.name = new Control('', Validators.compose([
      Validators.required,
      AppValidators.minLength(4),
    ]));
    this.email = new Control('', Validators.compose([
      Validators.required,
      AppValidators.email
    ]));
    this.password = new Control('', Validators.compose([
      Validators.required,
      AppValidators.minLength(8),
    ]));
    this.passwordConfirmation = new Control('', Validators.compose([
      Validators.required,
      AppValidators.match(this.password),
    ]));
    this.myForm = new ControlGroup({
      name: this.name,
      email: this.email,
      password: this.password,
      passwordConfirmation: this.passwordConfirmation,
    });
  }

  onSubmit(params) {
    this.userService.create(params)
      .flatMap(() => {
        return this.loginService.login(params.email, params.password);
      })
      .subscribe(() => {
        this.router.navigate(['/Home'])
      }, this.handleError)
    ;
  }

  private handleError(error) {
    switch (error.status) {
      case 400:
        if (error.json()['code'] == 'email_already_taken') {
          toastr.error('This email is already taken.');
        }
    }
  }

}
