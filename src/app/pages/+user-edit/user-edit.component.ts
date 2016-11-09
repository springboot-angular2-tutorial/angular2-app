import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import isEmpty from "lodash/isEmpty";
import omitBy from "lodash/omitBy";
import values from "lodash/values";
import {User} from "../../core/domains";
import {UserService} from "../../core/services/user.service";
import {EMAIL_PATTERN, Validators as AppValidators} from "../../core/forms";
import {ToastService} from "../../core/toast/toast.service";

@Component({
  selector: 'mpt-user-edit',
  templateUrl: 'user-edit.component.html',
})
export class UserEditComponent implements OnInit {

  myForm: FormGroup;
  name: FormControl;
  email: FormControl;
  password: FormControl;
  passwordConfirmation: FormControl;

  user: User;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.user = data['profile'];
      this.initForm();
    });
  }

  onSubmit(params) {
    values(this.myForm.controls).forEach(c => c.markAsTouched());

    if (!this.myForm.valid) return;

    this.userService.updateMe(omitBy(params, isEmpty))
      .subscribe(() => {
        this.toastService.success('Successfully updated.');
      }, e => this.handleError(e));
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
    this.passwordConfirmation = new FormControl('');
    this.myForm = new FormGroup({
      name: this.name,
      email: this.email,
      password: this.password,
      passwordConfirmation: this.passwordConfirmation,
    }, AppValidators.match(this.password, this.passwordConfirmation));
  }

  private handleError(error) {
    switch (error.status) {
      case 400:
        if (error.json()['code'] === 'email_already_taken') {
          this.toastService.error('This email is already taken.');
        }
    }
  }

}
