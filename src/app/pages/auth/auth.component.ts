import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../../core/services/auth.service";
import {styles} from "./auth.component.styles";
import {ToastService} from "../../core/toast/toast.service";

@Component({
  selector: 'mpt-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {

  styles: any = styles;

  constructor(private router: Router,
              private authService: AuthService,
              private toastService: ToastService) {
  }

  login(email, password) {
    this.authService.login(email, password)
      .subscribe(() => {
        this.router.navigate(['/home']);
      }, e => this.handleError(e));
  }

  handleError(error) {
    switch (error.status) {
      case 401:
        this.toastService.error('Email or password is wrong.');
    }
  }

}
