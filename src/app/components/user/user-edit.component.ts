import {Component} from "@angular/core";
import {
  CORE_DIRECTIVES,
  FORM_DIRECTIVES,
  Control,
  ControlGroup,
  Validators
} from "@angular/common";
import {
  RouteParams,
  CanActivate,
  ComponentInstruction
} from "@angular/router-deprecated";
import {User} from "../../../shared/domains";
import {LoginService, UserService} from "../../../shared/services";
import {Validators as AppValidators, EMAIL_PATTERN} from "../../../shared/forms/index";
import {activateIfSignedIn} from "../../../shared/routes";
import {appInjector} from "../../app-injector";

const isEmpty = require("lodash/isEmpty");
const omitBy = require("lodash/omitBy");
const toastr = require('toastr');

@Component({
  selector: 'mpt-user-edit',
  template: require('./user-edit.html'),
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
})
@CanActivate((next:ComponentInstruction) => {
  const loginService:LoginService = appInjector().get(LoginService);
  if (!loginService.isSignedIn()) return activateIfSignedIn();

  const userService:UserService = appInjector().get(UserService);
  return userService.get('me')
    .do(user => next.params['user'] = <any>user)
    .map(() => true)
    .toPromise();
})
export class UserEditComponent {

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

    this.userService.updateMe(omitBy(params, isEmpty))
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

}
