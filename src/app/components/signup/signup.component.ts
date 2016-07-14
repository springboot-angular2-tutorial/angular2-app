import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {
  FormGroup,
  FormControl,
  Validators,
  FORM_DIRECTIVES,
  REACTIVE_FORM_DIRECTIVES
} from "@angular/forms";
import * as toastr from "toastr";
import {LoginService, UserService} from "../../../shared/services";
import {
  EMAIL_PATTERN,
  Validators as AppValidators
} from "../../../shared/forms/index";

@Component({
  selector: 'mpt-signup',
  styleUrls: ['./signup.scss'],
  templateUrl: './signup.html',
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
})
export class SignupComponent {

  myForm:FormGroup;
  name:FormControl;
  email:FormControl;
  password:FormControl;
  passwordConfirmation:FormControl;

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
        this.router.navigate(['/home']);
      }, this.handleError)
    ;
  }

  private initForm() {
    this.name = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(4),
    ]));
    this.email = new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern(EMAIL_PATTERN),
    ]));
    this.password = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(8),
    ]));
    this.passwordConfirmation = new FormControl('', Validators.compose([
      Validators.required,
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
