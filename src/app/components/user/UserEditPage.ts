import {Component, View, Injector} from "angular2/core";
import {
  CORE_DIRECTIVES,
  FORM_DIRECTIVES,
  Control,
  ControlGroup,
  Validators
} from "angular2/common";
import {RouteParams, CanActivate, ComponentInstruction} from "angular2/router";
import {Validators as AppValidators} from "app/forms";
import {APP_PROVIDERS} from "app/providers";
import {UserService, HttpErrorHandler} from "app/services";
import {User} from "app/interfaces";
import {PrivatePage} from "app/routes";

const toastr = require('toastr');

@Component({
  selector: 'user-edit-page',
})
@View({
  template: require('./edit.html'),
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
})
@CanActivate((next:ComponentInstruction) => {
  // TODO It's hard to test. It will be solved by https://github.com/angular/angular/issues/4112.
  const userService = Injector.resolveAndCreate([APP_PROVIDERS]).get(UserService);
  return userService.get('me')
    .do(userResponse => next.params['user'] = userResponse.user)
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
              private userService:UserService,
              private errorHandler:HttpErrorHandler) {
    this.user = <any>params.get('user');
    this.initForm();
  }

  private initForm() {
    this.name = new Control(this.user.name, Validators.compose([
      Validators.required,
      AppValidators.minLength(4),
    ]));
    this.email = new Control(this.user.email, Validators.compose([
      Validators.required,
      AppValidators.email
    ]));
    this.password = new Control('', Validators.compose([
      AppValidators.minLength(8),
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

  onSubmit(value) {
    this.passwordConfirmation.updateValueAndValidity({});
    this.passwordConfirmation.markAsTouched();
    if (!this.myForm.valid) return;

    const params = Object.keys(value)
      .filter(k => value[k] != "")
      .reduce((prev, current) => {
        prev[current] = value[current];
        return prev;
      }, {});
    this.userService.updateMe(params)
      .subscribe(() => {
        toastr.success('Successfully updated.')
      }, this.handleError);
  }

  private handleError(error) {
    this.errorHandler.handle(error);

    switch (error.response.status) {
      case 400:
        error.response.json().then(json => {
          if (json['code'] == 'email_already_taken') {
            toastr.error('This email is already taken.');
          }
        });
    }
  }

}

