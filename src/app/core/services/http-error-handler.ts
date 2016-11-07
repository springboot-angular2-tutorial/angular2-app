import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {ToastService} from "../../components/toast/toast.service";

@Injectable()
export class HttpErrorHandler {

  constructor(private router: Router,
              private authService: AuthService,
              private toastService: ToastService) {
  }

  handle(error: any) {
    if (error.status === 401) {
      this.toastService.error('Please sign in');
      this.authService.logout();
      this.router.navigate(['login']);
    }
  }

}
