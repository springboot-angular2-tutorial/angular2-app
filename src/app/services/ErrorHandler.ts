import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';

import {LoginService} from 'app/services';
import {HttpAuthError} from 'app/http';

const toastr = require('toastr');
toastr.options.preventDuplicates = true;

@Injectable()
export class ErrorHandler {

  constructor(private router:Router,
              private loginService:LoginService) {
  }

  handle(error:any) {
    if (error instanceof HttpAuthError) {
      toastr.error('Please sign in');
      this.loginService.logout();
      this.router.navigate(['/Login']);
    }
  }


}
