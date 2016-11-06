import {Component} from "@angular/core";
import {Router} from "@angular/router";
import * as toastr from "toastr";
import {AuthService} from "../../core/services/auth.service";
import {styles} from "./auth.component.styles";

@Component({
  selector: 'mpt-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {

  styles: any = styles;

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
