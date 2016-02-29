import {Observable} from "rxjs/Observable";
import {Injectable} from "angular2/core";
import {Response} from "angular2/http";
import {Http} from "app/http";

const jwtDecode = require('jwt-decode');

@Injectable()
export class LoginService {

  constructor(private http:Http) {
  }

  login(email, password):Observable<Response> {
    return this.http.post('/api/login', JSON.stringify({
      email: email,
      password: password,
    })).do(resp => {
      localStorage.setItem('jwt', resp.headers.get('X-AUTH-TOKEN'));
    });
  }

  logout():void {
    localStorage.removeItem('jwt');
  }

  isSignedIn():boolean {
    return localStorage.getItem('jwt') !== null;
  }

}
