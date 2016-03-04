import {Component} from "angular2/core";
import {
  CORE_DIRECTIVES,
  FORM_DIRECTIVES,
  Control,
  ControlGroup,
  Validators
} from "angular2/common";
import {RouteParams, CanActivate, ComponentInstruction} from "angular2/router";
import {Validators as AppValidators, EMAIL_PATTERN} from "app/forms";
import {UserService} from "app/services";
import {User} from "app/interfaces";
import {PrivatePage} from "app/routes";
import {appInjector} from "app/app-injector";

const toastr = require('toastr');

@Component({
  selector: 'user-edit-page',
  template: require('./edit.html'),
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
})
@CanActivate((next:ComponentInstruction) => {
  // work around https://github.com/angular/angular/issues/4112#issuecomment-153811572
  const userService:UserService = appInjector().get(UserService);
  return userService.get('me')
    .do(user => next.params['user'] = user)
    .map(() => true)
    .toPromise();
})
@PrivatePage()
export class UserEditPage {

  myForm:ControlGroup;
  name:Control;
  email:Control;
  password:Control;
  passwordConfirmation:Control;

  user:User;

  constructor(private params:RouteParams,
              private userService:UserService) {
    this.user = <any>params.get('user');
    this.initForm();
  }

  onSubmit(params) {
    this.passwordConfirmation.updateValueAndValidity({});
    this.passwordConfirmation.markAsTouched();
    if (!this.myForm.valid) return;
    this.userService.updateMe(this.withoutBlank(params))
      .subscribe(() => {
        toastr.success('Successfully updated.');
      }, this.handleError);
  }

  private initForm() {
    this.name = new Control(this.user.name, Validators.compose([
      Validators.required,
      Validators.minLength(4),
    ]));
    this.email = new Control(this.user.email, Validators.compose([
      Validators.required,
      Validators.pattern(EMAIL_PATTERN),
    ]));
    this.password = new Control('', Validators.compose([
      Validators.minLength(8),
    ]));
    this.passwordConfirmation = new Control('', Validators.compose([
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

  private withoutBlank(params:any):any {
    return Object.keys(params)
      .filter(k => params[k] !== "")
      .reduce((prev, current) => {
        prev[current] = params[current];
        return prev;
      }, {});
  }

}

