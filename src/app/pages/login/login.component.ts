import {Component} from "@angular/core";
import {Router} from "@angular/router";
import * as toastr from "toastr";
import {AuthService} from "../../core/services/login.service";

@Component({
  selector: 'mpt-auth',
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html',
})
export class AuthComponent {

  constructor(private router: Router,
              private authService: AuthService) {
  }

  login(email, password) {
    this.authService.login(email, password)
      .subscribe(() => {
        this.router.navigate(['/home']);
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
