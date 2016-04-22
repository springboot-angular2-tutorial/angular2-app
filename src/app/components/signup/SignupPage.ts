import {Component} from "angular2/core";
import {
  CORE_DIRECTIVES,
  FORM_DIRECTIVES,
  Control,
  ControlGroup,
  Validators
} from "angular2/common";
import {Router, CanActivate} from "angular2/router";
import {Validators as AppValidators, EMAIL_PATTERN} from "app/forms";
import {UserService, LoginService} from "app/services";
import {activateIfNotSignedIn} from "app/routes";

const toastr = require('toastr');

@Component({
  selector: 'signup-page',
  styles: [require('./signup.scss')],
  template: require('./signup.html'),
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
})
@CanActivate(() => activateIfNotSignedIn())
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

  onSubmit(params) {
    this.userService.create(params)
      .mergeMap(() => {
        return this.loginService.login(params.email, params.password);
      })
      .subscribe(() => {
        this.router.navigate(['/Home']);
      }, this.handleError)
    ;
  }

  private initForm() {
    this.name = new Control('', Validators.compose([
      Validators.required,
      Validators.minLength(4),
    ]));
    this.email = new Control('', Validators.compose([
      Validators.required,
      Validators.pattern(EMAIL_PATTERN),
    ]));
    this.password = new Control('', Validators.compose([
      Validators.required,
      Validators.minLength(8),
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

  private handleError(error) {
    switch (error.status) {
      case 400:
        if (error.json()['code'] === 'email_already_taken') {
          toastr.error('This email is already taken.');
        }
    }
  }

}
