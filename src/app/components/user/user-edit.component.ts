import {Component, OnInit} from "@angular/core";
import {
  FormGroup,
  FORM_DIRECTIVES,
  FormControl,
  Validators,
  REACTIVE_FORM_DIRECTIVES
} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {isEmpty, omitBy} from "lodash";
import * as toastr from "toastr";
import {User} from "../../../shared/domains";
import {UserService} from "../../../shared/services";
import {
  Validators as AppValidators,
  EMAIL_PATTERN
} from "../../../shared/forms";

@Component({
  selector: 'mpt-user-edit',
  templateUrl: './user-edit.html',
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
})
export class UserEditComponent implements OnInit {

  myForm:FormGroup;
  name:FormControl;
  email:FormControl;
  password:FormControl;
  passwordConfirmation:FormControl;

  user:User;

  constructor(private route:ActivatedRoute,
              private userService:UserService) {
  }

  ngOnInit():any {
    this.route.data.subscribe(data => {
      this.user = data['profile'];
      this.initForm();
    });
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
    this.name = new FormControl(this.user.name, Validators.compose([
      Validators.required,
      Validators.minLength(4),
    ]));
    this.email = new FormControl(this.user.email, Validators.compose([
      Validators.required,
      Validators.pattern(EMAIL_PATTERN),
    ]));
    this.password = new FormControl('', Validators.compose([
      Validators.minLength(8),
    ]));
    this.passwordConfirmation = new FormControl('', Validators.compose([
      AppValidators.match(this.password),
    ]));
    this.myForm = new FormGroup({
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
